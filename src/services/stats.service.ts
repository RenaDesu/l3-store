import { ProductData } from "types";
import { Order } from "../modules/checkout/checkout";

enum EventType {
    route = 'route',
    purchase = 'purchase',
    addToCart = 'add_to_cart',
    viewCard = 'view_card',
}

type Event = {
    type: EventType, 
	payload: object, 
	timestamp: number
};

export class StatsService {
    onAddToBasket(product: ProductData) {
        const payload = {
            product
        };

        this._push(EventType.addToCart, payload);
    }

    onOrder(order: Order) {
        const payload = {
            orderId: order.orderId, 
            totalPrice: order.totalPrice, 
            productIds: order.productIds
        };

        this._push(EventType.purchase, payload);
    }

    _push(type: EventType, payload: object) {
        try {
            this._send({
                type: type,
                payload,
                timestamp: new Date().getTime(),
            });
        } catch (error) {
            console.log(error);
        }
    }

    private _send(event: Event) {
        // const url = '/api/sendEvent';
        const body = event;
        // fetch(url, { method: 'POST', body: JSON.stringify(body) });
        console.log(body);
    }
}

export const statsService = new StatsService();