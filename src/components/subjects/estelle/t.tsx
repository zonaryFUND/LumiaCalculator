import * as React from "react";
import Constants from "./constants.json";
import { SubjectSkillProps } from "../props";
import { ValuesProps } from "../values";
import style from "components/tooltip/tooltip.module.styl";

const t: React.FC<SubjectSkillProps> = props => {
    const additionalHeal = (
        <>
            <span className={style.maxhp}>{Constants.T.additional_heal.base[props.config.skillLevels.T]}{props.showEquation ? <>％</> : null}</span>
            <span className={style.amp}>(+{
                props.showEquation ? 
                <>スキル増幅の{Constants.T.additional_heal.base[props.config.skillLevels.R]}</> : 
                <>{props.status.skillAmp.times(Constants.T.additional_heal.amp).dividedBy(100).toString()}</>    
            }％)</span>
        </>
    )
    return (
        <>
            <span className={style.enhance}>基本効果</span>：半径{Constants.T.range}m以内にいる味方と自分の基本体力再生効果を
            <span className={style.losthp}>{Constants.T.hp_regen[props.config.skillLevels.T]}％</span>増加させます。エステルは瀕死状態の味方を蘇生させる時間が
            {Constants.T.revive}秒早くなります。エステルによって蘇生された味方は{additionalHeal}の体力を追加で回復します。
        </>
    );
}

export default t;

export const values: ValuesProps = {
    parameters: [
        {title: "体力再生", values: Constants.T.hp_regen, percent: true},
        {title: "[蘇生]蘇生時間短縮", values: Constants.T.revive},
        {title: "[蘇生]追加回復量", values: Constants.T.additional_heal.base, percent: true},
        {title: "クールダウン", values: Constants.R.cooldown}
    ]
}