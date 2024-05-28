import * as React from "react";
import Constants from "./constants.json";
import Damage from "../damage";
import { ValuesProps } from "../values";
import { SubjectSkillProps } from "../props";

const r: React.FC<SubjectSkillProps> = props => (
    <>
        雪が剣を持って空間を斬ります。 雪は自分が斬った敵に<Damage skill="R" constants={Constants.R.damage} {...props} />のスキルダメージを与え、刻印を付与して
        {Constants.R.slow.duration}秒間敵の移動速度を{Constants.R.slow.effect}%減少させます。雪が剣を鞘に入れる瞬間、刻印が爆発し、対象の最大体力の{Constants.R.mark_damage.targetMaxHP[props.config.skillLevels.R]}%の固定ダメージを与えます。
    </>
);

export default r;

export const values: ValuesProps = {
    parameters: [
        {title: "ダメージ量", values: Constants.R.damage.base},
        {title: "最大体力追加ダメージ量", values: Constants.R.mark_damage.targetMaxHP, percent: true},
        {title: "クールダウン", values: Constants.R.cooldown},
        {title: "消費", values: Constants.R.sp_cost}
    ]
}