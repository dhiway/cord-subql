import { SubstrateExtrinsic } from "@subql/types";
import { ChainSpace, Call } from "../types";

export async function createNetworkMembership(
  extrinsic: SubstrateExtrinsic,
  call: Call,
  id: string,
  method: string
): Promise<void> {
  const data = extrinsic.extrinsic.method;

  let arrayed = JSON.parse(JSON.stringify(data));
  // let chainSpaceId = JSON.parse(JSON.stringify(extrinsic.events))[0].event
  //   .data[0];

  // logger.info(
  //   `\n\n Network data \n Arrayed: \n ${JSON.stringify(
  //     arrayed.args
  //   )}\n extrinsic \n ${JSON.stringify(
  //     extrinsic.block.events
  //   )} \n\n ${JSON.stringify(extrinsic.events)}`
  // );
  // let networkMembership = new ChainSpace(id);
  //
  // networkMembership.method = method;
  // networkMembership.callIndex = arrayed.args.did_call.call.callIndex;
  // networkMembership.chainspace_id = chainSpaceId;
  // networkMembership.blockNumber =
  //   extrinsic.block.block.header.number.toBigInt();
  // networkMembership.signature = JSON.stringify(arrayed.args.signature);
  //
  // if (method === "create") {
  //   networkMembership.space_code = arrayed.args.did_call.call.args.space_code;
  // }
  //
  // if (method === "addDelegate") {
  //   networkMembership.space_id = arrayed.args.did_call.call.args.space_id;
  //   networkMembership.delegate = arrayed.args.did_call.call.args.delegate;
  //   networkMembership.authorization =
  //     arrayed.args.did_call.call.args.authorization;
  //   networkMembership.submitter = arrayed.args.did_call.submitter;
  // }
  //
  // if (method === "approve") {
  //   // ToDo:
  //   // Develop a demo script within the GitHub repository at github.com/dhiway/cord.js which
  //   // calls this method. Execute the script to capture the extrinsic information, analyze the obtained data,
  //   // and complete the implementation.
  // }

  // await networkMembership.save();
}
