import { SubstrateEvent, SubstrateExtrinsic } from "@subql/types";
import { ensureCallExist } from "./call";
import { Statement , Call} from '../types';
import { Event } from "../types/models";
import * as Cord from '@cord.network/sdk'
interface KeyValue {
    key: string;
    value: string; 
  }

export async function createStatement (extrinsic: SubstrateExtrinsic, call:Call, id: string, method:string): Promise<void> {
       const data = extrinsic.extrinsic.method;

    logger.info(`
    ------------------------------------------------------------------------------------------------
    \nInside createStatement function\n
    ------------------------------------------------------------------------------------------------
    `);
    logger.info(`printing call: ${call}`)

    if(method === 'register'){
        logger.info(`*******************************************\nRegister\n`)
        let statement = new Statement(id)

        let stringyfy = JSON.stringify(call.args)
        const keyValueArray: KeyValue[] = JSON.parse(stringyfy);
        const allValues: string[] = keyValueArray.map(item => item.value);
        logger.info(`DecoderUtils.hexToString(allValues[0]):\n${Cord.Utils.DecoderUtils.hexToString(allValues[0])}`)
        logger.info(`allValues[0]:\n${allValues[0]}`)
        statement.digest = Cord.Utils.DecoderUtils.hexToString(allValues[0])
        statement.authorization = Cord.Utils.DecoderUtils.hexToString(allValues[1])
        statement.schema_id = Cord.Utils.DecoderUtils.hexToString(allValues[2])
        await statement.save()
    }
    if(method === 'update'){
        let stringyfy = JSON.stringify(call.args)
        // logger.info(`stringyfy: stringyfy: stringyfy: stringyfy: \n${stringyfy}`)
        const keyValueArray: KeyValue[] = JSON.parse(stringyfy);
        const allValues: string[] = keyValueArray.map(item => item.value);

        // logger.info(`allValues: allValues: allValues: allValues: allValues:\n${allValues}`)
        let statement = new Statement(id)
        statement.method = method
        
        statement.statement_id =  Cord.Utils.DecoderUtils.hexToString(allValues[0])
        statement.digest = Cord.Utils.DecoderUtils.hexToString(allValues[1])
        statement.authorization = Cord.Utils.DecoderUtils.hexToString(allValues[2])
        await statement.save()
    }
    if(method === 'revoke'){
        let stringyfy = JSON.stringify(call.args)

        const keyValueArray: KeyValue[] = JSON.parse(stringyfy);
        const allValues: string[] = keyValueArray.map(item => item.value);


        let statement = new Statement(id)
        statement.method = method
        statement.statement_id =  Cord.Utils.DecoderUtils.hexToString(allValues[0])
        statement.authorization = Cord.Utils.DecoderUtils.hexToString(allValues[1])
        await statement.save()
    }
    if(method === 'restore'){
        let statement = new Statement(id)

        let stringyfy = JSON.stringify(call.args)

        const keyValueArray: KeyValue[] = JSON.parse(stringyfy);
        const allValues: string[] = keyValueArray.map(item => item.value);

        statement.method = method
        statement.statement_id =  Cord.Utils.DecoderUtils.hexToString(allValues[0])
        statement.authorization = Cord.Utils.DecoderUtils.hexToString(allValues[1])
        await statement.save()
    }

    logger.info(`
    ------------------------------------------------------------------------------------------------
    \End of createStatement function\n
    ------------------------------------------------------------------------------------------------
    `);
}


























// export async function createStatement (extrinsic: SubstrateExtrinsic, call:Call, id: string, method:string): Promise<void> {
//     const data = extrinsic.extrinsic.method;
    
 
//  // const args = data.args
//  logger.info(`\n\n
//  ------------------------------------------------------------------------------------------------
//  \nInside createStatement function\n
//  ------------------------------------------------------------------------------------------------
//  `);
//  // logger.info(`Printing "call":\ncall.args: ${call.args}\ncall.extrinsicId: ${call.extrinsicId}\ncall.section: ${call.section}\ncall.signerId: ${call.signerId}\ncall.method: ${call.method}\ncall._name: ${call._name}`)



//  const statement = new Statement(id)
//  logger.info(`Priting the method:\n${method}`)


//  if(method === 'register'){
//      // logger.info(`inside the "if register" method\n`)
//  //     // statement.did = (data.args[0] as any).did
//  //     // statement.txCounter = (data.args[0] as any).txCounter
//      // statement.callIndex = call.callIndex
//      // let stmtId:string = (extrinsic.events[0] as any).event.data[0]

//      // logger.info(`stmtId: ${stmtId}`)
//      statement.method = method
//      statement.digest = (call.args as any).digest
//      statement.authorization = (call.args as any).authorization
//      statement.schema_id = (call.args as any).schema_id

//  //     // statement.blockNumber = (data.args[0] as any).blockNumber
//  //     // statement.submitter = (data.args[0] as any).submitter

//  }
//  // if(method === 'update'){

//  // }
//  // if(method === 'revoke'){

//  // }
//  // if(method === 'restore'){

//  // }
 







//  logger.info(`Statement identifier: ${extrinsic.events[0].event.data[0]}`);
//  // logger.info("test",data?.args[0])
//  logger.info(`Statement Data: \n\n
//  data.args[0]:\n\n ${(data.args[0])}\n\n
//  data.args[1]:\n\n ${data.args[1]}\n\n
//  \n\n\n\n\n
//  destracturing args\n\n
//  ${(data.args[0] as any).did}
//  ${(data.args[0] as any).txCounter}
//  ${(data.args[0] as any).call.args}
//  `);

//  // const statement = new Statement(id)
//  // statement.did = (data.args[0] as any).did
//  // statement.txCounter 
//  // statement.callIndex
//  // statement.digest
//  // statement.authorization
//  // statement.schema_id
//  // statement.statement_id
//  // statement.blockNumber
//  // statement.submitter


// /*
//  score.entityId = args[0]
//  score.providerId = args[1]
//  score.totalCount = args[2]
//  score.totalRating = args[3]
//  score.entityType = args[4];
//  score.ratingType = args[5];
// */
//  // score.callId = call.id
//  await statement.save()
 
// }














