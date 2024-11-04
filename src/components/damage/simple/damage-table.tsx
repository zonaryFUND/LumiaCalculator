import * as React from "react";
import BasicAttack from "./subtables/basic-attack";
import style from "../damage-table.module.styl";
import { SubjectDamageTable, WeaponSkillDamageTable } from "components/subjects/damage-table";
import StandardDamage from "./subtables/rows/standard-damage";
import SubjectSkill from "./subtables/subject-skill";
import OtherSkill from "./subtables/other-skill";
import WeaponSkill from "./subtables/weapon-skill";
import table from "components/common/table.styl";
import { ItemSkillDamageTable } from "components/item-skills/item-skill";
import { Status } from "app-types/subject-dynamic/status/type";
import { SubjectConfig } from "app-types/subject-dynamic/config";
import { WeaponTypeID, Weapons, meleeOrRange } from "app-types/equipment/weapon";
import { equipmentStatus, name } from "app-types/equipment";
import { useIntl } from "react-intl";
import { name as abilityName } from "app-types/equipment/ability";
import { name as equipmentName } from "app-types/equipment";
import { augmentTableValues } from "components/augment/table-value";
import TacticalSkill from "components/tactical-skill/damage-table";
import { weaponSkillLevel } from "app-types/subject-dynamic/status/weapon-skill-level";
import { DamageTableUnit } from "app-types/damage-table/unit";

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

    const [basicAttackTriggeredWeaponSkill, weaponSkill] = React.useMemo(() => {
        if (props.weaponType == undefined) return [[], []];
        const skillLevel = weaponSkillLevel(props.config.weaponMastery);

        const table = WeaponSkillDamageTable[props.weaponType];
        const units = (typeof table == "function" ? table({intl}) : table ?? [])
            .filter(unit => unit.damageDependentHeal == undefined)
            .map(unit => ({...unit, skillLevel}));

        return [
            units.filter(u => u.triggeredOnBasicAttack),
            units.filter(u => u.triggeredOnBasicAttack != true)
        ]
    }, [props.weaponType]);

    const range = React.useMemo(() => {
        return props.weaponType ? meleeOrRange(props.weaponType) : "melee";
    }, [props.weaponType])

    const [basicAttackTriggeredItemSkillValues, itemSkillValues] = React.useMemo(() => {
        return Object.values(props.config.equipment)
            .flatMap(id => {
                if (id == null) return [];
                const abilities = equipmentStatus(id).option ?? [];

                return abilities.flatMap(ability => {
                    const unitsOrGenerator = ItemSkillDamageTable[ability.id];
                    if (unitsOrGenerator == undefined) return [];
                    const entries = typeof unitsOrGenerator == "function" ? unitsOrGenerator(ability.values.dmg) : unitsOrGenerator;
                    return entries.map(entry => {
                        const itemWithSkillName = `${abilityName(ability.id, "jp")}(${equipmentName(id, "jp")})`;
                        const label = entry.labelIntlID ? intl.formatMessage({id: entry.labelIntlID}, {item: itemWithSkillName, value: entry.intlValue}) : itemWithSkillName;
                        const value = "melee" in entry.value ? entry.value[range] : entry.value;
                        return {...entry, label, value}
                    });
                });
            })
            .reduce((prev, entry) => {
                if (entry.triggeredOnBasicAttack) {
                    return [prev[0].concat(entry),  prev[1]]
                } else {
                    return [prev[0], prev[1].concat(entry)]
                }
            }, [[] as DamageTableUnit[], [] as DamageTableUnit[]]);
    }, [range, props.config.equipment])

    const tacticalSkills = TacticalSkill(intl);

    return (
        <section className={style.damage}>
            <h3>ダメージ</h3>
            <div className={table["table-base"]}>
                <table>
                    <BasicAttack 
                        elements={
                            [
                                definition.basicAttack,
                                basicAttackTriggeredWeaponSkill,
                                basicAttackTriggeredItemSkillValues
                            ].filter(array => array.length > 0)
                        }
                        status={props.status} 
                        config={props.config}
                        weaponType={props.weaponType}
                    />
                    <SubjectSkill 
                        tables={definition.skill}
                        config={props.config}
                        status={props.status}
                    />
                    <WeaponSkill 
                        elements={weaponSkill}
                        config={props.config}
                        status={props.status}
                    />
                    <OtherSkill 
                        label="アイテムスキル"
                        tables={[itemSkillValues]}
                        config={props.config}
                        status={props.status}
                    />
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