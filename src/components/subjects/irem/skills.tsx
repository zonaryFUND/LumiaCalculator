import * as React from "react";
import Images from "@app/resources/image";
import style from "../skills-standard.modue.styl";

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

export default function() {
    return  (
        <ul className={style.skills}>
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
        </ul>
    )
}

export function idForLevel(skill: string): string {
    return skill.slice(skill.length - 1);
}