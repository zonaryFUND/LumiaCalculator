import * as React from "react";
import Constants from "./constants.json";
import Damage from "../damage";
import { ValuesProps } from "../values";
import { SubjectSkillProps } from "../props";

const e: React.FC<SubjectSkillProps> = props => {
    return (
        <>
            マーカスが指定した方向に{Constants.E.distance}m突進します。敵とぶつかると、<Damage skill="E" constants={Constants.E.damage} {...props} />のスキルダメージを与えて{Constants.E.knockback}m突き飛ばします。
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
