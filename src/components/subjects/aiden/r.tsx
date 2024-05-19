import * as React from "react";
import Constants from "./constants.json";
import Value from "components/tooltip/value";
import { ValuesProps } from "../values";
import style from "components/tooltip/tooltip.module.styl";
import { SubjectSkillProps } from "components/tooltip/subject-skill/props";

const r: React.FC<SubjectSkillProps> = props => (
    <>
        指定した位置に落雷を落として<Value skill="R" ratio={Constants.R.first_damage} />のスキルダメージを与え、移動速度を
        {Constants.R.first_slow.duration}秒間{Constants.R.first_slow.effect}%減少させます。落雷の中心に当たった敵は
        <Value skill="R" ratio={Constants.R.center_damage} />のスキルダメージを受け、
        {Constants.R.stun}秒間気絶します。<br />
        以降、2回目の落雷が落ち、<Value skill="R" ratio={Constants.R.second_damage} {...props} />のスキルダメージを与えて移動速度を
        {Constants.R.second_slow.duration}秒間{Constants.R.second_slow.effect}%減少させます。<br />
        <br />
        1回目の落雷を敵実験体に的中させると、2回目の落雷が落ちる前にスキルを再使用して、落雷が落ちた位置に移動することができます。この時、2回目の落雷はすぐに落ち、エイデンはすべての
        <span className={style.emphasis}>アンペア</span>をチャージします。
    </>
);

export default r;

export const values: ValuesProps = {
    parameters: [
        {title: "1回目落雷ダメージ量", values: Constants.R.first_damage.base},
        {title: "1回目落雷内部ダメージ量", values: Constants.R.center_damage.base},
        {title: "2回目落雷ダメージ量", values: Constants.R.second_damage.base},
        {title: "クールダウン", values: Constants.R.cooldown}
    ]
}