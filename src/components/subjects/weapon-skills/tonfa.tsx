import * as React from "react";
import Constants from "./constants.json";
import { ValuesProps } from "../../tooltip/subject-skill/expansion-values";
import { SubjectSkillProps } from "components/tooltip/subject-skill/props";

const tonfa: React.FC<SubjectSkillProps> = props => {
    return (
        <>
            スキルを使用すると{Constants.tonfa.duration}秒間すべての方向からのダメージを防御し、攻撃した対象から受けたダメージの
            {Constants.tonfa.reflected_ratio[props.skillLevel]}%を固定ダメージで返します。(攻撃の効果は防御できません。)
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