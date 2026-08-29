import * as React from "react";
import Table, { SubjectSnapshot } from "@app/features/damage/containers/combat/damage-table";

import Pane from "components/layout/pane/pane";
import style from "./damage.module.styl";

type Props = {
    left: SubjectSnapshot
    right: SubjectSnapshot
}

const damages: React.FC<Props> = props => {
    return (
        <Pane title="ダメージ" className={style.damage}>
            <Table
                left={props.left}
                right={props.right}
            />
        </Pane>
    )
};

export default damages;
