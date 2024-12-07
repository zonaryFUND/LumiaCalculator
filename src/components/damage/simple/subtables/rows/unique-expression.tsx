import * as React from "react";
import { useToggle } from "react-use";

import { SubjectConfig } from "app-types/subject-dynamic/config";
import { Status } from "app-types/subject-dynamic/status/type";
import { UniqueValueStrategy } from "@app/ingame-params/subjects/unique-value-strategy";
import HealPower from "../subrows/heal-power";

import InnerTable from "components/common/inner-table";
import RatioKey from "../subrows/ratio-key";

import style from "../../../damage-table.module.styl";
import table from "components/common/table.module.styl";
import { FormattedMessage } from "react-intl";
import Decimal from "decimal.js";
import { SubjectDamageTableUnit } from "@app/ingame-params/subjects/type";

type Props = Omit<SubjectDamageTableUnit, "value" | "skill"> & {
    strategy: UniqueValueStrategy
    config: SubjectConfig
    status: Status
}

const uniqueExpression: React.FC<Props> = props => {
    const [expand, toggleExpand] = useToggle(false);
    const { value, equationExpression } = props.strategy(props.config, props.status);
    const sanitizedValue = (() => {
        if (Array.isArray(value)) {
            return [value[0], value[1], value[2] || value[1]];
        } else {
            return value;
        }
    })();
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

    const healPower = props.type?.type == "heal" && props.status.healerGiveHpHealRatio.calculatedValue.greaterThan(0) ? props.status.healerGiveHpHealRatio.calculatedValue : undefined;
    const healPowerConcerned = Array.isArray(sanitizedValue) ? sanitizedValue.map(v => v?.addPercent(healPower || 0)) : sanitizedValue.addPercent(healPower || 0);

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
            {
                equations.length == 0 ? null :
                <tr className={table.expand} style={!expand ? {display: "none"} : undefined}><td colSpan={4}>
                    <InnerTable>
                        {equations}
                        {healPower ? <HealPower baseValue={sanitizedValue as Decimal} healPower={healPower} /> : null}
                    </InnerTable>
                </td></tr>
            }
        </>
    )
}

export default uniqueExpression;