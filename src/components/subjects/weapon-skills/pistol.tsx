import * as React from "react";
import Constants from "./constants.json";
import { SubjectSkillProps } from "../props";
import { ValuesProps } from "../values";
import skillDamage, { skillLevel } from "../skill-damage";
import style from "components/tooltip/tooltip.module.styl";

const pistol: React.FC<SubjectSkillProps> = props => {
    const level = skillLevel("D", props.config);
    const movementSpeed = (() => {
        if (props.showEquation) {
            return <>
                <span className={style.emphasis}>{Constants.pistol.movement_speed.base[level]}%</span>
                <span className={style.amp}>スキル増幅の{Constants.pistol.movement_speed.amp}%</span>
            </>
        } else {
            //const value = skillDamage(props.status, props.config, "D", Constants.pistol.movement_speed);
            //return <span className={style.emphasis}>{value.toString()}%</span>
            return null;
        }
    })();

    return (
        <>
            {Constants.pistol.duration}秒間{movementSpeed}早く移動して銃弾を装填します。装填を終えた後には、次の
            {Constants.pistol.attack_speed.count}回の基本攻撃速度が{Constants.pistol.attack_speed.effect}%増加します。
        </>
    );
}

export default pistol;

export const values: ValuesProps = {
    parameters: [
        {title: "移動速度", values: Constants.pistol.movement_speed.base, percent: true},
        {title: "クールダウン", values: Constants.pistol.cooldown},
    ]
}