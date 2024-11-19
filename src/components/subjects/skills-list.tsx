import * as React from "react";
import style from "./skills-standard.module.styl";
import { SubjectCode } from "app-types/subject-static";
import Images from "@app/resources/image";
import Selection from "components/common/pull-down";
import { SkillLevels, SubjectConfig } from "app-types/subject-dynamic/config";
import { WeaponTypeID } from "app-types/equipment/weapon";
import { SubjectSideContext } from "./subject-side";
import { Prohibit } from "@phosphor-icons/react"
import { SkillCode, SkillKey, SkillListHook } from "./dictionary";
import { SkillListContext } from "./skills";

type WeaponSkillProps = {
    id?: WeaponTypeID
}

export const WeaponSkill: React.FC<WeaponSkillProps> = props => {
    const src = (() => {
        if (props.id == undefined) return ""; 
        return Images.skill.weapon[props.id];
    })();

    const side = React.useContext(SubjectSideContext);

    return (
        <div 
            className={style.vertical}
            data-tooltip-id={props.id ? "weapon-skill" : undefined}
            data-tooltip-content={`${props.id}`}
            data-tooltip-subject-side={side}
        >
            {
                props.id ?
                <img src={Images.skill.weapon[props.id]} />
                :
                <div className={style.blank}><Prohibit size="2rem" /></div>
            }
        </div>
    )
}