import { useEffect, useRef, useState } from "react";
import { compareComplexArrayElement, compareComplexObject } from "../utils/handle-operations";

// limit array of array
// limit object of object
// limit (array | object) of (array | object)
export const useCheckDependencies = (dependencies: any[] ) => {
    const [dependenciesState, setDependenciesState] = useState<any[]>([...dependencies]);
    const countUpdate = useRef(0);

    useEffect(() => {
        setDependenciesState( [...dependencies] );
    }, [countUpdate.current]);

    const checkDependency = (index: number): Function => (dependency: any | any[]) => {
        const stateDependency = dependenciesState[index];
        
        const dependencyTrigger = (isSame: boolean) => {
            const trigger = isSame ? countUpdate.current : ++countUpdate.current;
            return trigger;
        }

        if (Array.isArray(stateDependency)) {
            return dependencyTrigger(
                compareComplexArrayElement(stateDependency, dependency)
            )
        }
        
        if (stateDependency instanceof Object) {
            return dependencyTrigger(
                compareComplexObject(stateDependency, dependency)
            )
        }
        
        return dependencyTrigger(stateDependency === dependency)
    }

    const dependenciesCheckers = [
        ...dependenciesState.map(
            (_, index) => checkDependency(index)
        )
    ]

    return dependenciesCheckers;
}