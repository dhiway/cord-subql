import { SubstrateExtrinsic } from "@subql/types";
import { Entries } from "../types";

export async function handleRegistryEntries(
  extrinsic: SubstrateExtrinsic,
  id: string,
  method: string
): Promise<void> {
  const data = extrinsic.extrinsic.method;

  if (method === "create") {
    let arrayed = JSON.parse(JSON.stringify(data));

    let entries = new Entries(id);

    let validJson = JSON.parse(
      JSON.stringify(extrinsic.events).replace(/\},\n\{/g, "},{")
    );
    let value = validJson.find((entry: any) => entry.event.index === "0x3e00")
      ?.event.data[1];

    entries.method = method;
    entries.blockNumber = extrinsic.block.block.header.number.toBigInt();
    entries.registry_id = value;
    entries.registry_entry_id = arrayed.args.registry_entry_id;
    entries.submitter = JSON.parse(
      JSON.stringify(extrinsic.events)
    )[0].event.data[0];
    entries.digest = arrayed.args.digest;
    entries.blob = arrayed.args.blob;
    entries.authorization = arrayed.args.authorization;

    await entries.save();
  }

  if (method === "update") {
    let arrayed = JSON.parse(JSON.stringify(data));
    let entries = new Entries(id)
    entries.method = method;
    entries.blockNumber = extrinsic.block.block.header.number.toBigInt();
    entries.registry_entry_id = JSON.parse(
      JSON.stringify(extrinsic.events)
    )[0].event.data[2];
    entries.submitter = JSON.parse(
      JSON.stringify(extrinsic.events)
    )[0].event.data[0];
    entries.digest = arrayed.args.digest;
    entries.blob = arrayed.args.blob;
    entries.authorization = arrayed.args.authorization;
    await entries.save();
  }

  if (method === "revoke") {
    let arrayed = JSON.parse(JSON.stringify(data));
    let entries = new Entries(id);
    entries.method = method;
    entries.blockNumber = extrinsic.block.block.header.number.toBigInt();

    entries.registry_entry_id = arrayed.args.registry_entry_id;
    entries.authorization = arrayed.args.authorization;
    entries.state = "Revoked";
    entries.submitter = JSON.parse(
      JSON.stringify(extrinsic.events)
    )[0].event.data[0];

    await entries.save();
  }

  if (method === "reinstate") {
    let arrayed = JSON.parse(JSON.stringify(data));
    let entries = new Entries(id);
    entries.method = method;
    entries.blockNumber = extrinsic.block.block.header.number.toBigInt();

    entries.registry_entry_id = arrayed.args.registry_entry_id;
    entries.authorization = arrayed.args.authorization;
    entries.state = "Reinstated";
    entries.submitter = JSON.parse(
      JSON.stringify(extrinsic.events)
    )[0].event.data[0];

    await entries.save();
  }
}
