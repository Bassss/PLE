/// <reference path="../includes/gameObject.ts"/>

class slot extends uiObject {
    public item: Item = null;
    public itemAmount: number = 0;
    public itemCount:HTMLElement

    constructor(g: Game, p:HTMLElement){
        super(g, "slot", p)
        this.itemCount = document.createElement("itemCount");
        this.div.appendChild(this.itemCount);
       
    }
    public addItem(item: Item, amount:number = 1){
        this.item = item
        this.itemAmount = amount
        if(this.itemAmount > 1){
            this.itemCount.innerText = this.itemAmount+""
        }
    }
    public addAmount(amount:number){
        this.itemAmount += amount
        this.itemCount.innerText = this.itemAmount+""
    }
    public removeAmount(amount:number){
        this.itemAmount += -amount
        this.itemCount.innerText = this.itemAmount+""
    }
}