import { SubstrateExtrinsic } from "@subql/types";
import { ChainSpace, Call } from "../types";

export async function createChainSpace(
  extrinsic: SubstrateExtrinsic,
  call: Call,
  id: string,
  method: string
): Promise<void> {
  const data = extrinsic.extrinsic.method;

  let arrayed = JSON.parse(JSON.stringify(data));
  let chainSpaceId = JSON.parse(JSON.stringify(extrinsic.events))[0].event
    .data[0];
  let chainspace = new ChainSpace(id);

  chainspace.method = method;
  chainspace.callIndex = arrayed.args.did_call.call.callIndex;
  chainspace.chainspace_id = chainSpaceId;
  chainspace.blockNumber = extrinsic.block.block.header.number.toBigInt();
  chainspace.signature = JSON.stringify(arrayed.args.signature);

  if (method === "create") {
    chainspace.space_code = arrayed.args.did_call.call.args.space_code;
  }

  if (method === "addDelegate") {
    chainspace.space_id = arrayed.args.did_call.call.args.space_id;
    chainspace.delegate = arrayed.args.did_call.call.args.delegate;
    chainspace.authorization = arrayed.args.did_call.call.args.authorization;
    chainspace.submitter = arrayed.args.did_call.submitter;
  }

  if (method === "approve") {
    // ToDo:
    // Develop a demo script within the GitHub repository at github.com/dhiway/cord.js which
    // calls this method. Execute the script to capture the extrinsic information, analyze the obtained data,
    // and complete the implementation.
  }

  if (method === "archive") {
    // ToDo:
    // Develop a demo script within the GitHub repository at github.com/dhiway/cord.js which
    // calls this method. Execute the script to capture the extrinsic information, analyze the obtained data,
    // and complete the implementation.
  }

  if (method === "restore") {
    // ToDo:
    // Develop a demo script within the GitHub repository at github.com/dhiway/cord.js which
    // calls this method. Execute the script to capture the extrinsic information, analyze the obtained data,
    // and complete the implementation.
  }

  if (method === "addAdminDelegate") {
    // ToDo:
    // Develop a demo script within the GitHub repository at github.com/dhiway/cord.js which
    // calls this method. Execute the script to capture the extrinsic information, analyze the obtained data,
    // and complete the implementation.
  }

  if (method === "addAuditDelegate") {
    // ToDo:
    // Develop a demo script within the GitHub repository at github.com/dhiway/cord.js which
    // calls this method. Execute the script to capture the extrinsic information, analyze the obtained data,
    // and complete the implementation.
  }

  if (method === "removeDelegate") {
    // ToDo:
    // Develop a demo script within the GitHub repository at github.com/dhiway/cord.js which
    // calls this method. Execute the script to capture the extrinsic information, analyze the obtained data,
    // and complete the implementation.
  }
  await chainspace.save();
}
