import { useCallback, useRef } from "react";
import { ScrollRect } from "../definitions/ordering-definition";


export const useScroll = () => {
    const scrollElement = useRef<HTMLElement | any>();
    const scrollElementLeft = useRef<HTMLElement>();
    const scrollElementRight = useRef<HTMLElement>();
    const intervals = useRef<any>([]);
   
    const addInterval = (interval: any) => {
        intervals.current.push(interval);
    }

    const clearAllIntervals = () => {
        intervals.current.forEach(
            (interval: any) => clearInterval(interval)
        );
    }

    const makeScroll = useCallback((event:any) => {
        let rect: ScrollRect, rectLeft: ScrollRect, rectRight: ScrollRect;

        if (scrollElementLeft.current && scrollElementRight.current) {
            rectLeft = scrollElementLeft.current.getBoundingClientRect();
            rectRight = scrollElementRight.current.getBoundingClientRect();
        } else if (scrollElement.current) {
            rect = scrollElement.current.getBoundingClientRect();
        }
        
        if (rect || rectLeft && rectRight) {

            const clientRect = Boolean(rectLeft&&rectRight)
            ? ({left: rectLeft!.left, right: rectRight!.right})
            : rect!;

            let scrollAmount = 0;

            const xLeft = event.clientX - clientRect.left;
            const xRight = event.clientX - clientRect.right;

            if (xLeft < 100) {
                scrollAmount = -5
                console.log("xLeft < 50", xLeft);
            }
            
            if (xRight > -100) {
                console.log("xRight < -50", xRight);
                scrollAmount = 5
            }
           
            addInterval(setInterval(() => {
                (scrollElement.current! as HTMLElement).scrollBy({
                    left: scrollAmount,
                    behavior: "auto",
                });
            } , 300));

            if (xLeft > 100 && xRight < -75) {
                clearAllIntervals();
            }
        }
    }, [
        scrollElement.current,
        scrollElementLeft.current,
        scrollElementRight.current
    ]);

    const onDragActionStart = () => {
        document.addEventListener("mousemove", makeScroll);
    }

    const onDragActionEnd = () => {
        document.removeEventListener("mousemove", makeScroll);
        clearAllIntervals();
    }

    return {
        scrollElement,
        scrollElementLeft,
        scrollElementRight,
        onDragActionStart,
        onDragActionEnd
    }
}