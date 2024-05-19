import * as React from "react";
import Value from "components/tooltip/value";
import Constants from "./constants.json";
import { ValuesProps } from "../values";
import { SubjectSkillProps } from "components/tooltip/subject-skill/props";

const e: React.FC<SubjectSkillProps> = props => (
    <>
        アロンソが対象を指定してマーキングします。<br />
        <br />
        しばらくしてから対象に向かって突進し、
        <Value skill="E" ratio={Constants.E.damage} />のスキルダメージを与えて
        {Constants.E.bind[props.skillLevel]}秒間束縛します。
    </>
);

export default e;

export const values: ValuesProps = {
    additionalInfo: <>突進する前に対象が遠くなったり消えた場合には突進せず、クールダウンが一部返されます。</>,
    parameters: [
        {title: "ダメージ量", values: Constants.E.damage.base},
        {title: "束縛持続時間", values: Constants.E.bind},
        {title: "クールダウン", values: Constants.E.cooldown},
        {title: "消費", values: Constants.E.sp_cost}
    ]
}