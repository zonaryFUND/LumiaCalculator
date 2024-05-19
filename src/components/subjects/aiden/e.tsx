import * as React from "react";
import Constants from "./constants.json";
import Value from "components/tooltip/value";
import { ValuesProps } from "../values";
import style from "components/tooltip/tooltip.module.styl";
import { SubjectSkillProps } from "components/tooltip/subject-skill/props";

const e: React.FC<SubjectSkillProps> = props => (
    <>
        <span className={style.level}>持続効果</span>
        ：<span className={style.emphasis}>アンペア</span>をすべてチャージすると、スキルのクールダウンが初期化されます。<br />
        <br />
        <span className={style.emphasis}>バックステップ</span>
        ：後ろに跳躍しながら電流入りの弾丸を発射します。撃たれた敵に
        <Value skill="E" ratio={Constants.E.damage} />のスキルダメージを与え、視界を共有する刻印を残して
        <span className={style.emphasis}>ボルトラッシュ</span>が使用できるようになります。使用後、
        {Constants.E.movement_speed.duration}秒間移動速度が{Constants.E.movement_speed.effect[props.skillLevel]}%増加します。<br />
        <br />
        <span className={style.emphasis}>ボルトラッシュ</span>：刻印がある敵を貫通し、
        <Value skill="E" ratio={Constants.E.rush_damage} />のスキルダメージを与えます。
    </>
);

export default e;

export const values: ValuesProps = {
    parameters: [
        {title: "バックステップダメージ量", values: Constants.E.damage.base},
        {title: "移動速度増加量(%)", values: Constants.E.movement_speed.effect},
        {title: "ボルトラッシュダメージ量", values: Constants.E.rush_damage.base},
        {title: "クールダウン", values: Constants.E.cooldown}
    ]
}