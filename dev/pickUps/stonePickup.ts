/// <reference path="../includes/pickUp.ts"/>

class StonePickUp extends PickUp {
    constructor(g: Game,p:HTMLElement){
        super(g,"stonePickUp",p)
        this.name = "stone"
        this.item = new Stone(g, p)
        this.changesOnPickup = true;
        this.stages = 3
        this.amount = 3

    }
   
}
    