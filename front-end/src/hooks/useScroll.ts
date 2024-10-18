import { useCallback, useRef } from "react";

export const useScroll = () => {
    const scrollElement = useRef<HTMLElement>();
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
        if (!scrollElement.current) return;

        const rect = scrollElement.current.getBoundingClientRect();

        if (rect) {
            let scrollAmount = 0;

            const xLeft = event.clientX - rect.left;
            const xRight = event.clientX - rect.right;

            if (xLeft < 50) {
                scrollAmount = -25
            }
            
            if (xRight > -100) {
                scrollAmount = 25
            }
           
            addInterval(setInterval(() => {
                scrollElement.current!.scrollBy({
                    left: scrollAmount,
                    behavior: "auto",
                });
            } , 100));

            if (xLeft > 75 && xRight < -350) {
                clearAllIntervals();
            }

        }
    }, [scrollElement.current]);

    const onDragActionStart = () => {
        scrollElement.current?.addEventListener("mousemove", makeScroll);
    }

    const onDragActionEnd = () => {
        scrollElement.current?.removeEventListener("mousemove", makeScroll);
        clearAllIntervals();
    }

    return {
        scrollElement,
        onDragActionStart,
        onDragActionEnd
    }
}