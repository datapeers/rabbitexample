export class Empresario {
    constructor(public nombre: string, public item: {}, public uid: string) {
        this.nombre = nombre;
        this.item = item;
        this.uid = uid;
    }
}
