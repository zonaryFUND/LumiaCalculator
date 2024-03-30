import * as React from "react";
import Constants from "./constants.json";
import Damage from "../damage";
import { ValuesProps } from "../values";
import { SubjectSkillProps } from "../props";
import style from "components/tooltip/tooltip.module.styl";

const e: React.FC<SubjectSkillProps> = props => (
    <>
        <span className={style.level}>持続効果</span>
        ：<span className={style.emphasis}>アンペア</span>をすべてチャージすると、スキルのクールダウンが初期化されます。<br />
        <br />
        <span className={style.emphasis}>バックステップ</span>
        ：後ろに跳躍しながら電流入りの弾丸を発射します。撃たれた敵に
        <Damage skill="E" constants={Constants.E.damage} {...props} />のスキルダメージを与え、視界を共有する刻印を残して
        <span className={style.emphasis}>ボルトラッシュ</span>が使用できるようになります。使用後、
        {Constants.E.movement_speed.duration}秒間移動速度が{Constants.E.movement_speed.effect[props.config.skillLevels.E]}％増加します。<br />
        <br />
        <span className={style.emphasis}>ボルトラッシュ</span>：刻印がある敵を貫通し、
        <Damage skill="E" constants={Constants.E.rush_damage} {...props} />のスキルダメージを与えます。
    </>
);

export default e;

export const values: ValuesProps = {
    parameters: [
        {title: "バックステップダメージ量", values: Constants.E.damage.base},
        {title: "移動速度増加量(％)", values: Constants.E.movement_speed.effect},
        {title: "ボルトラッシュダメージ量", values: Constants.E.rush_damage.base},
        {title: "クールダウン", values: Constants.E.cooldown}
    ]
}