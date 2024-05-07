import { SubjectID } from "@app/entity/subject";
import * as React from "react";
import index from "./index.module.styl";
import { SkillLevels, SubjectConfig } from "components/subject/use-subject-config";
import { SubjectSkills } from "components/subjects/skills";
import SkillsStandard from "components/subjects/skills-standard";
import { WeaponTypeID, equipmentStatus } from "@app/entity/equipment";
import style from "./damage.module.styl";
import { styles } from "@app/util/style";

import { Status } from "components/subject/status";
import Table from "./damage-table";

type Props = {
    status: Status
    config: SubjectConfig
    setSkillLevels: React.Dispatch<React.SetStateAction<SkillLevels>>
    weaponType?: WeaponTypeID
    hideHeader?: boolean
}

const damages: React.FC<Props> = props => {
    const subjectSkills = React.useMemo(() => {
        const skills = SubjectSkills[props.config.subject];
        if (skills == undefined || skills.default == undefined) {
            const skillImage = skills == undefined ? undefined : skills.SkillImage;
            return <SkillsStandard 
                id={props.config.subject} 
                skillLevels={props.config.skillLevels}
                setSkillLevels={props.setSkillLevels}
                weaponType={props.weaponType}    
                skillImage={skillImage}
            />;
        }
        return React.createElement(SubjectSkills[props.config.subject].default, {
            id: props.config.subject, 
            skillLevels: props.config.skillLevels, 
            setSkillLevels: props.setSkillLevels,
            weaponType: props.weaponType,
            weapon: props.config.equipment.weapon
        })
    }, [props.config.subject, props.weaponType, props.config.skillLevels, props.config.equipment.weapon]);

    return (
        <div className={styles(index.row, style.damage)}>
            {
                props.hideHeader ? null :
                <header>
                    <h1>ダメージ</h1>
                </header>
            }
            <section className={style.skill}>
                <h3>スキル</h3>
                {subjectSkills}
            </section>
            <Table status={props.status} config={props.config} weaponType={props.weaponType} />
        </div>
    )
};

export default damages;