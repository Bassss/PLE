/// <reference path="../includes/view.ts"/>
// a class for showing the game 
class GameView extends View {
    public allUiObjects: Array<uiObject> = [];
    public hidden: boolean = true;
    // the controllers
    private gameController: GameController = new GameController(this.game, this);

    constructor(g: Game) {
        super(g, "gameView")
        this.game.gameUpdater.add(this)
        this.gameController.generateWorld();

    }
    public show() {
        this.game.gameActive = true;
        this.allUiObjects.push(
            new button(this.game, "Menu", "changeView", "optionsMenuView", "left: 0; top: 0;margin: 20px;")
        )
    }
    public unshow() {
        this.game.gameActive = false;

        for (let i = 0; i < this.allUiObjects.length; i++) {

            this.allUiObjects[i].exists = false;
        }
        this.allUiObjects = []
    }
    public update() {
        if (this.game.gameActive == true) {
            if (this.hidden == true) {
                for (var i = 0; i < this.game.allPlayers[0].hud.length; i++) {
                    this.game.allPlayers[0].hud[i].unhide()
                }
                for (var i = 0; i < this.game.allGameObjects.length; i++) {
                    this.game.allGameObjects[i].show()
                }
                this.hidden = false
            }
        } else {
            if (this.hidden == false) {
                for (var i = 0; i < this.game.allGameObjects.length; i++) {
                    this.game.allGameObjects[i].hide()

                }
                this.hidden = true
            }
        }
    }
}