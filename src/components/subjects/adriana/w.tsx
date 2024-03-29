import * as React from "react";
import Constants from "./constants.json";
import { SubjectSkillProps } from "../props";
import { ValuesProps } from "../values";

const w: React.FC<SubjectSkillProps> = props => (
    <>
        アドリアナが指定した位置にオイルを発射して{Constants.W.duration}
        秒間維持されるオイル地帯を作ります。オイルの範囲にスキルを使用して炎をつけたり、火傷状態の敵がオイル地帯の上にいると
        {Constants.W.flame_duration}秒間維持される火炎地帯が作られます。<br />
        <br />
        オイル地帯の上にいる敵は移動速度が{Constants.W.slow}減少します。
    </>
)

export default w;

export const values: ValuesProps = {
    parameters: [
        {title: "チャージ時間", values: Constants.W.charge.time}
    ]
}