import {Item} from './item';

export class ShoppingList {
    constructor(rawList) {
        this.populateList(rawList);
    }
    populateList(rawList = {}) {
        this.date = rawList.date ? new Date(rawList.date): new Date();
        this.items = [];
        if (rawList.items && rawList.items.length) {
            rawList.items.forEach(item => {
                this.items.push(new Item(item.name, item.qte, item.isInCart));
            })
        }
    }
    asObject() {
        let items = [];
        this.items.forEach((item) => {
            items.push({
                name: item.name,
                qte: item.qte,
                isInCart: item.isInCart
            })
        });
        return {
            date: this.date.toISOString(),
            items: items
        }
    }
    toggleItem(index) {
        this.items[index].isInCart = !this.items[index].isInCart;
        this.items.sort((a, b) => {
            return a.isInCart - b.isInCart
        });
    }
}
