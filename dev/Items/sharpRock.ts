/// <reference path="../includes/item.ts"/>

class SharpRock extends Item {
    constructor(g: Game,p?:HTMLElement){
        super(g,"sharpRockItem",p)
        this.name = "Sharp rock"
        this.craftable = true
        let req =[]
        req.push(new Stone(this.game))
        req.push(2)
        this.required.push(req)
    }
}
    