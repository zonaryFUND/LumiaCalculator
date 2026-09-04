import * as React from "react";
import { FormattedMessage } from "react-intl";
import { useSubjectStateStore } from "@app/features/subject-config/store";
import { autoActiveEffectsOf } from "./auto-active-effects";
import { unresolvedGivenSkillDamageIncreaseEffectsOf } from "./given-skill-damage-increase";
import AutoBuffRow from "../components/auto-buff-row.view";

/**
 * 現在体力割合などの条件によって自動的に発動する自己バフの一覧。`self-buffs.tsx`（ユーザーが着脱を選ぶ
 * 自己バフ）とは別枠で表示する。ユーザー操作を持たない読み取り専用の表示のみで、条件を満たさなくなれば
 * 該当行は自動的に消える。
 *
 * 実際に計算へ反映されている効果（`perpetualStatus`由来、`autoActiveEffectsOf`）に加え、この計算機が
 * まだ計算に反映する仕組みを持たない「与えるスキルダメージ増加」効果の表示専用宣言
 * （`unresolvedGivenSkillDamageIncreaseEffectsOf`。docs/known-issues.md参照）もマージして表示する
 * （`AutoBuffGroup.unresolved`で区別し、`AutoBuffRow`側がその旨を注記する）
 */
const AutoSelfBuffs: React.FC = () => {
    const config = useSubjectStateStore(s => s.config);
    const hpRatio = useSubjectStateStore(s => s.hpRatio);
    const status = useSubjectStateStore(s => s.status);

    const groups = [
        ...autoActiveEffectsOf(status),
        ...unresolvedGivenSkillDamageIncreaseEffectsOf(config, hpRatio)
    ];

    return (
        groups.length == 0 ?
        <p><FormattedMessage id="app.buff-debuff.no-auto-self-buff" /></p> :
        <ul>
            {
                groups.map(group => (
                    <AutoBuffRow key={group.nameIntlID} nameIntlID={group.nameIntlID} effects={group.effects} unresolved={group.unresolved} />
                ))
            }
        </ul>
    );
};

export default AutoSelfBuffs;
