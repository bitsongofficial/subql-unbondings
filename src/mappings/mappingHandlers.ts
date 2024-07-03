import { UnbondingEvent } from "../types";
import { CosmosEvent, } from "@subql/types-cosmos";

export async function handleEvent(event: CosmosEvent): Promise<void> {
  const eventRecord = UnbondingEvent.create({
    id: `${event.tx.hash}-${event.msg.idx}-${event.idx}`,
    blockHeight: BigInt(event.block.block.header.height),
    txHash: event.tx.hash,
    sender: event.msg.msg.decodedMsg.delegatorAddress,
    validator: event.msg.msg.decodedMsg.validatorAddress,
    amount: event.msg.msg.decodedMsg.amount.amount,
    createdAt: event.block.block.header.time,
    completedAt: new Date(event.event.attributes.find((attr) => attr.key === "completion_time")?.value || 0),
  });

  await eventRecord.save();
}