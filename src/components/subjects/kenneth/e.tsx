import * as React from "react";
import Constants from "./constants.json";
import Damage from "../damage";
import { ValuesProps } from "../values";
import { SubjectSkillProps } from "../props";
import style from "components/tooltip/tooltip.module.styl";

const e: React.FC<SubjectSkillProps> = props => {
    return (
        <>
            ケネスが突進し、{Constants.E.duration}秒間基本攻撃を強化させて攻撃速度が{Constants.E.attack_speed[props.config.skillLevels.E]}
            ％増加し、基本攻撃で与える<span className={style.emphasis}>抑圧された怒り</span>のダメージ量の
            {Constants.E.damage_conversion}％が固定ダメージに転換されます。<br />
            <br />
            敵に初めて的中した場合、<Damage skill="E" constants={Constants.E.damage} {...props} />のスキルダメージを追加で与え、このスキルのクールダウンの
            {Constants.E.cooldown_reduction[props.config.skillLevels.E]}％が返されます。
        </>
    );
}

export default e;

export const values: ValuesProps = {
    additionalInfo: <>このスキルは他のスキルを使用している間にも使用できます。</>,
    parameters: [
        {title: "ダメージ量", values: Constants.E.damage.base},
        {title: "攻撃速度増加量(％)", values: Constants.E.attack_speed, percent: true},
        {title: "クールダウン減少量", values: Constants.E.cooldown_reduction, percent: true},
        {title: "クールダウン", values: Constants.E.cooldown}
    ]
}
