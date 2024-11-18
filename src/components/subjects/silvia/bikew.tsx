import * as React from "react";
import Constants from "./constants.json";
import Value from "components/tooltip/value";
import { ValuesProps } from "../../tooltip/subject-skill/expansion-values";
import { SubjectSkillProps } from "components/tooltip/subject-skill/props";

const w: React.FC<SubjectSkillProps> = props => {
    return (
        <>
            シルヴィアが正面の方にジャンプし、範囲内の敵に<Value skill="W" ratio={Constants.BikeW.damage} />
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
