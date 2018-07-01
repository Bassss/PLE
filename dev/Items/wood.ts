/// <reference path="../includes/item.ts"/>

class Wood extends Item {
    constructor(g: Game,p?:HTMLElement){
        super(g,"woodItem",p)
        this.name = "wood"
        this.craftable = false
    }
}
    