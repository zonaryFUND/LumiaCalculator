import * as React from "react";
import Value from "components/tooltip/value";
import Constants from "./constants.json";
import { ValuesProps } from "../values";
import { SubjectSkillProps } from "components/tooltip/subject-skill/props";

const q: React.FC<SubjectSkillProps> = props => (
    <>
        アヤが対象に向かって銃を2回発砲します。一発目の攻撃は
        <Value skill="Q" ratio={Constants.Q.first_damage} />
        の基本攻撃ダメージを、二発目の攻撃は<Value skill="Q" ratio={Constants.Q.second_damage} />
        のスキルダメージを与えてアヤの攻撃速度が{Constants.Q.attack_speed.duration}秒間
        {Constants.Q.attack_speed.effect[props.skillLevel]}%増加します。
    </>
)

export default q;

export const values: ValuesProps = {
    additionalInfo: <>
        アヤの攻撃速度が{Constants.Q.threshold}以上の場合、攻撃速度に比例してキャスト時間と投射体の発射速度が速くなります。
    </>,
    parameters: [
        {title: "ダメージ量", values: Constants.Q.second_damage.base},
        {title: "攻撃速度増加量(%)", values: Constants.Q.attack_speed.effect, percent: true},
        {title: "クールダウン", values: Constants.Q.cooldown}
    ]
}