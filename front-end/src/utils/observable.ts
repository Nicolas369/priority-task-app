type Sub = (fn: () => void | any) => void
type functionsSubscribed = (() => void | any)[]

export class TaskObservable {
    private functionArray:functionsSubscribed = [];

    constructor() {}

    subscribe:Sub = (fn) => {
        this.functionArray.push(fn);
    }

    unsubscribe:Sub = (fn) => {
        this.functionArray.splice(
            this.functionArray.indexOf(fn),
            1
        )
    }
    
    next: () => void = () => {
        this.functionArray.forEach( fn => fn() );
    }
}