import * as React from "react";
import Constants from "./constants.json";
import Value from "components/tooltip/value";
import { ValuesProps } from "../values";
import style from "components/tooltip/tooltip.module.styl";
import { SubjectSkillProps } from "components/tooltip/subject-skill/props";

const r: React.FC<SubjectSkillProps> = props => (
    <>
        テオドールがエネルギーを最大限まで引き上げ、指定した方向に{Constants.R.duration}秒間維持される
        <span className={style.emphasis}>エネルギーフィールド</span>を形成し、同じ方向に移動する味方の移動速度を
        {Constants.R.movement_speed[props.skillLevel]}%増加させ、強力なエネルギー波動を発射して敵に
        <Value skill="R" ratio={Constants.R.damage} />のスキルダメージを与えます。<br />
        <br />
        エネルギー波動発射後、テオドールは<span className={style.emphasis}>ハイパーチャージ状態</span>になり、攻撃速度が
        {Constants.R.hypercharge_duration}秒間{Constants.R.attack_speed[props.skillLevel]}%増加し、
        <span className={style.emphasis}>エネルギー砲</span>の最大チャージ時間が{Constants.R.hypercharge_q_charge}秒に減少します。
    </>
);

export default r;

export const values: ValuesProps = {
    parameters: [
        {title: "移動速度増加量(%)", values: Constants.R.movement_speed, percent: true},
        {title: "ダメージ量", values: Constants.R.damage.base},
        {title: "攻撃速度増加量(%)", values: Constants.R.attack_speed, percent: true},
        {title: "クールダウン", values: Constants.R.cooldown},
        {title: "消費", values: Constants.R.sp_cost}
    ]
}