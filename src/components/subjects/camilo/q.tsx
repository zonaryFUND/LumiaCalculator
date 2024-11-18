import * as React from "react";
import Value from "components/tooltip/value";
import Constants from "./constants.json";
import { ValuesProps } from "../../tooltip/subject-skill/expansion-values";
import Decimal from "decimal.js";
import { SubjectConfig } from "app-types/subject-dynamic/config";
import { SubjectSkillProps } from "components/tooltip/subject-skill/props";
import { Status } from "app-types/subject-dynamic/status/type";
import { CooldownOverride } from "../skills";

const q: React.FC<SubjectSkillProps> = props => (
    <>
        カミロが前方を切り裂いて<Value skill="Q" ratio={Constants.Q.damage} />の基本攻撃ダメージを与えます。<br />
        敵が外郭に的中すると{Constants.Q.stack_duration}秒間スタックを1つ獲得し、カミロの移動速度が
        {Constants.Q.movement_speed.duration}秒間{Constants.Q.movement_speed.effect[props.skillLevel]}%増加します。<br />
        {Constants.Q.max_stack}スタックになると円形に2回回転しながら、周りに<Value skill="Q" ratio={Constants.Q.Q2_first_damage} />
        、<Value skill="Q" ratio={Constants.Q.Q2_second_damage} />の基本攻撃ダメージを与え、周りの敵をカミロ側に引き寄せ、カミロが体力を
        <Value skill="Q" ratio={Constants.Q.heal} />回復します。<br />
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
        {title: "移動速度増加量(%)", values: Constants.Q.movement_speed.effect, percent: true},
        {title: "体力回復量", values: Constants.Q.heal.base},
        {title: "消費", values: Constants.Q.sp_cost}
    ]
}

export const cooldownOverride: CooldownOverride = (config, status) => {
    const additionalAttackSpeed = status.attackSpeed.calculatedValue.minus(status.attackSpeed.base ?? 0)

    // NOTE: This multiplier is an estimated value.
    // The cooldown reduction of Q peaks when his attack speed reaches 1.49 (base plus 1.38), 
    // at which point it becomes 30% of the original cooldown.
    // Assuming that the attack speed at which cooldowns saturate is 1.375 before rounding, rather than the displayed value of 1.38, 
    // cooldown aligns much better with in-game displayed values.
    return base => base.subPercent(additionalAttackSpeed.clamp(0, 1.375).times(70).dividedBy(1.375)).round2()
}