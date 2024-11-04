import * as React from "react";

import { SubjectConfig } from "app-types/subject-dynamic/config";
import { Status } from "app-types/subject-dynamic/status/type";
import { useToggle } from "react-use";
import { ValueRatio } from "app-types/value-ratio";
import { calculateValue } from "app-types/value-ratio/calculation";
import { BaseCriticalDamagePercent } from "app-types/subject-dynamic/status/standard-values";
import Decimal from "decimal.js";
import InnerTable from "components/common/inner-table";
import StaticValueEquation from "../subrows/static-value-equation";
import MultiplyEquation from "../subrows/mutiply-equation";
import CriticalHit from "../subrows/critical-hit";
import style from "../../../damage-table.module.styl";
import { FormattedMessage } from "react-intl";
import table from "components/common/table.styl";
import { DamageTableUnit } from "app-types/damage-table/unit";
import { extractMultiplier } from "components/damage/damage-table-util";

type Props =  DamageTableUnit & {
    skillLevel?: number
    config: SubjectConfig
    status: Status
}

const criticalAvailable: React.FC<Props> = props => {
    const [expand, toggleExpand] = useToggle(false);

    const regularDamage = calculateValue(
        props.value, 
        props.status, 
        props.config, 
        props.skillLevel
    ).static;

    const criticalChance = props.status.criticalChance.calculatedValue
    const criticalDamagePlus = props.status.criticalDamage.calculatedValue;

    const criticalDamage = regularDamage.addPercent(BaseCriticalDamagePercent.add(criticalDamagePlus));

    const expectedValue = regularDamage.percent(new Decimal(100).sub(criticalChance))
        .add(criticalDamage.percent(criticalChance));
    const multiplier = extractMultiplier(props.skillLevel, props.multiplier);

    return (
        <>
            <tr onClick={toggleExpand}>
                <td>{props.label}</td>
                <td className={style.basic}>{regularDamage.percent(multiplier?.[0] ?? 100).floor().toString()}</td>
                <td className={style.basic}>
                    {
                        criticalChance.greaterThan(0) ? 
                        criticalDamage.percent(multiplier?.[0] ?? 100).floor().toString() :
                        "-"
                    }
                </td> 
                <td className={style.basic}>{expectedValue.percent(multiplier?.[0] ?? 100).floor().toString()}</td>
            </tr>
            <tr className={table.expand} style={expand ? undefined : {display: "none"}}>
                <td colSpan={4}>
                    <InnerTable>
                        {
                            multiplier ?
                            <>
                                <MultiplyEquation 
                                    label={<FormattedMessage id="app.standard-value" />}
                                    baseValue={regularDamage}
                                    multiplier={multiplier}
                                />
                                <MultiplyEquation 
                                    label={<FormattedMessage id="app.critical-hit" />}
                                    baseValue={criticalDamage}
                                    multiplier={multiplier}
                                />
                            </>
                            :
                            <>
                                <StaticValueEquation
                                    label={<FormattedMessage id="app.standard-value" />}
                                    skillLevel={props.skillLevel}
                                    config={props.config}
                                    status={props.status}
                                    ratio={props.value}
                                    calculated={<>{regularDamage.floor().toString()}</>}
                                />
                                <CriticalHit
                                    regularDamage={regularDamage}
                                    criticalDamage={criticalDamage}
                                    status={props.status}
                                />
                            </>
                        }
                    </InnerTable>
                </td>
            </tr>
        </>
    )
}

export default criticalAvailable;