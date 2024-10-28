
export const uniqInArray = (array: any[]) => {
    var seen: any = {};
    return array.filter((item) => {
        return seen.hasOwnProperty(
            item) ? false : (seen[item as keyof any] = true
        );
    });
}

export const uniqInArrayById = (array: any[]) => {
    var seen: any = {};
    return array.filter((item) => {
        return seen.hasOwnProperty(
            item.id) ? false : (seen[item.id as keyof any] = true
        );
    });
}

export const compareObjects = (
    obj1: any,
    obj2: any,
    comparisonFunction?: (element1: any, element2: any) => boolean
) => {

    const comparisonFunc = comparisonFunction
    ? (key: string) => comparisonFunction(obj1[key], obj2[key])
    : (key: string) => obj1[key] === obj2[key];

    const keysObj1 = Object.keys(obj1);
    const keysObj2 = Object.keys(obj2);

    if (keysObj1.length !== keysObj2.length) {
        return false;
    }
    
    if (keysObj1.length === 0 && keysObj2.length === 0) {
        return true;
    }
    
    return keysObj1.every(comparisonFunc);
}

export const compareArrayElement = (
    array1: any[],
    array2: any[],
    comparisonFunction?: (element1: any, element2: any) => boolean
) => {

    const comparisonFuc = comparisonFunction
    ? (element1: any, index: number) => comparisonFunction(element1, array2[index]) 
    : (element1: any, index: number) => element1 === array2[index];

    if (array1.length !== array2.length) { 
        return false;
    }

    if (array1.length === 0 && array2.length === 0) {
        return true;
    }

    return array1.every(comparisonFuc);
}


export const compareComplexArrayElement = (array1: any[], array2: any[]) => {
    const comparisonFunction = (element1: any, element2: any) => {
        
        // if is any[]
        if (Array.isArray(element1) && Array.isArray(element2)) {
            return compareArrayElement(element1, element2);
        }

        // if is typeof any object
        else if (element1 instanceof Object && element2 instanceof Object) {
            return compareObjects(element1, element2);
        }
        
        // if is other type
        else if (typeof element1 === typeof element2) {
            return element1 === element2;
        }

        return false;
    }

    return compareArrayElement(array1, array2, comparisonFunction);
}


export const compareComplexObject = (obj1: any, obj2: any) => {
    const comparisonFunction = (element1: any, element2: any) => {
        
        // if is any[]
        if (Array.isArray(element1) && Array.isArray(element2)) {
            return compareArrayElement(element1, element2);
        }

        // if is typeof any object
        else if (element1 instanceof Object && element2 instanceof Object) {
            return compareObjects(element1, element2);
        }
        
        // if is other type
        else if (typeof element1 === typeof element2) {
            return element1 === element2;
        }

        return false;
    }

    return compareObjects(obj1, obj2, comparisonFunction);
}
