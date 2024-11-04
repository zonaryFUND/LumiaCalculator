import * as React from "react";
import Constants from "./constants.json";
import { ValuesProps } from "../values";
import Value from "components/tooltip/value";
import style from "components/tooltip/tooltip.module.styl";
import { SubjectSkillProps } from "components/tooltip/subject-skill/props";
import { useValueContext } from "components/tooltip/value-context";

const pistol: React.FC<SubjectSkillProps> = props => {
    const { showEquation } = useValueContext();

    const movementSpeed = (() => {
        if (showEquation) {
            return <>
                <span className={style.emphasis}>{Constants.pistol.movement_speed.base[props.skillLevel]}%</span>
                <span className={style.amp}>(+スキル増幅の{Constants.pistol.movement_speed.amp}%)</span>
            </>
        } else {
            return <>
                <Value skill="D" ratio={Constants.pistol.movement_speed} />
                <span className={style.emphasis}>%</span>
            </>;
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