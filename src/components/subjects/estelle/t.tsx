import * as React from "react";
import Value from "components/tooltip/value";
import Constants from "./constants.json";
import { ValuesProps } from "../values";
import style from "components/tooltip/tooltip.module.styl";
import { SubjectSkillProps } from "components/tooltip/subject-skill/props";
import { useValueContext } from "components/tooltip/value-context";

const t: React.FC<SubjectSkillProps> = props => {
    const { showEquation } = useValueContext();
    const additionalHeal = (
        showEquation ?
        <>
            <span className={style.maxhp}>{Constants.T.additional_heal.targetMaxHP.base[props.skillLevel]}%</span>
            <span className={style.amp}>(+スキル増幅の{Constants.T.additional_heal.targetMaxHP.base[props.skillLevel]}%)</span>
        </>
        :
        <Value skill="T" ratio={Constants.T.additional_heal} />
    )

    return (
        <>
            <span className={style.enhance}>基本効果</span>：エステルは{Constants.T.heal_period}秒ごとに自分の体力を
            <Value skill="T" ratio={Constants.T.heal} />回復します。
            また、エステルは瀕死状態の味方を蘇生させる時間が
            {Constants.T.revive[props.skillLevel]}秒早くなります。エステルによって蘇生された味方は{additionalHeal}の体力を追加で回復します。
        </>
    );
}

export default t;

export const values: ValuesProps = {
    parameters: [
        {title: "最大体力係数", values: Constants.T.heal.maxHP, percent: true},
        {title: "[蘇生]蘇生時間短縮", values: Constants.T.revive},
        {title: "[蘇生]追加回復量", values: Constants.T.additional_heal.targetMaxHP.base, percent: true},
        {title: "クールダウン", values: Constants.R.cooldown}
    ]
}