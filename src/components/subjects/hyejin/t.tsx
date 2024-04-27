import * as React from "react";
import Constants from "./constants.json";
import Damage from "../damage";
import { ValuesProps } from "../values";
import { SubjectSkillProps } from "../props";

const t: React.FC<SubjectSkillProps> = props => {
    return (
        <>
            ヘジンは同じ対象にスキルを3回的中させると三災をかけて{Constants.T.fear[props.config.skillLevels.T]}秒間恐怖状態にさせ、
            <Damage skill="T" constants={Constants.T.damage} {...props} />の追加スキルダメージを与えます。
        </>
    );
}

export default t;

export const values: ValuesProps = {
    additionalInfo: <>
        恐怖状態の対象は{Constants.T.fear_immune}秒間三災にかかりません。<br />
        追加スキルダメージは最小{Constants.T.minimum_additional_damage}のダメージを与えます。
    </>,
    parameters: [
        {title: "恐怖持続時間", values: Constants.T.fear},
        {title: "合計スキル増幅係数", values: Constants.T.damage.amp, percent: true}
    ]
}
