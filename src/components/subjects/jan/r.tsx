import * as React from "react";
import Constants from "./constants.json";
import Damage from "../damage";
import { ValuesProps } from "../values";
import { SubjectSkillProps } from "../props";

const r: React.FC<SubjectSkillProps> = props => (
    <>
        ヤンが{Constants.R.duration}秒間維持される四角リングを召喚して、毎秒熱血の意志スタックを1獲得します。四角のリングロープに衝突した敵は
        <Damage skill="R" constants={Constants.R.damage} {...props} />のスキルダメージを受け、{Constants.R.slow.duration}秒間移動速度が{Constants.R.slow.effect}
        ％減少されます。ノックバックで突き飛ばされた敵がロープに衝突すると、四角リングの中央に弾け飛ばされます。衝突するとロープは消えます。競技場の範囲内で敵実験体キルに関与した場合、ヤンは熱血の意志スタック
        {Constants.R.kill_stack}をすぐに獲得し、{Constants.R.movement_speed.duration}秒間移動速度が{Constants.R.movement_speed.effect}％増加します。
    </>
);

export default r;

export const values: ValuesProps = {
    parameters: [
        {title: "ダメージ量", values: Constants.R.damage.base},
        {title: "クールダウン", values: Constants.R.cooldown},
        {title: "消費", values: Constants.R.sp_cost}
    ]
}