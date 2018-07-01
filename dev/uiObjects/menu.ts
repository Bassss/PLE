/// <reference path="../includes/uiObject.ts"/>

class menu extends uiObject {
    private waitScreen: HTMLElement;
    private waitStart: number;
    private waitTime: number;
    private timerElement: HTMLElement;
    private payButton:HTMLElement;
    
    constructor(g: Game){
        super(g, "menu")
        this.waitfor()
    }
    private waitfor(){
        this.waitStart = this.game.gameTick;
        this.waitTime = this.game.waits;
        this.waitScreen = document.createElement("wait")
        this.game.uiContainer.appendChild(this.waitScreen)
        this.timerElement = document.createElement("timer")
        this.waitScreen.appendChild(this.timerElement)
        this.payButton = document.createElement("paybutton")
        this.waitScreen.appendChild(this.payButton)
        // this.payButton.innerText = "Pay "+ Math.round(this.game.gameSec / (this.game.waits * 2)) + " fiber";
        this.payButton.innerText = "Pay 10 fiber";
        this.payButton.addEventListener("click", () => this.pay());
        this.timerElement.innerText = this.waitTime+""
        // this.game.waits ++
        this.game.waitMenu = this;
    }
    public timer(){
        this.timerElement.innerText =this.waitTime - Math.round((this.game.gameTick - this.waitStart)/ 47)+"" 
        if((this.game.gameTick - this.waitStart)/ 47 >= this.waitTime){
            this.game.waitMenu = undefined
            this.waitScreen.remove()
        }
    }
    public pay(){
        if(this.game.allPlayers[0].inventoryBar.findItem("fiber",10)){
            this.game.allPlayers[0].inventoryBar.removeItem(new Fiber(this.game),10)
            this.waitTime = 0 
        }
    }
}