import * as React from "react";
import Images from "@app/resources/image";
import { Prohibit } from "@phosphor-icons/react";
import style from "./skill-icon.module.styl";
import { SkillTooltipID } from "components/tooltip";

type Props = {
    skillCode?: number
    subjectSide?: "left" | "right"
    onClick?: React.MouseEventHandler<HTMLElement>
}

const Skill: React.FC<Props> = ({skillCode, subjectSide, onClick}) => {
    return (
        skillCode ?
        <img 
            src={Images.skill[skillCode]} 
            data-tooltip-id={SkillTooltipID} 
            data-tooltip-content={`${skillCode}`}
            data-tooltip-subject-side={subjectSide}
            onClick={onClick}
        />
        :
        <div className={style.blank}><Prohibit size="2rem" /></div>
    );
}

export default Skill;