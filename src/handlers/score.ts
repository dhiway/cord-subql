import { SubstrateExtrinsic } from "@subql/types";
import { ensureCallExist } from "./call";
import { Rating } from '../types';

export async function createScore (extrinsic: SubstrateExtrinsic, id: string): Promise<void> {
       const data = extrinsic.extrinsic.method;
    const args = data.args

    logger.info(`Score: ${extrinsic}`);

    logger.info(`Score Data: ${data}`);
    const score = new Rating(id)
/*
    score.entityId = args[0]
    score.providerId = args[1]
    score.totalCount = args[2]
    score.totalRating = args[3]
    score.entityType = args[4];
    score.ratingType = args[5];
*/
    //score.callId = call.id
    await score.save()
    
}