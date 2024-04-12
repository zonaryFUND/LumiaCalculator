import * as React from "react";
import Damage from "../damage";
import { SubjectSkillProps } from "../props";
import Constants from "./constants.json";
import { ValuesProps } from "../values";

const r: React.FC<SubjectSkillProps> = props => (
    <>
        バニスが指定した方向へ投げ縄弾を発射して的中した対象に<Damage skill="R" constants={Constants.R.first_damage} {...props} />
        のスキルダメージを与え、{Constants.R.bind}秒間束縛させます。<br />
        投げ縄弾の束縛が終わると爆発し、束縛対象に<Damage skill="R" constants={Constants.R.second_damage} {...props} />のスキルダメージを与えて
        {Constants.R.spread_range}m範囲内の一番近い敵に転移し、同じ効果を発動します。<br />
        投げ縄弾は最大{Constants.R.max_spread}回転移できます。
    </>
)

export default r;

export const values: ValuesProps = {
    parameters: [
        {title: "1打ダメージ量", values: Constants.R.first_damage.base},
        {title: "2打ダメージ量", values: Constants.R.second_damage.base},
        {title: "クールダウン", values: Constants.R.cooldown},
        {title: "消費", values: Constants.R.sp_cost}
    ]
}