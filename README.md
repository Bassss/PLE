# PLE

Hello, my name is Bas.
In this repo you will find a project of mine build to be very flexible and easy to add to.
Right now the game generates a random island made from tiles, each tile changes itself based on an algorithm. If you would like to see how the island changes based on the variables feel free to pull the repo and check it out.
It’s also very easy to add items right now, the hardest part is to make the artwork.
Al you need to do is create a new file containing the base structure of an item, that looks like this: 
/// <reference path="../includes/item.ts"/>
class ItemName extends Item {
    constructor(g: Game,p?:HTMLElement){
        super(g,"ItemName",p)
        this.name = "ItemName"
        this.craftable = true // is the item a craftable of a pickup 
        this.tool = true // is it an item or a tool
        let req =[] 
       	req.push(new OtherItemName(this.game)) // item needed to craft
        	req.push(1) // amount needed 
        this.required.push(req)
              req.push(1) 
        this.required.push(req)
    }
}
If the item you’re creating is a pickup you will also need to create a pickup file, that looks like this:
/// <reference path="../includes/pickUp.ts"/>
class PickUpName extends PickUp {
    constructor(g: Game,p:HTMLElement){
        super(g,"PickUpName",p)
        this.name = "PickUpName"
        this.item = new ItemName(g, p) // item it creates on pickup
        this.amount = 1 // amount of items it can generate( default - 1)
        this.stages = 3 // amount of stages the pickup can have, can change on time or pickup
        this.changesOnPickup = true; // does the pickup change stage on pickup
        this.kinds = 2 // amount of textures 
        this.wind = true; // effected by wind
        this.toolItem = new  ItemName(g, p) // item generated when tool is used 
        this.neededTool = new  ItemName( g,p) // tool needed to get toolItem
    }
}
Then it needs a texture in items.css file and the pickups.css file. And lastly the item needs to be added to the allItems Array in the game.ts file and you’re done.


