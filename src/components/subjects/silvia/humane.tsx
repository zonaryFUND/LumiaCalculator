import * as React from "react";
import Constants from "./constants.json";
import Damage from "../damage";
import { ValuesProps } from "../values";
import { SubjectSkillProps } from "../props";

const e: React.FC<SubjectSkillProps> = props => {
    return (
        <>
            シルヴィアが指定した方向へスペアホィールを転がし、的中させた敵には距離に応じて<Damage skill="E" constants={Constants.HumanE.min_damage} {...props} />から最大
            <Damage skill="E" constants={Constants.HumanE.max_damage} {...props} />のスキルダメージを与えます。<br />
            敵が{Constants.HumanE.knockback_threshold}m以内でスキルに的中されると突き飛ばされます。<br />
            <br />
            {Constants.HumanE.knockback_threshold}m以上離れて敵を的中させた場合、的中させた距離に応じて
            {Constants.HumanE.fuel_gain.min} ~ {Constants.HumanE.fuel_gain.max}の燃料を獲得します。
        </>
    );
}

export default e;

export const values: ValuesProps = {
    parameters: [
        {title: "最小ダメージ量", values: Constants.HumanE.min_damage.base},
        {title: "最大ダメージ量", values: Constants.HumanE.max_damage.base},
        {title: "クールダウン", values: Constants.HumanE.cooldown},
        {title: "消費", values: Constants.HumanE.sp_cost},
    ]
}
