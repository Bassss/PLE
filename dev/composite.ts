class Composite implements Update{
    private items: Update[];
  
    constructor() {
        this.items = [];
        
    }

    public update(): void {
    
        for (var i = 0; i < this.items.length; i += 1) {
            this.items[i].update();
        }
    }
    
    public add(c: Update): void {
        this.items.push(c);
    }

    public remove(i: number): void {
        if (this.items.length <= i) {
            throw new Error("index out of bound!");
        }
        this.items.splice(i, 1);
    }
}