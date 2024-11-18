import * as React from "react";
import Value from "components/tooltip/value";
import Constants from "./constants.json";
import { ValuesProps } from "../../tooltip/subject-skill/expansion-values";
import style from "components/tooltip/tooltip.module.styl";
import { SubjectSkillProps } from "components/tooltip/subject-skill/props";
import { NinaValue } from "./nina-ratio-strategy";

const w: React.FC<SubjectSkillProps> = props => (
    <>
        クロエが刃の刺繍を編んだ縫糸をくるくる回して、範囲内にいる敵に毎秒<Value skill="W" ratio={Constants.W.damage} />の
        <span className={style.emphasis}>固定ダメージ</span>を与え、移動速度を{Constants.W.slow}%減少させます。縫糸を回す間、クロエは攻撃命令
        <span className={style.emphasis}>(Q)</span>とキルトリッパー<span className={style.emphasis}>(E)</span>スキルを使用できます。<br />
        <br />
        <span className={style.enhance}>再使用</span>：{Constants.W.duration}秒以内にスキルをもう一度使用でき、指定した位置に刃の刺繍を挿し込んで
        <Value skill="W" ratio={Constants.W.drop_damage} />のスキルダメージを与え、{Constants.W.drop_slow.duration}
        秒間敵の移動速度を{Constants.W.drop_slow.effect[props.skillLevel]}%減少させます。この時ニナは刃の刺繍の位置に瞬間移動して、刃の足を鋭く振り下ろして、
        <NinaValue {...props} {...Constants.W.nina_damage} />
        のスキルダメージを与え、敵を{Constants.W.airborne}秒間空中に浮かせます。ニナの攻撃以降、刃の刺繍はクロエの方に弾かれ、再び拾うと
        {Constants.W.movement_speed.duration}秒間クロエの移動速度が{Constants.W.movement_speed.effect}%増加します。
    </>
)

export default w;

export const values: ValuesProps = {
    additionalInfo: <>スキルを1回使用した後、再度使用しない場合、スタミナとクールダウンの一部が返されます。</>,
    parameters: [
        {title: "[クロエ]縫糸ダメージ量", values: Constants.W.damage.base},
        {title: "[クロエ]投げダメージ量", values: Constants.W.drop_damage.base},
        {title: "[クロエ]投げ移動速度減少量", values: Constants.W.drop_slow.effect, percent: true},
        {title: "[ニナ]キックダメージ量", values: Constants.W.nina_damage.base},
        {title: "クールダウン", values: Constants.W.cooldown},
        {title: "消費", values: Constants.W.sp_cost}
    ]
}