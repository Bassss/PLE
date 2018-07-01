class PickUp {
    public name: string;
    public div: HTMLElement;
    public parent: HTMLElement;
    public type: string;
    public stage: number = 1;
    public stages: number = 1
    public kind: number = 1;
    public kinds: number = 1;
    public amount: number = 1;
    public changesOnPickup: boolean = false
    public wind: boolean = false
    public neededTool: Item;
    public toolItem: Item;

    protected game: Game;
    public exists: boolean;
    public item: Item;

    constructor(g: Game, type: string, parent: HTMLElement) {
        this.game = g;
        this.parent = parent;
        this.type = type
        this.exists = true;

    }
    public createElement(parent: HTMLElement = this.parent) {
        this.parent = parent
        if (this.wind == true) {
            let wind = document.createElement("wind");
            this.parent.appendChild(wind);
            this.parent = wind
        }

        this.div = document.createElement("pickUp");
        this.parent.appendChild(this.div);
        this.div.setAttribute("type", this.type)

        this.div.addEventListener('animationiteration', () => {
            this.div.style.animationPlayState = "paused";
        }, false);
        this.setKind();
        this.div.setAttribute("stage", this.stage + "")

    }
    public generateItem(): Item {
        return this.item
    }
    public setStage(): number {
        if (this.stage < this.stages) {
            this.stage += 1
        }
        this.div.setAttribute("stage", this.stage + "")
        return this.stage
    }
    public setKind(): number {
        let random = Math.round(Math.random() * 100);
        let devide = 100 / this.kinds
        let result = random / devide;
        result = Math.round(result)
        if (result < 1) { result = 1 }
        this.kind = result
        this.div.setAttribute("kind", this.kind + "")
        return this.kind
    }
    public lowerAmount() {
        this.amount += -1;
        if (this.changesOnPickup == true) {
            this.setStage()
        }
    }
    public generateItemWithTool(): Item{
        return this.toolItem
    }
}