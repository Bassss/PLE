/// <reference path="../includes/pickUp.ts"/>

class FlowerPickUp extends PickUp {
    constructor(g: Game,p:HTMLElement){
        super(g,"flowerPickUp",p)
        this.name = "flower"
        this.item = new Fiber(g, p)
        this.kinds = 2
        this.wind = true;
    }
}
    