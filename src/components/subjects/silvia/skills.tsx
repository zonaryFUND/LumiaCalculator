import * as React from "react";
import Images from "@app/resources/image";
import { Skill, SkillLevelConfigurator, SkillsParent, SkillsStandardProps, WeaponSkill } from "../skills-list";
import style from "../skills-standard.module.styl";

export default function(props: SkillsStandardProps) {
    return  (
        <SkillsParent {...props}>
            <div className={style.vertical}>
                <Skill id="silvia" skill="HumanQ" />
                <Skill id="silvia" skill="BikeQ" />
            </div>
            <div className={style.vertical}>
                <Skill id="silvia" skill="HumanW" />
                <Skill id="silvia" skill="BikeW" />
            </div>
            <div className={style.vertical}>
                <Skill id="silvia" skill="HumanE" />
                <Skill id="silvia" skill="BikeE" />
            </div>
            <div className={style.vertical}>
                <Skill id="silvia" skill="HumanR" />
                <Skill id="silvia" skill="BikeR" />
            </div>
            <div className={style.vertical}>
                <Skill id="silvia" skill="T" />
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
