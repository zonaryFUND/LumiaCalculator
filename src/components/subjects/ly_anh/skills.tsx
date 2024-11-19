import * as React from "react";
import style from "../skills-standard.module.styl";
import { Skill, SkillLevelConfigurator, SkillsParent, SkillsStandardProps, WeaponSkill } from "../skills-list";

export default function(props: SkillsStandardProps) {
    return  (
        <SkillsParent {...props}>
            <div className={style.vertical}>
                <Skill id="ly_anh" skill="LyAnhQ" />
                <Skill id="ly_anh" skill="GhostQ" />
            </div>
            <div className={style.vertical}>
                <Skill id="ly_anh" skill="LyAnhW" />
                <Skill id="ly_anh" skill="GhostW" />
            </div>
            <div className={style.vertical}>
                <Skill id="ly_anh" skill="LyAnhE" />
                <Skill id="ly_anh" skill="GhostE" />
            </div>
            <div className={style.vertical}>
                <Skill id="ly_anh" skill="LyAnhR" />
                <Skill id="ly_anh" skill="LyAnhR2" />
            </div>
            <div className={style.vertical}>
                <Skill id="ly_anh" skill="LyAnhT" />
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
    if (skill == "LyAnhR2") return "R";
    return skill.slice(skill.length - 1);
}
