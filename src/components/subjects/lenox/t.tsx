import * as React from "react";
import Constants from "./constants.json";
import Value from "components/tooltip/value";
import { ValuesProps } from "../values";
import style from "components/tooltip/tooltip.module.styl";
import { SubjectSkillProps } from "components/tooltip/subject-skill/props";

const t: React.FC<SubjectSkillProps> = props => {
    return (
        <>
            <span className={style.enhance}>釣り人</span>：レノックスは釣りで魚を獲得する時、武器以外のアイテムを1個追加で獲得します。<br />
            <br />
            <span className={style.enhance}>直感</span>:{Constants.T.cooldown.constant[props.skillLevel]}
            秒ごとに敵実験体に基本攻撃またはスキルダメージを与えた場合、<Value skill="T" ratio={Constants.T.shield} />のダメージを吸収するシールドを獲得します。シールドは最大
            {Constants.T.duration}秒間維持されます。
        </>
    );
}

export default t;

export const values: ValuesProps = {
    additionalInfo: <>釣りでアイテム獲得確率：一般{Constants.T.fishing.common}%/高級{Constants.T.fishing.uncommon}%/レア{Constants.T.fishing.rare}%</>,
    parameters: [
        {title: "シールド吸収量", values: Constants.T.shield.maxHP, percent: true},
        {title: "クールダウン", values: Constants.T.cooldown.constant}
    ]
}
