import * as React from "react";
import Constants from "./constants.json";
import Damage from "../damage";
import { ValuesProps } from "../values";
import { SubjectSkillProps } from "../props";
import style from "components/tooltip/tooltip.module.styl";

const w: React.FC<SubjectSkillProps> = props => {
    return (
        <>
            アイザックが武器の硬度を上げて次の基本攻撃または基本スキルを強化し、<Damage {...props} skill="W" constants={Constants.W.damage} />
            のスキルダメージを追加で与えます。このスキルで強化された基本攻撃または基本スキルが搾取を発動させた場合、基本スキルのクールダウンが
            {Constants.W.cooldown_reduction}％減少します。
        </>
    );
}

export default w;

export const values: ValuesProps = {
    additionalInfo: <>クールダウン減少が適用される基本スキルは<span className={style.emphasis}>強奪(R)、硬化(W)、武器スキル</span>以外のスキルです。</>,
    parameters: [
        {title: "ダメージ量", values: Constants.W.damage.base},
        {title: "クールダウン", values: Constants.W.cooldown}
    ]
}
