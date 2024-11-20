import * as React from "react";
import Constants from "./constants.json";
import { ValuesProps } from "../../tooltip/subject-skill/expansion-values";
import { SubjectSkillProps } from "components/tooltip/subject-skill/props";
import { useValueContext } from "components/tooltip/value-context";

const t: React.FC<SubjectSkillProps> = props => {
    const { config } = useValueContext();

    return (
        <>
            エキオンがスキルで与えたダメージの{Constants.R2.skill_lifesteal[config.skillLevels.R]}
            %の体力を回復し、毒蛇の刃(Q)、ドライバイト(E)がVFゲージを{Constants.T2_2.additional_gauge}追加で増加させます。<br />
            VF暴走の持続時間が{Constants.T2_2.overflow_extend}秒増加し、エンベノミゼーション(R)がもう一度発生して追加ダメージを与え、対象を空中に浮かせます。
        </>
    );
}

export default t;

export const values: ValuesProps = {
    additionalInfo: <>強化したそれぞれの武器の効果はVF暴走(R)スキルのレベルに応じて増加します。</>,
    parameters: []
}