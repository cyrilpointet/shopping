export class Item {
    constructor(name = '', qte = '', isInCart = false) {
        this.name = name;
        this.qte = qte;
        this.isInCart = isInCart;
    }

    isValid() {
        return '' !== this.name;
    }
}
