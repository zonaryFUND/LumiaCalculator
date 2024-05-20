import * as React from "react";
import Constants from "./constants.json";
import Value from "components/tooltip/value";
import { ValuesProps } from "../values";
import { SubjectSkillProps } from "components/tooltip/subject-skill/props";

const q: React.FC<SubjectSkillProps> = props => {
    return (
        <>
            シルヴィアが対象を指定し、スピードガンで経路上の敵に<Value skill="Q" ratio={Constants.HumanQ.damage} />
            のスキルダメージを与え、経路上のチーム員には<Value skill="Q" ratio={Constants.HumanQ.heal} />の体力を回復させます。<br />
            <br />
            シルヴィアはスキルを的中させた対象1人あたり{Constants.HumanQ.fuel_gain}の燃料を獲得します。
        </>
    );
}

export default q;

export const values: ValuesProps = {
    parameters: [
        {title: "ダメージ量", values: Constants.HumanQ.damage.base},
        {title: "体力回復量", values: Constants.HumanQ.heal.base},
        {title: "クールダウン", values: Constants.HumanQ.cooldown},
        {title: "消費", values: Constants.HumanQ.sp_cost},
    ]
}
