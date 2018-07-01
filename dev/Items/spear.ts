/// <reference path="../includes/item.ts"/>

class Spear extends Item {
    constructor(g: Game,p?:HTMLElement){
        super(g,"spearItem",p)
        this.name = "spear"
        this.craftable = true
        this.tool = true
        let req =[]
        req.push(new SharpRock(this.game))
        req.push(1)
        this.required.push(req)
        req =[]
        req.push(new Stick(this.game))
        req.push(2)
        this.required.push(req)
        req =[]
        req.push(new Rope(this.game))
        req.push(1)
        this.required.push(req)
    }
}
      