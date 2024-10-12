import { useCallback } from "react";
import { useLocalStorage } from "react-use";

export const CombatCurrentLeftConfigKey = "combat/current-left";
export const CombatCurrentRightConfigKey = "combat/current-right";
export const CombatMasterySyncKey = "combat/mastery-sync";
export const CombatDirectionKey = "combat/direction";

type Response = {
    left: {
        currentBuildKey?: number
        setCurrentBuildKey: (key: number | undefined) => void
    }
    right: {
        currentBuildKey?: number
        setCurrentBuildKey: (key: number | undefined) => void
    }
}

export function useStorageOnCombat(): Response {
    const [leftCurrentBuildKey, setLeftStorageKey, removeLeft] = useLocalStorage<number>(CombatCurrentLeftConfigKey, undefined);
    const setLeftCurrentBuildKey = useCallback((key: number | undefined) => {
        if (key == undefined) {
            removeLeft()
        } else {
            setLeftStorageKey(key);
        }
    }, [])

    const [rightCurrentBuildKey, setRightStorageKey, removeRight] = useLocalStorage<number>(CombatCurrentLeftConfigKey, undefined);
    const setRightCurrentBuildKey = useCallback((key: number | undefined) => {
        if (key == undefined) {
            removeRight()
        } else {
            setRightStorageKey(key);
        }
    }, [])

    return {
        left: {
            currentBuildKey: leftCurrentBuildKey,
            setCurrentBuildKey: setLeftCurrentBuildKey
        },
        right: {
            currentBuildKey: rightCurrentBuildKey,
            setCurrentBuildKey: setRightCurrentBuildKey
        }
    };
}