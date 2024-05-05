import * as React from "react";
import Images from "@app/resources/image";
import { SkillLevelConfigurator, SkillsParent, SkillsStandardProps, WeaponSkill } from "../skills-standard";

type Props = {
    src: string
}

const TooltipImage: React.FC<Props> = props => (
    <img 
        src={Images.skill.martina[props.src]} 
        data-tooltip-id="subject-skill"
        data-tooltip-content={`martina-${props.src}`}
    />
)

export default function(props: SkillsStandardProps) {
    return  (
        <SkillsParent {...props}>
            <li>
                <TooltipImage src="Q" />
                <TooltipImage src="Q2" />
            </li>
            <li>
                <TooltipImage src="W" />
                <TooltipImage src="W2" />
            </li>
            <li>
                <TooltipImage src="E" />
                <TooltipImage src="E2" />
            </li>
            <li>
                <TooltipImage src="R" />
                <TooltipImage src="R2" />
            </li>
            <li>
                <TooltipImage src="T" />
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
    return skill.slice(0, 1);
}
