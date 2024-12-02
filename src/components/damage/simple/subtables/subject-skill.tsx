import * as React from "react";
import table from "components/common/table.module.styl";
import { SubjectConfig } from "app-types/subject-dynamic/config";
import StandardDamage from "./rows/standard-damage";
import CriticalAvailable from "./rows/critical-available";
import UniqueExpression from "./rows/unique-expression";
import { Status } from "app-types/subject-dynamic/status/type";
import { SubjectDamageTableUnit } from "@app/ingame-params/subjects/type";

type Props = {
    tables: SubjectDamageTableUnit[][]
    config: SubjectConfig
    status: Status
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
                        const skillLevel = props.config.skillLevels[unit.skill];
                        
                        if (typeof unit.value == "function") {
                            return <UniqueExpression 
                                key={unit.label} 
                                status={props.status} 
                                config={props.config} 
                                {...unit} 
                                strategy={unit.value} 
                            />;  
                        } else if (unit.type?.type == "basic" && unit.type.critical != "none") {
                            return <CriticalAvailable 
                                key={unit.label}
                                skillLevel={skillLevel}
                                {...unit}
                                status={props.status}
                                config={props.config}
                                value={unit.value}
                            />;
                        } else {
                            return <StandardDamage 
                                key={unit.label} 
                                skillLevel={skillLevel}
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

export default subjectSkill;