/// <reference path="../includes/pickUp.ts"/>

class WoodPickUp extends PickUp {
    constructor(g: Game,p:HTMLElement){
        super(g,"woodPickUp",p)
        this.name = "wood"
        this.item = new Wood(g, p)
    }
}
    