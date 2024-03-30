import * as React from "react";
import Constants from "./constants.json";
import Damage from "../damage";
import { ValuesProps } from "../values";
import { SubjectSkillProps } from "../props";

const t: React.FC<SubjectSkillProps> = props => (
    <>
        ウィリアムは基本攻撃をする時、野球ボールが{Constants.T.cooldown.constant}秒に一度ずつ対象に当たってから弾け飛んで
        {Constants.common.ball_duration}秒間維持されます。野球ボールの方向へ移動する時には移動速度が
        {Constants.T.movement_speed[props.config.skillLevels.T]}％増加し、野球ボールをキャッチすると次の基本攻撃は
        <Damage skill="T" constants={Constants.T.damage} {...props} />の基本攻撃ダメージを与えます。<br />
        野球ボールをキャッチすると{Constants.T.duration}秒間キャッチボールスタックが維持されます。
    </>
);

export default t;

export const values: ValuesProps = {
    parameters: [
        {title: "合計攻撃力", values: Constants.T.damage.attack.map(v => v - 100), percent: true},
        {title: "移動速度増加量(％)", values: Constants.T.movement_speed, percent: true},
    ]
}