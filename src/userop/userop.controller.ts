import { Controller } from '@nestjs/common';
import { GrpcMethod } from '@nestjs/microservices';
import { Metadata, ServerUnaryCall } from '@grpc/grpc-js';
import { UseropService } from './userop.service';

export interface TxData {
  to: string;
  args: any[];
  gasLimit: string;
}

@Controller()
export class UseropController {
  constructor(private useropService: UseropService) {}

  @GrpcMethod('UseropService', 'eth_sendUserOperation')
  async findOne(
    data: TxData,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    metadata: Metadata,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    call: ServerUnaryCall<any, any>,
  ): Promise<string> {
    const txHash = await this.useropService.sendUserOp(data);
    return txHash;
  }
}
