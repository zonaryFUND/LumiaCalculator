import * as React from "react";
import Constants from "./constants.json";
import Damage from "../damage";
import { ValuesProps } from "../values";
import { SubjectSkillProps } from "../props";

const e: React.FC<SubjectSkillProps> = props => {
    return (
        <>
            シルヴィアが指定した敵にバイクの前輪を上げた状態で突進し、<Damage skill="E" constants={Constants.BikeE.damage} {...props} />のスキルダメージを与えた後突き飛ばします。<br />
            バイクの移動速度に応じて0から最大{Constants.BikeE.ms_max_damage[props.config.skillLevels.E]}のダメージが追加されます。
        </>
    );
}

export default e;

export const values: ValuesProps = {
    parameters: [
        {title: "ダメージ量", values: Constants.BikeE.damage.base},
        {title: "クールダウン", values: Constants.BikeE.cooldown},
        {title: "移動速度比例ダメージ量", values: Constants.BikeE.ms_max_damage}
    ]
}
