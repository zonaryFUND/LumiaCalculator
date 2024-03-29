import * as React from "react";
import Constants from "./constants.json";
import Damage from "../damage";
import { ValuesProps } from "../values";
import { SubjectSkillProps } from "../props";

const q: React.FC<SubjectSkillProps> = props => {
    return (
        <>
            アデラが指定した位置にポーンを配置して敵に
            <Damage skill="Q" constants={Constants.Q.pawn_damage} {...props} />
            のスキルダメージを与えます。ポーンを使用するたびにスタックを獲得し、3スタックになると移動速度が
            {Constants.Q.movement_speed[props.config.skillLevels.Q]}
            増加します。次のスキルを使用する時、クイーンを配置して
            <Damage skill="Q" constants={Constants.Q.queen_damage} {...props} />のスキルダメージを与え、
            {Constants.Q.stun}秒間気絶させます。<br />
            プロモーションスキルを{Constants.Q.stack_reset}秒以内にまた使用しなかった場合、スタックが初期化されます。<br />
            <br />
            ポーンとクイーンは{Constants.Q.duration}秒間維持されます。<br />
            プロモーションはクールダウン減少オプションの影響を受けません。
        </>
    );
}

export default q;

export const values: ValuesProps = {
    parameters: [
        {title: "ポーンのダメージ量", values: Constants.Q.pawn_damage.base},
        {title: "クイーンのダメージ量", values: Constants.Q.queen_damage.base},
        {title: "移動速度増加量(％)", values: Constants.Q.movement_speed, percent: true},
        {title: "クールダウン", values: Constants.Q.cooldown.constant},
        {title: "消費", values: Constants.Q.sp_cost}
    ]
}
