import { SubstrateExtrinsic } from "@subql/types";
import { NetworkMembership, Call } from "../types";

export async function createNetworkMembership(
  extrinsic: SubstrateExtrinsic,
  call: Call,
  id: string,
  method: string
): Promise<void> {
  const data = extrinsic.extrinsic.method;

  const arrayed = JSON.parse(JSON.stringify(data));

  let networkMembershipId = JSON.parse(JSON.stringify(extrinsic.events))[0]
    .event.data[0];

  let networkMembership = new NetworkMembership(id);

  networkMembership.method = method;
  networkMembership.callIndex = arrayed.args.call.callIndex;
  networkMembership.networkmembership_Id = networkMembershipId;
  networkMembership.blockNumber =
    extrinsic.block.block.header.number.toBigInt();

  if (method === "nominate") {
    networkMembership.member = arrayed.args.call.args.member;
  }

  if (method === "renew") {
    // ToDo:
    // Develop a demo script within the GitHub repository at github.com/dhiway/cord.js which
    // calls this method. Execute the script to capture the extrinsic information, analyze the obtained data,
    // and complete the implementation.
  }

  if (method === "revoke") {
    // ToDo:
    // Develop a demo script within the GitHub repository at github.com/dhiway/cord.js which
    // calls this method. Execute the script to capture the extrinsic information, analyze the obtained data,
    // and complete the implementation.
  }

  await networkMembership.save();
}
