/// <reference path="../includes/item.ts"/>

class Stick extends Item {
    constructor(g: Game,p?:HTMLElement){
        super(g,"stickItem",p)
        this.name = "stick"
        this.craftable = true
        let req =[]
        req.push(new Wood(this.game))
        req.push(1)
        this.required.push(req)
        req =[]
        req.push(new SharpRock(this.game))
        req.push(1)
        this.required.push(req)
    }
}
    