import * as React from "react";
import Constants from "./constants.json";
import { ValuesProps } from "../values";
import style from "components/tooltip/tooltip.module.styl";
import { useValueContext } from "components/tooltip/value-context";
import { SubjectSkillProps } from "components/tooltip/subject-skill/props";

const t: React.FC<SubjectSkillProps> = props => {
    const { status, showEquation } = useValueContext();
    const defense = (() => {
        if (showEquation) {
            return <><span className={style.emphasis}>{Constants.T.defense_decline.base[props.skillLevel]}%</span><span className={style.critical}>(+致命打確率の1%あたり{Constants.T.defense_decline.criticalChance}%)</span></>;
        } else {
            const value = status.criticalChance.calculatedValue.times(Constants.T.defense_decline.criticalChance).add(Constants.T.defense_decline.base[props.skillLevel])
            return <span className={style.emphasis}>{value.toString()}%</span>
        }
    })();

    const basicAttack = (() => {
        if (showEquation) {
            return <><span className={style.emphasis}>{Constants.T.basic_attack_damage.base}%</span><span className={style.critical}>(+致命打確率 * ({Constants.T.basic_attack_damage.criticalBase}% + 致命打ダメージ増加量))</span></>;
        } else {
            const value = status.criticalDamage.calculatedValue.add(Constants.T.basic_attack_damage.criticalBase).percent(status.criticalChance.calculatedValue).add(Constants.T.basic_attack_damage.base);
            return <span className={style.emphasis}>{value.toString()}%</span>
        }
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
