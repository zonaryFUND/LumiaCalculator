import * as React from "react";
import Constants from "./constants.json";
import Value from "components/tooltip/value";
import { ValuesProps } from "../values";
import { SubjectSkillProps } from "components/tooltip/subject-skill/props";

const t: React.FC<SubjectSkillProps> = props => (
    <>
        敵にスキルが的中すると{Constants.T.duration}秒間持続する死神の目刻印を付与し、対象の視界を獲得します。また、ザヒルは
        {Constants.T.movement_speed.effect[props.skillLevel]}%の移動速度が増加し、{Constants.T.movement_speed.duration}秒間次第に減少します。<br />
        <br />
        死神の目刻印がある敵にスキルを的中させると敵の刻印を消耗して<Value skill="T" ratio={Constants.T.damage} />のスキルダメージを与え、使用したスキルの死神の目効果が適用されます。
    </>
);

export default t;

export const values: ValuesProps = {
    parameters: [
        {title: "ダメージ量", values: Constants.T.damage.base},
        {title: "移動速度増加量", values: Constants.T.movement_speed.effect, percent: true}
    ]
}