import * as React from "react";
import Images from "@app/resources/image";
import { Skill, SkillLevelConfigurator, SkillsParent, SkillsStandardProps, WeaponSkill } from "../skills-list";
import style from "../skills-standard.module.styl";

export default function(props: SkillsStandardProps) {
    return  (
        <SkillsParent {...props}>
            <div className={style.vertical}>
                <Skill id="irem" skill="IremQ" />
                <Skill id="irem" skill="CatQ" />
            </div>
            <div className={style.vertical}>
                <Skill id="irem" skill="IremW" />
                <Skill id="irem" skill="CatW" />
            </div>
            <div className={style.vertical}>
                <Skill id="irem" skill="IremE" />
                <Skill id="irem" skill="CatE" />
            </div>
            <div className={style.vertical}>
                <Skill id="irem" skill="IremR" />
                <Skill id="irem" skill="CatR" />
            </div>
            <div className={style.vertical}>
                <Skill id="irem" skill="T" />
            </div>
            <WeaponSkill id={props.weaponType} />
            <SkillLevelConfigurator skill="Q" />
            <SkillLevelConfigurator skill="W" />
            <SkillLevelConfigurator skill="E" />
            <SkillLevelConfigurator skill="R" max={4} />
            <SkillLevelConfigurator skill="T" />
        </SkillsParent>
    )
}

export function idForLevel(skill: string): string {
    return skill.slice(skill.length - 1);
}