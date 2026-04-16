import * as React from "react";
import table from "components/common/table.module.styl";
import { SubjectConfig } from "app-types/subject-dynamic/config";
import StandardDamage from "../../../../features/damage/components/potency-rows/standard-damage";
import CriticalAvailable from "../../../../features/damage/components/potency-rows/critical-available";
import UniqueExpression from "../../../../features/damage/components/potency-rows/unique-expression";
import { Status } from "app-types/subject-dynamic/status/type";
import { SubjectDamageTableUnit } from "@app/ingame-params/subjects/type";

type Props = {
    tables: SubjectDamageTableUnit[][]
    config: SubjectConfig
    status: Status
    hp: number
}

const subjectSkill: React.FC<Props> = props => {
    return (
        <tbody>
            <tr className={table.separator}><td>実験体スキル</td><td colSpan={3}>ダメージ / 効果量</td></tr>
            {
                props.tables.reduce((prev, chunk, index) => {
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
                                hp={props.hp}
                                {...unit} 
                                strategy={unit.value} 
                            />;  
                        } else if (unit.type?.type == "basic" && unit.type.critical != "none") {
                            return <CriticalAvailable 
                                key={unit.label}
                                {...unit}
                                status={props.status}
                                config={props.config}
                                value={unit.value}
                            />;
                        } else {
                            return <StandardDamage 
                                key={unit.label} 
                                status={props.status} 
                                config={props.config} 
                                {...unit} 
                                value={unit.value} 
                                hp={props.hp}
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

export default subjectSkill;