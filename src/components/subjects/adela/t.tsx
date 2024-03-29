import * as React from "react";
import { SubjectSkillProps } from "../props";
import Constants from "./constants.json";
import { ValuesProps } from "../values";
import Decimal from "decimal.js";
import { baseStatus } from "@app/entity/base-status";
import { additionalAmp } from "./status-override";

const t: React.FC<SubjectSkillProps> = props => {
    return (
        <>
            アデラの基本攻撃の射程が{Constants.T.additional_attack_range}
            増加する代わりに攻撃速度が固定されます。攻撃速度が0.01増加するとスキル増幅が
            {Constants.T.amp_per_as[props.config.skillLevels.T]}増加します。<br />
            <br />
            現在のスキル増幅：{additionalAmp(props.status, props.config).toString()}
        </>
    );
}

export default t;

export const values: ValuesProps = {
    parameters: [
        {title: "スキル増幅", values: Constants.T.amp_per_as}
    ]
}