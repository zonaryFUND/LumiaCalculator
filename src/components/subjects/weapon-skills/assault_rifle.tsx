import * as React from "react";
import Constants from "./constants.json";
import { ValuesProps } from "../values";
import { skillLevel } from "../skill-damage";
import { SubjectSkillProps } from "components/tooltip/subject-skill/props";

const assaultRifle: React.FC<SubjectSkillProps> = props => {
    const maxStack = Constants.assault_rifle.max_stack[props.skillLevel];

    return (
        <>
            基本攻撃で敵を攻撃するたびに銃弾1発あたり{Constants.assault_rifle.stack_gain}
            の過熱スタックを獲得します。(最大{maxStack}スタック)<br />
            {Constants.assault_rifle.stack_reduction_threshold}秒間基本攻撃をしない場合、1秒ごとに過熱スタックが
            {Constants.assault_rifle.stack_reduction}ずつ減少します。<br />
            <br />
            過熱スキルを使用すると、弾丸を即時装填して{Constants.assault_rifle.per_stack.duration}
            秒 ~ {Constants.assault_rifle.per_stack.duration * maxStack}秒間過熱効果を活性化します。<br />
            過熱状態では基本攻撃追加ダメージが0 ~ {Constants.assault_rifle.per_stack.basic_attack_addition * maxStack}、攻撃速度が
            {Constants.assault_rifle.attack_speed[props.skillLevel]}%増加します。効果が持続される間には攻撃速度制限を無視します。<br />
            過熱持続時間と基本攻撃追加ダメージはスタックされた過熱量に比例します。
        </>
    );
}

export default assaultRifle;

export const values: ValuesProps = {
    parameters: [
        {title: "攻撃速度", values: Constants.assault_rifle.attack_speed, percent: true},
        {title: "最大過熱重畳", values: Constants.assault_rifle.max_stack},
    ]
}