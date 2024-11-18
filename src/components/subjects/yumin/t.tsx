import * as React from "react";
import Constants from "./constants.json";
import { ValuesProps } from "../../tooltip/subject-skill/expansion-values";
import { SubjectSkillProps } from "components/tooltip/subject-skill/props";
import Value from "components/tooltip/value";
import style from "components/tooltip/tooltip.module.styl";

const t: React.FC<SubjectSkillProps> = props => (
    <>
        ユミンは風雲地帯にいる時、移動速度が{Constants.T.movement_speed}%増加します。<br />
        <br />
        風雲地帯で<span className={style.emphasis}>風刃</span>または<span className={style.emphasis}>旋風</span>
        を使用すると、風雲地帯が消える代わりに{Constants.T.shield_duration}秒間<Value skill="T" ratio={Constants.T.shield} />のダメージを吸収するシールドを獲得します。
    </>
);

export default t;

export const values: ValuesProps = {
    parameters: [
        {title: "シールド吸収量", values: Constants.T.shield.base}
    ]
}