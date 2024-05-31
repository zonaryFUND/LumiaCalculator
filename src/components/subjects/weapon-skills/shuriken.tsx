import * as React from "react";
import Constants from "./constants.json";
import { ValuesProps } from "../values";
import Value from "components/tooltip/value";
import { SubjectSkillProps } from "components/tooltip/subject-skill/props";

const shuriken: React.FC<SubjectSkillProps> = props => {
    return (
        <>
            一定範囲に{Constants.shuriken.duration}秒間維持される鉄菱をまいて鉄菱を踏んだ敵に
            <Value skill="D" ratio={Constants.shuriken.damage} />のスキルダメージを与えて
            {Constants.shuriken.slow.duration}秒間移動速度を{Constants.shuriken.slow.effect[props.skillLevel]}
            %減少させます。(鉄菱を踏むたびに{Constants.shuriken.multiple_reduction}%ずつダメージが減少されます。)
        </>
    );
}

export default shuriken;

export const values: ValuesProps = {
    parameters: [
        {title: "ダメージ量", values: Constants.shuriken.damage.base},
        {title: "合計スキル増幅係数", values: Constants.shuriken.damage.amp, percent: true},
        {title: "移動速度減少量(%)", values: Constants.shuriken.slow.effect, percent: true},
    ]
}