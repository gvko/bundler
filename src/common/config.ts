// eslint-disable-next-line @typescript-eslint/no-var-requires
require('dotenv').config();

import { get } from 'env-var';

export const config = () => ({
  rpcUrl: get('RPC_URL_HTTP').required().asString(),
  privateKey: get('PRIVATE_KEY').required().asString(),
  txReceiptAwaitTimeoutSec: get('TX_RECEIPT_TIMEOUT_SEC').default(10).asInt(),
});

export type ConfigShape = ReturnType<typeof config>;
