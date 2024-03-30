import * as React from "react";
import Constants from "./constants.json";
import Damage from "../damage";
import { ValuesProps } from "../values";
import { SubjectSkillProps } from "../props";

const r: React.FC<SubjectSkillProps> = props => (
    <>
        ウィリアムがジャンプし、指定した地点にボールを投げ、範囲内の敵に<Damage skill="R" constants={Constants.R.damage} {...props} />
        のスキルダメージを与え、{Constants.R.slow.duration}秒間移動速度を{Constants.R.slow.effect}
        減少させます。中心部の敵は{Constants.R.slow_center.duration}秒間移動速度が{Constants.R.slow_center.effect}減少します。<br />
        中心部から野球ボール4つが弾かれた後、{Constants.common.ball_duration}秒間維持されます。
    </>
);

export default r;

export const values: ValuesProps = {
    parameters: [
        {title: "ダメージ量", values: Constants.R.damage.base},
        {title: "消費", values: Constants.R.sp_cost},
        {title: "クールダウン", values: Constants.R.cooldown}
    ]
}