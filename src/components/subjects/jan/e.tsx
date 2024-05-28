import * as React from "react";
import Constants from "./constants.json";
import Damage from "../damage";
import { ValuesProps } from "../values";
import { SubjectSkillProps } from "../props";
import style from "components/tooltip/tooltip.module.styl";

const e: React.FC<SubjectSkillProps> = props => (
    <>
        ヤンが前に突進し、次の基本攻撃を強化して<Damage skill="E" constants={Constants.E.damage} {...props} />のスキルダメージを追加で与えます。次のニーストライクとトマホークスピンスキルダメージが的中すると、失った体力に比例して的中させたスキルダメージの
        {Constants.E.heal.min}% ~ {Constants.E.heal.max}%の体力を回復します(体力が
        {Constants.E.heal.max_threshold_hp}%以下の場合、最大回復量適用)。トマホークスピンキャスト中に使用できます。<br />
        <span className={style.enhance}>強化効果</span>：<span className={style.emphasis}>ウィービング</span>のクールダウンを{Constants.E.cooldown_reduction}%減少させます。
    </>
);

export default e;

export const values: ValuesProps = {
    parameters: [
        {title: "ダメージ量", values: Constants.E.damage.base},
        {title: "クールダウン", values: Constants.E.cooldown}
    ]
}