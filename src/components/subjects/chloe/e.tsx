import * as React from "react";
import Damage from "../damage";
import { SubjectSkillProps } from "../props";
import Constants from "./constants.json";
import { ValuesProps } from "../values";
import style from "components/tooltip/tooltip.module.styl";

const e: React.FC<SubjectSkillProps> = props => (
    <>
        スキルを使用すると、指定した方向にクロエが素早く移動して経路上の敵に<Damage skill="E" constants={Constants.E.first_damage} {...props} />のスキルダメージを与えます。<br />
        <br />
        <span className={style.enhance}>再使用</span>：{Constants.E.reuse}秒後、スキルをもう一度使用するとニナがクロエの位置に向かって飛び、突き攻撃で経路上の敵に
        <Damage skill="E" constants={Constants.E.second_damage} {...props} summonedName="ニナ" />のスキルダメージを与え、ニナが敵を的中させた場合は攻撃命令
        <span className={style.emphasis}>(Q)</span> スキルのクールダウンが初期化されます。
    </>
)

export default e;

export const values: ValuesProps = {
    parameters: [
        {title: "[クロエ]ダメージ量", values: Constants.E.first_damage.base},
        {title: "[ニナ]ダメージ量", values: Constants.E.second_damage.base},
        {title: "クールダウン", values: Constants.E.cooldown},
        {title: "消費", values: Constants.E.sp_cost}
    ]
}