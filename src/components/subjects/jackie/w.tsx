import * as React from "react";
import Constants from "./constants.json";
import Damage from "../damage";
import { ValuesProps } from "../values";
import { SubjectSkillProps } from "../props";

const maxHeal = {
    base: Constants.W.heal.base.map(v => v * 2),
    attack: Constants.W.heal.attack * 2
}

const w: React.FC<SubjectSkillProps> = props => (
    <>
        ジャッキーがアドレナリンを活性化させ、移動速度が{Constants.W.movement_speed.effect[props.config.skillLevels.W]}
        ％増加した後{Constants.W.movement_speed.duration}秒にわたって減少します。アドレナリン活性化中に出血状態の敵に向かって移動すると移動速度が追加で
        {Constants.W.movement_speed.effect[props.config.skillLevels.W]}％増加し、出血状態の敵に基本攻撃が的中すると自分の失った体力に比例して
        <Damage skill="W" constants={Constants.W.heal} {...props} /> ~ <Damage skill="W" constants={maxHeal} {...props} />の体力を回復します。
    </>
);

export default w;

export const values: ValuesProps = {
    additionalInfo: <>体力回復量は自分の現在体力が最大体力の{Constants.W.heal_max_hp}％の場合に最大になります。</>,
    parameters: [
        {title: "追撃時移動速度(％)", values: Constants.W.movement_speed.effect, percent: true},
        {title: "体力回復量", values: Constants.W.heal.base},
        {title: "消費", values: Constants.W.sp_cost}
    ]
}