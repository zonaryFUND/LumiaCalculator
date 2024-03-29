import * as React from "react";
import Damage from "../damage";
import { SubjectSkillProps } from "../props";
import Constants from "./constants.json";
import { ValuesProps } from "../values";

const w: React.FC<SubjectSkillProps> = props => (
    <>
        アヤが{Constants.W.duration}秒間一方向に向かって銃を発射し、{Constants.W.bullets}発を連射します。
        銃弾が的中すると<Damage skill="W" constants={Constants.W.damage} {...props} />のスキルダメージを与えます。<br />
        <br />
        アヤの追加攻撃速度{Constants.W.per_as}あたり発射する弾丸数が最大{Constants.W.max_bullets}発まで増加します。
    </>
)

export default w;

export const values: ValuesProps = {
    parameters: [
        {title: "ダメージ量", values: Constants.W.damage.base},
        {title: "合計スキル増幅係数", values: Constants.W.damage.amp},
        {title: "クールダウン", values: Constants.W.cooldown},
        {title: "消費", values: Constants.W.sp_cost}
    ]
}