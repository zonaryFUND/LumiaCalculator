import * as React from "react";
import style from "components/subjects/skills-standard.modue.styl";
import Images from "@app/resources/image";
import { WeaponID } from "app-types/equipment/weapon/id";
import { SkillLevelConfigurator, SkillsParent, SkillsStandardProps, WeaponSkill } from "../skills-standard";

export default function(props: {weaponType?: WeaponID} & SkillsStandardProps) {
    const skills = props.weaponType == "two-handed_sword" || props.weaponType == "tonfa" ?
        ["MeleeQ", "MeleeW", "MeleeE", "R", "T"] :
        ["RangeQ", "RangeW", "RangeE", "R", "T"]

    return (
        <SkillsParent {...props}>
            {
                skills.map(skill => (
                    <li
                        key={skill}
                        data-tooltip-id="subject-skill" 
                        data-tooltip-content={`alex-${skill}`}
                    >
                        <img src={Images.skill.alex[skill]} />
                    </li>
                ))
            }
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