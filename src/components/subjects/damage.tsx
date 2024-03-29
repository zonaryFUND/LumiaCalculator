import * as React from "react";
import skillDamage from "./skill-damage";
import style from "components/tooltip/tooltip.module.styl";
import { SubjectSkillProps } from "./props";

type Value = number | number[]

type Props = SubjectSkillProps & {
    skill: "Q" | "W" | "E" | "R" | "T"
    constants: {
        base?: Value,
        attack?: Value,
        basicAttackAmp?: Value,
        additionalAttack?: Value,
        additionalMaxHP?: Value
        amp?: Value
        targetHP?: Value
    }
}

function current(skillLevel: number, value: Value): number {
    if (Array.isArray(value)) {
        return value[skillLevel]
    } else {
        return value
    }
}

const damage: React.FC<Props> = props => {
    const skillLevel = props.config.skillLevels[props.skill];
    if (props.showEquation) {
        return (
            <>
                {
                    Object.keys(props.constants).map((key, i) => {
                        const value = (props.constants as any)[key];
                        if (value == undefined) return null;
                        const left = i == 0 ? null : <>(+</>;
                        const right = i == 0 ? null : <>)</>;
                        switch (key) {
                            case "base":
                                return <span key={key} className={style.emphasis}>{current(skillLevel, props.constants.base!)}</span>;
                            case "attack":
                                return <span key={key} className={style.attack}>{left}攻撃力の{current(skillLevel, props.constants.attack!)}％{right}</span>;
                            case "basicAttackAmp":
                                return <span key={key} className={style.attack}>* (基本攻撃増幅)</span>;
                            case "additionalAttack":
                                return <span key={key} className={style.attack}>{left}追加攻撃力の{current(skillLevel, props.constants.additionalAttack!)}％{right}</span>;
                            case "additionalMaxHP":
                                return <span key={key} className={style.maxhp}>{left}追加体力の{current(skillLevel, props.constants.additionalMaxHP!)}％{right}</span>;                                
                            case "amp":
                                return <span key={key} className={style.amp}>{left}スキル増幅の{current(skillLevel, props.constants.amp!)}％{right}</span>;
                            case "targetHP":
                                return <span key={key} className={style.maxhp}>{left}対象の現在体力の{current(skillLevel, props.constants.targetHP!)}％{right}</span>;
                        }
                    })
                }
            </>
        );
    } else {
        return (
            <>
               <span className={style.emphasis}>{skillDamage(props.status, props.config.level, skillLevel, props.constants).toString()}</span>
               {props.constants.targetHP ? <span className={style.maxhp}>(+対象の現在体力の{current(skillLevel, props.constants.targetHP)}％)</span> : null}
            </>
        );
    }
}

export default damage;