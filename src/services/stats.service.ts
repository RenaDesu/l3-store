import { ProductData } from "types";
import { Order } from "../modules/checkout/checkout";

enum EventType {
    route = 'route',
    purchase = 'purchase',
    addToCart = 'add_to_cart',
    viewCard = 'view_card',
    viewCardPromo = 'view_card_promo',
}

type Event = {
    type: EventType, 
	payload: object, 
	timestamp: number
};

export class StatsService {
    cardObserver: IntersectionObserver;

    constructor() {
        this.cardObserver = new IntersectionObserver(this._onCardObserve.bind(this), {
            rootMargin: '0px',
            threshold: 0.5,
        });
    }

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

    observeCard(el: HTMLElement, product: ProductData) {
        //@ts-ignore
        el.cardData = product;
        this.cardObserver.observe(el);
    }

    onViewCard(product: ProductData, ) {
        const payload = {
            product
        };
        if (Object.keys(product.log).length !== 0) {
            this._push(EventType.viewCardPromo, payload);
        } else {
            this._push(EventType.viewCard, payload);
        }
    }

    onRoute(payload: { [key: string]: any }) {
        const pagePayload = payload;

        this._push(EventType.route, pagePayload);
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

    private _onCardObserve(entries: Array<IntersectionObserverEntry>, self: IntersectionObserver) {
        entries
        .filter(({ isIntersecting }) => isIntersecting)
        .forEach(({ target }) => {
            //@ts-ignore
            this.onViewCard(target.cardData);
            self.unobserve(target);
        });
    }

    private _send(event: Event) {
        const body = event;
        fetch('/api/sendEvent', { method: 'POST', body: JSON.stringify(body) });
    }
}

export const statsService = new StatsService();