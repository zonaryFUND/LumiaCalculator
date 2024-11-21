import * as React from "react";
import Constants from "./constants.json";
import { ValuesProps } from "../../tooltip/subject-skill/expansion-values";
import { SubjectSkillProps } from "components/tooltip/subject-skill/props";

const assaultRifle: React.FC<SubjectSkillProps> = props => {
    const maxStack = Constants.assaultrifle.max_stack[props.skillLevel];

    return (
        <>
            基本攻撃で敵を攻撃するたびに銃弾1発あたり{Constants.assaultrifle.stack_gain}
            の過熱スタックを獲得します。(最大{maxStack}スタック)<br />
            {Constants.assaultrifle.stack_reduction_threshold}秒間基本攻撃をしない場合、1秒ごとに過熱スタックが
            {Constants.assaultrifle.stack_reduction}ずつ減少します。<br />
            <br />
            過熱スキルを使用すると、弾丸を即時装填して{Constants.assaultrifle.per_stack.duration}
            秒 ~ {Constants.assaultrifle.per_stack.duration * maxStack}秒間過熱効果を活性化します。<br />
            過熱状態では基本攻撃追加ダメージが0 ~ {Constants.assaultrifle.per_stack.basic_attack_addition * maxStack}、攻撃速度が
            {Constants.assaultrifle.attack_speed[props.skillLevel]}%増加します。効果が持続される間には攻撃速度制限を無視します。<br />
            過熱持続時間と基本攻撃追加ダメージはスタックされた過熱量に比例します。
        </>
    );
}

export default assaultRifle;

export const values: ValuesProps = {
    parameters: [
        {title: "攻撃速度", values: Constants.assaultrifle.attack_speed, percent: true},
        {title: "最大過熱重畳", values: Constants.assaultrifle.max_stack},
    ]
}