import * as React from "react";
import Constants from "./constants.json";
import Value from "components/tooltip/value";
import { ValuesProps } from "../values";
import { SubjectSkillProps } from "components/tooltip/subject-skill/props";

const dict = {
    stack: {
        format: "野生スタックダメージ"
    }
}

const r: React.FC<SubjectSkillProps> = props => (
    <>
        {Constants.R.duration}秒間、基本攻撃を{Constants.R.count}回するたびにオオカミを呼び出して敵を攻撃します。オオカミは対象に飛びかかって
        <Value skill="R" ratio={Constants.R.damage} overrideExpression={dict} />のスキルダメージを与え、攻撃速度
        {Constants.R.attack_speed}%と移動速度{Constants.R.movement_speed}
        %を減少させます。敵実験体のキルに関与した場合、持続時間が{Constants.R.extend}秒増加します。
    </>
);

export default r;

export const values: ValuesProps = {
    parameters: [
        {title: "ダメージ量", values: Constants.R.damage.base},
        {title: "クールダウン", values: Constants.R.cooldown}
    ]
}