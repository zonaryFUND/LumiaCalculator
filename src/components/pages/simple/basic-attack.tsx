import { Status } from "components/subject/status";
import * as React from "react";
import BasicAttackDamage from "./basic-attack-damage";
import table from "components/common/table.styl";
import { DamageTable } from "components/subjects/damage-table";

type Props = {
    status: Status
    table: DamageTable
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
            {
                props.table.basicAttack.includes("standard") ?
                <tr className={table.separator}><td>基本攻撃</td><td>基礎値</td><td>致命打</td><td>期待値</td></tr> :
                <tr className={table.separator}><td colSpan={3}>基本攻撃</td><td>基礎値</td></tr>
            }
            {
                props.table.basicAttack.map(def => {
                    if (typeof def === "string") {
                        return <BasicAttackDamage key="standard" name="基本攻撃" status={props.status} disableCritical={def == "disable-critical"} />
                    } else {
                        return null
                    }
                })
            }
        </tbody>
    )
};

export default basicAttack;