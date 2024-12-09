import * as React from "react";
import Table from "components/damage/combat/damage-table";

import { Status } from "app-types/subject-dynamic/status/type";
import { SubjectConfig } from "app-types/subject-dynamic/config";
import TabUnit from "components/common/tab/tab-unit";
import style from "./damage.module.styl";

type Props = {
    leftStatus: Status
    leftConfig: SubjectConfig
    leftHP: number
    rightStatus: Status
    rightConfig: SubjectConfig
    rightHP: number
}

const damages: React.FC<Props> = props => {
    return (
        <TabUnit title="ダメージ" className={style.damage}>
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
        </TabUnit>
    )
};

export default damages;
