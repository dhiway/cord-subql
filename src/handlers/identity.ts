import { SubstrateExtrinsic } from "@subql/types";
import { SetIdentity, ProvidedJudgement, JudgementRequest } from "../types";

export async function indexIdentityCall(
  extrinsic: SubstrateExtrinsic,
  id: string,
  method: string
): Promise<void> {
  const data = extrinsic.extrinsic.method;

  const arrayed = JSON.parse(JSON.stringify(data));

  if (method === "setIdentity") {
    let identity = new SetIdentity(id);
    identity.method = method;
    identity.callIndex = arrayed.callIndex;
    identity.blockNumber = extrinsic.block.block.header.number.toBigInt();

    identity.display = arrayed.args.info.display.raw;
    identity.legal = arrayed.args.info.legal.raw;
    identity.web = arrayed.args.info.web.raw;
    identity.email = arrayed.args.info.email.raw;
    identity.additional = JSON.stringify(arrayed.args.info.additional);

    await identity.save();
  }
  if (method === "requestJudgement") {
    let judgementRequest = new JudgementRequest(id);
    judgementRequest.method = method;
    judgementRequest.callIndex = arrayed.callIndex;
    judgementRequest.blockNumber =
      extrinsic.block.block.header.number.toBigInt();
    judgementRequest.registrar = arrayed.args.registrar;

    await judgementRequest.save();
  }
  if (method === "provideJudgement") {
    let providedJudgement = new ProvidedJudgement(id);
    providedJudgement.method = method;
    providedJudgement.callIndex = arrayed.callIndex;
    providedJudgement.blockNumber =
      extrinsic.block.block.header.number.toBigInt();

    providedJudgement.callIndex = arrayed.callIndex;
    providedJudgement.targetId = arrayed.args.target.id;
    providedJudgement.judgement = arrayed.args.judgement;
    providedJudgement.digest = arrayed.args.digest;

    await providedJudgement.save();
  }

  if (method === "identityCleared") {
    // ToDo:
    // Develop a demo script within the GitHub repository at github.com/dhiway/cord.js which
    // calls this method. Execute the script to capture the extrinsic information, analyze the obtained data,
    // and complete the implementation.
  }
  if (method === "identityKilled") {
    /* ToDo:
       Develop a demo script within the GitHub repository at github.com/dhiway/cord.js which
       calls this method. Execute the script to capture the extrinsic information, analyze the obtained data,
       and complete the implementation.
    */
  }
  if (method === "judgementUnrequested") {
    /* ToDo:
       Develop a demo script within the GitHub repository at github.com/dhiway/cord.js which
       calls this method. Execute the script to capture the extrinsic information, analyze the obtained data,
       and complete the implementation.
    */
  }
  if (method === "registrarAdded") {
    /* ToDo:
       Develop a demo script within the GitHub repository at github.com/dhiway/cord.js which
       calls this method. Execute the script to capture the extrinsic information, analyze the obtained data,
       and complete the implementation.
    */
  }
  if (method === "registrarRemoved") {
    /* ToDo:
       Develop a demo script within the GitHub repository at github.com/dhiway/cord.js which
       calls this method. Execute the script to capture the extrinsic information, analyze the obtained data,
       and complete the implementation.
    */
  }
}
