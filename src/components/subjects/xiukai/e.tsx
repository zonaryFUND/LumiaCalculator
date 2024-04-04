import * as React from "react";
import Constants from "./constants.json";
import Damage from "../damage";
import { ValuesProps } from "../values";
import { SubjectSkillProps } from "../props";
import { StackName } from "./stack";
import style from "components/tooltip/tooltip.module.styl";

const e: React.FC<SubjectSkillProps> = props => (
    <>
        <span className={style.emphasis}>ウォック突進</span>：シウカイが指定した方向へウォックに乗って突進し、最初にぶつかった敵とその周りの敵に
        <Damage skill="E" constants={Constants.E.first_damage} {...props} />のスキルダメージを与えて押し出し、
        {Constants.E.airborne}秒間空中に浮かせます。スキルを使用した後、{Constants.E.reuse}秒以内には<span className={style.emphasis}>ウォック落とし</span>：を使用できます。<br />
        <br />
        <span className={style.emphasis}>ウォック落とし</span>：シウカイが大きなウォックを地面に叩き落として周りの敵に
        <Damage skill="E" constants={Constants.E.second_damage} {...props} />のスキルダメージを与え、{Constants.E.slow.duration}
        秒間移動速度を{Constants.E.slow.effect[props.config.skillLevels.E]}％減少させます。
    </>
);

export default e;

export const values: ValuesProps = {
    parameters: [
        {title: "クールダウン", values: Constants.E.cooldown},
        {title: "[ウォック突進]ダメージ量", values: Constants.E.first_damage.base},
        {title: "[ウォック落とし]ダメージ量", values: Constants.E.second_damage.base},
        {title: "[ウォック落とし]移動速度減少量", values: Constants.E.slow.effect, percent: true}
    ]
}