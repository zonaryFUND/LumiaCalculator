import * as React from "react";
import Constants from "./constants.json";
import { SubjectSkillProps } from "../props";
import { ValuesProps } from "../values";
import Damage from "../damage";
import skillDamage, { skillLevel } from "../skill-damage";
import style from "components/tooltip/tooltip.module.styl";

const camera: React.FC<SubjectSkillProps> = props => {
    const level = skillLevel("D", props.config);

    return (
        <>
            指定した方向へ{Constants.sniper_rifle.duration}秒間<span className={style.emphasis}>狙撃モード</span>を活性化します。<br />
            <span className={style.emphasis}>狙撃モード</span>を活性化すると視界が{Constants.sniper_rifle.vision}増加し、視界の角度が減少します。<br />
            視界内の指定した方向へスキルを使用し、<span className={style.emphasis}>阻止射撃</span>
            と<span className={style.emphasis}>デッドアイ</span>を使用できます。<br />
            <br />
            <span className={style.emphasis}>阻止射撃</span><br />
            {Constants.sniper_rifle.cripping.vision}の視界を持っています。対象に
            <Damage skill="D" constants={Constants.sniper_rifle.cripping.damage} {...props} />のスキルダメージを与え、
            {Constants.sniper_rifle.cripping.target_vision}秒間対象の視界を獲得できます。ダメージを受けた対象は
            {Constants.sniper_rifle.cripping.slow.duration}秒間移動速度が{Constants.sniper_rifle.cripping.slow.effect}％減少します。<br />
            <br />
            <span className={style.emphasis}>デッドアイ</span><br />
            {Constants.sniper_rifle.dead_to_rights.vision}の視界を持っています。対象に
            <Damage skill="D" constants={Constants.sniper_rifle.dead_to_rights.damage} {...props} />
            のスキルダメージを与えます。<span className={style.emphasis}>デッドアイ</span>は対象の失った体力に応じてダメージ量が増加します。
        </>
    );
}

export default camera;

export function values(props: SubjectSkillProps): ValuesProps {
    const damage = skillDamage(props.status, props.config, "D", Constants.sniper_rifle.dead_to_rights.damage)
        .times(Constants.sniper_rifle.dead_to_rights.max_damage_multiplier);

    return {
       additionalInfo: <>
            デッドアイ最大ダメージ量:{damage.toString()}<br />
            狙撃状態で移動したり、妨害効果を受けると狙撃モードが解除されます。<br />
            <br />
            武器熟練度<span className={style.emphasis}>5Lv・10Lv・15Lv</span>の時にスキルレベルアップ
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