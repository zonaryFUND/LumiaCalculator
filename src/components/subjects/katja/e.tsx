import * as React from "react";
import Constants from "./constants.json";
import Value from "components/tooltip/value";
import { ValuesProps } from "../../tooltip/subject-skill/expansion-values";
import { SubjectSkillProps } from "components/tooltip/subject-skill/props";

const e: React.FC<SubjectSkillProps> = props => {
    return (
        <>
            カティアが前方に弾丸を発射し、<Value skill="E" ratio={Constants.E.damage} />のスキルダメージを与えて後ろに下がります。<br />
            <br />
            敵に的中した場合には移動速度を{Constants.E.slow.duration}秒間{Constants.E.slow.effect[props.skillLevel]}
            %減少させ、カティアの移動速度が{Constants.E.movement_speed.duration}
            秒間{Constants.E.movement_speed.effect}%増加します。
        </>
    );
}

export default e;

export const values: ValuesProps = {
    parameters: [
        {title: "ダメージ量", values: Constants.E.damage.base},
        {title: "移動速度減少量(%)", values: Constants.E.slow.effect, percent: true},
        {title: "クールダウン", values: Constants.E.cooldown}
    ]
}
