import * as React from "react";
import { useSubjectStateStore } from "@app/features/subject-config/store";
import { selfBuffDefinitionsOf } from "@app/ingame-params/buff-debuff/self-buff-definitions";
import { itemIDFromNamespacedId } from "@app/ingame-params/buff-debuff/source";
import BuffRow from "../components/buff-row.view";
import { effectsOf } from "./effects";
import { FormattedMessage } from "react-intl";

/**
 * 選択中の実験体固有の自己バフ一覧。実験体選択時に自動投入されたもの（`config.selfBuffs`）のみを表示し、
 * この時点では追加・削除UIは持たない
 */
const SelfBuffs: React.FC = () => {
    const config = useSubjectStateStore(s => s.config);
    const setSelfBuffs = useSubjectStateStore(s => s.setSelfBuffs);
    const definitions = selfBuffDefinitionsOf(config);

    if (config.selfBuffs.length == 0) {
        return <p><FormattedMessage id="app.buff-debuff.no-self-buff" /></p>;
    }

    return (
        <ul>
            {
                config.selfBuffs.map(state => {
                    const definition = definitions[state.id];
                    if (!definition) return null;

                    // 実験体固有スキル由来（origin: "skill"）は発生源が選択中の実験体自身で自明なため、
                    // 発生源名は装備アビリティ由来のときだけ表示する
                    const itemID = definition.origin == "equipment-ability" ? itemIDFromNamespacedId(state.id) : undefined;

                    return (
                        <BuffRow
                            key={state.id}
                            nameIntlID={definition.nameIntlID}
                            sourceIntlID={itemID != undefined ? `Item/Name/${itemID}` : undefined}
                            maxStack={definition.maxStack}
                            stackLabels={definition.stackLabels}
                            currentStack={state.stack}
                            effects={effectsOf(definition, state.stack)}
                            onChange={stack => setSelfBuffs(prev => prev.map(
                                s => s.id == state.id ? { ...s, stack } : s
                            ))}
                        />
                    );
                })
            }
        </ul>
    );
};

export default SelfBuffs;
