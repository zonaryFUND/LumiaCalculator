import * as React from "react";
import Constants from "./constants.json";
import Value from "components/tooltip/value";
import { ValuesProps } from "../values";
import style from "components/tooltip/tooltip.module.styl";
import { SubjectSkillProps } from "components/tooltip/subject-skill/props";

const w: React.FC<SubjectSkillProps> = props => (
    <>
        <span className={style.enhance}>先制対応</span>：エステルが盾で地面を打ち、前方の範囲に
        <Value skill="W" ratio={Constants.W.damage} />のスキルダメージを与えて敵の移動速度を
        {Constants.W.slow.duration}秒間{Constants.W.slow.effect}%減少させます。減少された移動速度は徐々に回復します。<br />
        <br />
        <span className={style.enhance}>緊急鎮火</span>：盾防御(E)宙に使用すると、{Constants.W2.duration}
        秒間移動しながら消化液を撒いて範囲内の敵に{Constants.W2.tick}秒あたり<Value skill="W" ratio={Constants.W2.damage} />
        のスキルダメージを与え、的中させるたびに敵の移動速度を最大{Constants.W2.slow_max}%まで減少させます。スキルを再使用すると、スキルを中断し、もう一度使用すると盾防御状態を解除します。
    </>
);

export default w;

export const values: ValuesProps = {
    parameters: [
        {title: "[先制対応]ダメージ量", values: Constants.W.damage.base},
        {title: "[緊急鎮火]ダメージ量", values: Constants.W2.damage.base},
        {title: "クールダウン", values: Constants.W.cooldown},
        {title: "消費", values: Constants.W.sp_cost}
    ]
}