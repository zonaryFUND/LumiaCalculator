

import { BuildWithKey, SavedBuildsKey, useBuildStorage } from "@app/storage/build";
import * as React from "react";
import { useLatest, useLocalStorage } from "react-use";
import { defaultSampleBuilds } from "./default-sample";
import { Trash } from "@phosphor-icons/react";
import style from "./index.module.styl";
import { styles } from "@app/util/style";

type Props = {
    currentKey?: number
    onSelect: (build: BuildWithKey) => void
    onDeleteCurrentBuild: () => void
}


const loadBuild: React.FC<Props> = props => {
    const {builds: savedBuilds, delete: deleteBuild } = useBuildStorage();
    const [selected, setSelected] = React.useState<number | null>(null);
    const latestSelected = useLatest(selected);

    const onClick = React.useCallback((id: number)=> {
        if (latestSelected.current == id) {
            const build = defaultSampleBuilds.concat(savedBuilds ?? []).find(b => b.key == id);
            props.onSelect(build!);
        } else {
            setSelected(id);
        }
    }, []);

    const onClickDelete = React.useCallback((key: number) => {
        deleteBuild(key)
        if (key == props.currentKey) {
            props.onDeleteCurrentBuild();
        }
    }, [props.currentKey])

    return (
        <>
            <header>
                <h1>保存したビルドをロード</h1>
                {selected != null ? <p>もう一度クリックしてロードします</p> : null}
            </header>
            <ul>
                {
                    (savedBuilds ?? []).map((build, i) => (
                        <li className={styles(selected == build.key ? style.selected : undefined, props.currentKey == build.key ? style.current : undefined)} onClick={() => onClick(build.key)}>
                            <p>{build.name}</p>
                            {build.isPreset ? null : <button onClick={event => {
                                event.stopPropagation();
                                onClickDelete(build.key);
                            }}><Trash size={20} /></button>}
                        </li>
                    ))
                }
            </ul>
        </>
    );
}

export default loadBuild;