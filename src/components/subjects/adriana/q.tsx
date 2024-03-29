import * as React from "react";
import Constants from "./constants.json";
import Damage from "../damage";
import { SubjectSkillProps } from "../props";
import { ValuesProps } from "../values";

const q: React.FC<SubjectSkillProps> = props => (
    <>
        アドリアナが指定した方向に{Constants.Q.duration}秒間火炎放射器の炎を発射して
        {Constants.Q.tick}秒ごとに<Damage skill="Q" constants={Constants.Q.damage} {...props} />
        のスキルダメージを与えます。
    </>
)

export default q;

export const values: ValuesProps = {
    parameters: [
        {title: "ダメージ量", values: Constants.Q.damage.base},
        {title: "合計スキル増幅係数", values: Constants.Q.damage.amp, percent: true},
        {title: "消費", values: Constants.Q.sp_cost}
    ]
}