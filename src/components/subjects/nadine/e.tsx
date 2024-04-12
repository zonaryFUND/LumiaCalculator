import * as React from "react";
import Constants from "./constants.json";
import Damage from "../damage";
import { ValuesProps } from "../values";
import { SubjectSkillProps } from "../props";
import { StackName } from "./stack";
import style from "components/tooltip/tooltip.module.styl";

const e: React.FC<SubjectSkillProps> = props => (
    <>
        ナディンが指定した位置にワイヤーを発射します。設置したワイヤーは{Constants.E.duration}秒間{Constants.E.wire_length}
        m以内では維持され、ワイヤーが設置されている間攻撃速度が{Constants.E.attack_speed[props.config.skillLevels.E]}
        ％増加します。もう一度使用するとワイヤーを引っ張ってナディンが移動します。
    </>
);

export default e;

export const values: ValuesProps = {
    parameters: [
        {title: "追加攻撃速度(％)", values: Constants.E.attack_speed, percent: true},
        {title: "クールダウン", values: Constants.E.cooldown},
        {title: "消費", values: Constants.E.sp_cost}
    ]
}