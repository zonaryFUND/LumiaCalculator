import * as React from "react";
import Constants from "./constants.json";
import Damage from "../damage";
import { ValuesProps } from "../values";
import { SubjectSkillProps } from "../props";
import style from "components/tooltip/tooltip.module.styl";

const q: React.FC<SubjectSkillProps> = props => (
    <>
        <span className={style.emphasis}>電撃</span>：電流が流れる剣で突き刺して1人の敵に
        <Damage skill="Q" constants={Constants.Q.damage} {...props} />の基本攻撃ダメージを与え、
        <span className={style.emphasis}>アンペア</span>を1個追加で獲得します。エイデンの基本攻撃が的中するたびに
        <span className={style.emphasis}>電撃</span>のクールダウンが{Constants.Q.cooldown_reduction}秒減少します。<br />
        <br />
        <span className={style.italic}><span className={style.emphasis}>ハイパーチャージ</span>状態では電磁砲に変更されます。</span><br />
        <br />
        <span className={style.emphasis}>電磁砲</span>：指定した方向に1発の弾丸を発射して、的中した敵1人に
        <Damage skill="Q" constants={Constants.Q.range_damage} {...props} />の基本攻撃ダメージを与え、移動速度を
        {Constants.Q.slow.duration}秒間{Constants.Q.slow.effect[props.config.skillLevels.Q]}％減少させます。スキルを的中するとクールダウンが
        {Constants.Q.cooldown_reduction}％減少します。<br />
        <br />
        このスキルはクールダウン減少の影響を受けません。
    </>
);

export default q;

export const values: ValuesProps = {
    additionalInfo: <>この基本攻撃はスキル攻撃とも見なされ、致命打が発生しません。</>,
    parameters: [
        {title: "電撃ダメージ量", values: Constants.Q.damage.base},
        {title: "電磁砲ダメージ量", values: Constants.Q.range_damage.base},
        {title: "移動速度減少量(％)", values: Constants.Q.slow.effect, percent: true},
        {title: "クールダウン", values: Constants.Q.cooldown.constant},
        {title: "電撃スタミナ消耗量", values: Constants.Q.range_sp_cost},
    ]
}