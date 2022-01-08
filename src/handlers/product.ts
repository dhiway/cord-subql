import { ensureAccount } from "./account"
import { ensureCallExist } from "./call"
import { DispatchedCallData } from "./types"
import { Product, Order, Listing, Rating, Return, Buyer, Store } from "../types"


export async function createProduct ({ call, extrinsic, rawCall }: DispatchedCallData) {
    const args = rawCall.args

    await ensureCallExist(call.id)

    const product = new Product(call.id)

    /* TODO: Fill the details from the args */
    const creator = (args[1] as any).toString()
    const txHash = (args[2] as any).toString()
    let account = await ensureAccount(creator);

    product.tx_hash = txHash;
    product.creatorId = account.id
    await product.save()
}

export async function createListing ({ call, extrinsic, rawCall }: DispatchedCallData) {
    const args = rawCall.args

    await ensureCallExist(call.id)

    const listing = new Listing(call.id)


    let creator = (args[1] as any).toString()
    let txHash= (args[2] as any).toString()
    let storeId = (args[3] as any).toString()
    let price = Number(args[4] as any)
    let prodId = (args[6] as any).toString()

    const product = await Product.get(prodId)
    if (!product) {
	return;
    }
    let store = await Store.get(storeId)
    if (!store) {
	store = new Store(storeId)
	store.save()
    }
    let account = await ensureAccount(creator);

    listing.creatorId = account.id
    listing.productId = product.id
    listing.storeId = store.id
    listing.price = price
    listing.tx_hash = txHash
    listing.status = "Active"
    await listing.save()
}

export async function orderProduct ({ call, extrinsic, rawCall }: DispatchedCallData) {
    const args = rawCall.args

    await ensureCallExist(call.id)


    /* TODO: check what is 'txHash' in order tx */
    let txHash = (args[2] as any).toString()
    const product = await Product.get(txHash)
    if (!product)
	return;

    const buyerId = (args[1] as any).toString()
    let buyer = await Buyer.get(buyerId)
    if (!buyer) {
	buyer = new Buyer(buyerId)
	buyer.save()
    }
    const storeId = (args[4] as any).toString()
    let store = await Store.get(buyerId)
    if (!store) {
        return
    }

    buyer.score += 1; /* every return is -2, and every order is +1 */
    buyer.save();

    const order = new Order(call.id)
    order.buyerId = buyer.id;
    order.productId = product.id
    order.storeId = store.id
    await order.save()
}

export async function returnProduct ({ call, extrinsic, rawCall }: DispatchedCallData) {
    const args = rawCall.args

    await ensureCallExist(call.id)

    /* TODO: order is not in the pallet method */
    /*
    let orderId = "0"; // get it from args
    const order = await Order.get(orderId)
    if (!order)
	return;
    */
    const buyerId = (args[1] as any).toString()
    const buyer = await Buyer.get(buyerId)
    if (!buyer) {
	return;
    }

    buyer.score -= 2; /* every return is -2, and every order is +1 */
    buyer.save();

    const orderReturn = new Return(call.id)
    orderReturn.buyerId = buyer.id;
    //orderReturn.productId = order.productId
    //orderReturn.storeId = order.storeId;
    await orderReturn.save()
}

export async function giveRating ({ call, extrinsic, rawCall }: DispatchedCallData) {
    const args = rawCall.args

    await ensureCallExist(call.id)

    
    const listing = await Listing.get(call.id)
    if (!listing) {
	return;
    }

    const buyerId = (args[1] as any).toString()
    const buyer = await Buyer.get(buyerId)
    if (!buyer) {
	return;
    }
    const givenRating  = parseInt(args[2] as any, 10)

    /* TODO: How do I get a product / listing from here ? */
    // buyer.score += 1; buyer.save()

    const rating = new Rating(call.id);
    rating.buyerId = buyer.id;
    rating.rating = givenRating;

    //rating.productId = order.productId
    //rating.storeId = order.storeId;
    await rating.save()
}

export async function updateStatus ({ call, extrinsic, rawCall }: DispatchedCallData) {
    const args = rawCall.args

    await ensureCallExist(call.id)

    /* TODO: Do the right thing */
    let listingId = call.id
    const listing = await Listing.get(listingId)
    if (!listing) {
	return;
    }
    let newStatus = (args[2] as any).toString()
    listing.status = newStatus;
    await listing.save()
}
