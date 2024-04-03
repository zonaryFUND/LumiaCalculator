import * as React from "react";
import Constants from "./constants.json";
import Damage from "../damage";
import { ValuesProps } from "../values";
import { SubjectSkillProps } from "../props";
import style from "components/tooltip/tooltip.module.styl";

const q: React.FC<SubjectSkillProps> = props => {
    return (
        <>
            ケネスが斧を大きく振り回して<Damage skill="Q" constants={Constants.Q.damage} {...props} />のスキルダメージを与えて、短い時間の間的中した対象を空中に浮かせます。<br />
            <br />
            <span className={style.emphasis}>抑圧された怒りー最大スタック</span>：ダメージ量が{Constants.Q.max_stack_damage}
            ％増加し、的中した敵1人あたり失った体力の{Constants.Q.max_stack_heal}％(最大{Constants.Q.max_stack_heal_max}％)を回復します。
        </>
    );
}

export default q;

export const values: ValuesProps = {
    additionalInfo: <>このスキルは基本攻撃及びスキル攻撃判定と見なされ、初めて敵に的中した時に効果が発動します。</>,
    parameters: [
        {title: "ダメージ量", values: Constants.Q.damage.base},
        {title: "合計攻撃力", values: Constants.Q.damage.attack, percent: true},
        {title: "クールダウン", values: Constants.Q.cooldown}
    ]
}
