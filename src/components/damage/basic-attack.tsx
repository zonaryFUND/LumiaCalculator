import * as React from "react";
import BasicAttackDamage from "./basic-attack-damage";
import table from "components/common/table.styl";
import { DamageTable } from "components/subjects/damage-table";
import { AssaultRifleAttackRatio, DualSwordsAttackRatio } from "components/subject/standard-values";
import SkillDamage from "./skill-damage";
import Hypercharge from "../pages/simple/aiden-hypercharge";
import DebiMarlConstants from "components/subjects/debi_marlene/constants.json";
import Rio from "../pages/simple/rio";
import { styles } from "@app/util/style";
import style from "./basic-attack.module.styl";
import { SubjectConfig } from "app-types/subject-dynamic/config";
import { WeaponTypeID } from "app-types/equipment/weapon";
import { Status } from "app-types/subject-dynamic/status/type";
import { FormattedMessage } from "react-intl";
import value from "components/tooltip/value";


type Props = {
    status: Status
    config: SubjectConfig
    table: DamageTable
    weaponType?: WeaponTypeID
    children?: React.ReactNode
}

const basicAttack: React.FC<Props> = props => {
    return (
        <tbody>
            {
                props.table.basicAttack.includes("standard") || props.table.basicAttack.find(t => (t as any).type == "basic" && (t as any).disableCritical != true) ?
                <tr className={styles(table.separator)}>
                    <td><FormattedMessage id="app.basic-attack" /></td>
                    <td><FormattedMessage id="app.standard-value" /></td>
                    <td><FormattedMessage id="app.critical-hit" /></td>
                    <td><FormattedMessage id="app.expected-value" /></td>
                </tr> :
                <tr className={table.separator}>
                    <td colSpan={3}><FormattedMessage id="app.basic-attack" /></td>
                    <td><FormattedMessage id="app.standard-value" /></td>
                </tr>
            }
            {
                props.table.basicAttack.map(def => {
                    if (typeof def === "string") {
                        if (props.weaponType == "assault_rifle") {
                            return <BasicAttackDamage 
                                key="standard" 
                                name={<FormattedMessage id="app.basic-attack.assault-rifle" />}
                                status={props.status} 
                                disableCritical={def == "disable-critical"} 
                                config={{
                                    attack: AssaultRifleAttackRatio.reduce((p, c) => p + c, 0),
                                    basicAttackAmp: 100
                                }}
                            />
                        } else if (props.weaponType == "dual_swords") {
                            return <BasicAttackDamage 
                                key="standard" 
                                name={<FormattedMessage id="app.basic-attack.dual-sword" />}
                                status={props.status} 
                                disableCritical={def == "disable-critical"} 
                                config={{
                                    attack: DualSwordsAttackRatio.reduce((p, c) => p + c, 0),
                                    basicAttackAmp: 100
                                }}
                            />
                        } else {
                            return <BasicAttackDamage key="standard" name={<FormattedMessage id="app.basic-attack" />} status={props.status} disableCritical={def == "disable-critical"} />
                        }
                    } else if (def.type == "basic" || def.type == "summoned" || def.type == "basic-nocrit") {
                        const level = (props.config.skillLevels as any)[def.skill];
                        const sanitizedDict = Object.fromEntries(
                            Object.entries(def.value).map(([key, value]) => {
                                return [key, Array.isArray(value) ? value[level] : value]
                            })
                        );
                        const sanitizedMultipliers = def.multiplier?.map(m => {
                            const anyM = m as any;
                            if (anyM.basic != undefined) {
                                return Array.isArray(anyM.basic) ? anyM.basic[level] : anyM.basic;
                            }

                            return {
                                name: anyM.name,
                                value: Array.isArray(anyM.value) ? anyM.value[level] : anyM.value
                            }
                        })
                        return <BasicAttackDamage key="standard" name={def.label} status={props.status} config={sanitizedDict} summoned={def.type == "summoned"} multipliers={sanitizedMultipliers} disableCritical={def.type == "basic-nocrit"} />
                    } else {
                        return <SkillDamage {...def as any} status={props.status} config={props.config} />
                    }
                })
            }
            {props.children}
        </tbody>
    )
};

export default basicAttack;