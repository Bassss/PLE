/// <reference path="../includes/view.ts"/>
class StartMenuView extends View {
    public allUiObjects: Array<uiObject> = [];

    constructor(g: Game) {
        super(g, "startMenuView")

    }
    public show() {

        this.allUiObjects.push(
            new title(this.game, "PLE"),
            new button(this.game, "Generate new World", "changeView", "gameView"),
            new button(this.game, "Load World", "disabled"),
            new button(this.game, "Options", "disabled"),
            new button(this.game, "Stop", "stopGame")
        )
    }
    public unshow() {
        for (let i = 0; i < this.allUiObjects.length; i++) {
            this.allUiObjects[i].exists = false;
        }
        this.allUiObjects = []
    }
    public update() {


    }
}