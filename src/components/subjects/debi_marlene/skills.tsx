import * as React from "react";
import Images from "@app/resources/image";
import { Skill, SkillLevelConfigurator, SkillsParent, SkillsStandardProps, WeaponSkill } from "../skills-list";
import style from "../skills-standard.module.styl";

export default function(props: SkillsStandardProps) {
    return  (
        <SkillsParent {...props}>
            <div className={style.vertical}>
                <Skill id="debi_marlene" skill="DebiQ" />
                <Skill id="debi_marlene" skill="MarleneQ" />
            </div>
            <div className={style.vertical}>
                <Skill id="debi_marlene" skill="DebiW" />
                <Skill id="debi_marlene" skill="MarleneW" />
            </div>
            <div className={style.vertical}>
                <Skill id="debi_marlene" skill="DebiE" />
                <Skill id="debi_marlene" skill="MarleneE" />
            </div>
            <div className={style.vertical}>
                <Skill id="debi_marlene" skill="R" />
            </div>
            <div className={style.vertical}>
                <Skill id="debi_marlene" skill="T" />
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
    return skill.slice(skill.length - 1);
}