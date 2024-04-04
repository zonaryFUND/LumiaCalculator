import * as React from "react";
import Constants from "./constants.json";
import Damage from "../damage";
import { ValuesProps } from "../values";
import { SubjectSkillProps } from "../props";

const w: React.FC<SubjectSkillProps> = props => {
    return (
        <>
            シルヴィアが正面の方にジャンプし、範囲内の敵に<Damage skill="W" constants={Constants.BikeW.damage} {...props} />
            のスキルダメージを与え、{Constants.BikeW.airborne}秒間空中に浮かせます。
        </>
    );
}

export default w;

export const values: ValuesProps = {
    parameters: [
        {title: "ダメージ量", values: Constants.BikeW.damage.base},
        {title: "クールダウン", values: Constants.BikeW.cooldown}
    ]
}
