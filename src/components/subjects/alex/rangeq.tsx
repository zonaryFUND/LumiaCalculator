import * as React from "react";
import Damage from "../damage";
import Constants from "./constants.json";
import { SubjectSkillProps } from "../props";
import { ValuesProps } from "../values";

const rangeQ: React.FC<SubjectSkillProps> = props => (
    <>
        アレックスがコイルガンを発射し、的中した敵に<Damage skill="Q" constants={Constants.RangeQ.damage} {...props} />
        のスキルダメージを与えます。<br />
        スキルが的中すると{Constants.RangeQ.attack_up.duration}秒間攻撃力が
        {Constants.RangeQ.attack_up.effect}増加します。
        （最大{Constants.RangeQ.attack_up.max_stack}回スタック）<br />
        奇襲の効果と同時に最大スタックになると、攻撃速度が{Constants.common.q_stack_max_as}％増加します。
    </>
);

export default rangeQ;

export const values: ValuesProps = {
    parameters: [
        {title: "ダメージ量", values: Constants.RangeQ.damage.base},
        {title: "クールダウン", values: Constants.RangeQ.cooldown},
    ]
}