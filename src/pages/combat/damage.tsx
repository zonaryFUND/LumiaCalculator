import * as React from "react";
import Table, { SubjectSnapshot } from "@app/features/damage/containers/combat/damage-table";

import TabUnit from "components/common/tab/tab-unit";
import style from "./damage.module.styl";

type Props = {
    left: SubjectSnapshot
    right: SubjectSnapshot
}

const damages: React.FC<Props> = props => {
    return (
        <TabUnit title="ダメージ" className={style.damage}>
            <Table
                left={props.left}
                right={props.right}
            />
        </TabUnit>
    )
};

export default damages;
