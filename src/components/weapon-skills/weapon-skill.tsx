import * as React from "react";
import Images from "@app/resources/image";
import { Prohibit } from "@phosphor-icons/react"
import { SubjectSideContext } from "components/subjects/subject-side";
import { WeaponTypeID } from "app-types/equipment/weapon";
import { WeaponSkillCodeDictionary } from "./code";
import style from "./weapon-skill.module.styl";

type WeaponSkillProps = {
    id?: WeaponTypeID
}

const weaponSkill: React.FC<WeaponSkillProps> = props => {
    const code = React.useMemo(() => props.id ? WeaponSkillCodeDictionary[props.id] : undefined, [props.id]);
    const side = React.useContext(SubjectSideContext);

    return (
        code ?
        <img 
            src={Images.skill[code]} 
            data-tooltip-id={props.id ? "skill" : undefined}
            data-tooltip-content={`${code}`}
            data-tooltip-subject-side={side}
        />
        :
        <div className={style.blank}><Prohibit size="2rem" /></div>
    )
}

export default weaponSkill;