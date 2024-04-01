import * as React from "react";
import Constants from "./constants.json";
import Damage from "../damage";
import { ValuesProps } from "../values";
import { SubjectSkillProps } from "../props";

const q: React.FC<SubjectSkillProps> = props => {
    return (
        <>
            エレナが前方の敵に<Damage skill="Q" constants={Constants.Q.first_damage} {...props} />
            のスキルダメージを与えます。一定時間後、氷が爆発しながら同じ範囲に<Damage skill="Q" constants={Constants.Q.second_damage} {...props} />
            のスキルダメージをもう一度与え、冬の女王の領地のクールダウンが{Constants.Q.cooldown_reduction}％減少します。
        </>
    );
}

export default q;

export const values: ValuesProps = {
    parameters: [
        {title: "1打ダメージ量", values: Constants.Q.first_damage.base},
        {title: "2打ダメージ量", values: Constants.Q.second_damage.base},
        {title: "クールダウン", values: Constants.Q.cooldown},
        {title: "消費", values: Constants.Q.sp_cost}
    ]
}
