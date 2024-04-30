import * as React from "react";
import { Skill, SkillLevelConfigurator, SkillsParent, SkillsStandardProps, WeaponSkill } from "../skills-standard";
import { WeaponID } from "@app/entity/weapon-id";

export default function(props: {weapon: WeaponID | null} & SkillsStandardProps) {
    const type = (() => {
        if (props.weapon == null) return "0";
        if (props.weapon.includes("sidewinder")) {
            return "1"
        }
        if (props.weapon.includes("deathadder")) {
            return "3"
        }
        if (props.weapon.includes("black_mamba")) {
            return "2"
        }
        return "0";
    })();

    return (
        <SkillsParent {...props}>
            <Skill id="echion" skill="Q" />
            <Skill id="echion" skill="W" />
            <Skill id="echion" skill="E" />
            <Skill id="echion" skill={`R${type == "0" ? "0_1" : type}`} />
            <Skill id="echion" skill={`T${type == "0" ? type : `${type}_2`}`} />
            <WeaponSkill id="vf_prosthetic" />
            <li><SkillLevelConfigurator skill="Q" /></li>
            <li><SkillLevelConfigurator skill="W" /></li>
            <li><SkillLevelConfigurator skill="E" /></li>
            <li><SkillLevelConfigurator skill="R" max={4} /></li>
        </SkillsParent>
    )
}

export function idForLevel(skill: string): string {
    if (skill.length == 1) return skill;
    if (skill.includes("T")) return "T";
    return "R";
}