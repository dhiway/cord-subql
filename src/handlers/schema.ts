import { SubstrateExtrinsic } from "@subql/types";
import { Schema, Call } from "../types";

export async function createSchema(
  extrinsic: SubstrateExtrinsic,
  call: Call,
  id: string,
  method: string
): Promise<void> {
  const data = extrinsic.extrinsic.method;

  let arrayed = JSON.parse(JSON.stringify(data));
  let schemaId = JSON.parse(JSON.stringify(extrinsic.events))[0].event.data[0];
  let schema = new Schema(id);

  schema.method = method;
  schema.callIndex = arrayed.args.did_call.call.callIndex;
  schema.schema_id = schemaId;
  schema.blockNumber = extrinsic.block.block.header.number.toBigInt();
  schema.signature = JSON.stringify(arrayed.args.signature);

  logger.info(
    `\n ARRAYED: \n ${JSON.stringify(arrayed)} \n\n Method: ${method}`
  );

  if (method === "create") {
    schema.submitter = arrayed.args.did_call.submitter;
    schema.authorization = arrayed.args.did_call.call.args.authorization;
  }

  if (method === "isValid") {
    // ToDo:
    // Develop a demo script within the GitHub repository at github.com/dhiway/cord.js which
    // calls this method. Execute the script to capture the extrinsic information, analyze the obtained data,
    // and complete the implementation.
  }

  if (method === "updateActivity") {
    // ToDo:
    // Develop a demo script within the GitHub repository at github.com/dhiway/cord.js which
    // calls this method. Execute the script to capture the extrinsic information, analyze the obtained data,
    // and complete the implementation.
  }

  if (method === "timepoint") {
    // ToDo:
    // Develop a demo script within the GitHub repository at github.com/dhiway/cord.js which
    // calls this method. Execute the script to capture the extrinsic information, analyze the obtained data,
    // and complete the implementation.
  }

  await schema.save();
}
