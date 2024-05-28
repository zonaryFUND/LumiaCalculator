import * as React from "react";
import Constants from "./constants.json";
import { SubjectSkillProps } from "../props";
import { ValuesProps } from "../values";
import { skillLevel } from "../skill-damage";

const tonfa: React.FC<SubjectSkillProps> = props => {
    const level = skillLevel("D", props.config);

    return (
        <>
            スキルを使用すると{Constants.tonfa.duration}秒間すべての方向からのダメージを防御し、攻撃した対象から受けたダメージの
            {Constants.tonfa.reflected_ratio[level]}%を固定ダメージで返します。(攻撃の効果は防御できません。)
        </>
    );
}

export default tonfa;

export const values: ValuesProps = {
    parameters: [
        {title: "合計反射率", values: Constants.tonfa.reflected_ratio, percent: true},
        {title: "クールダウン", values: Constants.tonfa.cooldown},
    ]
}