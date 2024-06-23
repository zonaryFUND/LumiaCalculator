import * as React from "react";
import BasicAttack from "./basic-attack";
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
import { MitigationContext, createMitigation } from "./mitigation-context";
import KennethHeal from "./kenneth-heal";

type Props = {
    status: Status
    targetStatus: Status
    config: SubjectConfig
}

const damageTable: React.FC<Props> = props => {
    const weaponTypeID = React.useMemo(() => {
        if (!props.config.equipment.weapon) return undefined;
        return equipmentStatus(props.config.equipment.weapon).type as WeaponTypeID;
    }, [props.config.equipment.weapon]);

    const intl = useIntl();
    const definition = React.useMemo(() => {
        const raw = SubjectDamageTable[props.config.subject];
        if (typeof raw === "object") {
            return raw;
        } else {
            return raw({
                status: props.status, 
                skillLevels: props.config.skillLevels, 
                weaponType: weaponTypeID, 
                weapon: props.config.equipment.weapon ?? undefined,
                gauge: props.config.gauge,
                intl
            });
        }
    }, [props.config.subject, props.status, props.config.skillLevels, weaponTypeID]);

    const weaponSkill = React.useMemo(() => {
        if (weaponTypeID == undefined) return null;
        const table = WeaponSkillDamageTable[weaponTypeID];
        if (typeof table == "function") return table({intl});
        return table;
    }, [weaponTypeID]);

    const range = React.useMemo(() => {
        return weaponTypeID ? meleeOrRange(weaponTypeID) : "melee";
    }, [weaponTypeID])

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
                        const multiplier = value.multiplier ? [{basic: value.multiplier}] : undefined;
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
                            multiplier
                        };
                    });
                });
            });
    }, [range, props.config.equipment])

    return (
        <MitigationContext.Provider value={createMitigation(props.status, props.targetStatus)} >
        <section className={style.damage}>
            <h3>ダメージ</h3>
            <div className={table["table-base"]}>
                <table>
                    <BasicAttack status={props.status} config={props.config} table={definition!} weaponType={weaponTypeID}>
                        {
                            itemSkillDamage?.filter(def => def.type == "basic").map(def => {
                                return <SkillDamage 
                                    key={def.name} 
                                    label={def.name} 
                                    status={props.status} 
                                    config={props.config} 
                                    value={def.ratio} 
                                    skill="item" 
                                    multiplier={def.multiplier}
                                />;
                            })
                        }
                    </BasicAttack>
                    <tbody>
                        <tr className={table.separator}><td>実験体スキル</td><td>効果量</td><td>最大体力比</td></tr>
                        {
                            definition?.skill.map((array, index) => 
                                <React.Fragment key={index}>
                                {
                                    index == 0 ? null :
                                    <tr className={table.border}><td colSpan={3}></td></tr>
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
                                            const multiplier = s.multiplier?.reduce((prev, current) => {
                                                const anyC = current as any;
                                                if (anyC.basic != undefined) {
                                                    return prev / 100 * (Array.isArray(anyC.basic) ? anyC.basic[level] : anyC.basic);
                                                }
                                                return prev / 100 * (Array.isArray(anyC) ? anyC[level] : anyC);
                                            }, 100);
                                            return <BasicAttackDamage 
                                                name={s.label} 
                                                status={props.status} 
                                                config={sanitizedDict} 
                                                multiplier={multiplier} 
                                            />;
                                        }

                                        if (s.target == "any") {
                                            return (
                                                <>
                                                    <SkillDamage 
                                                        {...s}
                                                        key={s.label + "_self"}
                                                        label={s.label + "(自己)"}
                                                        status={props.status} 
                                                        config={props.config} 
                                                        selfTarget={true}
                                                    />
                                                    <SkillDamage 
                                                        {...s}
                                                        key={s.label + "_opponent"} 
                                                        label={s.label + "(相手)"} 
                                                        status={props.status} 
                                                        config={props.config} 
                                                    />
                                                </>
                                            )
                                        } 

                                        if (s.type == "kenneth-heal") {
                                            return (
                                                <>
                                                    <KennethHeal status={props.status} config={props.config} onEEffect={false} />
                                                    <KennethHeal status={props.status} config={props.config} onEEffect={true} />
                                                </>
                                            )
                                        }

                                        return <SkillDamage 
                                            key={s.label} 
                                            status={props.status} 
                                            config={props.config} {...s}
                                            selfTarget={s.target == "self"}
                                        />;
                                    })
                                }
                                </React.Fragment>
                            )
                    }
                    </tbody>
                    <tbody>
                        <tr className={table.separator}><td>武器スキル</td><td>効果量</td><td>最大体力比</td></tr>
                        {
                            weaponSkill?.map(def => (
                                <SkillDamage 
                                    key={def.label} 
                                    status={props.status} 
                                    config={props.config} 
                                    {...def}
                                />
                            ))
                        }
                    </tbody>
                    <tbody>
                        <tr className={table.separator}><td>アイテムスキル</td><td>効果量</td><td>最大体力比</td></tr>
                        {
                            itemSkillDamage?.filter(def => def.type != "basic").map(def => {
                                const type = (() => {
                                    switch (def.type) {
                                        case "basic":
                                            return "basic";
                                        case "shield":
                                            return "shield";
                                        case "heal":
                                            return "heal";
                                        case "status":
                                        case "true":
                                            return "true"
                                        case "skill":
                                            return undefined;
                                    }
                                })();
                                
                                return <SkillDamage 
                                    key={def.name} 
                                    label={def.name} 
                                    status={props.status} 
                                    config={props.config} 
                                    value={def.ratio} 
                                    skill="item" 
                                    type={type}
                                    multiplier={def.multiplier}
                                />
                            })
                        }
                    </tbody>
                </table>
            </div>
        </section>
        </MitigationContext.Provider>
    );
};

export default damageTable;