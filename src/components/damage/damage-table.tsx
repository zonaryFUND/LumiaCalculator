import * as React from "react";
import BasicAttack from "components/damage/basic-attack";
import style from "./damage-table.module.styl";
import { SubjectDamageTable, WeaponSkillDamageTable } from "components/subjects/damage-table";
import SkillDamage from "./skill-damage";
import BasicAttackDamage from "./basic-attack-damage";
import table from "components/common/table.styl";
import { SummonedStatus } from "components/subjects/summoned-status";
import { ItemSkillDefinition } from "components/item-skills/item-skill";
import { Status } from "app-types/subject-dynamic/status/type";
import { SubjectConfig } from "app-types/subject-dynamic/config";
import { WeaponTypeID, meleeOrRange } from "app-types/equipment/weapon";
import { equipmentStatus } from "app-types/equipment";
import { useIntl } from "react-intl";

type Props = {
    status: Status
    config: SubjectConfig
    weaponType?: WeaponTypeID
}

const damageTable: React.FC<Props> = props => {
    const intl = useIntl();
    const definition = React.useMemo(() => {
        const raw = SubjectDamageTable[props.config.subject];
        if (typeof raw === "object") {
            return raw;
        } else {
            return raw({
                status: props.status, 
                skillLevels: props.config.skillLevels, 
                weaponType: props.weaponType, 
                weapon: props.config.equipment.weapon ?? undefined,
                gauge: props.config.gauge,
                intl
            });
        }
    }, [props.config.subject, props.status, props.config.skillLevels, props.weaponType]);

    const weaponSkill = React.useMemo(() => {
        if (props.weaponType == undefined) return null;
        const table = WeaponSkillDamageTable[props.weaponType];
        if (typeof table == "function") return table({intl});
        return table;
    }, [props.weaponType]);

    const range = React.useMemo(() => {
        return props.weaponType ? meleeOrRange(props.weaponType) : "melee";
    }, [props.weaponType])

    const itemSkillDamage = React.useMemo(() => {
        return Object.values(props.config.equipment)
            .flatMap(id => {
                if (id == null) return [];
                const abilities = equipmentStatus(id).option ?? [];

                return abilities.flatMap(ability => {
                    if (ItemSkillDefinition[ability.id] == undefined) return [];

                    const values = ItemSkillDefinition[ability.id].values;
                    if (values == undefined) return [];
                    return values(ability.values).map(value => {
                        return {
                            //name: `${abilityName(ability.id, "jp")}(${equipmentName(id, "jp")})${value.type == "shield" ? " シールド" : ""}${value.type == "effect" ? "適合型能力値上昇量" : ""}${value.type == "dot" || value.type == "true-dot" ? "/秒" : ""}${value.additionalLabel || ""}`,
                            name: "",
                            type: value.type,
                            constant: value.constant[range] || value.constant,
                            multiplier: value.multiplier
                        };
                    });
                });
            });
    }, [range, props.config.equipment])

    return (
        <section className={style.damage}>
            <h3>ダメージ</h3>
            <div className={table["table-base"]}>
                <table>
                    <BasicAttack status={props.status} config={props.config} table={definition!} weaponType={props.weaponType}>
                        {
                            itemSkillDamage?.filter(def => def.type == "basic").map(def => {
                                //return <SkillDamage key={def.name} label={def.name} status={props.status} config={props.config} damage={def.constant} skill="item" summonedName={summonedName} multiplier={def.multiplier} />
                                return null
                            })
                        }
                    </BasicAttack>
                    <tbody>
                        <tr className={table.separator}><td>実験体スキル</td><td colSpan={3}>ダメージ / 効果量</td></tr>
                        {
                            definition?.skill.map((array, index) => 
                                <React.Fragment key={index}>
                                {
                                    index == 0 ? null :
                                    <tr className={table.border}><td colSpan={4}></td></tr>
                                }
                                {
                                    array.map(s => {
                                        if (s.type == "critical") {
                                            const level = (props.config.skillLevels as any)[s.skill];
                                            const sanitizedDict = Object.fromEntries(
                                                Object.entries(s.value).map(([key, value]) => {
                                                    return [key, Array.isArray(value) ? value[level] : value]
                                                })
                                            );
                                            const sanitizedMultipliers = s.multiplier?.map(m => {
                                                const anyM = m as any;
                                                if (anyM.basic != undefined) {
                                                    return Array.isArray(anyM.basic) ? anyM.basic[level] : anyM.basic;
                                                }
                    
                                                return {
                                                    name: anyM.name,
                                                    value: Array.isArray(anyM.value) ? anyM.value[level] : anyM.value
                                                }
                                            })
                                            return <BasicAttackDamage name={s.label} status={props.status} config={sanitizedDict} multipliers={sanitizedMultipliers} />;
                                        }
                                        
                                        return <SkillDamage key={s.label} status={props.status} config={props.config} {...s} />
                                    })
                                }
                                </React.Fragment>
                            )
                    }
                    </tbody>
                    <tbody>
                        <tr className={table.separator}><td>武器スキル</td><td colSpan={3}>ダメージ / 効果量</td></tr>
                        {
                            weaponSkill?.map(def => (
                                <SkillDamage key={def.label} status={props.status} config={props.config} {...def} />
                            ))
                        }
                    </tbody>
                    <tbody>
                        <tr className={table.separator}><td>アイテムスキル</td><td colSpan={3}>ダメージ / 効果量</td></tr>
                        {
                            itemSkillDamage?.filter(def => def.type != "basic").map(def => {
                                const type = (() => {
                                    switch (def.type) {
                                        case "basic":
                                            return "basic";
                                        case "shield":
                                            return "shield";
                                        case "effect":
                                        case "true":
                                        case "true-dot":
                                            return "true"
                                        case "dot":
                                        case "skill":
                                            return undefined;
                                    }
                                })();
                                //return <SkillDamage key={def.name} label={def.name} status={props.status} config={props.config} damage={def.constant} skill="item" summonedName={summonedName} type={type} multiplier={def.multiplier} />
                                return null
                            })
                        }
                    </tbody>
                </table>
            </div>
        </section>
    );
};

export default damageTable;