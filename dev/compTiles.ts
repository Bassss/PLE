class compTiles implements showTiles{
    private items: showTiles[];
    private debug: boolean = false;
    private game :Game
    constructor(g: Game) {
        this.items = [];
        this.game = g;
    }

    public toggleShow(): void {
        
        for (var i = 0; i < this.items.length; i += 1) {
            this.items[i].toggleShow();
        }
        if(this.debug == false){
            document.getElementById("container").style.height = "0";
            document.getElementById("uiContainer").style.height = "0";
            document.getElementsByTagName("body")[0].style.overflow = "visible"
            this.debug = true
        } else{
            document.getElementById("container").style.height = this.game.screenHeight + "px"
            document.getElementById("uiContainer").style.height = "100%";
            document.body.style.overflow = "hidden"
            
            this.debug = false
        }
    }
    public updateTiles(): void {
        for (var i = 0; i < this.items.length; i += 1) {
            this.items[i].updateTiles();
        }
    }
    public setSurrounding(): void {
        for (var i = 0; i < this.items.length; i += 1) {
            this.items[i].setSurrounding();
        }
    }
    
    public add(c: showTiles): void {
        this.items.push(c);
    }

    public remove(i: number): void {
        if (this.items.length <= i) {
            throw new Error("index out of bound!");
        }
        this.items.splice(i, 1);
    }
}