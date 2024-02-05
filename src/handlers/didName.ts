import { SubstrateExtrinsic } from "@subql/types";
import { DidName } from "../types";

export async function handleDidNameCall(
  extrinsic: SubstrateExtrinsic,
  id: string,
  method: string
): Promise<void> {
  const data = extrinsic.extrinsic.method;

  const arrayed = JSON.parse(JSON.stringify(data));

  if (method === "register") {
    let didName = new DidName(id);
    didName.method = method;
    didName.callIndex = arrayed.args.did_call.call.callIndex;
    didName.blockNumber = extrinsic.block.block.header.number.toBigInt();
    didName.submitter = arrayed.args.did_call.submitter;
    didName.signature = JSON.stringify(arrayed.args.signature);
    didName.did = arrayed.args.did_call.did;
    didName.name = arrayed.args.did_call.call.args.name;
    await didName.save();
  }

  if (method === "release") {
    /* ToDo:
       Develop a demo script within the GitHub repository at github.com/dhiway/cord.js which
       calls this method. Execute the script to capture the extrinsic information, analyze the obtained data,
       and complete the implementation.
    */
  }
  if (method === "ban") {
    /* ToDo:
       Develop a demo script within the GitHub repository at github.com/dhiway/cord.js which
       calls this method. Execute the script to capture the extrinsic information, analyze the obtained data,
       and complete the implementation.
    */
  }
  if (method === "unban") {
    /* ToDo:
       Develop a demo script within the GitHub repository at github.com/dhiway/cord.js which
       calls this method. Execute the script to capture the extrinsic information, analyze the obtained data,
       and complete the implementation.
    */
  }
}
