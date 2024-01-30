import { SubstrateExtrinsic } from "@subql/types";
import { ChainSpace, Call } from "../types";

export async function createChainSpace(
  extrinsic: SubstrateExtrinsic,
  call: Call,
  id: string,
  method: string
): Promise<void> {
  const data = extrinsic.extrinsic.method;

  // logger.info("\n\n ChainSpace");
  // logger.info("\n Data Event:");
  // logger.info(extrinsic.events.toString());
  // logger.info("\n\n ChainSpace ENDED");

  let arrayed = JSON.parse(JSON.stringify(data));
  // logger.info(
  //   `\n\n\n\n ChainSpace Method: ${method} \n ${JSON.stringify(arrayed)}`
  // );
  let chainSpaceId = JSON.parse(JSON.stringify(extrinsic.events))[0].event
    .data[0];
  let chainspace = new ChainSpace(id);

  if (method === "create") {
    chainspace.method = method;
    chainspace.blockNumber = arrayed.args.did_call.blockNumber;
    chainspace.submitter = arrayed.args.did_call.submitter;
    chainspace.signature = arrayed.args.signature.ed25519;
    chainspace.chainspace_id = chainSpaceId;
    chainspace.space_id = arrayed.args.did_call.call.args.space_code;
  } else {
    chainspace.method = method;
    chainspace.blockNumber = arrayed.args.did_call.blockNumber;
    chainspace.submitter = arrayed.args.did_call.submitter;
    chainspace.signature = arrayed.args.signature.ed25519;
    chainspace.chainspace_id = chainSpaceId;
    chainspace.authorization = arrayed.args.did_call.call.args.authorization;
    chainspace.space_id = arrayed.args.did_call.call.args.space_id;
    chainspace.delegate = arrayed.args.did_call.call.args.delegate;
  }

  await chainspace.save();
}
