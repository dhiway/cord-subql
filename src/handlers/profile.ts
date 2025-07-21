import { SubstrateExtrinsic } from "@subql/types";
import { Profile, ProfileKeyRotation, Call } from "../types";

export async function createProfile(
  extrinsic: SubstrateExtrinsic,
  call: Call,
  id: string,
  method: string
): Promise<void> {
  const blockNumber = extrinsic.block.block.header.number.toBigInt();
  const submitter = extrinsic.extrinsic.signer.toString();

  logger.info(`Processing ${method}: submitter=${submitter}, block=${blockNumber}`);

  if (method === "setProfile") {
    const profile = new Profile(id, submitter);
    profile.method = method;
    profile.callIndex = call.id;
    profile.blockNumber = blockNumber;
    profile.submitter = submitter;
    profile.signature = JSON.stringify(extrinsic.extrinsic.signature);
    profile.creatorId = submitter;

    /* For now query from storage for the profile data */
    const profileData = await api.query.profile.profileData.entries(extrinsic.block.block.header.hash);
    const filteredData = profileData
      .filter(([key]) => {
        const keyName = key.args[1].toString();
        const matches = keyName.startsWith("pub_");
        logger.debug(`ProfileData filter: keyId=${key.args[0].toString()}, keyName=${keyName}, matches=${matches}`);
        return matches;
      })
      .map(([key, value]) => ({
        key: key.args[1].toString(),
        value: value.toString(),
        type: "string",
      }));

    logger.info(`Indexing profile.set: submitter=${submitter}, data=${JSON.stringify(filteredData)}`);
    profile.profileData = filteredData;
    await profile.save();
  }

  if (method === "rotateKey") {
    const newKey = extrinsic.extrinsic.args[0]?.toString(); 
    const oldKey = submitter; 
    if (!newKey) {
      logger.error(`Missing newKey for rotateKey at block ${blockNumber}`);
      return;
    }

    const rotation = new ProfileKeyRotation(`${id}-${blockNumber}`, oldKey, newKey);
    rotation.method = method;
    rotation.callIndex = call.id;
    rotation.blockNumber = blockNumber;
    rotation.submitter = submitter;
    rotation.signature = JSON.stringify(extrinsic.extrinsic.signature);
    rotation.oldKeyId = oldKey;
    rotation.newKeyId = newKey;

    logger.info(`Indexing profile.keyRotated: oldKey=${oldKey}, newKey=${newKey}`);
    await rotation.save();
  }
}
