import * as React from "react";
import Constants from "./constants.json";
import Damage from "../damage";
import { ValuesProps } from "../values";
import { SubjectSkillProps } from "../props";
import style from "components/tooltip/tooltip.module.styl";

const w: React.FC<SubjectSkillProps> = props => {
    return (
        <>
            ケネスは{Constants.W.duration}秒間炎で体を守り、受けるダメージが<Damage skill="W" constants={Constants.W.damage_reduction} {...props} />
            <span className={style.emphasis}>％</span>減少します。また、{Constants.W.shield_duration}秒間
            <Damage skill="W" constants={Constants.W.shield} {...props} />のダメージを吸収するシールドを獲得します。<br />
            <br />
            基本攻撃が的中すると、このスキルの持続時間が{Constants.W.extend}秒増加します。
        </>
    );
}

export default w;

export const values: ValuesProps = {
    additionalInfo: <>このスキルは最大{Constants.W.max_duration}秒間維持されます。</>,
    parameters: [
        {title: "合計攻撃力", values: Constants.W.damage_reduction.attack, percent: true},
        {title: "シールド吸収量", values: Constants.W.shield.base},
        {title: "クールダウン", values: Constants.W.cooldown}
    ]
}
