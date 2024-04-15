import * as React from "react";
import Damage from "../damage";
import Constants from "./constants.json";
import { ValuesProps } from "../values";
import { SubjectSkillProps } from "../props";

const r: React.FC<SubjectSkillProps> = props => {
    return (
        <>
            マルティナが指定した方向を撮影し、的中した敵の防御力を{Constants.R2.defense_reduction}％減少させ、
            {Constants.R2.duration}秒にかけて スキル範囲の端の敵に<Damage skill="R" constants={Constants.R2.first_outer_damage} {...props} />のスキルダメージを与えます。中央の敵には
            <Damage skill="R" constants={Constants.R2.first_center_damage} {...props} />のスキルダメージを与えます。<br />
            <br />
            録画持続時間が終了する時、スキル範囲の端の敵には<Damage skill="R" constants={Constants.R2.second_outer_damage} {...props} />のスキルダメージを与え、中央の敵には
            <Damage skill="R" constants={Constants.R2.second_center_damage} {...props} />のスキルダメージを与えて気絶させます。気絶時間はスキル持続時間の間スキルで受けたダメージの回数に比例して{Constants.R2.stun_extend_per_hit}秒ずつ増加します。
        </>
    );
}

export default r;

export const values: ValuesProps = {
    parameters: [
        {title: "撮影中、範囲の端ダメージ量", values: Constants.R2.first_outer_damage.base},
        {title: "撮影中、中央ダメージ量", values: Constants.R2.first_center_damage.base},
        {title: "撮影終了の時、範囲の端ダメージ量", values: Constants.R2.second_outer_damage.base},
        {title: "撮影終了の時、中央ダメージ量", values: Constants.R2.second_center_damage.base},
        {title: "クールダウン", values: Constants.R2.cooldown}
    ]
}
