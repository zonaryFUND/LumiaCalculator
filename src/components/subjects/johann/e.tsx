import * as React from "react";
import Constants from "./constants.json";
import Damage from "../damage";
import { ValuesProps } from "../values";
import { SubjectSkillProps } from "../props";
import style from "components/tooltip/tooltip.module.styl";
import skillDamage from "../skill-damage";

const MS: React.FC<SubjectSkillProps & {base: number[], amp: number}> = props => {
    /*
    if (props.showEquation) {
        return <><span className={style.emphasis}>{props.base[props.config.skillLevels.E]}%</span><span className={style.amp}>(+{props.amp}%)</span></>;
    } else {
        const value = skillDamage(props.status, props.config, "E", props);
        return <span className={style.emphasis}>{value.toString()}%</span>
    }
    */
   return null;
}

const e: React.FC<SubjectSkillProps> = props => (
    <>
        指定した味方に導きの光を付与して、移動速度減少効果を削除します。<br />
        <br />
        対象は{Constants.E.movement_speed.duration}秒間移動速度が<MS {...props} {...Constants.E.movement_speed.effect} />増加して、持続時間が終わると周りの敵に
        <Damage skill="E" constants={Constants.E.damage} {...props} />のスキルダメージを与えます。<br />
        <br />
        ヨハンは導きの光の効果を受ける味方に向かうと移動速度が<MS {...props} {...Constants.E.self_movement_speed} />増加します。
    </>
);

export default e;

export const values: ValuesProps = {
    parameters: [
        {title: "ダメージ量", values: Constants.E.damage.base},
        {title: "移動速度増加量(%)", values: Constants.E.movement_speed.effect.base, percent: true},
        {title: "追撃児移動速度(%)", values: Constants.E.self_movement_speed.base, percent: true},
        {title: "消費", values: Constants.E.sp_cost},
        {title: "クールダウン", values: Constants.E.cooldown}
    ]
}