/// <reference path="../includes/pickUp.ts"/>

class TreePickUp extends PickUp {
    constructor(g: Game,p:HTMLElement){
        super(g,"TreePickUp",p)
        this.name = "Tree"
        this.item = new Stick(g, p)
        this.toolItem = new Wood(g, p)
        this.changesOnPickup = true;
        this.stages = 3;
        this.kinds = 1;
        this.amount = 3;
        this.neededTool = new Axe(g,p)
    }
   
}
    