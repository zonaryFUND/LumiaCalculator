import * as React from "react";
import Damage from "../damage";
import { SubjectSkillProps } from "../props";
import Constants from "./constants.json";
import { ValuesProps } from "../values";
import Decimal from "decimal.js";
import { SubjectConfig } from "components/subject/use-subject-config";
import { Status } from "components/subject/status";
import { baseStatus } from "@app/entity/base-status";

const q: React.FC<SubjectSkillProps> = props => (
    <>
        カミロが前方を切り裂いて<Damage skill="Q" constants={Constants.Q.damage} {...props} />の基本攻撃ダメージを与えます。<br />
        敵が外郭に的中すると{Constants.Q.stack_duration}秒間スタックを1つ獲得し、カミロの移動速度が
        {Constants.Q.movement_speed.duration}秒間{Constants.Q.movement_speed.effect[props.config.skillLevels.Q]}％増加します。<br />
        {Constants.Q.max_stack}スタックになると円形に2回回転しながら、周りに<Damage skill="Q" constants={Constants.Q.Q2_first_damage} {...props} />
        、<Damage skill="Q" constants={Constants.Q.Q2_second_damage} {...props} />の基本攻撃ダメージを与え、周りの敵をカミロ側に引き寄せ、カミロが体力を
        <Damage skill="Q" constants={Constants.Q.heal} {...props} />回復します。<br />
        ブエルタはカミロの基本攻撃速度を除いた攻撃速度に比例してクールダウンが最大{Constants.Q.cooldown_reduction_max}秒減少します。<br />
        <br />
        アルコンパスの最初の突進中にこのスキルを使用すると、円形でダメージを与え、外郭に的中した時の効果が適用されます。
    </>
)

export default q;

export const values: ValuesProps = {
    parameters: [
        {title: "ダメージ量", values: Constants.Q.damage.base},
        {title: "1打ダメージ量", values: Constants.Q.Q2_first_damage.base},
        {title: "2打ダメージ量", values: Constants.Q.Q2_second_damage.base},
        {title: "移動速度増加量(％)", values: Constants.Q.movement_speed.effect, percent: true},
        {title: "体力回復量", values: Constants.Q.heal.base},
        {title: "消費", values: Constants.Q.sp_cost}
    ]
}

export function cooldownOverride(config: SubjectConfig, status: Status): (base: Decimal) => Decimal {
    const baseAttackSpeed = baseStatus("camilo").attackSpeed;
    const additionalAttackSpeed = status.attackSpeed.calculated.minus(baseAttackSpeed)

    // NOTE: This multiplier is an estimated value.
    // The cooldown reduction of Q peaks when his attack speed reaches 1.49 (base plus 1.38), 
    // at which point it becomes 30% of the original cooldown.
    // Assuming that the attack speed at which cooldowns saturate is 1.375 before rounding, rather than the displayed value of 1.38, 
    // cooldown aligns much better with in-game displayed values.
    return base => base.subPercent(additionalAttackSpeed.clamp(0, 1.375).times(70).dividedBy(1.375)).round2()
}