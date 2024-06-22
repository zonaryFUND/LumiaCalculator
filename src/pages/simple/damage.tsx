import * as React from "react";
import index from "./index.module.styl";
import SubjectSkills from "components/subjects/skills";
import Table from "components/damage/simple/damage-table";
import style from "./damage.module.styl";
import { styles } from "@app/util/style";

import { WeaponTypeID } from "app-types/equipment/weapon";
import { Status } from "app-types/subject-dynamic/status/type";
import { SkillLevels, SubjectConfig } from "app-types/subject-dynamic/config";

type Props = {
    status: Status
    config: SubjectConfig
    setSkillLevels: React.Dispatch<React.SetStateAction<SkillLevels>>
    weaponType?: WeaponTypeID
    hideHeader?: boolean
}

const damages: React.FC<Props> = props => {
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
                <SubjectSkills config={props.config} setSkillLevels={props.setSkillLevels} />
            </section>
            <Table status={props.status} config={props.config} weaponType={props.weaponType} />
        </div>
    )
};

export default damages;
