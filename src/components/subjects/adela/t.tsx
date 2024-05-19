import * as React from "react";
import Constants from "./constants.json";
import { ValuesProps } from "../values";
import { additionalAmp } from "./status-override";
import { SubjectSkillProps } from "components/tooltip/subject-skill/props";
import { useValueContext } from "components/tooltip/value-context";

const t: React.FC<SubjectSkillProps> = props => {
    const { status, config } = useValueContext();

    return (
        <>
            アデラの基本攻撃の射程が{Constants.T.additional_attack_range}
            増加する代わりに攻撃速度が固定されます。攻撃速度が0.01増加するとスキル増幅が
            {Constants.T.amp_per_as[props.skillLevel]}増加します。<br />
            <br />
            現在のスキル増幅：{additionalAmp(status, config).toString()}
        </>
    );
}

export default t;

export const values: ValuesProps = {
    parameters: [
        {title: "スキル増幅", values: Constants.T.amp_per_as}
    ]
}