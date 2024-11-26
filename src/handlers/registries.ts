import { SubstrateExtrinsic } from "@subql/types";
import { Registry } from "../types";

export async function handleRegistry(
    extrinsic: SubstrateExtrinsic,
    id: string,
    method: string
  ): Promise<void> {
    const data = extrinsic.extrinsic.method;

    if (method === "register") {
        let arrayed = JSON.parse(JSON.stringify(data));
        let registry = new Registry(id);
        registry.method = method;
        registry.blockNumber = extrinsic.block.block.header.number.toBigInt();
        registry.registry_id = JSON.parse(JSON.stringify(extrinsic.events))[0].event
        .data[0];
        registry.submitter = JSON.parse(JSON.stringify(extrinsic.events))[0].event
        .data[1];
        registry.schema_id = arrayed.args.schema_id
        registry.digest = arrayed.args.digest
        registry.blob =  arrayed.args.blob
        registry.authorization = JSON.parse(JSON.stringify(extrinsic.events))[0].event
        .data[2];
        await registry.save();
      }
    
    if(method === "update"){
        let arrayed = JSON.parse(JSON.stringify(data));
        let registry = new Registry(id);
        registry.method = method;
        registry.blockNumber = extrinsic.block.block.header.number.toBigInt();

        registry.registry_id = arrayed.args.registry_id
        registry.digest = arrayed.args.digest
        registry.blob =  arrayed.args.blob
        registry.authorization = arrayed.args.authorization
        registry.submitter = JSON.parse(JSON.stringify(extrinsic.events))[0].event
        .data[1];

        await registry.save();
    }

    if(method === "revoke") {
        let arrayed = JSON.parse(JSON.stringify(data));
        let registry = new Registry(id);
        registry.method = method;
        registry.blockNumber = extrinsic.block.block.header.number.toBigInt();

        registry.registry_id = arrayed.args.registry_id
        registry.authorization = arrayed.args.authorization
        registry.state = "Revoked"
        registry.submitter = JSON.parse(JSON.stringify(extrinsic.events))[0].event
        .data[1];

        await registry.save();
    }

    if(method === "reinstate") {
        let arrayed = JSON.parse(JSON.stringify(data));
        let registry = new Registry(id);
        registry.method = method;
        registry.blockNumber = extrinsic.block.block.header.number.toBigInt();

        registry.registry_id = arrayed.args.registry_id
        registry.authorization = arrayed.args.authorization
        registry.state = "Reinstated"
        registry.submitter = JSON.parse(JSON.stringify(extrinsic.events))[0].event
        .data[1];

        await registry.save();
    }

    if(method === "archive") {
        let arrayed = JSON.parse(JSON.stringify(data));
        let registry = new Registry(id);
        registry.method = method;
        registry.blockNumber = extrinsic.block.block.header.number.toBigInt();

        registry.registry_id = arrayed.args.registry_id
        registry.authorization = arrayed.args.authorization
        registry.state = "Archived"
        registry.submitter = JSON.parse(JSON.stringify(extrinsic.events))[0].event
        .data[1];

        await registry.save();
    }

    if(method === "restore") {
        let arrayed = JSON.parse(JSON.stringify(data));
        let registry = new Registry(id);
        registry.method = method;
        registry.blockNumber = extrinsic.block.block.header.number.toBigInt();

        registry.registry_id = arrayed.args.registry_id
        registry.authorization = arrayed.args.authorization
        registry.state = "Restored"
        registry.submitter = JSON.parse(JSON.stringify(extrinsic.events))[0].event
        .data[1];

        await registry.save();
    }
}
