

import { PresetWithKey, SavedPresetsKey, usePresetStorage } from "@app/storage/preset";
import * as React from "react";
import { useLatest, useLocalStorage } from "react-use";
import { DefaultSamplePresets } from "./default-sample";
import { Trash } from "@phosphor-icons/react";
import style from "./index.module.styl";
import { styles } from "@app/util/style";

type Props = {
    currentKey?: number
    onSelect: (build: PresetWithKey) => void
    onDeleteCurrentBuild: () => void
}


const loadBuild: React.FC<Props> = props => {
    const {presets: savedBuilds, delete: deleteBuild } = usePresetStorage();
    const [selected, setSelected] = React.useState<number | null>(null);
    const latestSelected = useLatest(selected);

    const onClick = React.useCallback((id: number)=> {
        if (latestSelected.current == id) {
            const build = DefaultSamplePresets.concat(savedBuilds ?? []).find(b => b.key == id);
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
                        <li key={build.key} className={styles(selected == build.key ? style.selected : undefined, props.currentKey == build.key ? style.current : undefined)} onClick={() => onClick(build.key)}>
                            <p>{build.name}</p>
                            {build.isPremadeSample ? null : <button onClick={event => {
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