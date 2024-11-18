import * as React from "react";
import Constants from "./constants.json";
import Value from "components/tooltip/value";
import { ValuesProps } from "../../tooltip/subject-skill/expansion-values";
import { SubjectSkillProps } from "components/tooltip/subject-skill/props";

const w: React.FC<SubjectSkillProps> = props => {
    return (
        <>
            マイがショールで身を包むベールを作って{Constants.W.duration}秒間基本攻撃のダメージを{Constants.W.basic_attack_damage}しか受けない状態になり、移動速度が最大
            {Constants.W.movement_speed[props.skillLevel]}%まで徐々に増加して、防御力が{Constants.W.defense[props.skillLevel]}
            %増加します。持続時間が終わる時、範囲内の敵に<Value skill="W" ratio={Constants.W.damage} />のスキルダメージを与えます。<br />
            最大{Constants.W.charge.max}回までチャージされ、基本攻撃をするたびにチャージ時間が{Constants.W.charge_time_reduction}秒減少します。
        </>
    );
}

export default w;

export const values: ValuesProps = {
    parameters: [
        {title: "ダメージ量", values: Constants.W.damage.base},
        {title: "移動速度減少量(%)", values: Constants.W.movement_speed, percent: true},
        {title: "防御力増加量(%)", values: Constants.W.defense, percent: true},
        {title: "チャージ時間", values: Constants.W.charge.time}
    ]
}
