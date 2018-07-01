/// <reference path="../includes/uiObject.ts"/>
class button extends uiObject{
    private type : String;
    private name : string;

    constructor(g: Game, n: string, t: String, v :any = null, s?: string){
        super(g, "button")
        this.type = t;
        this.name = n;
        this.div.innerText = this.name;
        this.checkType(v,s)
    }
    //check the type of button en asign function 
    private checkType(v: any, s?: string){
        switch(this.type) {
            case "changeView":{
                this.div.addEventListener("click", () => this.changeView(v));
                this.div.setAttribute("class", "changeView");
                if(s != undefined){
                    this.div.setAttribute("style", s);
                }
                break;
            }
            case "slider":{
                this.div.addEventListener("click", () => this.slider(v));
                this.div.setAttribute("class", "slider");
                if(s != undefined){
                    this.div.setAttribute("style", s);
                }
                break;
            }
            case "joinGame":{
                this.div.addEventListener("click", () => this.joinGame(v));
                this.div.setAttribute("class", "joinGame");
                if(s != undefined){
                    this.div.setAttribute("style", s);
                }
                break;
            }
            case "on":{
                this.div.addEventListener("click", () => this.on());
                this.div.setAttribute("class", "on");
                if(s != undefined){
                    this.div.setAttribute("style", s);
                }
                break;
            }
            case "off":{
                this.div.addEventListener("click", () => this.off());
                this.div.setAttribute("class", "off");
                if(s != undefined){
                    this.div.setAttribute("style", s);
                }
                break;
            }
            case "save":{
                this.div.addEventListener("click", () => this.save(v));
                this.div.setAttribute("class", "save");
                if(s != undefined){
                    this.div.setAttribute("style", s);
                }
                break;
            }
            case "stopGame":{
                this.div.addEventListener("click", () => this.stopGame());
                this.div.setAttribute("class", "stopGame");
                if(s != undefined){
                    this.div.setAttribute("style", s);
                }
                break;
            }
            case "windowChanger":{
                this.div.addEventListener("click", () => this.setScreen(v));
                this.div.setAttribute("class", "windowChanger(X: "+ v[0] +", Y: "+ v[1] +") hidden");
 
                break;
            }
            case "disabled":{
                this.div.setAttribute("class", "disabled");
                break;
            }
            default: {
                this.div.setAttribute("class", "Error");
                break;
            }
        }
    }

    private changeView(v: String){
        this.game.requestNewView(v)
    }
    private slider(v: String){
        //set % on setting
    }
    private on(){
        //turn setting on
    }
    private off(){
        // turn setting off 
    }
    private joinGame(v: String){
        // make a function to join a server
    }
    private save(v: String){
        //find some way to save progress 
        // propably no time to do this
    }
    private stopGame(){
        window.location.href = "http://blank";
        // find some way to stop game
    }
    private setScreen(coords: Array<number>){
        let y = coords[1]
        let x = coords[0]
        window.scroll({
            top: y,
            left: x,
            behavior: "smooth"
        });
    }
}