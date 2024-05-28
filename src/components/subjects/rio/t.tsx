import * as React from "react";
import Constants from "./constants.json";
import { ValuesProps } from "../values";
import { SubjectSkillProps } from "../props";
import style from "components/tooltip/tooltip.module.styl";
import skillDamage from "../skill-damage";

const t: React.FC<SubjectSkillProps> = props => {
    const defense = (() => {
        /*
        if (props.showEquation) {
            return <><span className={style.emphasis}>{Constants.T.defense_decline.base[props.config.skillLevels.T]}%</span><span className={style.critical}>(+致命打確率の1%あたり{Constants.T.defense_decline.criticalChance}%)</span></>;
        } else {
            const value = props.status.criticalChance.times(Constants.T.defense_decline.criticalChance).add(Constants.T.defense_decline.base[props.config.skillLevels.T])
            return <span className={style.emphasis}>{value.toString()}%</span>
        }
        */
       return null
    })();

    const basicAttack = (() => {
        /*
        if (props.showEquation) {
            return <><span className={style.emphasis}>{Constants.T.basic_attack_damage.base}%</span><span className={style.critical}>(+致命打確率 * ({Constants.T.basic_attack_damage.criticalBase}% + 致命打ダメージ増加量))</span></>;
        } else {
            const value = props.status.criticalDamage.add(Constants.T.basic_attack_damage.criticalBase).percent(props.status.criticalChance).add(Constants.T.basic_attack_damage.base);
            return <span className={style.emphasis}>{value.toString()}%</span>
        }
        */
       return null;
    })()

    return (
        <>
            莉央の基本攻撃とスキルは的中した対象の防御力を致命打確率に応じて{defense}だけ減少した状態のダメージを与えます。<br />
            莉央の基本攻撃は致命打が発生しない代わりに{basicAttack}のダメージを与えます。<br />
            基本攻撃ダメージ量は致命打確率に比例して増加します。
        </>
    );
}

export default t;

export const values: ValuesProps = {
    parameters: [
        {title: "防御力減少量(%)", values: Constants.T.defense_decline.base, percent: true}
    ]
}
