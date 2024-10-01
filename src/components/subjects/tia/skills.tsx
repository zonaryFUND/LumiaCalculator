import * as React from "react";
import style from "../skills-standard.modue.styl";
import { Skill, SkillLevelConfigurator, SkillsParent, SkillsStandardProps, WeaponSkill } from "../skills-standard";

export default function(props: SkillsStandardProps) {
    return  (
        <SkillsParent {...props}>
            <div className={style.vertical}>
            
                <Skill id="tia" skill="Q1" />
                <Skill id="tia" skill="Q2" />
                <Skill id="tia" skill="Q3" />
            </div>
            <div className={style.vertical}>

                <Skill id="tia" skill="W1" />
                <Skill id="tia" skill="W2" />
                <Skill id="tia" skill="W3" />
            </div>
            <div className={style.vertical}>

                <Skill id="tia" skill="E1" />
                <Skill id="tia" skill="E2" />
                <Skill id="tia" skill="E3" />
            </div>
            <div className={style.vertical}>

                <Skill id="tia" skill="R" />
            </div>
            <div className={style.vertical}>

                <Skill id="tia" skill="T" />
            </div>
            <WeaponSkill id={props.weaponType} />
            <SkillLevelConfigurator skill="Q" />
            <SkillLevelConfigurator skill="W" max={3} />
            <SkillLevelConfigurator skill="E" />
            <SkillLevelConfigurator skill="R" />
            <SkillLevelConfigurator skill="T" max={5} />
        </SkillsParent>
    )
}

export function idForLevel(skill: string): string {
    return skill.slice(0, 1);
}

export function idForConsumption(skill: string): string {
    return skill.slice(0, 1);
}