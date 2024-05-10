import * as React from "react";
import skillDamage, { skillLevel } from "./skill-damage";
import style from "components/tooltip/tooltip.module.styl";
import { SubjectSkillProps } from "./props";
import Decimal from "decimal.js";

type Value = Decimal.Value | Decimal.Value[]

type Props = Partial<SubjectSkillProps> & {
    skill: "Q" | "W" | "E" | "R" | "T" | "D" | "item"
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

        melee?: any
        range?: any
    }
    summonedName?: string
    stackName?: string
    target?: "target" | "enemy"
    className?: string
}

function current(skillLevel: number | undefined, value: Value): Decimal.Value {
    if (Array.isArray(value)) {
        if (skillLevel == undefined) {
            throw new Error("Skill Level is undefined in a required situation!");
        }
        return value[skillLevel]
    } else {
        return value
    }
}

const Damage: React.FC<Props> = props => {
    const target = React.useMemo(() => {
        return props?.target == "enemy" ? "敵" : "対象"
    }, [props.target])

    const level = React.useMemo(() => {
        if (props.config && props.skill != "item") {
            return skillLevel(props.skill, props.config);
        } else {
            return undefined;
        }
    }, [props.skill, props.config]);

    if (props.constants.melee != undefined) {
        return <>近距離：<Damage {...props} constants={props.constants.melee} /> | 遠距離：<Damage {...props} constants={props.constants.range} /></>
    }

    if (props.status && props.config && props.showEquation != true) {
        const damage = skillDamage(props.status, props.config, props.skill, props.constants);
        const additionalKeys = ["targetHP", "lostHP", "targetMaxHP", "targetLostHP"];
        const additionalOnly = Object.keys(props.constants).filter(key => !additionalKeys.includes(key)).length == 0;
        const [left, right] = additionalOnly ? [null, null] : [<>(+</>, <>)</>]
        return (
            <>
               {additionalOnly ? null : <span className={props.className || style.emphasis}>{damage.toString()}</span>}
               {props.constants.targetHP ? <span className={style.maxhp}>{left}{target}の現在体力の{current(level, props.constants.targetHP)}％{right}</span> : null}
               {props.constants.lostHP ? <span className={style.losthp}>{left}失った体力の{current(level, props.constants.lostHP)}％{right}</span> : null}
               {props.constants.targetLostHP ? <span className={style.losthp}>{left}{target}の失った体力の{current(level, props.constants.targetLostHP)}％{right}</span> : null}
               {props.constants.targetMaxHP ? <span className={style.maxhp}>{left}{target}の最大体力の{current(level, props.constants.targetMaxHP)}％{right}</span> : null}
            </>
        );
    } else {
        return (
            <>
                {
                    Object.keys(props.constants).map((key, i) => {
                        const value = (props.constants as any)[key];
                        if (value == undefined) return null;
                        const [left, right] = i == 0 ? [null, null] : [<>(+</>, <>)</>]

                        switch (key) {
                            case "base":
                                return <span key={key} className={props.className || style.emphasis}>{current(level, props.constants.base!).toString()}</span>;
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
                                return <span key={key} className={style.maxhp}>{left}{target}の現在体力の{current(level, props.constants.targetHP!).toString()}％{right}</span>;
                            case "targetMaxHP":
                                return <span key={key} className={style.maxhp}>{left}{target}の最大体力の{current(level, props.constants.targetMaxHP!).toString()}％{right}</span>;
                            case "lostHP":
                                return <span key={key} className={style.losthp}>{left}失った体力の{current(level, props.constants.lostHP!).toString()}％{right}</span>;
                            case "targetLostHP":
                                return <span key={key} className={style.losthp}>{left}{target}の失った体力の{current(level, props.constants.targetLostHP!).toString()}％{right}</span>;
                            case "maxSP":
                                return <span key={key} className={style.maxsp}>{left}最大スタミナの{current(level, props.constants.maxSP!).toString()}％{right}</span>;
                            case "criticalChance":
                                return <span key={key} className={style.critical}>+{
                                    props.status?.criticalChance.percent(current(level, props.constants.criticalChance!)).toString()
                                }％ = (致命打確率の{current(level, props.constants.criticalChance!).toString()}％)</span>;
                            case "summoned_attack":
                                return <span key={key} className={style.attack}>{left}{props.summonedName}の攻撃力の{current(level, props.constants.summoned_attack!).toString()}％{right}</span>;
                            case "stack":
                                return <span key={key} className={style.strong}>{left}{props.stackName}スタック数{right}</span>;
                            case "level":
                                if (props.config?.subject == "leni") {
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
    }
}

export default Damage;