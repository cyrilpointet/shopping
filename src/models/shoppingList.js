import {Item} from './item';

export class ShoppingList {
    constructor(rawList = {}) {
        this.date = rawList.date ? new Date(rawList.date): new Date();
        this.items = [];
        if (rawList.items && rawList.items.length) {
            rawList.items.forEach(item => {
                this.items.push(new Item(item.name, item.qte, item.isInCart));
            })
        }
    }

    /**
     *
     * @returns {string}
     */
    getFormatedDate() {
        let day = this.date.getDate() < 10 ? '0' + this.date.getDate(): this.date.getDate();
        let month = this.date.getMonth() < 10 ? '0' + this.date.getMonth(): this.date.getMonth();
        return `${day}/${month}/${this.date.getFullYear()}`
    }

    hasItems() {
        return 0 < this.items.length
    }

    /**
     *
     * @returns {{date: string, items: Array}}
     */
    asObject() {
        let items = [];
        this.items.forEach((item) => {
            items.push(item.asObject())
        });
        return {
            date: this.date.toISOString(),
            items: items
        }
    }

    /**
     *
     * @param {number} index
     */
    toggleItem(index) {
        this.items[index].isInCart = !this.items[index].isInCart;
        this.items.sort((a, b) => {
            return a.isInCart - b.isInCart
        });
    }

    /**
     *
     */
    deleteInCartItem() {
        let goodItems = this.items.filter(item => item.isInCart === false);
        this.items = goodItems;
    }

    /**
     *
     * @param {string} name
     * @param {string} qte
     * @returns {boolean}
     */
    addItem(name ='', qte ='') {
        let newItem = new Item(name, qte);
        if (newItem.isValid()) {
            this.items.push(newItem);
            this.items.sort((a, b) => {
                return a.isInCart - b.isInCart
            });
            return true;
        } else {
            return false;
        }
    }
}
