import * as React from "react";
import Damage from "../damage";
import Constants from "./constants.json";
import { SubjectSkillProps } from "../props";
import { ValuesProps } from "../values";

const e: React.FC<SubjectSkillProps> = props => (
    <>
        アロンソが対象を指定してマーキングします。<br />
        <br />
        しばらくしてから対象に向かって突進し、
        <Damage skill="E" constants={Constants.E.damage} {...props} />のスキルダメージを与えて
        {Constants.E.bind[props.config.skillLevels.E]}秒間束縛します。
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