import * as React from "react";
import index from "./index.module.styl";
import Table from "components/damage/combat/damage-table";
import style from "./damage.module.styl";
import { styles } from "@app/util/style";

import { Status } from "app-types/subject-dynamic/status/type";
import { SkillLevels, SubjectConfig } from "app-types/subject-dynamic/config";
import { CombatHPContext } from "components/damage/combat/combat-hp-context";
import SegmentedControl from "components/common/segmented-control";
import { StateProps } from "@app/util/state";

type Props = {
    hideHeader?: boolean    
    leftStatus: Status
    leftConfig: SubjectConfig
    leftHP: number
    rightStatus: Status
    rightConfig: SubjectConfig
    rightHP: number
}

const damages: React.FC<Props> = props => {
    return (
        <div className={styles(index.row, style.damage)}>
            {
                props.hideHeader ? null :
                <header>
                    <h1>実験体</h1>
                </header>
            }
            <Table
                left={{
                    config: props.leftConfig,
                    status: props.leftStatus,
                    hp: props.leftHP
                }}
                right={{
                    config: props.rightConfig,
                    status: props.rightStatus,
                    hp: props.rightHP
                }}
            />
        </div>
    )
};

export default damages;
