import * as React from "react";
import Constants from "./constants.json";
import Damage from "../damage";
import { ValuesProps } from "../values";
import { SubjectSkillProps } from "../props";

const q: React.FC<SubjectSkillProps> = props => (
    <>
        指定した方向へソースを投げて的中した対象に<Damage skill="Q" constants={Constants.Q.damage} {...props} />
        のスキルダメージを与えます。ソースは的中した場所に残り、その領域内にいる敵の移動速度を{Constants.Q.slow[props.config.skillLevels.Q]}％減少させます。
    </>
);

export default q;

export const values: ValuesProps = {
    parameters: [
        {title: "ダメージ量", values: Constants.Q.damage.base},
        {title: "消費", values: Constants.Q.hp_cost},
        {title: "移動速度減少量(％)", values: Constants.Q.slow, percent: true}
    ]
}