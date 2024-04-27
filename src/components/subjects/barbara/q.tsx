import * as React from "react";
import Damage from "../damage";
import { SubjectSkillProps } from "../props";
import Constants from "./constants.json";
import { ValuesProps } from "../values";

const q: React.FC<SubjectSkillProps> = props => (
    <>
        バーバラが指定した位置に<Damage skill="Q" constants={Constants.Q.hp} {...props} />の体力を持つセントリーガンを設置し、範囲内の敵に
        <Damage skill="Q" constants={Constants.Q.damage} {...props} />のスキルダメージを与えます。セントリーガンは{Constants.Q.duration}秒間維持され、周りの敵に銃弾を発射して
        <Damage skill="Q" constants={Constants.Q.sentry_damage} {...props} summonedName="セントリーガン" />のダメージを与えます。<br />
        セントリーガンを設置する時、先に設置したセントリーガンは破壊され、敵がセントリーガンを壊した場合にはクールダウンが{Constants.Q.sentry_broken_cooldown_penalty}
        ％増加します。バーバラの位置がセントリーガンから遠くなったり回収したりするとクールダウンが{Constants.Q.sentry_withdraw_cooldown_reduction}％減少します。
    </>
)

export default q;

export const values: ValuesProps = {
    parameters: [
        {title: "セントリーガン体力増加量", values: Constants.Q.hp.base},
        {title: "ダメージ量", values: Constants.Q.damage.base},
        {title: "消費", values: Constants.Q.sp_cost}
    ]
}