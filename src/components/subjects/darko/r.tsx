import * as React from "react";
import Value from "components/tooltip/value";
import Constants from "./constants.json";
import { ValuesProps } from "../../tooltip/subject-skill/expansion-values";
import style from "components/tooltip/tooltip.module.styl";
import { SubjectSkillProps } from "components/tooltip/subject-skill/props";

const r: React.FC<SubjectSkillProps> = props => (
    <>
        ダルコが敵の胸ぐらを掴んで制圧し、そのまま引きずって行った後、地面に投げつけます。<br />
        この時、周りにいる敵に<Value skill="R" ratio={Constants.R.damage} overrideExpression={{targetMaxHP: {format: "捕まえた対象の最大体力の{ratio}%", className: style.maxhp}}} />のスキルダメージを与えて
        {Constants.R.slow.duration}秒間移動速度を{Constants.R.slow.effect}%減少させます。
    </>
)

export default r;

export const values: ValuesProps = {
    parameters: [
        {title: "ダメージ量", values: Constants.R.damage.base},
        {title: "クールダウン", values: Constants.R.cooldown}
    ]
}