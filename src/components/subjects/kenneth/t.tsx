import * as React from "react";
import Constants from "./constants.json";
import Damage from "../damage";
import { ValuesProps, ValuesPropsGenerator } from "../values";
import { SubjectSkillProps } from "../props";
import style from "components/tooltip/tooltip.module.styl";

const t: React.FC<SubjectSkillProps> = props => {
    const damage = (() => {
        const base = Constants.T.damage.targetMaxHP.base;
        const attack = Constants.T.damage.targetMaxHP.attack[props.config.skillLevels.T];

        if (props.showEquation) {
            return <span className={style.maxhp}>対象の最大体力の{base}(+攻撃力の{attack}％)％</span>;
        } else {
            return <span className={style.maxhp}>対象の最大体力の{props.status.attackPower.percent(attack).add(base).toString()}％</span>
        }
    })();

    return (
        <>
            ケネスが基本攻撃またはスキルでダメージを与えると{Constants.T.duration}秒間スタックを1獲得します。(最大{Constants.T.max_stack}スタック)<br />
            <br />
            {Constants.T.max_stack}スタックになるとケネスの斧が燃え上がり、基本攻撃またはスキルが的中するたびに
            {damage}のスキルダメージを追加で与えます。<br />
            ケネスはこのスキルで与えたダメージ量の<Damage skill="T" constants={Constants.T.heal} {...props} /><span className={style.emphasis}>％</span>を体力に回復します。
        </>
    );
}

export default t;

export const values: ValuesPropsGenerator = props => ({
    additionalInfo: <>
        ケネスはこのスキルで最大{props.status.attackPower.percent(Constants.T.max_heal.attack).add(Constants.T.max_heal.base[props.config.skillLevels.T]).toString()} = <span className={style.emphasis}>{Constants.T.max_heal.base[props.config.skillLevels.T].toString()}</span>
        (+攻撃力の{Constants.T.max_heal.attack}％)まで回復できます。<br />
        野生動物に与えられるダメージ量は最大{Constants.T.animal_max}に制限されます。
    </>,
    parameters: [
        {title: "合計攻撃力", values: Constants.T.damage.targetMaxHP.attack, percent: true},
        {title: "最大体力回復量", values: Constants.T.max_heal.base}
    ]
})
