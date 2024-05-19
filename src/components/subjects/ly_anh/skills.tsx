import * as React from "react";
import Images from "@app/resources/image";
import style from "../skills-standard.modue.styl";
import { SkillLevelConfigurator, SkillsParent, SkillsStandardProps, WeaponSkill } from "../skills-standard";
import r from "../abigail/r";

type Props = {
    src: string
}

const TooltipImage: React.FC<Props> = props => (
    <img 
        src={Images.skill.ly_anh[props.src]} 
        data-tooltip-id="subject-skill"
        data-tooltip-content={`ly_anh-${props.src}`}
    />
)

export default function(props: SkillsStandardProps) {
    return  (
        <SkillsParent {...props}>
            <li>
                <TooltipImage src="LyAnhQ" />
                <TooltipImage src="GhostQ" />
            </li>
            <li>
                <TooltipImage src="LyAnhW" />
                <TooltipImage src="GhostW" />
            </li>
            <li>
                <TooltipImage src="LyAnhE" />
                <TooltipImage src="GhostE" />
            </li>
            <li>
                <TooltipImage src="LyAnhR" />
                <TooltipImage src="LyAnhR2" />
            </li>
            <li>
                <TooltipImage src="LyAnhT" />
            </li>
            <WeaponSkill id={props.weaponType} />
            <li><SkillLevelConfigurator skill="Q" /></li>
            <li><SkillLevelConfigurator skill="W" /></li>
            <li><SkillLevelConfigurator skill="E" /></li>
            <li><SkillLevelConfigurator skill="R" /></li>
            <li><SkillLevelConfigurator skill="T" /></li>
        </SkillsParent>
    )
}

export function idForLevel(skill: string): string {
    if (skill == "LyAnhR2") return "R";
    return skill.slice(skill.length - 1);
}
