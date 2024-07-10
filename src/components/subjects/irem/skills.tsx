import * as React from "react";
import Images from "@app/resources/image";
import { SkillLevelConfigurator, SkillsParent, SkillsStandardProps, WeaponSkill } from "../skills-standard";

type Props = {
    src: string
}

const TooltipImage: React.FC<Props> = props => (
    <img 
        src={Images.skill.irem[props.src]} 
        data-tooltip-id="subject-skill"
        data-tooltip-content={`irem-${props.src}`}
    />
)

export default function(props: SkillsStandardProps) {
    return  (
        <SkillsParent {...props}>
            <li>
                <TooltipImage src="IremQ" />
                <TooltipImage src="CatQ" />
            </li>
            <li>
                <TooltipImage src="IremW" />
                <TooltipImage src="CatW" />
            </li>
            <li>
                <TooltipImage src="IremE" />
                <TooltipImage src="CatE" />
            </li>
            <li>
                <TooltipImage src="IremR" />
                <TooltipImage src="CatR" />
            </li>
            <li>
                <TooltipImage src="T" />
            </li>
            <WeaponSkill id={props.weaponType} />
            <li><SkillLevelConfigurator skill="Q" /></li>
            <li><SkillLevelConfigurator skill="W" /></li>
            <li><SkillLevelConfigurator skill="E" /></li>
            <li><SkillLevelConfigurator skill="R" max={4} /></li>
            <li><SkillLevelConfigurator skill="T" /></li>
        </SkillsParent>
    )
}

export function idForLevel(skill: string): string {
    return skill.slice(skill.length - 1);
}