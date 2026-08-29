import * as React from "react";
import { useSubjectStateStore } from "@app/features/subject-config/store";
import { SubjectBuffDebuffDictionary } from "@app/ingame-params/subjects/dictionary";
import { SelfBuffDefinition } from "@app/ingame-params/buff-debuff/type";
import SelfBuffRow, { Effect } from "../components/self-buff-row.view";
import { FormattedMessage } from "react-intl";

// stackが0のバフは非表示にするため、その場合は効果を計算しない
function effectsOf(definition: SelfBuffDefinition, stack: number): Effect[] {
    if (stack == 0) return [];

    return Object.values(definition.buff(stack))
        .flatMap(components => (components ?? []).map(component => ({
            labelIntlID: component.intlID ?? definition.nameIntlID,
            value: component.value.value ?? 0,
            percent: component.calculationType == "mul"
        })));
}

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
                        <SelfBuffRow
                            key={state.id}
                            nameIntlID={definition.nameIntlID}
                            maxStack={definition.maxStack}
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
