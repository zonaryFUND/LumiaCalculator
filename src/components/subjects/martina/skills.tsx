import * as React from "react";
import Images from "@app/resources/image";
import { Skill, SkillLevelConfigurator, SkillsParent, SkillsStandardProps, WeaponSkill } from "../skills-standard";
import style from "../skills-standard.modue.styl";

export default function(props: SkillsStandardProps) {
    return  (
        <SkillsParent {...props}>
            <div className={style.vertical}>
                <Skill id="martina" skill="Q" />
                <Skill id="martina" skill="Q2" />
            </div>
            <div className={style.vertical}>
                <Skill id="martina" skill="W" />
                <Skill id="martina" skill="W2" />
            </div>
            <div className={style.vertical}>
                <Skill id="martina" skill="E" />
                <Skill id="martina" skill="E2" />
            </div>
            <div className={style.vertical}>
                <Skill id="martina" skill="R" />
                <Skill id="martina" skill="R2" />
            </div>
            <div className={style.vertical}>
                <Skill id="martina" skill="T" />
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
