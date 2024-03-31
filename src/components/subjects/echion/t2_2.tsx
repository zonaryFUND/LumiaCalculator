import * as React from "react";
import Constants from "./constants.json";
import { SubjectSkillProps } from "../props";
import { ValuesProps } from "../values";

const t: React.FC<SubjectSkillProps> = props => (
    <>
        エキオンがスキルで与えたダメージの{Constants.R2.skill_lifesteal[props.config.skillLevels.R]}
        の体力を回復し、毒蛇の刃(Q)、ドライバイト(E)がVFゲージを{Constants.T2_2.additional_gauge}追加で増加させます。<br />
        VF暴走の持続時間が{Constants.T2_2.overflow_extend}秒増加し、エンベノミゼーション(R)がもう一度発生して追加ダメージを与え、対象を空中に浮かせます。
    </>
);

export default t;

export const values: ValuesProps = {
    additionalInfo: <>強化したそれぞれの武器の効果はVF暴走(R)スキルのレベルに応じて増加します。</>,
    parameters: []
}