import * as React from "react";
import Constants from "./constants.json";
import Damage from "../damage";
import { ValuesProps } from "../values";
import { SubjectSkillProps } from "../props";

const q: React.FC<SubjectSkillProps> = props => {
    return (
        <>
            地面を叩いて石を打ち飛ばし、対象に<Damage skill="Q" constants={Constants.Q.damage} {...props} />のスキルダメージを与えます。石に当たった対象は
            {Constants.Q.slow.duration}秒間移動速度が{Constants.Q.slow.effect[props.config.skillLevels.Q]}％減少します。減少した移動速度は一定時間にわたって徐々に回復します。
        </>
    );
}

export default q;

export const values: ValuesProps = {
    parameters: [
        {title: "ダメージ量", values: Constants.Q.damage.base},
        {title: "移動速度減少量(％)", values: Constants.Q.slow.effect, percent: true},
        {title: "クールダウン", values: Constants.Q.cooldown},
        {title: "消費", values: Constants.Q.sp_cost}
    ]
}
