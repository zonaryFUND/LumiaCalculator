import * as React from "react";
import Damage from "../damage";
import { SubjectSkillProps } from "../props";
import Constants from "./constants.json";
import { ValuesProps } from "../values";
import style from "components/tooltip/tooltip.module.styl";

const maxCooldownIncrease = Constants.R.cooldown_increase * Constants.R.max_level;

const r: React.FC<SubjectSkillProps> = props => (
    <>
        対象の地点に1レベルの<span className={style.emphasis}>磁力融合爆弾</span>を設置すると、周りの
        <span className={style.emphasis}>プラズマ爆弾</span>と<span className={style.emphasis}>空の爆弾</span>
        が集まって最大{Constants.R.max_level}レベルまで強化されます。強化された爆弾のレベル1あたりクールダウンが
        {Constants.R.cooldown_increase}秒増加します。(最大{maxCooldownIncrease}秒)<br />
        <br />
        持続時間が終わったり、<span className={style.emphasis}>起爆</span>スキルで爆弾を爆発させると
        <Damage skill="R" constants={Constants.R.damage} {...props} /> <span className={style.emphasis}>x (爆弾のレベル)</span>のスキルダメージを与え、
        {Constants.R.max_level}レベルの爆弾の場合、的中した敵の移動速度を{Constants.R.slow.duration}
        秒間{Constants.R.slow.effect}％減少させます。減少させた移動速度は持続時間の間徐々に回復します。
    </>
)

export default r;

export const values: ValuesProps = {
    additionalInfo: <>近くにある空の爆弾が優先的に融合されます。</>,
    parameters: [
        {title: "ダメージ量", values: Constants.R.damage.base},
        {title: "消費", values: Constants.R.sp_cost}
    ]
}