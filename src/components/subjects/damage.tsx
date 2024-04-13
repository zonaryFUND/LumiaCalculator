import * as React from "react";
import skillDamage from "./skill-damage";
import style from "components/tooltip/tooltip.module.styl";
import { SubjectSkillProps } from "./props";
import Decimal from "decimal.js";

type Value = Decimal.Value | Decimal.Value[]

type Props = SubjectSkillProps & {
    skill: "Q" | "W" | "E" | "R" | "T"
    constants: {
        base?: Value,
        attack?: Value,
        basicAttackAmp?: Value,
        additionalAttack?: Value,
        defense?: Value
        maxHP?: Value
        additionalMaxHP?: Value
        amp?: Value
        targetHP?: Value
        lostHP?: Value
        targetLostHP?: Value
        targetMaxHP?: Value
        maxSP?: Value
        criticalChance?: Value
        summoned_attack?: Value
        stack?: Value
        level?: Value
    }
    summonedName?: string
    stackName?: string
}

function current(skillLevel: number, value: Value): Decimal.Value {
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
                                return <span key={key} className={style.emphasis}>{current(skillLevel, props.constants.base!).toString()}</span>;
                            case "attack":
                                return <span key={key} className={style.attack}>{left}攻撃力の{current(skillLevel, props.constants.attack!).toString()}％{right}</span>;
                            case "basicAttackAmp":
                                return <span key={key} className={style.attack}>* (基本攻撃増幅)</span>;
                            case "additionalAttack":
                                return <span key={key} className={style.attack}>{left}追加攻撃力の{current(skillLevel, props.constants.additionalAttack!).toString()}％{right}</span>;
                            case "defense":
                                return <span key={key} className={style.defense}>{left}防御力の{current(skillLevel, props.constants.defense!).toString()}％{right}</span>;
                            case "maxHP":
                                return <span key={key} className={style.maxhp}>{left}最大体力の{current(skillLevel, props.constants.maxHP!).toString()}％{right}</span>;
                            case "additionalMaxHP":
                                return <span key={key} className={style.maxhp}>{left}追加体力の{current(skillLevel, props.constants.additionalMaxHP!).toString()}％{right}</span>;                                
                            case "amp":
                                return <span key={key} className={style.amp}>{left}スキル増幅の{current(skillLevel, props.constants.amp!).toString()}％{right}</span>;
                            case "targetHP":
                                return <span key={key} className={style.maxhp}>{left}対象の現在体力の{current(skillLevel, props.constants.targetHP!).toString()}％{right}</span>;
                            case "targetMaxHP":
                                return <span key={key} className={style.maxhp}>{left}対象の最大体力の{current(skillLevel, props.constants.targetMaxHP!).toString()}％{right}</span>;
                            case "lostHP":
                                return <span key={key} className={style.losthp}>{left}失った体力の{current(skillLevel, props.constants.lostHP!).toString()}％{right}</span>;
                            case "targetLostHP":
                                return <span key={key} className={style.losthp}>{left}対象の失った体力の{current(skillLevel, props.constants.targetLostHP!).toString()}％{right}</span>;
                            case "maxSP":
                                return <span key={key} className={style.maxsp}>{left}最大スタミナの{current(skillLevel, props.constants.maxSP!).toString()}％{right}</span>;
                            case "criticalChance":
                                return <span key={key} className={style.critical}>+{
                                    props.status.criticalChance.percent(current(skillLevel, props.constants.criticalChance!)).toString()
                                }％ = (致命打確率の{current(skillLevel, props.constants.criticalChance!).toString()}％)</span>;
                            case "summoned_attack":
                                return <span key={key} className={style.attack}>{left}{props.summonedName}の攻撃力の{current(skillLevel, props.constants.summoned_attack!).toString()}％{right}</span>;
                            case "stack":
                                return <span key={key} className={style.strong}>{left}{props.stackName}スタック数{right}</span>;
                            case "level":
                                return <span key={key} className={style.level}>{left}キャラクターレベル*{current(skillLevel, props.constants.level!).toString()}{right}</span>
                        }
                    })
                }
            </>
        );
    } else {
        return (
            <>
               <span className={style.emphasis}>{skillDamage(props.status, props.config, props.skill, props.constants).toString()}</span>
               {props.constants.targetHP ? <span className={style.maxhp}>(+対象の現在体力の{current(skillLevel, props.constants.targetHP)}％)</span> : null}
               {props.constants.lostHP ? <span className={style.losthp}>(+失った体力の{current(skillLevel, props.constants.lostHP)}％)</span> : null}
               {props.constants.targetLostHP ? <span className={style.losthp}>(+対象の失った体力の{current(skillLevel, props.constants.targetLostHP)}％)</span> : null}
               {props.constants.targetMaxHP ? <span className={style.maxhp}>(+対象の最大体力の{current(skillLevel, props.constants.targetMaxHP)}％)</span> : null}
            </>
        );
    }
}

export default damage;