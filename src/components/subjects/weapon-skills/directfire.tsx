import * as React from "react";
import Constants from "./constants.json";
import { ValuesProps } from "../../tooltip/subject-skill/expansion-values";
import Value from "components/tooltip/value";
import { SubjectSkillProps } from "components/tooltip/subject-skill/props";

const directfire: React.FC<SubjectSkillProps> = props => {
    return (
        <>
            一定範囲に{Constants.directfire.duration}秒間維持される鉄菱をまいて鉄菱を踏んだ敵に
            <Value skill="D" ratio={Constants.directfire.damage} />のスキルダメージを与えて
            {Constants.directfire.slow.duration}秒間移動速度を{Constants.directfire.slow.effect[props.skillLevel]}
            %減少させます。(鉄菱を踏むたびに{Constants.directfire.multiple_reduction}%ずつダメージが減少されます。)
        </>
    );
}

export default directfire;

export const values: ValuesProps = {
    parameters: [
        {title: "ダメージ量", values: Constants.directfire.damage.base},
        {title: "合計スキル増幅係数", values: Constants.directfire.damage.amp, percent: true},
        {title: "移動速度減少量(%)", values: Constants.directfire.slow.effect, percent: true},
    ]
}