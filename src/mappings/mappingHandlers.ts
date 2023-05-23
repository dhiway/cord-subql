import {
  SubstrateExtrinsic,
  SubstrateEvent,
  SubstrateBlock,
} from "@subql/types";
import { createEvent, createExtrinsic, createBlock } from '../handlers';

export async function handleBlock(block: SubstrateBlock): Promise<void> {
    console.debug("here in block", block);
    await createBlock(block);
}

export async function handleEvent(event: SubstrateEvent): Promise<void> {
    console.debug("here in event", event);
    await createEvent(event)
}

export async function handleCall(extrinsic: SubstrateExtrinsic): Promise<void> {
    console.debug("here in call", extrinsic);
    await createExtrinsic(extrinsic)
}

