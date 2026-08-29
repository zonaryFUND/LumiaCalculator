import * as React from "react";
import { useSubjectStateStore } from "@app/features/subject-config/store";
import { SubjectBuffDebuffDictionary } from "@app/ingame-params/subjects/dictionary";
import SelfBuffRow from "../components/self-buff-row.view";
import { FormattedMessage } from "react-intl";

/**
 * 選択中の実験体固有の自己バフ一覧。実験体選択時に自動投入されたもの（`config.selfBuffs`）のみを表示し、
 * この時点では追加・削除UIは持たない
 */
const SelfBuffs: React.FC = () => {
    const config = useSubjectStateStore(s => s.config);
    const setSelfBuffs = useSubjectStateStore(s => s.setSelfBuffs);
    const definitions = SubjectBuffDebuffDictionary[config.subject] ?? {};

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
                        <SelfBuffRow
                            key={state.id}
                            nameIntlID={definition.nameIntlID}
                            availableStacks={definition.availableStacks}
                            currentStack={state.stack}
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
