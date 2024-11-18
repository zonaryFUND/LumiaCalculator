import * as React from "react";
import Constants from "./constants.json";
import { ValuesProps } from "../../tooltip/subject-skill/expansion-values";
import Value from "components/tooltip/value";
import { SubjectSkillProps } from "components/tooltip/subject-skill/props";

const whip: React.FC<SubjectSkillProps> = props => {
    return (
        <>
            鞭を2回振り回し、1回あたり<Value skill="D" ratio={Constants.whip.damage} />
            のスキルダメージを与えて、敵の移動速度を{Constants.whip.slow.duration}秒間
            {Constants.whip.slow.effect[props.skillLevel]}%減少させます。
        </>
    );
}

export default whip;

export const values: ValuesProps = {
    parameters: [
        {title: "ダメージ量", values: Constants.whip.damage.base},
        {title: "クールダウン", values: Constants.whip.cooldown},
        {title: "移動速度減少量(%)", values: Constants.whip.slow.effect, percent: true},
    ]
}