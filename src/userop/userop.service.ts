import { Injectable } from '@nestjs/common';
import {
  BigNumber,
  Contract,
  ContractReceipt,
  ContractTransaction,
  providers,
  Wallet,
} from 'ethers';
import { config } from '../common/config';
import entryPointAbi from '../contracts/entry-point-abi';
import { TxData } from './userop.controller';
import { logger } from '../common/logger';
import { racePromiseWithTimeout } from '../common/helpers';

// TODO: can be set from env config
const TX_RECEIPT_TIMEOUT_SEC = 10;

@Injectable()
export class UseropService {
  private readonly config;
  private readonly provider: providers.JsonRpcProvider;
  private entryPointAddress = '0x5ff137d4b0fdcd49dca30c7cf57e578a026d2789';
  private readonly wallet: Wallet;
  private readonly entryPointContract: Contract;
  private readonly txReceiptAwaitTimeoutSec: number;

  constructor() {
    this.config = config;
    this.provider = new providers.JsonRpcProvider(this.config.rpcUrl);
    this.wallet = new Wallet(this.config.privateKey, this.provider);
    this.entryPointContract = new Contract(this.entryPointAddress, entryPointAbi, this.wallet);
    this.txReceiptAwaitTimeoutSec = TX_RECEIPT_TIMEOUT_SEC;
  }

  async sendUserOp(userOpData: TxData): Promise<string> {
    // TODO: validate userOp input data
    // TODO: encode userOp data
    let tx: ContractTransaction;
    let txReceipt: ContractReceipt;
    try {
      tx = await this.entryPointContract.handleOps(
        ...userOpData.args,
        BigNumber.from(userOpData.gasLimit),
      );
    } catch (err: any) {
      // TODO: retry with backoff in certain cases?
      logger.error({ err: err.message, code: err.code }, 'Could not send tx');
      throw err;
    }

    try {
      txReceipt = await racePromiseWithTimeout<ContractReceipt>(
        tx.wait(),
        this.txReceiptAwaitTimeoutSec,
      );
    } catch (err: any) {
      // TODO: could be retried with backoff in certain error cases, eg:
      //  - timeout (we want to wait longer for the tx to be confirmed)
      //  - tx failed due to low gas limit
      //  - the contract reverted the tx execution due to some bad inputs
      //  - ... etc. other business cases
      logger.error({ err: err.message, code: err.code }, 'Tx could be confirmed');
      throw err;
    }

    return txReceipt.transactionHash;
  }
}
