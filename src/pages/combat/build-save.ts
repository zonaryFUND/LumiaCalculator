/*
import { useBuildStorage } from "@app/storage/build";
import { useStorageOnCombat } from "@app/storage/combat";
import * as React from "react";

type Part = {
    showingSave: [boolean, React.Dispatch<React.SetStateAction<boolean>>]
    current?: string
}

type Props = {
    left: Part
    right: Part
}

export default function useBuildSave(): Props {
    const { builds, saveNew } = useBuildStorage();
    const { left: leftStorage, right: rightStorage } = useStorageOnCombat();
    const currentBuildLeft = React.useMemo(() => {
        return builds.find(b => b.key == leftStorage.currentBuildKey);
    }, [builds.length, leftStorage.currentBuildKey]);
    const currentBuildRight = React.useMemo(() => {
        return builds.find(b => b.key == rightStorage.currentBuildKey);
    }, [builds.length, rightStorage.currentBuildKey]);
}
*/