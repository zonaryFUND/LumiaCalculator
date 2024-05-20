import * as React from "react";
import Constants from "./constants.json";
import Value from "components/tooltip/value";
import { ValuesProps } from "../values";
import { SubjectSkillProps } from "components/tooltip/subject-skill/props";

const maxHeal = {
    base: Constants.W.heal.base.map(v => v * 2),
    attack: Constants.W.heal.attack * 2
}

const w: React.FC<SubjectSkillProps> = props => (
    <>
        ジャッキーがアドレナリンを活性化させ、移動速度が{Constants.W.movement_speed.effect[props.skillLevel]}
        %増加した後{Constants.W.movement_speed.duration}秒にわたって減少します。アドレナリン活性化中に出血状態の敵に向かって移動すると移動速度が追加で
        {Constants.W.movement_speed.effect[props.skillLevel]}%増加し、出血状態の敵に基本攻撃が的中すると自分の失った体力に比例して
        <Value skill="W" ratio={Constants.W.heal} /> ~ <Value skill="W" ratio={maxHeal} />の体力を回復します。
    </>
);

export default w;

export const values: ValuesProps = {
    additionalInfo: <>体力回復量は自分の現在体力が最大体力の{Constants.W.heal_max_hp}%の場合に最大になります。</>,
    parameters: [
        {title: "追撃時移動速度(%)", values: Constants.W.movement_speed.effect, percent: true},
        {title: "体力回復量", values: Constants.W.heal.base},
        {title: "消費", values: Constants.W.sp_cost}
    ]
}