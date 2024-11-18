import * as React from "react";
import Constants from "./constants.json";
import Value from "components/tooltip/value";
import { ValuesProps, ValuesPropsGenerator } from "../../tooltip/subject-skill/expansion-values";
import style from "components/tooltip/tooltip.module.styl";
import { SubjectSkillProps } from "components/tooltip/subject-skill/props";
import { calculateValue } from "app-types/value-ratio/calculation";
import { useValueContext } from "components/tooltip/value-context";

const t: React.FC<SubjectSkillProps> = props => {
    return (
        <>
            ダイリンは酒飲みを使用して酔いを獲得できます。酔い具合によって猛虎清拳が発動します。<br />
            <br />
            <span className={style.emphasis}>猛虎清拳</span>：攻撃速度が{Constants.T.attack_speed}
            %増加し、基本攻撃が敵を2回連続で攻撃します。2回目の攻撃は<Value skill="T" ratio={Constants.T.damage} />
            の基本攻撃ダメージを与えます。<br />
            <br />
            <span className={style.emphasis}>酔いが{Constants.T.threshold}以上の場合</span>
            ：ダイリンが丁度いい酔い具合になって虎連脚と酒撒きスキルが酔拳状態になって強化されます。基本スキルを使用した後の基本攻撃に猛虎清拳が発動します。<br />
            <br />
            <span className={style.emphasis}>酔いが100の場合</span>：ダイリンが酔っ払って泥酔状態になり、
            {Constants.T.drunk_duration}秒間スキルを使用できなくなります。泥酔状態の間には猛虎清拳が発動します。
        </>
    );
}

export default t;

// NOTE: Mysteriously, the second attack damage is displayed as the calculated damage result, not the attack power ratio.
export const values: ValuesPropsGenerator = props => {
    return {
        additionalInfo: <>
            <span className={style.emphasis}>李花子</span>：酒が入ったアイテムを使うと{Constants.T.alcohol_drink.duration}秒間攻撃力が
            {Constants.T.alcohol_drink.attack}増加します。<br />
            <span className={style.emphasis}>酒</span>：<span className={style.common}>薬酒</span>、
            <span className={style.common}>高粱酒</span>、<span className={style.common}>百日酔</span>、
            <span className={style.common}>ウイスキー</span>を材料にするすべての飲み物
        </>,
        parameters: [
            {title: "最小ダメージ量", values: [0,1,2].map(level => calculateValue(
                Constants.T.damage, 
                props.status,
                {...props.config, skillLevels: {...props.config.skillLevels, T: level}},
                level
            ).static.floor().toString())}
        ]
    }
}
