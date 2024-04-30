import * as React from "react";
import skillDamage, { skillLevel } from "./skill-damage";
import style from "components/tooltip/tooltip.module.styl";
import { SubjectSkillProps } from "./props";
import Decimal from "decimal.js";

type Value = Decimal.Value | Decimal.Value[]

type Props = SubjectSkillProps & {
    skill: "Q" | "W" | "E" | "R" | "T" | "D"
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
        attackSpeed?: Value
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
    const level = skillLevel(props.skill, props.config);
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
                                return <span key={key} className={style.emphasis}>{current(level, props.constants.base!).toString()}</span>;
                            case "attack":
                                return <span key={key} className={style.attack}>{left}攻撃力の{current(level, props.constants.attack!).toString()}％{right}</span>;
                            case "basicAttackAmp":
                                return <span key={key} className={style.attack}>* (基本攻撃増幅)</span>;
                            case "additionalAttack":
                                return <span key={key} className={style.attack}>{left}追加攻撃力の{current(level, props.constants.additionalAttack!).toString()}％{right}</span>;
                            case "defense":
                                return <span key={key} className={style.defense}>{left}防御力の{current(level, props.constants.defense!).toString()}％{right}</span>;
                            case "maxHP":
                                return <span key={key} className={style.maxhp}>{left}最大体力の{current(level, props.constants.maxHP!).toString()}％{right}</span>;
                            case "additionalMaxHP":
                                return <span key={key} className={style.maxhp}>{left}追加体力の{current(level, props.constants.additionalMaxHP!).toString()}％{right}</span>;                                
                            case "amp":
                                return <span key={key} className={style.amp}>{left}スキル増幅の{current(level, props.constants.amp!).toString()}％{right}</span>;
                            case "targetHP":
                                return <span key={key} className={style.maxhp}>{left}対象の現在体力の{current(level, props.constants.targetHP!).toString()}％{right}</span>;
                            case "targetMaxHP":
                                return <span key={key} className={style.maxhp}>{left}対象の最大体力の{current(level, props.constants.targetMaxHP!).toString()}％{right}</span>;
                            case "lostHP":
                                return <span key={key} className={style.losthp}>{left}失った体力の{current(level, props.constants.lostHP!).toString()}％{right}</span>;
                            case "targetLostHP":
                                return <span key={key} className={style.losthp}>{left}対象の失った体力の{current(level, props.constants.targetLostHP!).toString()}％{right}</span>;
                            case "maxSP":
                                return <span key={key} className={style.maxsp}>{left}最大スタミナの{current(level, props.constants.maxSP!).toString()}％{right}</span>;
                            case "criticalChance":
                                return <span key={key} className={style.critical}>+{
                                    props.status.criticalChance.percent(current(level, props.constants.criticalChance!)).toString()
                                }％ = (致命打確率の{current(level, props.constants.criticalChance!).toString()}％)</span>;
                            case "summoned_attack":
                                return <span key={key} className={style.attack}>{left}{props.summonedName}の攻撃力の{current(level, props.constants.summoned_attack!).toString()}％{right}</span>;
                            case "stack":
                                return <span key={key} className={style.strong}>{left}{props.stackName}スタック数{right}</span>;
                            case "level":
                                if (props.config.subject == "leni") {
                                    return <span key={key} className={style.level}>{left}レニのレベル <span className={style.emphasis}>* {current(level, props.constants.level!).toString()}</span>{right}</span>
                                } else {
                                    return <span key={key} className={style.level}>{left}キャラクターレベル*{current(level, props.constants.level!).toString()}{right}</span>
                                }
                            case "attackSpeed":
                                return <span key={key} className={style.attackspeed}>{left}攻撃速度の{current(level, props.constants.attackSpeed!).toString()}％{right}</span>;
                        }
                    })
                }
            </>
        );
    } else {
        return (
            <>
               <span className={style.emphasis}>{skillDamage(props.status, props.config, props.skill, props.constants).toString()}</span>
               {props.constants.targetHP ? <span className={style.maxhp}>(+対象の現在体力の{current(level, props.constants.targetHP)}％)</span> : null}
               {props.constants.lostHP ? <span className={style.losthp}>(+失った体力の{current(level, props.constants.lostHP)}％)</span> : null}
               {props.constants.targetLostHP ? <span className={style.losthp}>(+対象の失った体力の{current(level, props.constants.targetLostHP)}％)</span> : null}
               {props.constants.targetMaxHP ? <span className={style.maxhp}>(+対象の最大体力の{current(level, props.constants.targetMaxHP)}％)</span> : null}
            </>
        );
    }
}

export default damage;