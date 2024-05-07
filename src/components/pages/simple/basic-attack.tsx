import { Status } from "components/subject/status";
import * as React from "react";
import BasicAttackDamage from "./basic-attack-damage";
import table from "components/common/table.styl";
import { DamageTable } from "components/subjects/damage-table";
import { WeaponTypeID } from "@app/entity/equipment";
import { AssaultRifleAttackRatio, DualSwordsAttackRatio } from "components/subject/standard-values";
import SkillDamage from "./skill-damage";
import { SubjectConfig } from "components/subject/use-subject-config";
import Hypercharge from "./aiden-hypercharge";
import DebiMarlConstants from "components/subjects/debi_marlene/constants.json";
import Rio from "./rio";
import { styles } from "@app/util/style";
import style from "./basic-attack.module.styl";


type Props = {
    status: Status
    config: SubjectConfig
    table: DamageTable
    weaponType?: WeaponTypeID
}

const basicAttack: React.FC<Props> = props => {
    return (
        <tbody>
            {
                props.table.basicAttack.includes("standard") || props.table.basicAttack.find(t => (t as any).type == "basic" && (t as any).disableCritical != true) ?
                <tr className={styles(table.separator)}><td>基本攻撃</td><td>基礎値</td><td>致命打</td><td>期待値</td></tr> :
                <tr className={table.separator}><td colSpan={3}>基本攻撃</td><td>基礎値</td></tr>
            }
            {
                props.table.basicAttack.map(def => {
                    if (def == "aiden") {
                        return <Hypercharge status={props.status} config={props.config} />;
                    } else if (typeof def === "string") {
                        if (props.weaponType == "assault_rifle") {
                            return <BasicAttackDamage 
                                key="standard" 
                                name="基本攻撃(3発分)" 
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
                                name="基本攻撃(2発分)"
                                status={props.status} 
                                disableCritical={def == "disable-critical"} 
                                config={{
                                    attack: DualSwordsAttackRatio.reduce((p, c) => p + c, 0),
                                    basicAttackAmp: 100
                                }}
                            />
                        } else if (def == "debimarl") {
                            return <BasicAttackDamage key="standard" name="基本攻撃" status={props.status} disableCritical={true} config={{attack: DebiMarlConstants.T.basic_attack_damage}} />;
                        } else if (def == "rio") {
                            return <Rio status={props.status} config={props.config} />;
                        } else {
                            return <BasicAttackDamage key="standard" name="基本攻撃" status={props.status} disableCritical={def == "disable-critical"} />
                        }
                    } else if (def.type == "basic" || def.type == "summoned") {
                        const level = (props.config.skillLevels as any)[def.skill];
                        const sanitizedDict = Object.fromEntries(
                            Object.entries(def.damage).map(([key, value]) => {
                                return [key, Array.isArray(value) ? value[level] : value]
                            })
                        );
                        const multiplier = Array.isArray(def.multiplier) ? def.multiplier[level] : def.multiplier
                        return <BasicAttackDamage key="standard" name={def.label} status={props.status} config={sanitizedDict} summoned={def.type == "summoned"} multiplier={multiplier} disableCritical={def.disableCritical} />
                    } else {
                        return <SkillDamage {...def as any} status={props.status} config={props.config} />
                    }
                })
            }
        </tbody>
    )
};

export default basicAttack;