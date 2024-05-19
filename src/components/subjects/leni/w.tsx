import * as React from "react";
import Constants from "./constants.json";
import Damage from "../damage";
import { ValuesProps } from "../values";
import { SubjectSkillProps } from "../props";
import style from "components/tooltip/tooltip.module.styl";
import skillDamage from "../skill-damage";

const w: React.FC<SubjectSkillProps> = props => {
    const ms = (() => {
        /*
        if (props.showEquation) {
            return <>{Constants.W.movement_speed.effect.base[props.config.skillLevels.W]}％<span className={style.level}>(+レニのレベル <span className={style.emphasis}>* {Constants.W.movement_speed.effect.level}</span>)</span></>
        } else {
            const value = skillDamage(props.status, props.config, "W", Constants.W.movement_speed.effect);
            return <>{value.toString()}％</>
        }
        */
       return null;
    })();

    return (
        <>
            レニが飛び跳ねて指定した位置にピコピコハンマーを振り下ろします。<br />
            敵または味方にそれぞれ違う効果が適用されます。<br />
            <br />
            敵：<Damage skill="W" constants={Constants.W.damage} {...props} />のスキルダメージを与えて{Constants.W.slow.duration}秒間移動速度を減少させます。<br />
            真ん中の範囲に的中された敵は{Constants.W.slow.center}％、外側の範囲に的中された敵は{Constants.W.slow.outer}％の移動速度が減少します。<br />
            味方：{Constants.W.ally_slow.duration}秒間移動速度を{Constants.W.ally_slow.effect}％減少させた後、
            {Constants.W.movement_speed.duration}秒間移動速度を{ms}増加させます。
        </>
    );
}

export default w;

export const values: ValuesProps = {
    additionalInfo: <>味方実験体に的中した場合、レニも同じ効果を受けます。</>,
    parameters: [
        {title: "ダメージ量", values: Constants.W.damage.base},
        {title: "移動速度増加量(％)", values: Constants.W.movement_speed.effect.base},
        {title: "クールダウン", values: Constants.W.cooldown},
        {title: "消費", values: Constants.W.sp_cost}
    ]
}
