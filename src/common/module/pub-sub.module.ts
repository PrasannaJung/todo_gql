import { Module, Global } from '@nestjs/common';
import { PubSub } from 'graphql-subscriptions'; // For in-memory

export const PUB_SUB = 'PUB_SUB';

@Module({
  providers: [
    {
      provide: PUB_SUB,
      useValue: new PubSub(),
    },
  ],
  exports: [PUB_SUB],
})
export class PubSubModule {}
