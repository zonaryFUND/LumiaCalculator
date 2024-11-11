import * as React from "react";
import table from "components/common/table.module.styl";
import { SubjectConfig } from "app-types/subject-dynamic/config";
import StandardDamage from "./rows/standard-damage";
import { Status } from "app-types/subject-dynamic/status/type";
import { DamageTableUnit } from "app-types/damage-table/unit";
import { ValueRatio } from "app-types/value-ratio";
import { UniqueValueStrategy } from "components/subjects/unique-value-strategy";
import UniqueExpression from "./rows/unique-expression";

type Props = {
    label: string
    elements: (Omit<DamageTableUnit, "value"> & {value: ValueRatio | UniqueValueStrategy} & {skillLevel?: number})[][]
    config: SubjectConfig
    status: Status
}

const subTable: React.FC<Props> = props => {
    return (
        <tbody>
            <tr className={table.separator}><td>{props.label}</td><td colSpan={3}>ダメージ / 効果量</td></tr>
            {
                props.elements.reduce((prev, chunk, index) => {
                    const separator = index == 0 || chunk.filter(s => s.damageDependentHeal == undefined).length == 0 ? 
                        null :
                        <tr key={`separator-${index}`} className={table.border}><td colSpan={4}></td></tr>;
                    
                    const elements = chunk.map(unit => {
                        if (unit.damageDependentHeal != undefined) return null;
                        if (typeof unit.value == "function") {
                            return <UniqueExpression 
                                key={unit.label} 
                                status={props.status} 
                                config={props.config} 
                                {...unit} 
                                strategy={unit.value} 
                            />;  
                        } else {
                            return <StandardDamage 
                                key={unit.label}
                                skillLevel={unit.skillLevel}
                                status={props.status} 
                                config={props.config} 
                                {...unit} 
                                value={unit.value} 
                            />;
                        }
                    })
                    .filter((item): item is React.ReactElement => item != null)

                    return (separator ? prev.concat(separator) : prev).concat(elements);
                }, [] as React.ReactElement[])
            }
        </tbody>
    )
};

export default subTable;