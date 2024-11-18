import * as React from "react";
import Value from "components/tooltip/value";
import Constants from "./constants.json";
import { ValuesProps } from "../../tooltip/subject-skill/expansion-values";
import style from "components/tooltip/tooltip.module.styl";
import { SubjectSkillProps } from "components/tooltip/subject-skill/props";

const r: React.FC<SubjectSkillProps> = props => (
    <>
        クロエとニナの深い愛情により、{Constants.R.duration}秒間お互いが強くつながってリンク状態になります。リンク状態になると、ニナの攻撃速度
        {Constants.R.summoned_attack_speed[props.skillLevel]}%、移動速度{Constants.R.nina_movement_speed[props.skillLevel]}
        %がそれぞれ増加すると同時に人形劇<span className={style.emphasis}>(W)</span>とキルトリッパー<span className={style.emphasis}>(E)</span>
        スキルの残っているクールダウンの時間が{Constants.R.we_cooldown_reduction}%減少します。また、連結ラインに敵が当たると毎秒
        <span className={style.emphasis}>{Constants.R.damage.base[props.skillLevel]} ~ {Constants.R.damage.base[props.skillLevel] * 2.5}</span>
        の<span className={style.emphasis}>固定ダメージ(敵がラインに止まるだけより大きいダメージ)</span>を与えます。<br />
        <br />
        <span className={style.enhance}>リンク</span>：リンク状態の時、クロエとニナかどちらか一方がダメージを受ける場合、攻撃された側は総ダメージ量
        {Constants.R.attacked_damage}%のダメージを受け、つながっている側は{Constants.R.linked_damage}%のダメージを受けます。<br />
        <br />
        <span className={style.enhance}>死の延長</span>：リンク状態ではクロエとニナは片方が先に死ぬことはできず、片方でも生きていると死亡に至るだけのダメージ量を受けても死なず、二人の体力が全部消尽すると死亡します。
    </>
)

export default r;

const values: ValuesProps = {
    parameters: [
        {title: "リンクラインダメージ量", values: Constants.R.damage.base},
        {title: "[ニナ]攻撃速度増加", values: Constants.R.summoned_attack_speed, percent: true},
        {title: "[ニナ]移動速度増加", values: Constants.R.nina_movement_speed, percent: true},
        {title: "クールダウン", values: Constants.R.cooldown},
        {title: "消費", values: Constants.R.sp_cost}
    ]
}

export { values };