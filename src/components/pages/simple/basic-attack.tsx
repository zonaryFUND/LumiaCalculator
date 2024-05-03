import { Status } from "components/subject/status";
import * as React from "react";
import BasicAttackDamage from "./basic-attack-damage";
import table from "components/common/table.styl";
import { DamageTable } from "components/subjects/damage-table";
import { WeaponTypeID, weaponBaseStatus } from "@app/entity/equipment";
import { AssaultRifleAttackRatio } from "components/subject/standard-values";
import SkillDamage from "./skill-damage";
import { SubjectConfig } from "components/subject/use-subject-config";

type Props = {
    status: Status
    config: SubjectConfig
    table: DamageTable
    weaponType?: WeaponTypeID
}

const basicAttack: React.FC<Props> = props => {
    const name = React.useMemo(() => {
        if (props.weaponType == "assault_rifle") {
            return "基本攻撃(3発分)";
        }

        return "基本攻撃";
    }, [props.weaponType])

    return (
        <tbody>
            {
                props.table.basicAttack.includes("standard") || props.table.basicAttack.find(t => (t as any).type == "basic") ?
                <tr className={table.separator}><td>基本攻撃</td><td>基礎値</td><td>致命打</td><td>期待値</td></tr> :
                <tr className={table.separator}><td colSpan={3}>基本攻撃</td><td>基礎値</td></tr>
            }
            {
                props.table.basicAttack.map(def => {
                    if (typeof def === "string") {
                        if (props.weaponType == "assault_rifle") {
                            return <BasicAttackDamage 
                                key="standard" 
                                name={name} 
                                status={props.status} 
                                disableCritical={def == "disable-critical"} 
                                config={{
                                    attack: AssaultRifleAttackRatio.reduce((p, c) => p + c, 0),
                                    basicAttackAmp: 100
                                }}
                            />
                        } else {
                            return <BasicAttackDamage key="standard" name={name} status={props.status} disableCritical={def == "disable-critical"} />
                        }
                    } else if (def.type == "basic") {
                        return <BasicAttackDamage key="standard" name={def.label} status={props.status} config={def.damage} />
                    } else {
                        return <SkillDamage {...def as any} status={props.status} config={props.config} />
                    }
                })
            }
        </tbody>
    )
};

export default basicAttack;