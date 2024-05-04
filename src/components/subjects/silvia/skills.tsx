import * as React from "react";
import Images from "@app/resources/image";
import { SkillLevelConfigurator, SkillsParent, SkillsStandardProps, WeaponSkill } from "../skills-standard";

type Props = {
    src: string
}

const TooltipImage: React.FC<Props> = props => (
    <img 
        src={Images.skill.silvia[props.src]} 
        data-tooltip-id="subject-skill"
        data-tooltip-content={`silvia-${props.src}`}
    />
)

export default function(props: SkillsStandardProps) {
    return  (
        <SkillsParent {...props}>
            <li>
                <TooltipImage src="HumanQ" />
                <TooltipImage src="BikeQ" />
            </li>
            <li>
                <TooltipImage src="HumanW" />
                <TooltipImage src="BikeW" />
            </li>
            <li>
                <TooltipImage src="HumanE" />
                <TooltipImage src="BikeE" />
            </li>
            <li>
                <TooltipImage src="HumanR" />
                <TooltipImage src="BikeR" />
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
    return skill.slice(skill.length - 1);
}
