export class Item {
    constructor(name = '', qte = '', isInCart = false) {
        this.name = name;
        this.qte = qte;
        this.isInCart = isInCart;
    }

    isValid() {
        return '' !== this.name;
    }

    asObject() {
        return {
            name: this.name,
            qte: this.qte,
            isInCart: this.isInCart
        }
    }
}
