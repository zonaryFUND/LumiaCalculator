import * as React from "react";
import Images from "@app/resources/image";
import style from "../skills-standard.modue.styl";

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

export default function() {
    return  (
        <ul className={style.skills}>
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
        </ul>
    )
}

export function idForLevel(skill: string): string {
    return skill.slice(skill.length - 1);
}
