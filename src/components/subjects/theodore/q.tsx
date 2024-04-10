import * as React from "react";
import Constants from "./constants.json";
import Damage from "../damage";
import { ValuesProps } from "../values";
import { SubjectSkillProps } from "../props";
import style from "components/tooltip/tooltip.module.styl";

const q: React.FC<SubjectSkillProps> = props => (
    <>
        チャージ：テオドールが{Constants.Q.channeling}秒にわたって自分のレールガンにエネルギーをチャージし、移動速度が
        {Constants.Q.movement_speed_penalty}％まで徐々に減少します。<br />
        <br />
        発射：再使用すると指定した方向にビームを発射し、敵には<Damage skill="Q" constants={Constants.Q.damage} {...props} />
        のスキルダメージを与え、味方の場合、{Constants.Q.heal_duration}秒間<Damage skill="Q" constants={Constants.Q.heal} {...props} />
        の体力を回復させます。<br />
        チャージ時間に比例して射程距離が増加します。<br />
        <br />
        <span className={style.emphasis}>エネルギー砲</span>が<span className={style.emphasis}>増幅スクリーン</span>
        に的中してからしばらくすると、スクリーンの正面からビームを発射し、敵には<Damage skill="Q" constants={Constants.Q.screen_damage} {...props} />
        のスキルダメージを与え、味方の場合、{Constants.Q.heal_duration}秒間<Damage skill="Q" constants={Constants.Q.screen_heal} {...props} />
        の体力を回復させます。
    </>
);

export default q;

export const values: ValuesProps = {
    additionalInfo: <>チャージ後、スキルを使用しない場合、クールダウンとスタミナの半分が返されます。</>,
    parameters: [
        {title: "ダメージ量", values: Constants.Q.damage.base},
        {title: "体力回復量", values: Constants.Q.heal.base},
        {title: "スクリーン発射ダメージ量", values: Constants.Q.screen_damage.base},
        {title: "スクリーン発射時体力回復量", values: Constants.Q.screen_heal.base},
        {title: "クールダウン", values: Constants.Q.cooldown},
        {title: "消費", values: Constants.Q.sp_cost},
    ]
}