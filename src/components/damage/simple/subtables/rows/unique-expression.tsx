import * as React from "react";
import { useToggle } from "react-use";

import { SubjectConfig } from "app-types/subject-dynamic/config";
import { Status } from "app-types/subject-dynamic/status/type";
import { SubjectDamageTableUnit } from "components/subjects/damage-table";
import { UniqueValueStrategy } from "components/subjects/unique-value-strategy";
import HealPower from "../subrows/heal-power";

import InnerTable from "components/common/inner-table";
import RatioKey from "../subrows/ratio-key";

import style from "../../../damage-table.module.styl";
import table from "components/common/table.styl";
import { FormattedMessage } from "react-intl";
import Decimal from "decimal.js";

type Props = Omit<SubjectDamageTableUnit, "value"> & {
    strategy: UniqueValueStrategy
    config: SubjectConfig
    status: Status
}

const uniqueExpression: React.FC<Props> = props => {
    const [expand, toggleExpand] = useToggle(false);
    const { value, equationExpression } = props.strategy(props.config, props.status);
    const valueClass = (() => {
        return props.type ? style[props.type.type] : style.skill;
    })();
    const equations = equationExpression.map(({labelIntlID, expression}) => {
        const equation = expression.reduce((prev, current) => {
            if (typeof current == "string") {
                return prev.concat(current)
            }
            if ("intlID" in current) {
                return prev.concat(<span className={table.small}><FormattedMessage id={current.intlID} /></span>);
            }
            return prev.concat(<span className={table.small}><RatioKey label={current.ratioKey} /></span>);
        }, [] as React.ReactNode[])
        return <tr>
            {labelIntlID ? <td><FormattedMessage id={labelIntlID} /></td> : null}
            <td colSpan={labelIntlID ? undefined : 2}>{equation}</td>
        </tr>
    });

    const healPower = props.type?.type == "heal" && props.status.healPower.calculatedValue.greaterThan(0) ? props.status.healPower.calculatedValue : undefined;
    const healPowerConcerned = Array.isArray(value) ? value : value.addPercent(healPower ?? 0);

    return (
        <>
            <tr onClick={toggleExpand}>
                <td>{props.label}</td>
                {
                    Array.isArray(healPowerConcerned) ?
                    healPowerConcerned.map(v => <td className={valueClass}>{v?.floor().toString() ?? "-"}</td>) :
                    <td colSpan={3} className={valueClass}>{healPowerConcerned.floor().toString()}</td>
                }
            </tr>
            <tr className={table.expand} style={!expand ? {display: "none"} : undefined}><td colSpan={4}>
                <InnerTable>
                    {equations}
                    {healPower ? <HealPower baseValue={value as Decimal} healPower={healPower} /> : null}
                </InnerTable>
            </td></tr>
        </>
    )
}

export default uniqueExpression;