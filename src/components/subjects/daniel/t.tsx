import * as React from "react";
import { SubjectSkillProps } from "../props";
import Constants from "./constants.json";
import { ValuesProps } from "../values";

const t: React.FC<SubjectSkillProps> = props => (
    <>
        ダニエルは夜になると孤独な芸術家になり、他の実験体より夜の視界が{Constants.T.vision[props.config.skillLevels.T]}％増加し、移動速度が
        {Constants.T.movement_speed[props.config.skillLevels.T]}％増加します。
    </>
)

export default t;

export const values: ValuesProps = {
    parameters: [
        {title: "視界増加量", values: Constants.T.vision, percent: true},
        {title: "移動速度増加量(％)", values: Constants.T.movement_speed, percent: true}
    ]
}