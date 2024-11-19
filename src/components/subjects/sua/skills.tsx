import * as React from "react";
import style from "../skills-standard.module.styl";
import { Skill, SkillLevelConfigurator, SkillsParent, SkillsStandardProps, WeaponSkill } from "../skills-list";

export default function(props: SkillsStandardProps) {
    return  (
        <SkillsParent {...props}>
            <div className={style.vertical}>
                <Skill id="sua" skill="Q" />
                <Skill id="sua" skill="RQ" />
            </div>
            <div className={style.vertical}>
                <Skill id="sua" skill="W" />
                <Skill id="sua" skill="RW" />
            </div>
            <div className={style.vertical}>
                <Skill id="sua" skill="E" />
                <Skill id="sua" skill="RE" />
            </div>
            <div className={style.vertical}>
                <Skill id="sua" skill="R" />
            </div>
            <div className={style.vertical}>
                <Skill id="sua" skill="T" />
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
