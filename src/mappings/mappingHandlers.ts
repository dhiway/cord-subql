import { SubstrateBlock, SubstrateExtrinsic, SubstrateEvent } from '@subql/types'
import { createEvent, createExtrinsic, createBlock } from '../handlers';

export async function handleBlock(block: SubstrateBlock): Promise<void> {
    console.log("here in block", block);
    await createBlock(block);
}

export async function handleEvent(event: SubstrateEvent): Promise<void> {
    console.log("here in event", event);
    await createEvent(event)
}

export async function handleCall(extrinsic: SubstrateExtrinsic): Promise<void> {
    console.log("here in call", extrinsic);
    await createExtrinsic(extrinsic)
}
