import * as React from "react";
import Value from "components/tooltip/value";
import Constants from "./constants.json";
import { ValuesProps } from "../values";
import { SubjectSkillProps } from "components/tooltip/subject-skill/props";

const rangeQ: React.FC<SubjectSkillProps> = props => (
    <>
        アレックスがコイルガンを発射し、的中した敵に<Value skill="Q" ratio={Constants.RangeQ.damage} />
        のスキルダメージを与えます。<br />
        スキルが的中すると{Constants.RangeQ.attack_up.duration}秒間攻撃力が
        {Constants.RangeQ.attack_up.effect}増加します。（最大{Constants.RangeQ.attack_up.max_stack}回スタック）<br />
        奇襲の効果と同時に最大スタックになると、攻撃速度が{Constants.common.q_stack_max_as}%増加します。
    </>
);

export default rangeQ;

export const values: ValuesProps = {
    parameters: [
        {title: "ダメージ量", values: Constants.RangeQ.damage.base},
        {title: "クールダウン", values: Constants.RangeQ.cooldown},
    ]
}