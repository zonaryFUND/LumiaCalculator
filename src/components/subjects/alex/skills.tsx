import * as React from "react";
import { Skill } from "../skills-standard";
import style from "components/subjects/skills-standard.modue.styl";
import { WeaponTypeID } from "@app/entity/equipment";
import Images from "@app/resources/image";

export default function(weaponType: WeaponTypeID) {
    const skills = weaponType == "two-handed_sword" || weaponType == "tonfa" ?
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