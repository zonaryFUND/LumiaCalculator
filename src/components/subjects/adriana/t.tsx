import * as React from "react";
import Constants from "./constants.json";
import { ValuesProps } from "../values";
import Value from "components/tooltip/value";
import style from "components/tooltip/tooltip.module.styl";
import { SubjectSkillProps } from "components/tooltip/subject-skill/props";

const t: React.FC<SubjectSkillProps> = props => (
    <>
        アドリアナはスキルでダメージを与えると敵を燃やし、<span className={style.emphasis}>火傷</span>
        状態にさせます。火傷状態の敵は{Constants.T.duration}秒<Value skill="T" ratio={Constants.T.damage} />
        のスキルダメージを受け、持続時間の間防御力が{Constants.T.defense_reduction[props.skillLevel]}
        %減少します。火傷状態の敵は{Constants.T.immune}秒間再び火傷状態になりません。
    </>
)

export default t;

export const values: ValuesProps = {
    parameters: [
        {title: "[火傷]ダメージ量", values: Constants.T.damage.base},
        {title: "防御力減少量(%)", values: Constants.T.defense_reduction}
    ]
}