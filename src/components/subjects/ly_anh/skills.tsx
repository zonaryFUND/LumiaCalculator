import * as React from "react";
import Images from "@app/resources/image";
import baseStyle from "../skills-standard.modue.styl";
import style from "./skills.module.styl";

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
        <ul className={`${baseStyle.skills} ${style.lyanh}`}>
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
