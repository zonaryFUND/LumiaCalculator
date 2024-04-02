import * as React from "react";
import { SubjectSkillProps } from "../props";
import Constants from "./constants.json";
import { ValuesProps } from "../values";

const t: React.FC<SubjectSkillProps> = props => (
    <>
        キアラはスキルに的中した敵に烙印を刻み、治癒効果を{Constants.T.healing_reduction[props.config.skillLevels.T]}
        ％減少させます。烙印は{Constants.T.duration}秒間維持され、最大{Constants.T.max_stack}
        スタックまで刻むことができます。烙印が最大スタックまで刻まれた対象に向かって移動する場合、移動速度が{Constants.T.movement_speed[props.config.skillLevels.T]}％増加します。
    </>
)

export default t;

export const values: ValuesProps = {
    parameters: [
        {title: "治癒効果減少量(％)", values: Constants.T.healing_reduction},
        {title: "移動速度増加量(％)", values: Constants.T.movement_speed}
    ]
}