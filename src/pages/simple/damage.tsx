import * as React from "react";
import SubjectSkills from "components/subject/skills";
import Table from "components/damage/simple/damage-table";
import style from "./damage.module.styl";
import TabUnit from "components/common/tab/tab-unit";

import { WeaponTypeID } from "app-types/equipment/weapon";
import { Status } from "app-types/subject-dynamic/status/type";
import { SkillLevels, SubjectConfig } from "app-types/subject-dynamic/config";

type Props = {
    status: Status
    config: SubjectConfig
    setSkillLevels: React.Dispatch<React.SetStateAction<SkillLevels>>
    weaponType?: WeaponTypeID
}

const damages: React.FC<Props> = props => {
    return (
        <TabUnit title="ダメージ">
            <section className={style.skill}>
                <h3>スキル</h3>
                <SubjectSkills config={props.config} setSkillLevels={props.setSkillLevels} />
            </section>
            <Table status={props.status} config={props.config} weaponType={props.weaponType} />
        </TabUnit>
    )
};

export default damages;
