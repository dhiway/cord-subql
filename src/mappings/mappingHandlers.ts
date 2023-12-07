import {
  SubstrateExtrinsic,
  SubstrateEvent,
  SubstrateBlock,
} from "@subql/types";
import { Account } from "../types";
import { Balance } from "@polkadot/types/interfaces";
import { decodeAddress } from "@polkadot/util-crypto";

import { createExtrinsic } from '../handlers/extrinsic';
import { createEvent } from '../handlers/event';

export async function handleBlock(block: SubstrateBlock): Promise<void> {
  // Do something with each block handler here
  /* most of the blocks would be blank with timestamp only, so ignore for now */
}

export async function handleCall(extrinsic: SubstrateExtrinsic): Promise<void> {
  // Do something with a call handler here
  /* Store every extrinsic other than timestamp */
  createExtrinsic(extrinsic);
}

export async function handleEvent(event: SubstrateEvent): Promise<void> {
  createEvent(event);
}


