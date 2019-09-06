export class User {
    constructor(data) {
        this.email = data.email;
        this.uid = data.uid;
    }

    getMail() {
        return this.email;
    }
}
