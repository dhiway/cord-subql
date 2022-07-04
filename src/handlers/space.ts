import { ensureAccount } from "./account"
import { ensureCallExist } from "./call"
import { Space } from "../types"
import { DispatchedCallData, EventHandler } from "./types"

export const handleSpaceCreate: EventHandler = async ({ event, rawEvent }) => {
    const [space_hash, identifier, creator] = rawEvent.event.data as unknown as [any, any, any]; //fix the types properly later

    await ensureAccount(creator.toString())

    const space = new Space(identifier);

    space.hash = space_hash.toString()
    space.timestamp = rawEvent.block.timestamp
    space.creator = creator.toString()
    space.archived = false

    await space.save()
}



