import * as React from "react";
import Constants from "./constants.json";
import Value from "components/tooltip/value";
import { ValuesProps } from "../values";
import { SubjectSkillProps } from "components/tooltip/subject-skill/props";

const e: React.FC<SubjectSkillProps> = props => {
    return (
        <>
            マーカスが指定した方向に{Constants.E.distance}m突進します。敵とぶつかると、
            <Value skill="E" ratio={Constants.E.damage} />のスキルダメージを与えて{Constants.E.knockback}m突き飛ばします。
        </>
    );
}

export default e;

export const values: ValuesProps = {
    additionalInfo: <>このスキルは壁を越えられません。</>,
    parameters: [
        {title: "ダメージ量", values: Constants.E.damage.base},
        {title: "消費", values: Constants.E.sp_cost},
        {title: "クールダウン", values: Constants.E.cooldown}
    ]
}
