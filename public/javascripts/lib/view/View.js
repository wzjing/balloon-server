class View {
    get htmlEl() {
        return this.element.innerHTML;
    }

    constructor(el){
        this.element = el;
    }
}