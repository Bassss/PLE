abstract class View implements ViewInt{
    public active: boolean;
    public name: String;
    public game: Game
    //wat heeft een level allemaal nodig
    constructor( g: Game, n: String){
        this.name = n;
        this.game = g;
    }

    public setActive(){
        this.active = true;
        console.log(this.name+" is active")
        this.show()
    }
    public setUnactive(){
        this.active = false;
        // console.log(this.name+" is unactive")
        this.unshow()
    }
    public show(){
        //gets overritten
    }
    public unshow(){
         //gets overritten
    }
    public update(){
        //gets overritten
   }
}