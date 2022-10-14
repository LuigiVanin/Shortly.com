import { MutableRefObject, useEffect, useState } from "react";

export const useSelector = (selector: MutableRefObject<null>) => {
    const [width, setWidth] = useState();
    const [left, setLeft] = useState();

    useEffect(() => {
        const el = selector.current as any;
        el.style.setProperty("width", `${width}px`);
        el.style.setProperty("left", `${left}px`);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [width, left]);

    const onHoverSelector = (event: any) => {
        const target = event.target;
        setWidth(target.offsetWidth);
        setLeft(target.offsetLeft);
    };

    return { action: onHoverSelector, width, left };
};
