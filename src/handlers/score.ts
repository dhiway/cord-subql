import { SubstrateExtrinsic } from "@subql/types";
import { Rating } from "../types";

export async function createScore(
  extrinsic: SubstrateExtrinsic,
  id: string,
  method: string
): Promise<void> {
  const data = extrinsic.extrinsic.method;

  let arrayed = JSON.parse(JSON.stringify(data));

  if (method === "registerRating") {
    let score = new Rating(id);
    score.method = method;
    score.callIndex = arrayed.args.did_call.call.callIndex;
    score.blockNumber = arrayed.args.blockNumber;
    score.submitter = arrayed.args.submitter;
    score.did = arrayed.args.did_call.did;
    score.signature = JSON.stringify(arrayed.args.signature);
    score.entityId = arrayed.args.did_call.call.args.entry.entityUid;
    score.countOfTxn = arrayed.args.did_call.call.args.entry.countOfTxn;
    score.totalEncodedRating =
      arrayed.args.did_call.call.args.entry.totalEncodedRating;
    score.entityType = arrayed.args.did_call.call.args.entry.entityType;
    score.ratingType = arrayed.args.did_call.call.args.entry.ratingType;
    score.providerDid = arrayed.args.did_call.call.args.entry.providerDid;
    score.digest = arrayed.args.did_call.call.args.digest;
    score.message_id = arrayed.args.did_call.call.args.message_id;
    score.authorization = arrayed.args.did_call.call.args.authorization;
    await score.save();
  }
  if (method === "revokeRating") {
    let score = new Rating(id);
    score.method = method;
    score.callIndex = arrayed.args.did_call.call.callIndex;
    score.blockNumber = arrayed.args.blockNumber;
    score.submitter = arrayed.args.submitter;
    score.did = arrayed.args.did_call.did;
    score.signature = JSON.stringify(arrayed.args.signature);

    score.identifier = arrayed.args.did_call.call.args.entry_identifier;
    score.message_id = arrayed.args.did_call.call.args.message_id;
    score.digest = arrayed.args.did_call.call.args.digest;
    score.authorization = arrayed.args.did_call.call.args.authorization;
    await score.save();
  }
  if (method === "reviseRating") {
    let score = new Rating(id);
    score.method = method;
    score.callIndex = arrayed.args.did_call.call.callIndex;
    score.blockNumber = arrayed.args.blockNumber;
    score.submitter = arrayed.args.submitter;
    score.did = arrayed.args.did_call.did;
    score.signature = JSON.stringify(arrayed.args.signature);

    score.entityId = arrayed.args.did_call.call.args.entry.entityUid;
    score.countOfTxn = arrayed.args.did_call.call.args.entry.countOfTxn;
    score.totalEncodedRating =
      arrayed.args.did_call.call.args.entry.totalEncodedRating;
    score.entityType = arrayed.args.did_call.call.args.entry.entityType;
    score.ratingType = arrayed.args.did_call.call.args.entry.ratingType;
    score.providerDid = arrayed.args.did_call.call.args.entry.providerDid;
    score.identifier = arrayed.args.did_call.call.args.debit_ref_id;
    score.digest = arrayed.args.did_call.call.args.digest;
    score.message_id = arrayed.args.did_call.call.args.message_id;
    score.authorization = arrayed.args.did_call.call.args.authorization;
    await score.save();
  }
}
