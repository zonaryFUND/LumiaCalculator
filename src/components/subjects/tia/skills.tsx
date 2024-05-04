import * as React from "react";
import Images from "@app/resources/image";
import { SkillLevelConfigurator, SkillsParent, SkillsStandardProps, WeaponSkill } from "../skills-standard";

type Props = {
    src: string
}

const TooltipImage: React.FC<Props> = props => (
    <img 
        src={Images.skill.tia[props.src]} 
        data-tooltip-id="subject-skill"
        data-tooltip-content={`tia-${props.src}`}
    />
)

export default function(props: SkillsStandardProps) {
    return  (
        <SkillsParent {...props}>
            <li>
                <TooltipImage src="Q1" />
                <TooltipImage src="Q2" />
                <TooltipImage src="Q3" />
            </li>
            <li>
                <TooltipImage src="W1" />
                <TooltipImage src="W2" />
                <TooltipImage src="W3" />
            </li>
            <li>
                <TooltipImage src="E1" />
                <TooltipImage src="E2" />
                <TooltipImage src="E3" />
            </li>
            <li>
                <TooltipImage src="R" />
            </li>
            <li>
                <TooltipImage src="T" />
            </li>
            <WeaponSkill id={props.weaponType} />
            <li><SkillLevelConfigurator skill="Q" /></li>
            <li><SkillLevelConfigurator skill="W" max={3} /></li>
            <li><SkillLevelConfigurator skill="E" /></li>
            <li><SkillLevelConfigurator skill="R" /></li>
            <li><SkillLevelConfigurator skill="T" max={5} /></li>
        </SkillsParent>
    )
}

export function idForLevel(skill: string): string {
    return skill.slice(0, 1);
}

export function idForConsumption(skill: string): string {
    return skill.slice(0, 1);
}