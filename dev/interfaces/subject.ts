interface Subject {
observers:Array<Observer>
subscribe(o : Observer)
unsubscribe(o : Observer)

}