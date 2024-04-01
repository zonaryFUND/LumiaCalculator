import * as React from "react";
import Constants from "./constants.json";
import Damage from "../damage";
import { ValuesProps } from "../values";
import { SubjectSkillProps } from "../props";
import style from "components/tooltip/tooltip.module.styl";

const t: React.FC<SubjectSkillProps> = props => (
    <>
        エイデンがスキルを敵に的中させると<span className={style.emphasis}>アンペア</span>を獲得します。<br />
        <br />
        すべての<span className={style.emphasis}>アンペア</span>をチャージした際、周りに敵がいなかったり、<span className={style.emphasis}>バックステップ</span>を使用すると
        {Constants.T.duration}秒間<span className={style.emphasis}>ハイパーチャージ</span>状態になります。<br />
        この時、<span className={style.emphasis}>アンペア</span>は<span className={style.emphasis}>弾丸</span>に切り替わり、基本攻撃が遠距離攻撃に変更されます。<br />
        <br />
        <span className={style.emphasis}>ハイパーチャージ</span>状態では基本攻撃速度が
        {Constants.T.attack_speed}、致命打ダメージが{Constants.T.critical_damage}％減少する代わりに、基本攻撃に致命打が適用され、元の致命打確率の1％ごとに
        {Constants.T.critical_chance_convert[props.config.skillLevels.T].toFixed(2)}％の致命打ダメージに切り替わります。
        <span className={style.emphasis}>ハイパーチャージ</span>状態が終了すると、移動速度{Constants.T.movement_speed.duration}秒間
        {Constants.T.movement_speed.effect[props.config.skillLevels.T]}増加します。
    </>
);

export default t;

export const values: ValuesProps = {
    parameters: [
        {title: "基本攻撃射程距離", values: Constants.T.range.map(v => `${v}m`)},
        {title: "追加致命打ダメージ量", values: Constants.T.critical_chance_convert.map(v => v.toFixed(2)), percent: true},
        {title: "移動速度増加量(％)", values: Constants.T.movement_speed.effect}
    ]
}