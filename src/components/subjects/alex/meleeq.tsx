import * as React from "react";
import Value from "components/tooltip/value";
import Constants from "./constants.json";
import { ValuesProps } from "../values";
import { SubjectSkillProps } from "components/tooltip/subject-skill/props";

const meleeQ: React.FC<SubjectSkillProps> = props => (
    <>
        アレックスが対象に素早く突進して<Value skill="Q" ratio={Constants.MeleeQ.damage} />のスキルダメージを与えます。<br />
        スキルが的中すると{Constants.MeleeQ.attack_up.duration}秒間攻撃力が{Constants.MeleeQ.attack_up.effect}
        増加します。（最大{Constants.MeleeQ.attack_up.max_stack}回スタック）<br />
        コイルガンの効果と同時に最大スタックになると、攻撃速度が{Constants.common.q_stack_max_as}%増加します。
    </>
);

export default meleeQ;

export const values: ValuesProps = {
    parameters: [
        {title: "ダメージ量", values: Constants.MeleeQ.damage.base},
        {title: "クールダウン", values: Constants.MeleeQ.cooldown},
    ]
}