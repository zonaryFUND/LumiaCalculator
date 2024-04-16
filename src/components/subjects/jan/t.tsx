import * as React from "react";
import Constants from "./constants.json";
import { ValuesProps } from "../values";
import { SubjectSkillProps } from "../props";

const t: React.FC<SubjectSkillProps> = props => (
    <>
        ヤンが敵にダメージを与えるたびに熱血の意志スタック1を獲得します。熱血の意志がスタック{Constants.T.threshold}
        以上になると、次のスキルを使用する時、スタックを消耗してニーストライク、トマホークスピン、ウィービングスキルのクールダウンが
        {Constants.T.cooldown_reduction[props.config.skillLevels.T]}％減少して、スキルを強化します。
    </>
);

export default t;

export const values: ValuesProps = {
    additionalInfo: <>アイテム・装備・トンファー武器スキルによるダメージは熱血の意志スタックを獲得しません。</>,
    parameters: [
        {title: "クールダウン減少量", values: Constants.T.cooldown_reduction, percent: true}
    ]
}