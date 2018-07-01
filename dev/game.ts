
class Game {
    public screenWidth: number = Math.floor(window.innerWidth / 100) * 400;
    public screenHeight: number = Math.floor(window.innerHeight / 100) * 400;

    //game variables
    private static _instance: Game;
    private active: boolean = true;
    public currentView: View;
    public gameUpdater: Composite = new Composite;
    public compTiles: compTiles = new compTiles(this);
    public gameActive: boolean = false;
    public gameTick: number = 0;
    public gameSec: number = 0;
    public waits:number = 1;
    public waitMenu: menu;

    //objects 
    public container: HTMLElement = document.getElementById("container");
    public uiContainer: HTMLElement = document.getElementById("uiContainer");
    //other
    public Xcamera:number ;
    public Ycamera:number;

    //Arrays of all elements 
    public allGameObjects: Array<gameObject> = [];
    private gameObject: Update;
    public allPlayers: Array<Player> = [];
    public allUiObjects: Array<uiObject> = [];
    private buttonScreen: button = new button(this, "", "windowChanger", 0);
    public allViews: Array<View> = [new StartMenuView(this), new GameView(this), new OptionsMenuView(this), new EndMenuView(this)];
    public allItems: Array<Item> = [new Stick(this), new Wood(this),new Stone(this), new SharpRock(this), new Fiber(this), new Rope(this), new AxeHead(this), new Spear(this), new Axe(this)]

    public static instance(): Game {
        if (!Game._instance) Game._instance = new Game();
        return Game._instance;

    }
    constructor() {
        requestAnimationFrame(() => this.gameLoop());
        this.requestNewView("startMenuView");
    }
    public requestPlayer(gc: GameController, x: number, y: number) {
        let player = new Player(this, gc, this.allPlayers.length,x,y);
    }
    public requestNewView(name: String) {
        for (let i = 0; i < this.allViews.length; i++) {
            if (this.allViews[i].name == name) {
                this.currentView = this.allViews[i]
                this.currentView.setActive()
            } else {
                this.allViews[i].setUnactive()
            }
        }
    }
    private uiCleaner() {
        if (this.allUiObjects.length > 0) {
            for (var i = 0; i < this.allUiObjects.length; i++) {
                if (this.allUiObjects[i] != undefined) {
                    if (this.allUiObjects[i].exists == false) {
                        this.allUiObjects[i].div.style.transform = "scale(0)";
                        let object = this.allUiObjects[i];
                        this.allUiObjects.splice(i, 1);
                        setTimeout(() => this.deleteObject(object.div), 500)
                    }
                }
            }
        }
    }
    private GameObjectCleaner() {
        if (this.allGameObjects.length > 0) {
            for (var i = 0; i < this.allGameObjects.length; i++) {
                if (this.allGameObjects[i] != undefined) {
                    if (this.allGameObjects[i].exists == false) {

                        let object = this.allGameObjects[i];
                        this.allGameObjects.splice(i, 1);
                        setTimeout(() => this.deleteObject(object.div), 500)
                    }
                }
            }
        }
    }
    public deleteObject(o: HTMLElement) {
        o.remove();
    }
    public collisionCheck(c1: gameObject, c2: gameObject): boolean {

        return !(c2.x > c1.x + c1.width ||
            c2.x + c2.width < c1.x ||
            c2.y > c1.y + c1.height ||
            c2.y + c2.height < c1.y)
    }
    public setScreen(x: number, y:number) {
            let coords = [(x - (window.innerWidth/2) ) ,(this.screenHeight) + (y - (window.innerHeight/2))]
            this.buttonScreen.exists = false;
            this.buttonScreen = new button(this, "", "windowChanger", coords );
            this.buttonScreen.div.click()
            this.Xcamera = coords[0]
            this.Ycamera = coords[1]
        
    }
    private uiAnimations() {
        this.uiCleaner();
        this.currentView.update()
    }
    private gameAnimations() {
        if (this.gameActive) {
            this.gameObject = this.gameUpdater;
            this.gameObject.update();
            this.GameObjectCleaner();
            this.gameTick ++
            this.gameSec = Math.round(this.gameTick / 47)
            if(this.waitMenu != undefined){
                this.waitMenu.timer();
            }
        }
    }
    private gameLoop() {
        if (this.active) {
            this.gameAnimations()
            this.uiAnimations()
            requestAnimationFrame(() => this.gameLoop());
        }
    }
    public endGame() {
        this.active = false;
    }
}
window.addEventListener("load", function () {
    Game.instance();
});



