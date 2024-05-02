import { Status } from "components/subject/status";
import * as React from "react";
import BasicAttackDamage from "./basic-attack-damage";
import table from "components/common/table.styl";

type Props = {
    status: Status
    disableCritical?: boolean
}

const basicAttack: React.FC<Props> = props => {
    const base = React.useMemo(() => {
        return props.status.attackPower.addPercent(props.status.basicAttackAmp);
    }, [props.status.attackPower, props.status.basicAttackAmp])

    const critical = React.useMemo(() => {
        return props.status.attackPower.addPercent(props.status.basicAttackAmp);
    }, [props.status.attackPower, props.status.basicAttackAmp])

    return (
        <tbody>
            <tr className={table.separator}><td>基本攻撃</td><td>基礎値</td><td>致命打</td><td>期待値</td></tr>
            <BasicAttackDamage name="基本攻撃" status={props.status} disableCritical={props.disableCritical} />
        </tbody>
    )
};

export default basicAttack;