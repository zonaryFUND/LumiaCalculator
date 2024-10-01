import * as React from "react";
import Images from "@app/resources/image";
import { Skill, SkillLevelConfigurator, SkillsParent, SkillsStandardProps, WeaponSkill } from "../skills-standard";
import style from "../skills-standard.modue.styl";

export default function(props: SkillsStandardProps) {
    return  (
        <SkillsParent {...props}>
            <div className={style.vertical}>
                <Skill id="haze" skill="Q" />
                <Skill id="haze" skill="Q2" />
                <Skill id="haze" skill="Q3" />
            </div>
            <div className={style.vertical}>
                <Skill id="haze" skill="W" />
            </div>
            <div className={style.vertical}>
                <Skill id="haze" skill="E" />
            </div>
            <div className={style.vertical}>
                <Skill id="haze" skill="R" />
            </div>
            <div className={style.vertical}>
                <Skill id="haze" skill="T" />
            </div>
            <WeaponSkill id={props.weaponType} />
            <SkillLevelConfigurator skill="Q" />
            <SkillLevelConfigurator skill="W" />
            <SkillLevelConfigurator skill="E" />
            <SkillLevelConfigurator skill="R" />
            <SkillLevelConfigurator skill="T" />
        </SkillsParent>
    )
}

export function idForLevel(skill: string): string {
    return skill.slice(0, 1);
}
