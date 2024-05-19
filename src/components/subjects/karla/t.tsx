import * as React from "react";
import Constants from "./constants.json";
import Value from "components/tooltip/value";
import { ValuesProps } from "../values";
import { SubjectSkillProps } from "components/tooltip/subject-skill/props";

const t: React.FC<SubjectSkillProps> = props => (
    <>
        カーラは最大攻撃速度が{Constants.T.max_attack_speed}に制限される代わりに、制限を超えた攻撃速度0.01ごとにスキル増幅{Constants.T.amp_conversion}が増加します。<br />
        <br />
        カーラは{Constants.T.charge_time[props.skillLevel]}秒間装填ゲージをチャージし、チャージされなかった基本攻撃は装填ゲージを一部消耗して
        <Value skill="T" ratio={Constants.T.damage} {...props} />のスキルダメージを与えます。チャージが完了した基本攻撃は装填ゲージをすべて消耗し、
        <Value skill="T" ratio={Constants.T.full_charge_damage} {...props} />のスキルダメージを与えて
        {Constants.T.slow.duration}秒間移動速度を{Constants.T.slow.effect}%減少させ、つながっていないスピアを地面に設置します。
    </>
);

export default t;

export const values: ValuesProps = {
    additionalInfo: <>カーラの基本攻撃は自動で発射されません。</>,
    parameters: [
        {title: "チャージ未完了ダメージ量", values: Constants.T.damage.base},
        {title: "チャージ完了ダメージ量", values: Constants.T.full_charge_damage.base},
        {title: "最大体力ダメージ(%)", values: Constants.T.full_charge_damage.targetMaxHP, percent: true},
        {title: "チャージ時間", values: Constants.T.charge_time}
    ]
}
