import * as React from "react";
import BasicAttack from "components/damage/simple/basic-attack";
import style from "../damage-table.module.styl";
import { SubjectDamageTable, WeaponSkillDamageTable } from "components/subjects/damage-table";
import SkillDamage from "./skill-damage";
import BasicAttackDamage from "./basic-attack-damage";
import table from "components/common/table.styl";
import { ItemSkillDefinition } from "components/item-skills/item-skill";
import { Status } from "app-types/subject-dynamic/status/type";
import { SubjectConfig } from "app-types/subject-dynamic/config";
import { WeaponTypeID, meleeOrRange } from "app-types/equipment/weapon";
import { equipmentStatus, name } from "app-types/equipment";
import { useIntl } from "react-intl";
import { name as abilityName } from "app-types/equipment/ability";
import { name as equipmentName } from "app-types/equipment";
import { augmentTableValues } from "components/augment/table-value";
import TacticalSkill from "components/tactical-skill/damage-table";
import { extractMultiplier, extractskillLevel } from "../damage-table-util";

type Props = {
    status: Status
    targetStatus?: Status
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
                        const baseText = `${abilityName(ability.id, "jp")}(${equipmentName(id, "jp")})`;
                        const name = value.labelFormat?.split(/({text})/)
                            .map(component => {
                                if (component.startsWith("{") && component.endsWith("}")) {
                                    return baseText
                                } else {
                                    return component
                                }
                            })
                            .join("");
                            
                        return {
                            name: name ?? baseText,
                            type: value.type,
                            ratio: value.ratio[range] || value.ratio,
                            multiplier: value.multiplier
                        };
                    });
                });
            });
    }, [range, props.config.equipment])

    const tacticalSkills = TacticalSkill(intl);

    return (
        <section className={style.damage}>
            <h3>ダメージ</h3>
            <div className={table["table-base"]}>
                <table>
                    <BasicAttack status={props.status} config={props.config} table={definition!} weaponType={props.weaponType}>
                        {
                            itemSkillDamage?.filter(def => def.type == "basic").map(def => {
                                return <SkillDamage key={def.name} label={def.name} status={props.status} config={props.config} value={def.ratio} skill="other" multiplier={def.multiplier} />
                            })
                        }
                    </BasicAttack>
                    <tbody>
                        <tr className={table.separator}><td>実験体スキル</td><td colSpan={3}>ダメージ / 効果量</td></tr>
                        {
                            definition?.skill.map((array, index) => 
                                <React.Fragment key={index}>
                                {
                                    index == 0 || array.filter(s => s.damageDependent == undefined).length == 0 ? null :
                                    <tr className={table.border}><td colSpan={4}></td></tr>
                                }
                                {
                                    array.map(s => {
                                        if (s.type?.type == "basic" && s.type.critical != "none") {
                                            const level = extractskillLevel(s, props.config);
                                            const sanitizedDict = Object.fromEntries(
                                                Object.entries(s.value).map(([key, value]) => {
                                                    return [key, Array.isArray(value) ? value[level] : value]
                                                })
                                            );
                                            const multiplier = extractMultiplier(level, s.multiplier);
                                            return <BasicAttackDamage name={s.label} status={props.status} config={sanitizedDict} multipliers={multiplier} />;
                                        }

                                        if (s.damageDependent != undefined) return null;                                        
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
                                            return {type: "basic", critical: "none"};
                                        case "shield":
                                            return {type: "shield", target: "self"};
                                        case "heal":
                                            return {type: "heal", target: "self"};
                                        case "status":
                                        case "true":
                                            return {type: "true"}
                                        case "skill":
                                            return undefined;
                                    }
                                })();
                                
                                return <SkillDamage key={def.name} label={def.name} status={props.status} config={props.config} value={def.ratio} skill="other" type={type as any} multiplier={def.multiplier} />
                            })
                        }
                    </tbody>
                    <tbody>
                        <tr className={table.separator}><td>特性</td><td colSpan={3}>ダメージ / 効果量</td></tr>
                        {
                            augmentTableValues({intl}).map(def => {
                                return <SkillDamage
                                    key={def.label}
                                    label={def.label}
                                    status={props.status}
                                    config={props.config}
                                    value={def.ratio}
                                    skill="other"
                                />
                            })
                        }
                    </tbody>
                    <tbody>
                        <tr className={table.separator}><td>戦術スキル</td><td colSpan={3}>ダメージ / 効果量</td></tr>
                        {
                            tacticalSkills.map((array, index) => 
                                <React.Fragment>
                                    {
                                        index == 0 ? null : <tr className={table.border}><td colSpan={4}></td></tr>
                                    }
                                    {
                                        array.map(def => {
                                            return <SkillDamage 
                                                key={def.label} 
                                                label={def.label} 
                                                status={props.status} 
                                                config={props.config} 
                                                value={(def.value as any)[range] || def.value} 
                                                skill={{tacticalLevel: def.level - 1}} 
                                                type={def.type} 
                                                multiplier={def.multiplier} 
                                            />
                                        })
                                    }
                                </React.Fragment>
                            )
                        }
                    </tbody>
                </table>
            </div>
        </section>
    );
};

export default damageTable;