import { useRef } from "react";

const useCustomEffect = (effect,deps) => {
    const isFirstRender = useRef(true);
    const prevDeps = useRef([]);

    // First render
    if(isFirstRender.current){
        isFirstRender.current = false;
        const cleanup = effect();
        return () => {
            if(cleanup && typeof cleanup === 'function'){
                cleanup();
            }
        };
    }

    // Deps Changes and No-Deps Array
    const depsChanged = deps ? JSON.stringify(deps) !== JSON.stringify(prevDeps.current): true;

    if(depsChanged){
        const cleanup = effect();

        if(cleanup && typeof cleanup === 'function' && deps){
            cleanup();
        }
    }

    // Cleanup


    prevDeps.current = deps || [];
}

export default useCustomEffect;