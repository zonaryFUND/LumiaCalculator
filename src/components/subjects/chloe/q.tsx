import * as React from "react";
import Value from "components/tooltip/value";
import Constants from "./constants.json";
import { ValuesProps } from "../values";
import { SubjectSkillProps } from "components/tooltip/subject-skill/props";

const q: React.FC<SubjectSkillProps> = props => (
    <>
        クロエがニナに攻撃命令を指示すると、ニナは周りの敵を刃の足で斬りつけ
        <Value skill="Q" ratio={Constants.Q.damage} overrideExpression={{summonedAttack: {format: "ニナの攻撃力の{ratio}%"}}} />
        のスキルダメージを与え、敵の移動速度を{Constants.Q.slow.duration}秒間{Constants.Q.slow.effect[props.skillLevel]}%減少させます。
    </>
)

export default q;

export const values: ValuesProps = {
    parameters: [
        {title: "[ニナ]ダメージ量", values: Constants.Q.damage.base},
        {title: "敵移動速度減少", values: Constants.Q.slow.effect, percent: true},
        {title: "消費", values: Constants.Q.sp_cost}
    ]
}