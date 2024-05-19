import * as React from "react";
import Constants from "./constants.json";
import { ValuesProps } from "../values";
import { SubjectSkillProps } from "components/tooltip/subject-skill/props";

const t: React.FC<SubjectSkillProps> = props => (
    <>
        エキオンは武器を装備したり解除することができません。カドモスの呼び声のレベルが上がると、{Constants.T0.upgrade}秒間操作不可状態になり、自分の武器を強化します。
    </>
);

export default t;

export const values: ValuesProps = {
    additionalInfo: <>強化したそれぞれの武器の効果はVF暴走(R)スキルのレベルに応じて増加します。</>,
    parameters: []
}