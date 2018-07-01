/// <reference path="../includes/item.ts"/>

class Stone extends Item {
    constructor(g: Game,p?:HTMLElement){
        super(g,"stoneItem",p)
        this.name = "stone"
        this.craftable = false
    }
}
    