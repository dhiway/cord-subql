import { SubstrateEvent, SubstrateExtrinsic } from "@subql/types";
import { ensureCallExist } from "./call";
import { Statement, Call } from "../types";

export async function createStatement(
  extrinsic: SubstrateExtrinsic,
  call: Call,
  id: string,
  method: string
): Promise<void> {
  const data = extrinsic.extrinsic.method;

  if (method === "register") {
    let arrayed = JSON.parse(JSON.stringify(data));
    let statementId = JSON.parse(JSON.stringify(extrinsic.events))[0].event
      .data[0];
    let statement = new Statement(id);
    statement.method = method;
    statement.blockNumber = arrayed.args.did_call.blockNumber;
    statement.submitter = arrayed.args.did_call.submitter;
    statement.signature = arrayed.args.signature.ed25519;
    statement.statement_id = statementId;
    statement.authorization = arrayed.args.did_call.call.args.authorization;
    statement.schema_id = arrayed.args.did_call.call.args.schema_id;
    statement.digest = arrayed.args.did_call.call.args.digest;
    await statement.save();
  }
  if (method === "update") {
    let arrayed = JSON.parse(JSON.stringify(data));
    let statement = new Statement(id);
    statement.method = method;
    statement.blockNumber = arrayed.args.did_call.blockNumber;
    statement.submitter = arrayed.args.did_call.submitter;
    statement.signature = arrayed.args.signature.ed25519;
    statement.statement_id = arrayed.args.did_call.call.args.statement_id;
    statement.digest = arrayed.args.did_call.call.args.digest;
    statement.authorization = arrayed.args.did_call.call.args.authorization;
    await statement.save();
  }
  if (method === "revoke") {
    let arrayed = JSON.parse(JSON.stringify(data));
    let statement = new Statement(id);
    statement.method = method;
    statement.blockNumber = arrayed.args.did_call.blockNumber;
    statement.submitter = arrayed.args.did_call.submitter;
    statement.signature = arrayed.args.signature.ed25519;
    statement.statement_id = arrayed.args.did_call.call.args.statement_id;
    statement.authorization = arrayed.args.did_call.call.args.authorization;
    await statement.save();
  }
  if (method === "restore") {
    let arrayed = JSON.parse(JSON.stringify(data));
    let statement = new Statement(id);
    statement.blockNumber = arrayed.args.did_call.blockNumber;
    statement.submitter = arrayed.args.did_call.submitter;
    statement.signature = arrayed.args.signature.ed25519;
    statement.method = method;
    statement.statement_id = arrayed.args.did_call.call.args.statement_id;
    statement.authorization = arrayed.args.did_call.call.args.authorization;
    await statement.save();
  }
}
