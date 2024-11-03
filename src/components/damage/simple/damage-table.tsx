import * as React from "react";
import BasicAttack from "./subtables/basic-attack";
import style from "../damage-table.module.styl";
import { BasicAttackElement, SubjectDamageTable, WeaponSkillDamageTable } from "components/subjects/damage-table";
import StandardDamage from "./subtables/rows/standard-damage";
import UniqueExpression from "./subtables/rows/unique-expression";
import Skill from "./subtables/skill";
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
import { extractMultiplier } from "../damage-table-util";

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
                config: props.config,
                status: props.status, 
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
                    <BasicAttack 
                        elements={definition.basicAttack}
                        status={props.status} 
                        config={props.config}
                        weaponType={props.weaponType}
                    />
                     {/*</table>       
                        {
                            itemSkillDamage?.filter(def => def.type == "basic").map(def => {
                                return <SkillDamage key={def.name} label={def.name} status={props.status} config={props.config} value={def.ratio} skill="other" multiplier={def.multiplier} />
                            })
                        }
                    </BasicAttack>
                    */}
                    <Skill 
                        tables={definition.skill}
                        config={props.config}
                        status={props.status}
                    />
                    <tbody>
                        <tr className={table.separator}><td>武器スキル</td><td colSpan={3}>ダメージ / 効果量</td></tr>
                        {/*
                            weaponSkill?.map(def => (
                                typeof def.value == "function" ?
                                null :
                                <SkillDamage key={def.label} status={props.status} config={props.config} {...def} value={def.value} />
                            ))
                        */}
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
                                
                                return <StandardDamage key={def.name} label={def.name} status={props.status} config={props.config} value={def.ratio} type={type as any} multiplier={def.multiplier} />
                            })
                        }
                    </tbody>
                    <tbody>
                        <tr className={table.separator}><td>特性</td><td colSpan={3}>ダメージ / 効果量</td></tr>
                        {
                            augmentTableValues({intl}).map(def => {
                                return <StandardDamage
                                    key={def.label}
                                    label={def.label}
                                    status={props.status}
                                    config={props.config}
                                    value={def.ratio}
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
                                            /*
                                            return <StandardDamage 
                                                key={def.label} 
                                                label={def.label} 
                                                status={props.status} 
                                                config={props.config} 
                                                value={(def.value as any)[range] || def.value} 
                                                type={def.type} 
                                                multiplier={def.multiplier} 
                                            />
                                            */
                                           return null;
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