/// <reference path="../includes/uiObject.ts"/>
class title extends uiObject{
    private name : string;

    constructor(g: Game, n: string){
        super(g, "title")
        this.name = n;
        this.div.innerText = this.name;
    }
 
}