/// <reference path="../includes/item.ts"/>

class AxeHead extends Item {
    constructor(g: Game,p?:HTMLElement){
        super(g,"axeHeadItem",p)
        this.name = "axe head"
        this.craftable = true
        let req =[]
        req.push(new SharpRock(this.game))
        req.push(1)
        this.required.push(req)
        req =[]
        req.push(new Stone(this.game))
        req.push(2)
        this.required.push(req)
    }
}
    