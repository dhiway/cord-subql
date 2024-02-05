import { SubstrateExtrinsic } from "@subql/types";
import { Did, DidSubmitCall } from "../types";

export async function indexDidCall(
  extrinsic: SubstrateExtrinsic,
  id: string,
  method: string
): Promise<void> {
  const data = extrinsic.extrinsic.method;

  if (method === "create") {
    let arrayed = JSON.parse(JSON.stringify(data));
    let serviceDetailsFromChain = arrayed.args.details.newServiceDetails;
    let serviceDetails: string[] = [];

    await serviceDetailsFromChain.forEach((item: any) => {
      let serviceDetail = {
        id: item.id,
        serviceTypes: item.serviceTypes,
        urls: item.urls,
      };

      serviceDetails.push(JSON.stringify(serviceDetail));
    });

    let did = new Did(id);
    did.method = method;
    did.blockNumber = extrinsic.block.block.header.number.toBigInt();
    did.identifier = arrayed.args.details.did;
    did.submitter = arrayed.args.details.submitter;
    did.signature = JSON.stringify(arrayed.args.signature);

    did.keyAgreementKeys = JSON.stringify(
      arrayed.args.details.newKeyAgreementKeys
    );
    did.assertionKey = JSON.stringify(arrayed.args.details.newAssertionKey);
    did.delegationKey = JSON.stringify(arrayed.args.details.newDelegationKey);
    did.serviceDetails = serviceDetails;
    await did.save();
  }
  if (method === "update") {
    // ToDo:
    // Develop a demo script within the GitHub repository at github.com/dhiway/cord.js which
    // calls this method. Execute the script to capture the extrinsic information, analyze the obtained data,
    // and complete the implementation.
  }
  if (method === "delete") {
    // ToDo:
    // Develop a demo script within the GitHub repository at github.com/dhiway/cord.js which
    // calls this method. Execute the script to capture the extrinsic information, analyze the obtained data,
    // and complete the implementation.
  }
  if (method === "submitDidCall") {
    let arrayed = JSON.parse(JSON.stringify(data));
    let didSubmitCall = new DidSubmitCall(id);
    didSubmitCall.blockNumber = extrinsic.block.block.header.number.toBigInt();
    didSubmitCall.didUri = arrayed.args.did_call.did;
    didSubmitCall.callIndex = arrayed.args.did_call.call.callIndex;
    didSubmitCall.txCounter = arrayed.args.did_call.txCounter;
    didSubmitCall.submitter = arrayed.args.did_call.submitter;
    didSubmitCall.signature = JSON.stringify(arrayed.args.signature);
    await didSubmitCall.save();
  }
}
