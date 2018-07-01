/// <reference path="../includes/item.ts"/>

class Fiber extends Item {
    constructor(g: Game,p?:HTMLElement){
        super(g,"fiberItem",p)
        this.name = "fiber"
        this.craftable = false
    }
}
    