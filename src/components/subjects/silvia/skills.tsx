import * as React from "react";
import Images from "@app/resources/image";
import style from "../skills-standard.modue.styl";

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

export default function() {
    return  (
        <ul className={style.skills}>
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
        </ul>
    )
}

export function idForLevel(skill: string): string {
    return skill.slice(skill.length - 1);
}
