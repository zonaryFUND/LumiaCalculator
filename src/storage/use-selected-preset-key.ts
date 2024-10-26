import { useCallback } from "react";
import { useLocalStorage } from "react-use";

type Response = {
    currentPresetKey?: number
    setCurrentPresetKey: (key: number | undefined) => void
}

export function useSelectedPresetKey(storageKey: string): Response {
    const [currentPresetKey, setStorageKey, remove] = useLocalStorage<number>(storageKey, undefined);
    const setCurrentPresetKey = useCallback((key: number | undefined) => {
        if (key == undefined) {
            remove()
        } else {
            setStorageKey(key);
        }
    }, [])

    return {
        currentPresetKey,
        setCurrentPresetKey
    };
}