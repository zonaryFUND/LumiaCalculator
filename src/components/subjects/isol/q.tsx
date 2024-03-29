import * as React from "react";
import Constants from "./constants.json";
import Damage from "../damage";
import { ValuesProps } from "../values";
import { SubjectSkillProps } from "../props";

const q: React.FC<SubjectSkillProps> = props => (
    <>
        アイソルが敵や地面に付着する爆弾を投げます。
        地面についた爆弾は{Constants.Q.duration}秒後爆発して
        <Damage {...props} skill="Q" constants={Constants.Q.damage} />のスキルダメージを与え、
        {Constants.Q.bind}秒間束縛状態にさせます。<br />
        敵に爆弾をつけた場合、爆弾が{Constants.Q.duration_enemy}秒後に爆発します。
        対象を攻撃するたびに爆発時間が{Constants.Q.duration_reduction}秒ずつ減少し、
        爆発ダメージが<Damage {...props} skill="Q" constants={Constants.Q.additional_damage} />増加して
        束縛時間が{Constants.Q.additional_bind}秒ずつ増加し、
        最大{Constants.Q.bind_max}秒まで増加します。<br />
        セムテックス爆弾はアイソルの視界を提供します。
    </>
);

export default q;

export const values: ValuesProps = {
    additionalInfo: <>
        このスキルは「アイソルが設置したトラップ」判定が適用されます。
    </>,
    parameters: [
        {title: "ダメージ量", values: Constants.Q.damage.base},
        {title: "追加ダメージ量", values: Constants.Q.additional_damage.base},
        {title: "クールダウン", values: Constants.Q.cooldown},
        {title: "消費", values: Constants.Q.sp_cost},
    ]
}