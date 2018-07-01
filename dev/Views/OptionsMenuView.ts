/// <reference path="../includes/view.ts"/>
class OptionsMenuView extends View{
    public allUiObjects: Array<uiObject> = [];

    constructor( g: Game){
        super(g,"optionsMenuView")
     
    }
    public show(){
        this.allUiObjects.push(
            new title(this.game, "Pauze"),
            new button(this.game, "Start", "changeView","gameView"),
            new button(this.game, "Stop", "stopGame")
        )
    }
    public unshow(){
        for (let i = 0; i < this.allUiObjects.length; i++) {
           
            this.allUiObjects[i].exists = false;
           }
          this.allUiObjects = []
    }
    public update(){

    }
}