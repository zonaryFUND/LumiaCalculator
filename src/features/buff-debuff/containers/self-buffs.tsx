import * as React from "react";
import { useSubjectStateStore } from "@app/features/subject-config/store";
import { SubjectBuffDebuffDictionary } from "@app/ingame-params/subjects/dictionary";
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
    const definitions = SubjectBuffDebuffDictionary[config.subject]?.(config) ?? {};

    if (config.selfBuffs.length == 0) {
        return <p><FormattedMessage id="app.buff-debuff.no-self-buff" /></p>;
    }

    return (
        <ul>
            {
                config.selfBuffs.map(state => {
                    const definition = definitions[state.id];
                    if (!definition) return null;

                    return (
                        <BuffRow
                            key={state.id}
                            nameIntlID={definition.nameIntlID}
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
