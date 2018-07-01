 class Changer implements Iterator {
    private collection: any[] = [];
    private position: number = 0;

    constructor(collection: any[]) {
        this.collection = collection;
    }

   public next(){
        
        var result = this.collection[this.position];
        this.position += 1;

        return result;
    }

    public hasNext(): boolean {
        return this.position < this.collection.length;

    }
}