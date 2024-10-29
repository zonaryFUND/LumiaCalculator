import { useCallback } from "react";
import { useLatest, useLocalStorage } from "react-use";

type Response = {
    value: boolean
    setValue: (to: boolean) => void
    toggleValue: () => void
}

export default function useStorageBoolean(key: string): Response {
    const storage = useLocalStorage<boolean>(key);
    const latest = useLatest(storage[0] || false);
    const toggle = useCallback(() => {
        storage[1](!latest.current);
    }, []);

    return {
        value: storage[0] || false,
        setValue: storage[1],
        toggleValue: toggle
    }
}