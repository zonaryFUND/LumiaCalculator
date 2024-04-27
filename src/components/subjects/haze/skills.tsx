import * as React from "react";
import Images from "@app/resources/image";
import { SkillLevelConfigurator, SkillsParent, SkillsStandardProps } from "../skills-standard";

type Props = {
    src: string
}

const TooltipImage: React.FC<Props> = props => (
    <img 
        src={Images.skill.haze[props.src]} 
        data-tooltip-id="subject-skill"
        data-tooltip-content={`haze-${props.src}`}
    />
)

export default function(props: SkillsStandardProps) {
    return  (
        <SkillsParent {...props}>
            <li>
                <TooltipImage src="Q" />
                <TooltipImage src="Q2" />
                <TooltipImage src="Q3" />
            </li>
            <li>
                <TooltipImage src="W" />
            </li>
            <li>
                <TooltipImage src="E" />
            </li>
            <li>
                <TooltipImage src="R" />
            </li>
            <li>
                <TooltipImage src="T" />
            </li>
            <li><SkillLevelConfigurator skill="Q" /></li>
            <li><SkillLevelConfigurator skill="W" /></li>
            <li><SkillLevelConfigurator skill="E" /></li>
            <li><SkillLevelConfigurator skill="R" /></li>
            <li><SkillLevelConfigurator skill="T" /></li>
        </SkillsParent>
    )
}

export function idForLevel(skill: string): string {
    return skill.slice(0, 1);
}
