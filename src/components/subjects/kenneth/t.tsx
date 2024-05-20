import * as React from "react";
import Constants from "./constants.json";
import Value from "components/tooltip/value";
import { ValuesProps, ValuesPropsGenerator } from "../values";
import style from "components/tooltip/tooltip.module.styl";
import { SubjectSkillProps } from "components/tooltip/subject-skill/props";
import { useValueContext } from "components/tooltip/value-context";

const t: React.FC<SubjectSkillProps> = props => {
    const { showEquation } = useValueContext();

    const damage = showEquation ?
        <span className={style.maxhp}>対象の最大体力の{Constants.T.damage.targetMaxHP.base}
            <span className={style.attack}>(+攻撃力の{Constants.T.damage.targetMaxHP.attack[props.skillLevel]}%)</span>%
        </span> :
        <Value skill="T" ratio={Constants.T.damage} />

    return (
        <>
            ケネスが基本攻撃またはスキルでダメージを与えると{Constants.T.duration}秒間スタックを1獲得します。(最大{Constants.T.max_stack}スタック)<br />
            <br />
            {Constants.T.max_stack}スタックになるとケネスの斧が燃え上がり、基本攻撃またはスキルが的中するたびに
            {damage}のスキルダメージを追加で与えます。<br />
            ケネスはこのスキルで与えたダメージ量の<Value skill="T" ratio={Constants.T.heal} /><span className={style.emphasis}>%</span>を体力に回復します。
        </>
    );
}

export default t;

export const values: ValuesPropsGenerator = props => ({
    additionalInfo: <>
        ケネスはこのスキルで最大{props.status.attackPower.calculatedValue.percent(Constants.T.max_heal.attack).add(Constants.T.max_heal.base[props.config.skillLevels.T]).toString()} = <span className={style.emphasis}>{Constants.T.max_heal.base[props.config.skillLevels.T].toString()}</span>
        (+攻撃力の{Constants.T.max_heal.attack}％)まで回復できます。<br />
        野生動物に与えられるダメージ量は最大{Constants.T.animal_max}に制限されます。
    </>,
    parameters: [
        {title: "合計攻撃力", values: Constants.T.damage.targetMaxHP.attack, percent: true},
        {title: "最大体力回復量", values: Constants.T.max_heal.base}
    ]
})
