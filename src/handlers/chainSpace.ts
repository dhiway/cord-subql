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
  if (arrayed.args.did_call.blockNumber) {
    chainspace.blockNumber = arrayed.args.did_call.blockNumber;
  }
  if (arrayed.args.signature.ed25519) {
    chainspace.signature = arrayed.args.signature.ed25519;
  }
  if (chainSpaceId) {
    chainspace.chainspace_id = chainSpaceId;
  }
  if (arrayed.args.did_call.call.args.authorization) {
    chainspace.authorization = arrayed.args.did_call.call.args.authorization;
  }
  if (arrayed.args.did_call.call.args.space_id || chainSpaceId) {
    chainspace.space_id =
      arrayed.args.did_call.call.args.space_id || chainSpaceId;
  }
  if (arrayed.args.did_call.call.args.delegate) {
    chainspace.delegate = arrayed.args.did_call.call.args.delegate;
  }

  await chainspace.save();
}
