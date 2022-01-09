import { ensureAccount } from "./account"
import { ensureCallExist } from "./call"
import { DispatchedCallData } from "./types"
import { KVData, Product, Order, Listing, Rating, Return, Buyer, Store } from "../types"


export async function createProduct ({ call, extrinsic, rawCall }: DispatchedCallData) {
    const args = rawCall.args
    logger.info("Args: ", call.args[0], rawCall.args[0], extrinsic.args[0], args)

    await ensureCallExist(call.id)

    const prodId = (args[0] as any).toString()
    const creator = (args[1] as any).toString()
    const txHash = (args[2] as any).toString()

    if (!prodId || !creator)
       return;

    let account = await ensureAccount(creator);
    const product = new Product(prodId)
    product.tx_hash = txHash;
    product.creatorId = account.id
    await product.save()
}

export async function createListing ({ call, extrinsic, rawCall }: DispatchedCallData) {
    const args = rawCall.args

    await ensureCallExist(call.id)

    const prodId = (args[7] as any).toString()
    const creator = (args[1] as any).toString()
    const txHash = (args[2] as any).toString()
    const listId = (args[0] as any).toString()
    const storeId = (args[3] as any).toString()
    const price = Number(args[4] as any)
    let price = Number(args[4].value)

    if (!listId || !prodId || !storeId || !creator)
       return;

    const product = await Product.get(prodId)
    if (!product) {
        logger.info(`${prodId}`)
	//return;
    }
    let store = await Store.get(storeId)
    if (!store) {
	store = new Store(storeId)
	store.save()
    }
    let account = await ensureAccount(creator);

    const listing = new Listing(listId)
    listing.creatorId = account.id
    listing.productId = product.id
    listing.storeId = store.id
    listing.price = price
    listing.tx_hash = txHash
    listing.status = "Active"
    await listing.save()
}

export async function orderProduct ({ call, extrinsic, rawCall }: DispatchedCallData) {
    const args = call.args

    await ensureCallExist(call.id)


    /* TODO: check what is 'txHash' in order tx */
    
    let orderId = args[0].value
    let txHash = args[2].value
    const buyerId = args[1].value
    const storeId = args[4].value
    if (!orderId || !txHash || !buyerId || !storeId)
       return;
    
    const product = await Product.get(txHash)
    if (!product)
	return;

    let buyer = await Buyer.get(buyerId)
    if (!buyer) {
	buyer = new Buyer(buyerId)
	buyer.save()
    }
    let store = await Store.get(buyerId)
    if (!store) {
        return
    }

    buyer.score += 1; /* every return is -2, and every order is +1 */
    buyer.save();

    const order = new Order(orderId)
    order.buyerId = buyer.id;
    order.productId = product.id
    order.storeId = store.id
    await order.save()
}

export async function returnProduct ({ call, extrinsic, rawCall }: DispatchedCallData) {
    const args = call.args

    await ensureCallExist(call.id)

    const buyerId = args[1].value
    let orderId = args[0].value
    if (!orderId || buyerId)
	return
    const order = await Order.get(orderId)
    if (!order)
	return;

    const buyer = await Buyer.get(buyerId)
    if (!buyer) {
	return;
    }

    buyer.score -= 2; /* every return is -2, and every order is +1 */
    buyer.save();

    const orderReturn = new Return(call.id)
    orderReturn.buyerId = buyer.id;
    orderReturn.productId = order.productId
    orderReturn.storeId = order.storeId;
    await orderReturn.save()
}

export async function giveRating ({ call, extrinsic, rawCall }: DispatchedCallData) {
    const args = call.args

    await ensureCallExist(call.id)

    let ratingId = args[0].value
    let orderId = args[7].value
    const buyerId = args[1].value

    if (!orderId || !ratingId || !buyerId)
	return

    const order = await Order.get(orderId)
    if (!order) {
        logger.info("No order found");
	//return;
    }

    const buyer = await Buyer.get(buyerId)
    if (!buyer) {
        logger.info("No buyer found");
	//return;
    }
    const givenRating  = parseInt(args[8].value, 10)

    buyer.score += 1;
    buyer.save()

    
    const rating = new Rating(ratingId);
    rating.buyerId = buyer.id;
    rating.rating = givenRating;
    rating.productId = order.productId
    rating.storeId = order.storeId;
    await rating.save()
}

export async function updateStatus ({ call, extrinsic, rawCall }: DispatchedCallData) {
    const args = call.args

    await ensureCallExist(call.id)

    let listId = args[0].value
    if (!listId)
	return;
    
    const listing = await Listing.get(listId)
    if (!listing) {
	return;
    }
    let newStatus = args[2].value
    listing.status = newStatus;
    await listing.save()
}
