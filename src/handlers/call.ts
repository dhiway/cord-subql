import type { Vec } from '@polkadot/types'
import { Call, Extrinsic } from '../types'
import { AnyCall, DispatchedCallData } from './types'

import { SubstrateExtrinsic } from "@subql/types";
import { Dispatcher, getBatchInterruptedIndex, getKVData } from './utils';
import { createScore } from './score';

async function traverExtrinsic(extrinsic: Extrinsic, raw: SubstrateExtrinsic): Promise<Call[]> {
  const list: any[] = []
  const batchInterruptedIndex = getBatchInterruptedIndex(raw)

  const inner = async (
    data: AnyCall,
    parentCallId: string,
    idx: number,
    isRoot: boolean,
    depth: number
  ) => {
    const id = isRoot ? parentCallId : `${parentCallId}-${idx}`
    const method = data.method
    const section = data.section
    const args = data.args

    if (method === 'submitDidCall' && section === 'did') {
	/* there will be one call below */
	 const temp = (args[0] as any).call as unknown as AnyCall;
	 logger.info(`DidSubmitCall:  ${temp}`);
	 await inner(temp, id, 1, false, depth + 1);
    }
    const call = new Call(id)

    call.method = method
    call.section = section
    call.args = getKVData(data.args, data.argsDef)
    call.signerId = extrinsic.signerId
    call.isSuccess = depth === 0 ? extrinsic.isSuccess : batchInterruptedIndex > idx;
    call.timestamp = extrinsic.timestamp

    if (!isRoot) {
      call.parentCallId = isRoot ? '' : parentCallId

      call.extrinsicId = parentCallId.split('-')[0]
    } else {
      call.extrinsicId = parentCallId
    }

    list.push(call)

    /*
    await dispatcher.dispatch(
      `${call.section}-${call.method}`,
      { call, extrinsic, rawCall: data, rawExtrinsic: raw }
    )
    */
    if (call.section === 'networkScore') {
       logger.info("Scoring call");
       await createScore(raw, id as string);
    }
       
    if (depth < 1 && section === 'utility' && (method === 'batch' || method === 'batchAll')) {
      const temp = args[0] as unknown as Vec<AnyCall>

      await Promise.all(temp.map((item, idx) => inner(item, id, idx, false, depth + 1)))
    } 
  }

  await inner(raw.extrinsic.method, extrinsic.id, 0, true, 0)

  return list
}

export async function createCalls (extrinsic: Extrinsic, raw: SubstrateExtrinsic) {

    const calls = await traverExtrinsic(extrinsic, raw)
    logger.info(`Calls: ${calls}`)
    await Promise.all(calls.map(async (item) => item.save()));
}

export async function ensureCallExist (id: any) {
  let data = await Call.get(id)

  if (!data) {
    data = new Call(id)

    await data.save()
  }

  return data
}
