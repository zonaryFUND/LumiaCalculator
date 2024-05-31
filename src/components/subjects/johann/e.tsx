import * as React from "react";
import Constants from "./constants.json";
import Value from "components/tooltip/value";
import { ValuesProps } from "../values";
import style from "components/tooltip/tooltip.module.styl";
import { SubjectSkillProps } from "components/tooltip/subject-skill/props";
import { useValueContext } from "components/tooltip/value-context";

const MS: React.FC<SubjectSkillProps & {base: number[], amp: number}> = props => {
    const { showEquation } = useValueContext();

    if (showEquation) {
        return <><span className={style.emphasis}>{props.base[props.skillLevel]}%</span><span className={style.amp}>(+スキル増幅の{props.amp}%)</span></>;
    } else {
        return <><Value skill="E" ratio={Constants.E.movement_speed.effect} />%</>;
    }
}

const e: React.FC<SubjectSkillProps> = props => (
    <>
        指定した味方に導きの光を付与して、移動速度減少効果を解除します。<br />
        <br />
        対象は{Constants.E.movement_speed.duration}秒間移動速度が<MS {...props} {...Constants.E.movement_speed.effect} />増加し、持続時間が終了すると、周りの敵に
        <Value skill="E" ratio={Constants.E.damage} />のスキルダメージを与えます。導きの光が付与された対象が
        <span className={style.emphasis}>神聖の香炉</span>に接触すると、スキルが強化されて{Constants.E.shield_duration}秒間
        <Value skill="E" ratio={Constants.E.shield} />のシールドを獲得し、
        <Value skill="E" ratio={Constants.E.enhanced_damage} />のスキルダメージを追加で与えます。
        <br />
        味方が導きの光が付与された対象に移動する場合、移動速度が<MS {...props} {...Constants.E.chase_movement_speed} />増加します。
    </>
);

export default e;

export const values: ValuesProps = {
    parameters: [
        {title: "ダメージ量", values: Constants.E.damage.base},
        {title: "強化されたダメージ量", values: Constants.E.enhanced_damage.base},
        {title: "シールド吸収量", values: Constants.E.shield.base},
        {title: "移動速度増加量(%)", values: Constants.E.movement_speed.effect.base, percent: true},
        {title: "追撃時移動速度(%)", values: Constants.E.chase_movement_speed.base, percent: true},
        {title: "消費", values: Constants.E.sp_cost},
        {title: "クールダウン", values: Constants.E.cooldown}
    ]
}