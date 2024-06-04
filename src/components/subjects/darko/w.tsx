import * as React from "react";
import Value from "components/tooltip/value";
import Constants from "./constants.json";
import { ValuesProps } from "../values";
import { SubjectSkillProps } from "components/tooltip/subject-skill/props";

const w: React.FC<SubjectSkillProps> = props => (
    <>
        ダルコが<Value skill="W" ratio={Constants.W.shield} />のダメージを吸収するシールドを獲得し、
        {Constants.W.slow.duration}秒間周りにいる敵実験体たちの移動速度を{Constants.W.slow.effect[props.skillLevel]}%減少させます。<br />
        的中させた敵実験体1人あたり<Value skill="W" ratio={Constants.W.additional_shield} />のシールドを追加で獲得し、
        {Constants.W.attack.duration}秒間敵の攻撃力を{Constants.W.attack.effect[props.skillLevel]}盗みます。
    </>
)

export default w;

export const values: ValuesProps = {
    parameters: [
    ]
}