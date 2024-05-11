

import { SavedBuildsKey } from "@app/storage/build";
import { SubjectConfig } from "components/subject/use-subject-config";
import * as React from "react";
import { useLatest, useLocalStorage } from "react-use";
import { defaultSampleBuilds } from "./default-sample";
import { Trash } from "@phosphor-icons/react";
import style from "./index.module.styl";

type Props = {
    currentName?: string
    onSelect: (build: BuildWithKey) => void
}


const loadBuild: React.FC<Props> = props => {
    const [savedBuilds] = useLocalStorage<BuildWithKey[]>(SavedBuildsKey, []);
    const [selected, setSelected] = React.useState<BuildWithKey | null>(null);
    const latestSelected = useLatest(selected);

    return (
        <>
            <header>
                <h1>保存したビルドをロード</h1>
                {selected != null ? <p>もう一度クリックしてロードします</p> : null}
            </header>
            <ul>
                {
                    defaultSampleBuilds.map((build, i) => (
                        <li className={(selected ? selected[1] : null) == build[1] ? style.selected : undefined} onClick={() => setSelected(build)}><p>{build[0]}</p></li>
                    ))
                }
                {
                    (savedBuilds ?? []).map((build, i) => (
                        <li className={(selected ? selected[1] : null) == build[1] ? style.selected : undefined} onClick={() => setSelected(build)}><p>{build[0]}</p><button><Trash size={20} /></button></li>
                    ))
                }
            </ul>
        </>
    );
}

export default loadBuild;