import * as React from "react";
import style from "components/subjects/skills-standard.modue.styl";
import Images from "@app/resources/image";
import { WeaponID } from "@app/entity/weapon-id";
import { equipmentStatus } from "@app/entity/equipment";

export default function(props: {weapon: WeaponID | null}) {
    const type = props.weapon == null ? null : equipmentStatus(props.weapon).type;
    const skills = type == "two-handed_sword" || type == "tonfa" ?
        ["MeleeQ", "MeleeW", "MeleeE", "R", "T"] :
        ["RangeQ", "RangeW", "RangeE", "R", "T"]

    return (
        <ul className={style.skills}>
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
        </ul>
    )
}

export function idForLevel(skill: string): string {
    return skill.slice(skill.length - 1);
}