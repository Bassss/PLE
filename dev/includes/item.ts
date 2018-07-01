class Item {
    public name: string;
    public div: HTMLElement;
    public parent: HTMLElement;
    public type: string;
    public craftable: boolean = true;
    public required: Array<Array<any>> = []
    public tool: boolean= false;

    protected game: Game;
    public exists: boolean;

    constructor(g: Game, type: string, parent?: HTMLElement) {
        this.game = g;
        this.parent = parent;
        this.type = type
        this.exists = true;

    }
    public createElement(parent: HTMLElement) {
        this.parent = parent
        this.div = document.createElement("item");
        this.parent.appendChild(this.div);
        this.div.setAttribute("type", this.type)

    }
    public canCraft(inventoryBar: inventoryBar): boolean {
        let yay = true
        if (this.craftable == false) {
            return false
        }
        for(var i = 0; i < this.required.length; i++){
            let req = this.required[i]
        if (inventoryBar.findItem(req[0].name, req[1]) != true) {
            yay = false
        }
    }
    if(yay == true){
        return true
    } else{
        return false
    }
} 


}