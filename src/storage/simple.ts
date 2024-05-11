import { useCallback } from "react";
import { useLocalStorage } from "react-use";

export const SimpleCurrentConfigKey = "simple/current-build";
export const SimpleCurrentSelectedKey = "simple/current-selected";

type Response = {
    currentBuildKey?: number
    setCurrentBuildKey: (key: number | undefined) => void
}

export function useStorageOnSimple(): Response {
    const [currentBuildKey, setStorageKey, remove] = useLocalStorage<number>(SimpleCurrentSelectedKey, undefined);
    const setCurrentBuildKey = useCallback((key: number | undefined) => {
        if (key == undefined) {
            remove()
        } else {
            setStorageKey(key);
        }
    }, [])

    return {
        currentBuildKey,
        setCurrentBuildKey
    };
}