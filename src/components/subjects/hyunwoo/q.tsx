import * as React from "react";
import Constants from "./constants.json";
import Damage from "../damage";
import { ValuesProps } from "../values";
import { SubjectSkillProps } from "../props";

const q: React.FC<SubjectSkillProps> = props => {
    return (
        <>
            ヒョヌが指定した位置を強く踏んで、敵に<Damage skill="Q" constants={Constants.Q.damage} {...props} />のスキルダメージを与え、
            {Constants.Q.slow.duration}秒間移動速度を{Constants.Q.slow.effect}％減少させます。敵にスキルを的中させた場合にはヒョヌの移動速度が
            {Constants.Q.movement_speed.duration}秒間{Constants.Q.movement_speed.effect[props.config.skillLevels.Q]}％増加します。
        </>
    );
}

export default q;

export const values: ValuesProps = {
    parameters: [
        {title: "ダメージ量", values: Constants.Q.damage.base},
        {title: "移動速度増加量(％)", values: Constants.Q.movement_speed.effect},
        {title: "クールダウン", values: Constants.Q.cooldown},
        {title: "消費", values: Constants.Q.sp_cost}
    ]
}
