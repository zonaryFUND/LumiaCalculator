import * as React from "react";
import Constants from "./constants.json";
import Damage from "../damage";
import { ValuesProps } from "../values";
import { SubjectSkillProps } from "../props";

const w: React.FC<SubjectSkillProps> = props => (
    <>
        カーラとつながったスピアを回収して経路上の敵に<Damage skill="W" constants={Constants.W.damage} {...props} />
        のスキルダメージを与え、{Constants.W.slow.duration}秒間移動速度を{Constants.W.slow.effect}
        ％減少させます。ダメージを与えた場合、装填ゲージを{Constants.W.gauge[props.config.skillLevels.W]}獲得し、的中した数に応じてスピア起動のクールダウンが
        {Constants.W.e_cooldown_reduction[props.config.skillLevels.W]}秒減少します。<br />
        <br />
        回収はクールダウン減少効果の影響を受けません。
    </>
);

export default w;

export const values: ValuesProps = {
    additionalInfo: <>致命打確率の{Constants.W.damage.criticalChance}％が回収のダメージ量に追加されます。<br />回収しているスピアに的中されるたび、受けるダメージが{Constants.W.damage_reduction}％ずつ減少します。</>,
    parameters: [
        {title: "ダメージ量", values: Constants.W.damage.base},
        {title: "装填ゲージ獲得量", values: Constants.W.gauge},
        {title: "スピア起動クールダウン減少量", values: Constants.W.e_cooldown_reduction}
    ]
}
