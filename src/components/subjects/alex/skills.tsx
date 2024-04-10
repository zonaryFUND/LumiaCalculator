import * as React from "react";
import style from "components/subjects/skills-standard.modue.styl";
import Images from "@app/resources/image";
import { WeaponID } from "@app/entity/weapon-id";
import { equipmentStatus } from "@app/entity/equipment";
import { SkillLevelConfigurator, SkillsParent, SkillsStandardProps } from "../skills-standard";

export default function(props: {weapon: WeaponID | null} & SkillsStandardProps) {
    const type = props.weapon == null ? null : equipmentStatus(props.weapon).type;
    const skills = type == "two-handed_sword" || type == "tonfa" ?
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
                        <SkillLevelConfigurator skill={skill.slice(skill.length - 1) as any} />
                    </li>
                ))
            }
        </SkillsParent>
    )
}

export function idForLevel(skill: string): string {
    return skill.slice(skill.length - 1);
}