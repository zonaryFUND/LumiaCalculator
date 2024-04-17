import * as React from "react";
import Constants from "./constants.json";
import Damage from "../damage";
import { ValuesProps } from "../values";
import { SubjectSkillProps } from "../props";
import style from "components/tooltip/tooltip.module.styl";

const t: React.FC<SubjectSkillProps> = props => {
    return (
        <>
            <span className={style.enhance}>釣り人</span>：レノックスは釣りで魚を獲得する時、武器以外のアイテムを1個追加で獲得します。<br />
            <br />
            <span className={style.enhance}>直感</span>:{Constants.T.cooldown.constant[props.config.skillLevels.T]}
            秒ごとに敵実験体に基本攻撃またはスキルダメージを与えた場合、<Damage skill="T" constants={Constants.T.shield} {...props} />のダメージを吸収するシールドを獲得します。シールドは最大
            {Constants.T.duration}秒間維持されます。
        </>
    );
}

export default t;

export const values: ValuesProps = {
    additionalInfo: <>釣りでアイテム獲得確率：一般{Constants.T.fishing.common}％/高級{Constants.T.fishing.uncommon}％/レア{Constants.T.fishing.rare}％</>,
    parameters: [
        {title: "シールド吸収量", values: Constants.T.shield.maxHP, percent: true},
        {title: "クールダウン", values: Constants.T.cooldown.constant}
    ]
}
