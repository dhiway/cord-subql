import { ensureAccount } from "./account"
import { ensureCallExist } from "./call"
import { DispatchedCallData } from "./types"
import { Product, Order, Listing, Rating, Return, Buyer, Store } from "../types"


export async function createProduct ({ call, extrinsic, rawCall }: DispatchedCallData) {
    const args = rawCall.args

    await ensureCallExist(call.id)

    const product = new Product(call.id)

    /* TODO: Fill the details from the args */
    const identifier = (args[1] as any).toString()

    await product.save()
}

export async function createListing ({ call, extrinsic, rawCall }: DispatchedCallData) {
    const args = rawCall.args

    await ensureCallExist(call.id)

    const listing = new Listing(call.id)

    /* TODO: Fill the details from the args */
    let storeId = (args[1] as any).toString()
    let prodId = (args[2] as any).toString()
    const product = await Product.get(prodId)
    if (!product) {
	return;
    }
    listing.productId = product.id
    let store = await Store.get(storeId)
    if (!store) {
	store = new Store(storeId)
	store.save()
    }
    listing.storeId = store.id
    await listing.save()
}

export async function orderProduct ({ call, extrinsic, rawCall }: DispatchedCallData) {
    const args = rawCall.args

    await ensureCallExist(call.id)

    /* Get the product from existing list */
    let productId = "0"; // get it from args
    const product = await Listing.get(productId)
    if (!product)
	return;

    const order = new Order(call.id)

    /* TODO: Fill the details from the args */
    const buyerId = (args[2] as any).toString()
    let buyer = await Buyer.get(buyerId)
    if (!buyer) {
	buyer = new Buyer(buyerId)
	buyer.save()
    }
    order.buyerId = buyer.id;
    order.productId = product.id
    order.storeId = product.storeId;
    await order.save()
}

export async function returnProduct ({ call, extrinsic, rawCall }: DispatchedCallData) {
    const args = rawCall.args

    await ensureCallExist(call.id)

    /* Get the product from existing list */
    let orderId = "0"; // get it from args
    const order = await Order.get(orderId)
    if (!order)
	return;
    const buyerId = (args[2] as any).toString()
    const buyer = await Buyer.get(buyerId)
    if (!buyer) {
	return;
    }

    const orderReturn = new Return(call.id)

    /* TODO: Fill the details from the args */
    orderReturn.buyerId = buyer.id;
    orderReturn.productId = order.productId
    orderReturn.storeId = order.storeId;
    await orderReturn.save()
}

export async function giveRating ({ call, extrinsic, rawCall }: DispatchedCallData) {
    const args = rawCall.args

    await ensureCallExist(call.id)

    /* Get the product from existing list */
    let orderId = "0"; // get it from args
    const order = await Order.get(orderId)
    if (!order)
	return;
    const buyerId = (args[2] as any).toString()
    const buyer = await Buyer.get(buyerId)
    if (!buyer) {
	return;
    }
    const givenRating  = parseInt(args[3] as any, 10)

    const rating = new Rating(call.id);
    /* TODO: Fill the details from the args */
    rating.buyerId = buyer.id;
    rating.productId = order.productId
    rating.storeId = order.storeId;
    rating.rating = givenRating;
    await rating.save()
}

export async function updateStatus ({ call, extrinsic, rawCall }: DispatchedCallData) {
    const args = rawCall.args

    await ensureCallExist(call.id)

    /* TODO: Do the right thing */
    let listingId = "0";
    const listing = await Listing.get(listingId)
    if (!listing) {
	return;
    }
    let newStatus = (args[3] as any).toString()
    listing.status = newStatus;
    await listing.save()
}
