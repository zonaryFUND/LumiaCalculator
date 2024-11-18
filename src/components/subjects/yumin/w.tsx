import * as React from "react";
import Constants from "./constants.json";
import { ValuesProps } from "../../tooltip/subject-skill/expansion-values";
import Value from "components/tooltip/value";
import style from "components/tooltip/tooltip.module.styl";
import { SubjectSkillProps } from "components/tooltip/subject-skill/props";

const w: React.FC<SubjectSkillProps> = props => (
    <>
        ユミンが風を吹き飛ばして敵に<Value skill="W" ratio={Constants.W.damage} />のスキルダメージを与え、
        {Constants.W.slow.duration}秒間移動速度を{Constants.W.slow.effect[props.skillLevel]}%減少させます。<br />
        <br />
        風雲地帯でスキルを使用すると、より強い風を吹き飛ばして敵に<Value skill="W" ratio={Constants.W.enhanced_damage} />のスキルダメージを与えて後ろに押し出します。
    </>
);

export default w;

export const values: ValuesProps = {
    parameters: [
        {title: "ダメージ量", values: Constants.W.damage.base},
        {title: "[風雲地帯]ダメージ量", values: Constants.W.enhanced_damage.base},
        {title: "移動速度減少量(%)", values: Constants.W.slow.effect, percent: true},
        {title: "クールダウン", values: Constants.W.cooldown}
    ]
}