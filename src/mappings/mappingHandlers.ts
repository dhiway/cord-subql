import {
  SubstrateExtrinsic,
  SubstrateEvent,
  SubstrateBlock,
} from "@subql/types";
import { StarterEntity } from "../types";
import { Balance } from "@polkadot/types/interfaces";
import assert from "assert";

const URL = require('url').URL

export async function handleBlock(block: SubstrateBlock): Promise<void> {
  //Create a new starterEntity with ID using block hash
  console.log("Test", block.block);
  /*
  let record = new StarterEntity(
      block.block.header.hash.toString()
  );

  //Record block number
  await record.save();
  */
}

export async function handleEvent(event: SubstrateEvent): Promise<void> {
  console.log("Test Event", event);

/*
  const {
    event: {
      data: [account, balance],
    },
  } = event;
  //Retrieve the record by its ID
  const record = await StarterEntity.get(
    event.block.block.header.hash.toString()
  );
  assert(record, "record does not exist")

  record.account = account.toString();
  //Big integer type Balance of a transfer event
  record.balance = (balance as Balance).toBigInt();
  await record.save();
*/
}

export async function handleCall(extrinsic: SubstrateExtrinsic): Promise<void> {
  console.log("Test Call", extrinsic);
  const record = await StarterEntity.get(
    extrinsic.block.block.header.hash.toString()
  );
  /*
   assert(record, "record does not exist")

  //Date type timestamp
  record.date = extrinsic.block.timestamp;
  //Boolean type
  record.status = true;
  await record.save();
  */
}
