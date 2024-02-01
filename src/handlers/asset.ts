import { SubstrateExtrinsic } from "@subql/types";
import { Asset } from "../types";

export async function indexAssetCall(
  extrinsic: SubstrateExtrinsic,
  id: string,
  method: string
): Promise<void> {
  const data = extrinsic.extrinsic.method;
  if(method === 'create'){
    const arrayed = JSON.parse(JSON.stringify(data))

    let asset = new Asset(id)
    asset.method = method
    asset.callIndex = arrayed.args.did_call.call.callIndex
    asset.did = arrayed.args.did_call.did
    asset.blockNumber = extrinsic.block.block.header.number.toBigInt()
    asset.submitter = arrayed.args.did_call.submitter
    asset.signature = JSON.stringify(arrayed.args.signature);

    asset.assetType = arrayed.args.did_call.call.args.entry.assetType
    asset.assetDesc = arrayed.args.did_call.call.args.entry.assetDesc
    asset.assetQty = arrayed.args.did_call.call.args.entry.assetQty
    asset.assetValue = arrayed.args.did_call.call.args.entry.assetValue
    asset.assetTag = arrayed.args.did_call.call.args.entry.assetTag
    asset.assetMeta = arrayed.args.did_call.call.args.entry.assetMeta

    asset.digest = arrayed.args.did_call.call.args.digest
    asset.authorization = arrayed.args.did_call.call.args.authorization

    await asset.save()
  }
  if(method === 'issue'){
    const arrayed = JSON.parse(JSON.stringify(data))

    let asset = new Asset(id)
    asset.method = method
    asset.callIndex = arrayed.args.did_call.call.callIndex
    asset.did = arrayed.args.did_call.did
    asset.blockNumber = extrinsic.block.block.header.number.toBigInt()
    asset.submitter = arrayed.args.did_call.submitter
    asset.signature = JSON.stringify(arrayed.args.signature);

    asset.assetId = arrayed.args.did_call.call.args.entry.assetId
    asset.assetOwner = arrayed.args.did_call.call.args.entry.assetOwner
    asset.assetIssuanceQty = arrayed.args.did_call.call.args.entry.assetIssuanceQty

    asset.digest = arrayed.args.did_call.call.args.digest
    asset.authorization = arrayed.args.did_call.call.args.authorization

    await asset.save()
  }
  if(method == 'transfer'){
    const arrayed = JSON.parse(JSON.stringify(data))

    let asset = new Asset(id)
    asset.method = method
    asset.callIndex = arrayed.args.did_call.call.callIndex
    asset.did = arrayed.args.did_call.did
    asset.blockNumber = extrinsic.block.block.header.number.toBigInt()
    asset.submitter = arrayed.args.did_call.submitter
    asset.signature = JSON.stringify(arrayed.args.signature);

    asset.assetId = arrayed.args.did_call.call.args.entry.assetId
    asset.assetInstanceId = arrayed.args.did_call.call.args.entry.assetInstanceId
    asset.assetOwner = arrayed.args.did_call.call.args.entry.assetOwner
    asset.newAssetOwner =  arrayed.args.did_call.call.args.entry.newAssetOwner


    asset.digest = arrayed.args.did_call.call.args.digest
    await asset.save()
  }
}
