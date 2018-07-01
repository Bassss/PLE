// a class for all the logistics of the game 
class GameController implements Update {

    //game vars

    private gameView: View;
    private game: Game;
    public allTiles: Array<Array<tile>> = [];
    private tileRows: Array<number> = [];
    private showTiles: boolean = false;

    //player vars

    //World gen vars
    private prefTile: number = null;
    private currentRow: number = 0;
    private currentRowTiles: Array<tile> = [];
    public islandStarter: tile;

    constructor(g: Game, v: View) {
        window.addEventListener("keydown", this.onKeyDown.bind(this));
        this.gameView = v;
        this.game = g;
        this.game.gameUpdater.add(this)

    }
    public getObjectTile(xObject: number, yObject:number){
        let xTile = Math.round(xObject/ 50)
        let yTile = Math.round((((this.game.screenHeight) - yObject) -50) /50)
       return this.getTile(xTile, yTile)
    }
    public getTile(x: number, y: number): tile {
        var tile: tile;
        if (y < 0 || y >= this.allTiles.length) {
            return null
        }
        var rowTile: Array<tile> = this.allTiles[y];
        for (var i = 0; i < rowTile.length; i++) {
            if (rowTile[i].x == x) {
                return rowTile[i]
            }
        }

        return null
    }
    public getTileKind(x: number, y: number): number {
        var tileKind: number
        var tile: tile;

        tile = this.getTile(x, y);
        if (tile == undefined || tile == null) {
            return null
        }
        tileKind = tile.kindNr;
        return tileKind
    }
    public makeTile(x: number, y: number) {
        if (y == this.currentRow) {
            this.currentRowTiles.push(new tile(this.game, this, x, y))
        } else {

            this.allTiles.push(this.currentRowTiles)
            this.currentRowTiles = [];
            this.currentRow = y;
            this.currentRowTiles.push(new tile(this.game, this, x, y))

        }
    }
    public generateWorld() {
        document.getElementById("tileContainer").style.width = this.game.screenWidth + "px"
        document.getElementById("container").style.width = this.game.screenWidth + "px"
        document.getElementById("tileContainer").style.height =this.game.screenHeight + "px"
        document.getElementById("container").style.height = this.game.screenHeight + "px"
        for (var i = 0; this.tileRows.length * 50 < this.game.screenHeight; i++) {
            this.tileRows.push(0)
            for (var j = 0; this.tileRows[i] * 50 < this.game.screenWidth; j++) {
                this.makeTile(j, i)
                this.tileRows[i]++
            }
        }
        this.allTiles.push(this.currentRowTiles)
        this.currentRowTiles = [];
        this.currentRow++;
        this.game.compTiles.updateTiles()
        this.game.compTiles.setSurrounding()
    }
    public update() {

    }
    onKeyDown(event: KeyboardEvent): void {
        switch (event.keyCode) {
            case 13:
                this.game.compTiles.toggleShow()

                break;
        }

    }
}