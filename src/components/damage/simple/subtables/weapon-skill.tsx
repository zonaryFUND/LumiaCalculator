import * as React from "react";
import table from "components/common/table.styl";
import { DamageTableUnit } from "app-types/damage-table/unit";
import StandardDamage from "./rows/standard-damage";
import { SubjectConfig } from "app-types/subject-dynamic/config";
import { Status } from "app-types/subject-dynamic/status/type";

type Props = {
    elements: (DamageTableUnit & {skillLevel: number})[]
    config: SubjectConfig
    status: Status
}

const weaponSkill: React.FC<Props> = props => {
    return (
        <tbody>
            <tr className={table.separator}><td>武器スキル</td><td colSpan={3}>ダメージ / 効果量</td></tr>
            {
                props.elements?.map(def => (
                    typeof def.value == "function" ?
                    null :
                    <StandardDamage 
                        key={def.label}
                        {...def}
                        skillLevel={def.skillLevel}
                        value={def.value}
                        config={props.config}
                        status={props.status}
                    />
                ))
            }
        </tbody>
    )
}

export default weaponSkill;