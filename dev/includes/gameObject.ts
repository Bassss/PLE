abstract class gameObject implements Update{

    private _x : number;
    private _y : number;
    private _div : HTMLElement;
    public width : number;
    public height : number;
    public styleHeight: string;
    protected game : Game;
    public exists : boolean;
    public parent : HTMLElement;

    public get x(): number          {   return this._x;   }
    public set x(value: number)     {   this._x = value;  }

    public get y(): number          {   return this._y;   }
    public set y(value: number)     {   this._y = value;  }    

    public get div(): HTMLElement          {   return this._div;   }
    public set div(value: HTMLElement)     {   this._div = value;  }       

    constructor( g: Game, tag: string, parent? : HTMLElement) {
        this.game = g;
        if(parent == null){
            this.parent = this.game.container;
        } else{
            this.parent = parent;
        }
        this.div = document.createElement(tag);
        this.styleHeight = this.div.style.height;
        this.parent.appendChild(this.div);
        this.exists = true;
        this.game.allGameObjects.push(this);
        this.hide();
        this.game.gameUpdater.add(this)
    }
    public hide(){
        // this.div.style.height = 0+"px";
        this.div.style.display = "none"
    }
    public show(){
        // this.div.style.height = this.styleHeight;
        this.div.style.display = ""
    }
    public focusOnMe(){
        this.game.setScreen(this.x ,this.y)
    }
    public update(){

    }
}