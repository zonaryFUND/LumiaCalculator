import * as React from "react";
import index from "./index.module.styl";
import Table from "components/damage/combat/damage-table";
import style from "./damage.module.styl";
import { styles } from "@app/util/style";

import { Status } from "app-types/subject-dynamic/status/type";
import { SkillLevels, SubjectConfig } from "app-types/subject-dynamic/config";
import { CombatHPContext } from "components/damage/combat/combat-hp-context";

type Props = {
    leftStatus: Status
    leftConfig: SubjectConfig
    leftHP: number
    rightStatus: Status
    rightConfig: SubjectConfig
    rightHP: number
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
            <CombatHPContext.Provider value={{hp: props.leftHP, targetHP: props.rightHP, targetMaxHP: props.rightStatus.maxHP.calculatedValue}}>
            <Table 
                status={props.leftStatus}
                targetStatus={props.rightStatus} 
                config={props.leftConfig}
            />
            </CombatHPContext.Provider>
        </div>
    )
};

export default damages;
