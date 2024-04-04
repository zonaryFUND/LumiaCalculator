import * as React from "react";
import Constants from "./constants.json";
import Damage from "../damage";
import { ValuesProps } from "../values";
import { SubjectSkillProps } from "../props";

const q: React.FC<SubjectSkillProps> = props => {
    return (
        <>
            ウィルソンが指定した位置へ飛んで行きながら経路上の敵に<Damage skill="Q" constants={Constants.Q.first_damage} {...props} />
            のスキルダメージを与え、到着した後範囲内の敵に<Damage skill="Q" constants={Constants.Q.second_damage} {...props} />のスキルダメージを与えます。
        </>
    );
}

export default q;

export const values: ValuesProps = {
    parameters: [
        {title: "移動ダメージ", values: Constants.Q.first_damage.base},
        {title: "到着ダメージ", values: Constants.Q.second_damage.base},
        {title: "クールダウン", values: Constants.Q.cooldown}
    ]
}
