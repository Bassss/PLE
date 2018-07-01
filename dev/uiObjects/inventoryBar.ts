/// <reference path="../includes/gameObject.ts"/>

class inventoryBar extends uiObject {
    public slots: Array<slot> = []
    private player: Player

    private oneKey: number = 49
    private twoKey: number = 50
    private threeKey: number = 51
    private fourKey: number = 52
    private fiveKey: number = 53
    private sixKey: number = 54
    private sevenKey: number = 55
    private eightKey: number = 56
    private neinKey: number = 57
    private tenKey: number = 48

    public selectedSlot: slot


    constructor(g: Game, p: Player) {
        super(g, "inventoryBar")
        for (var i = 0; i < 10; i++) {
            this.slots.push(new slot(g, this.div))
        }
        window.addEventListener("keydown", this.onKeyDown.bind(this));
        this.hideBottom()
        this.player = p;
        this.player.hud.push(this)
        this.selectedSlot = this.slots[0]
        this.selectedSlot.div.setAttribute("class", "selected")
    }
    public addItem(item: Item, amount: number = 1) {
        let done = false
        for (var i = 0; i < this.slots.length; i++) {
            if (this.slots[i].item != undefined || this.slots[i].item != null) {
                if (this.slots[i].item.name == item.name) {
                    this.slots[i].addAmount(amount)

                    done = true
                    break;
                }
            }
        }
        if (done == false) {
            for (var i = 0; i < this.slots.length; i++) {
                if (this.slots[i].item == undefined || this.slots[i].item == null) {
                    this.slots[i].addItem(item, amount);
                   if( this.slots[i].div.childElementCount > 1){
                    this.slots[i].div.lastElementChild.remove()
                   }
                    this.slots[i].item.createElement(this.slots[i].div);

                    done = true
                    break;
                }
            }
        }

    }
    public removeItem(item:Item, amount:number = 1){
        for (var i = 0; i < this.slots.length; i++) {
            if (this.slots[i].item != undefined || this.slots[i].item != null) {
                if (this.slots[i].item.name == item.name) {
                    if(this.slots[i].itemAmount - amount > 1){
                        this.slots[i].removeAmount(amount) 
                    } else if(this.slots[i].itemAmount - amount >= 1){
                        this.slots[i].removeAmount(amount) 
                        this.slots[i].itemCount.innerText = ""
                    } else if(this.slots[i].itemAmount - amount >= 0){
                        this.slots[i].itemCount.innerText = ""
                        this.game.deleteObject(this.slots[i].item.div)
                        this.slots[i].item = null 
                        if( this.slots[i].div.childElementCount > 1){
                            this.slots[i].div.lastElementChild.remove()
                           }
                    }
                }
            }
        }
       
    }
    public findItem(name: string, amount: number): boolean {
        for (var i = 0; i < this.slots.length; i++) {
            if (this.slots[i].item != undefined || this.slots[i].item != null) {
                if (this.slots[i].item.name == name) {
                    if(this.slots[i].itemAmount >= amount){
                        return true
                    }else{return false}
                }
            }
        }
        return false
    }
    onKeyDown(event: KeyboardEvent): void {
        if( this.player.holding.childElementCount > 0){
            this.player.holding.lastElementChild.remove()
           }
        switch (event.keyCode) {
            case this.oneKey:
                this.selectedSlot.div.removeAttribute("class")
                this.selectedSlot = this.slots[0]
                this.selectedSlot.div.setAttribute("class", "selected")
                break;
            case this.twoKey:
                this.selectedSlot.div.removeAttribute("class")
                this.selectedSlot = this.slots[1]
                this.selectedSlot.div.setAttribute("class", "selected")
                break;
            case this.threeKey:
                this.selectedSlot.div.removeAttribute("class")
                this.selectedSlot = this.slots[2]
                this.selectedSlot.div.setAttribute("class", "selected")
                break;
            case this.fourKey:
                this.selectedSlot.div.removeAttribute("class")
                this.selectedSlot = this.slots[3]
                this.selectedSlot.div.setAttribute("class", "selected")
                break;
            case this.fiveKey:
                this.selectedSlot.div.removeAttribute("class")
                this.selectedSlot = this.slots[4]
                this.selectedSlot.div.setAttribute("class", "selected")
                break;
            case this.sixKey:
                this.selectedSlot.div.removeAttribute("class")
                this.selectedSlot = this.slots[5]
                this.selectedSlot.div.setAttribute("class", "selected")
                break;
            case this.sevenKey:
                this.selectedSlot.div.removeAttribute("class")
                this.selectedSlot = this.slots[6]
                this.selectedSlot.div.setAttribute("class", "selected")
                break;
            case this.eightKey:
                this.selectedSlot.div.removeAttribute("class")
                this.selectedSlot = this.slots[7]
                this.selectedSlot.div.setAttribute("class", "selected")
                break;
            case this.neinKey:
                this.selectedSlot.div.removeAttribute("class")
                this.selectedSlot = this.slots[8]
                this.selectedSlot.div.setAttribute("class", "selected")
                break;
            case this.tenKey:
                this.selectedSlot.div.removeAttribute("class")
                this.selectedSlot = this.slots[9]
                this.selectedSlot.div.setAttribute("class", "selected")
                break;

        }
        if(this.selectedSlot.item != undefined){
            this.selectedSlot.item.createElement(this.player.holding)
            this.player.holding.setAttribute("type","item")
            if(this.selectedSlot.item.tool == true){
                this.player.holding.setAttribute("type","tool")
            }
        }
    }
}