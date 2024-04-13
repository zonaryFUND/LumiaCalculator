import * as React from "react";
import Damage from "../damage";
import { SubjectSkillProps } from "../props";
import Constants from "./constants.json";
import { ValuesProps } from "../values";

const e: React.FC<SubjectSkillProps> = props => (
    <>
        ビアンカが血液の輪をチャージして、前方に突進しながらスキルダメージを与えます。 チャージ時間{Constants.E.additional_cost.per}秒ごとに現在体力の
        {Constants.E.additional_cost.value}％を追加で消耗して、最大{Constants.E.max_charge}秒チャージができ、チャージは最大
        {Constants.E.charge_remain}秒まで維持できます。チャージ時間に応じて突進距離とダメージ範囲が増え、ダメージ量が
        <Damage skill="E" constants={Constants.E.min_damage} {...props} /> ~ <Damage skill="E" constants={Constants.E.max_damage} {...props} />
        まで増加します。{Constants.E.max_charge}秒以上チャージして的中した場合、<Damage skill="E" constants={Constants.E.heal} {...props} />
        の体力を回復します。複数の敵に的中した場合、追加で的中した敵一人ごとに回復量が{Constants.E.multiple_hit_heal_amp}％増加します。
    </>
)

export default e;

export const values: ValuesProps = {
    parameters: [
        {title: "最小ダメージ量", values: Constants.E.min_damage.base},
        {title: "最大ダメージ量", values: Constants.E.max_damage.base},
        {title: "体力回復量", values: Constants.E.heal.base},
        {title: "クールダウン", values: Constants.E.cooldown}
    ]
}