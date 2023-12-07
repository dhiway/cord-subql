import { SubstrateExtrinsic } from "@subql/types";

import { ensureCallExist } from "./call";
import { Rating } from '../types';

export async function createScore (extrinsic: SubstrateExtrinsic): Promise<void> {
    const args = extrinsic.args
    console.log("Extrinsic", extrinsic);
/*
    await ensureCallExist(call.id)

    //const extrinsicHash = extrinsic.id
    const score = new Score(call.id)

    score.entityId = args[0]
    score.providerId = args[1]
    score.totalCount = args[2]
    score.totalRating = args[3]
    score.callId = call.id
    await score.save()
*/
}