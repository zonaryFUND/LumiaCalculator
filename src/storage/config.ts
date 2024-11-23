import { SubjectConfig } from "app-types/subject-dynamic/config";
import { useCallback, useMemo } from "react";
import { useLocalStorage } from "react-use";
import { Migrate, SubjectConfigV1 } from "./migration-v1/config";

export function useLocalStorageConfig(key: string): [SubjectConfig | undefined, (config: SubjectConfig) => void] {
    const [rawConfig, saveRaw] = useLocalStorage<
        (SubjectConfig & {version: "v2"}) | SubjectConfigV1 & {version: undefined}
    >(key);
    const config = useMemo(() => {
        if (rawConfig == undefined) return undefined;
        if (rawConfig.version == "v2") return rawConfig;
        return Migrate(rawConfig);
    }, [rawConfig]);

    const save = useCallback((config: SubjectConfig) => {
        saveRaw({...config, version: "v2"});
    }, []);
    return [config, save];
}