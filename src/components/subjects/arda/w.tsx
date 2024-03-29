import * as React from "react";
import Damage from "../damage";
import { SubjectSkillProps } from "../props";
import Constants from "./constants.json"
import { ValuesProps } from "../values";

const w: React.FC<SubjectSkillProps> = props => (
    <>
        指定した地点にバビロンの立方体を召喚します。バビロンの立方体は領域内の敵に
        <Damage skill="W" constants={Constants.W.damage} {...props} />のスキルダメージを与えて
        {Constants.W.slow.duration}秒間敵の移動速度を{Constants.W.slow.effect}減少させます。
        {Constants.W.duration}秒後、バビロンのさいころは消えて周りの領域内の敵に
        <Damage skill="W" constants={Constants.W.vanish_damage} {...props} />のスキルダメージを与えて
        {Constants.W.stun}秒間気絶させます。
    </>
);

export default w;

export const values: ValuesProps = {
    parameters: [
        {title: "ダメージ量", values: Constants.W.damage.base},
        {title: "追加ダメージ量", values: Constants.W.vanish_damage.base},
        {title: "消費", values: Constants.W.sp_cost},
        {title: "クールダウン", values: Constants.W.cooldown}
    ]
}