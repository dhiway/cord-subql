import { SubstrateEvent } from "@subql/types";
import { Dispatcher } from "./utils/dispatcher";
import { ensureBlock } from "./block";
import { Event } from "../types/models";
import { getKVData } from "./utils";
import { ensureExtrinsic } from "./extrinsic";
import { DispatchedEventData } from "./types";

const dispatch = new Dispatcher<DispatchedEventData>();

dispatch.batchRegist([
  //registry
  //{ key: 'schema-Create', handler: handleRegistryCreate },
  //schema
  //{ key: 'schema-Anchor', handler: handleSchemaAnchor },
  //stream
  //{ key: 'stream-Anchor', handler: handleStreamAnchor },
  //{ key: 'stream-Update', handler: handleStreamUpdate },
  //{ key: 'stream-Revoke', handler: handleStreamRevoke },
]);

export async function ensureEvent(event: SubstrateEvent) {
  const block = await ensureBlock(event.block);
  if (!block) {
    return null;
  }
  const idx = event.idx;
  const recordId = `${block.number}-${idx}`;

  let data = await Event.get(recordId);

  if (!data) {
    data = new Event(recordId);
    data.index = idx;
    data.blockId = block.id;
    data.blockNumber = block.number;
    data.timestamp = block.timestamp;
  }

  return data;
}

export async function createEvent(event: SubstrateEvent) {
  const data = await ensureEvent(event);
  if (!data) return;
  const section = event.event.section;
  const method = event.event.method;
  const eventData = getKVData(event.event.data);

  if (section === "system" && method === "ExtrinsicSuccess") return;

  data.section = section;
  data.method = method;
  data.data = eventData;

  const extrinsic = await (event.extrinsic
    ? ensureExtrinsic(event.extrinsic)
    : undefined);

  if (extrinsic) {
    data.extrinsicId = extrinsic.id;
  }

  // TODO: once we have separate handling of different events based on section and method, uncomment below
  await dispatch.dispatch(`${section}-${data.method}`, {
    event: data,
    rawEvent: event,
  });

  await data.save();

  return data;
}
