import * as React from "react";
import Damage from "../damage";
import { SubjectSkillProps } from "../props";
import Constants from "./constants.json";
import { ValuesProps } from "../values";

const r: React.FC<SubjectSkillProps> = props => (
    <>
        アヤが空に向かって空砲弾を発射し、周りの敵に
        <Damage skill="R" constants={Constants.R.damage} {...props} />のスキルダメージを与え、
        {Constants.R.fear}秒間敵を恐怖状態にさせます。
    </>
)

export default r;

export const values: ValuesProps = {
    parameters: [
        {title: "ダメージ量", values: Constants.R.damage.base},
        {title: "クールダウン", values: Constants.R.cooldown}
    ]
}