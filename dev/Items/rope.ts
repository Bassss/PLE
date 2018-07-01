/// <reference path="../includes/item.ts"/>

class Rope extends Item {
    constructor(g: Game,p?:HTMLElement){
        super(g,"ropeItem",p)
        this.name = "rope"
        this.craftable = true
        let req =[]
        req.push(new Fiber(this.game))
        req.push(4)
        this.required.push(req)
       
    }
}
    