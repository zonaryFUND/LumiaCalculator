import * as React from "react";
import Constants from "./constants.json";
import Damage from "../damage";
import { ValuesProps } from "../values";
import { SubjectSkillProps } from "../props";

const r: React.FC<SubjectSkillProps> = props => {
    return (
        <>
            ロッジが敵や地面に付着する爆弾を発射します。爆弾は{Constants.R.duration}秒後に爆発します。<br />
            爆弾を敵に付着した場合、敵の移動速度が{Constants.R.slow}%減少し、爆発する時に<Damage skill="R" constants={Constants.R.damage} {...props} />のスキルダメージを与えます。<br />
            爆弾が付着された対象はロッジに視界を共有します。<br />
            <br />
            爆弾が爆発する前に対象に基本攻撃を{Constants.R.basic_attack_launch}回的中させるとすぐに爆発し、対象の最大体力の{Constants.R.additional_damage[props.config.skillLevels.R]}
            %の固定ダメージを追加で与えて{Constants.R.detonate_slow.duration}秒間移動速度を{Constants.R.detonate_slow.effect}%減少させます。スキルを的中させると
            {Constants.R.skill_hit}回攻撃したことになります。<br />
            <br />
            爆弾をすぐに爆発させた場合にはセムテックス弾Mk-IIスキルのクールダウンが{Constants.R.cooldown_reduction}%減少し、
            {Constants.R.movement_speed.duration}秒間移動速度が{Constants.R.movement_speed.effect}%増加します。
        </>
    );
}

export default r;

export const values: ValuesProps = {
    parameters: [
        {title: "ダメージ量", values: Constants.R.damage.base},
        {title: "最大体力追加ダメージ量", values: Constants.R.additional_damage, percent: true},
    ]
}
