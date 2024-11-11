import * as React from "react";
import Constants from "./constants.json";
import Value from "components/tooltip/value";
import { ValuesProps } from "../values";
import color from "./color.module.styl";
import { values as baseValues } from "./q";
import { SubjectSkillProps } from "components/tooltip/subject-skill/props";

const q: React.FC<SubjectSkillProps> = props => (
    <>
        ティアが筆を振り下ろして敵に<Value skill="Q" ratio={Constants.Q.damage} />
        のスキルダメージを与え、筆先に的中された対象に<span className={color.blue}>青色</span>の絵の具を塗って{Constants.Q.b.slow.duration}秒間移動速度を
        {Constants.Q.b.slow.effect}%減少させます。攻撃範囲の一番内側の領域に当たった敵には
        <Value skill="Q" ratio={Constants.Q.b.center_addition} />のスキルダメージを追加で与えて
        {Constants.Q.b.center_slow.duration}秒間移動速度を{Constants.Q.b.center_slow.effect}%減少させます。
    </>
);

export default q;

export const values: ValuesProps = {
    parameters: baseValues.parameters.concat({
        title: "追加ダメージ量", values: Constants.Q.b.center_addition.base
    })
}