import * as React from "react";
import Damage from "../damage";
import { SubjectSkillProps } from "../props";
import Constants from "./constants.json";
import { ValuesProps } from "../values";

const q: React.FC<SubjectSkillProps> = props => (
    <>
        アヤが対象に向かって銃を2回発砲します。
        一発目の攻撃は<Damage skill="Q" constants={Constants.Q.first_damage} {...props} />の基本攻撃ダメージを、
        二発目の攻撃は<Damage skill="Q" constants={Constants.Q.second_damage} {...props} />のスキルダメージを
        与えてアヤの攻撃速度が{Constants.Q.attack_speed.duration}秒間{Constants.Q.attack_speed.effect[props.config.skillLevels.Q]}％増加します。
    </>
)

export default q;

export const values: ValuesProps = {
    additionalInfo: <>
        アヤの攻撃速度が{Constants.Q.threshold}以上の場合、攻撃速度に比例して
        キャスト時間と投射体の発射速度が速くなります。
    </>,
    parameters: [
        {title: "ダメージ量", values: Constants.Q.second_damage.base},
        {title: "攻撃速度増加量(％)", values: Constants.Q.attack_speed.effect, percent: true},
        {title: "クールダウン", values: Constants.Q.cooldown}
    ]
}