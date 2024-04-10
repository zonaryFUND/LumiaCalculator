import * as React from "react";
import Images from "@app/resources/image";
import { SkillLevelConfigurator, SkillsParent, SkillsStandardProps } from "../skills-standard";

type Props = {
    src: string
}

const TooltipImage: React.FC<Props> = props => (
    <img 
        src={Images.skill.debi_marlene[props.src]} 
        data-tooltip-id="subject-skill"
        data-tooltip-content={`debi_marlene-${props.src}`}
    />
)

export default function(props: SkillsStandardProps) {
    return  (
        <SkillsParent {...props}>
            <li>
                <TooltipImage src="DebiQ" />
                <TooltipImage src="MarleneQ" />
            </li>
            <li>
                <TooltipImage src="DebiW" />
                <TooltipImage src="MarleneW" />
            </li>
            <li>
                <TooltipImage src="DebiE" />
                <TooltipImage src="MarleneE" />
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
    return skill.slice(skill.length - 1);
}