import * as React from "react";
import Constants from "./constants.json";
import { ValuesProps, ValuesPropsGenerator } from "../values";
import Value from "components/tooltip/value";
import style from "components/tooltip/tooltip.module.styl";
import { SubjectSkillProps } from "components/tooltip/subject-skill/props";
import { calculateValue } from "app-types/value-ratio/calculation";
import { weaponSkillLevel } from "app-types/subject-dynamic/status/weapon-skill-level";

const camera: React.FC<SubjectSkillProps> = props => {
    return (
        <>
            指定した方向へ{Constants.sniper_rifle.duration}秒間<span className={style.emphasis}>狙撃モード</span>を活性化します。<br />
            <span className={style.emphasis}>狙撃モード</span>を活性化すると視界が{Constants.sniper_rifle.vision}増加し、視界の角度が減少します。<br />
            視界内の指定した方向へスキルを使用し、<span className={style.emphasis}>阻止射撃</span>
            と<span className={style.emphasis}>デッドアイ</span>を使用できます。<br />
            <br />
            <span className={style.emphasis}>阻止射撃</span><br />
            {Constants.sniper_rifle.cripping.vision}の視界を持っています。対象に
            <Value skill="D" ratio={Constants.sniper_rifle.cripping.damage} />のスキルダメージを与え、
            {Constants.sniper_rifle.cripping.target_vision}秒間対象の視界を獲得できます。ダメージを受けた対象は
            {Constants.sniper_rifle.cripping.slow.duration}秒間移動速度が{Constants.sniper_rifle.cripping.slow.effect}%減少します。<br />
            <br />
            <span className={style.emphasis}>デッドアイ</span><br />
            {Constants.sniper_rifle.dead_to_rights.vision}の視界を持っています。対象に
            <Value skill="D" ratio={Constants.sniper_rifle.dead_to_rights.damage} />
            のスキルダメージを与えます。<span className={style.emphasis}>デッドアイ</span>は対象の失った体力に応じてダメージ量が増加します。
        </>
    );
}

export default camera;

export const values: ValuesPropsGenerator = props => {
    const damage = calculateValue(Constants.sniper_rifle.dead_to_rights.damage, props.status, props.config, {skill: "D", level: weaponSkillLevel(props.config.weaponMastery)});

    return {
       additionalInfo: <>
            デッドアイ最大ダメージ量:{damage.static.times(Constants.sniper_rifle.dead_to_rights.max_damage_multiplier).toString()}<br />
            狙撃状態で移動したり、妨害効果を受けると狙撃モードが解除されます。<br />
        </>,
        parameters: [
            {title: "1打ダメージ量", values: Constants.sniper_rifle.cripping.damage.base},
            {title: "2打ダメージ量", values: Constants.sniper_rifle.dead_to_rights.damage.base},
            {title: "クールダウン", values: Constants.sniper_rifle.cooldown},
            {title: "阻止射撃スキル増幅係数", values: Constants.sniper_rifle.cripping.damage.amp, percent: true},
            {title: "阻止射撃スキル増幅係数", values: Constants.sniper_rifle.dead_to_rights.damage.amp, percent: true},
        ]
    }
}