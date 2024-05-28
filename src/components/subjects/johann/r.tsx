import * as React from "react";
import Constants from "./constants.json";
import Damage from "../damage";
import { ValuesProps } from "../values";
import { SubjectSkillProps } from "../props";

const r: React.FC<SubjectSkillProps> = props => (
    <>
        ヨハンの周りの敵を突き飛ばして<Damage skill="R" constants={Constants.R.damage} {...props} />のスキルダメージを与え、味方は
        <Damage skill="R" constants={Constants.R.heal} {...props} />の体力を回復します。<br />
        <br />
        以降、ヨハンは自分の周りに{Constants.R.duration}秒間聖域を作って味方の防御力を{Constants.R.defense[props.config.skillLevels.R]}
        増加させ、毎秒<Damage skill="R" constants={Constants.R.heal_per_sec} {...props} />の体力を回復させます。
    </>
);

export default r;

export const values: ValuesProps = {
    additionalInfo: <>
        使用中、ヨハンの移動速度が減少します。<br />
        再使用するとスキルをキャンセルできます。
    </>,
    parameters: [
        {title: "ダメージ量", values: Constants.E.damage.base},
        {title: "移動速度増加量(%)", values: Constants.E.movement_speed.effect.base, percent: true},
        {title: "追撃児移動速度(%)", values: Constants.E.self_movement_speed.base, percent: true},
        {title: "消費", values: Constants.E.sp_cost},
        {title: "クールダウン", values: Constants.E.cooldown}
    ]
}