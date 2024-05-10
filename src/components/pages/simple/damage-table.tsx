import { Status } from "components/subject/status";
import * as React from "react";
import BasicAttack from "components/pages/simple/basic-attack";
import style from "./damage-table.module.styl";
import { SubjectDamageTable, WeaponSkillDamageTable } from "components/subjects/damage-table";
import { SubjectConfig } from "components/subject/use-subject-config";
import SkillDamage from "./skill-damage";
import BasicAttackDamage from "./basic-attack-damage";
import table from "components/common/table.styl";
import { WeaponTypeID, equipmentStatus, meleeOrRange } from "@app/entity/equipment";
import { SummonedStatus } from "components/subjects/summoned-status";
import { name as abilityName } from "@app/entity/equipment-ability";
import { name as equipmentName } from "@app/entity/equipment";
import { ItemSkillDefinition } from "components/item-skills/item-skill";

type Props = {
    status: Status
    config: SubjectConfig
    weaponType?: WeaponTypeID
}

const damageTable: React.FC<Props> = props => {
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
                gauge: props.config.gauge
            });
        }
    }, [props.config.subject, props.status, props.config.skillLevels, props.weaponType]);

    const summonedName = React.useMemo(() => {
        if (SummonedStatus[props.config.subject] == undefined) return null;
        return SummonedStatus[props.config.subject].name("jp");
    }, [props.config.subject]);

    const weaponSkill = React.useMemo(() => {
        if (props.weaponType == undefined) return null;
        return WeaponSkillDamageTable[props.weaponType];
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
                            name: `${abilityName(ability.id, "jp")}(${equipmentName(id, "jp")})${value.type == "shield" ? " シールド" : ""}${value.type == "effect" ? "適合型能力値上昇量" : ""}${value.type == "dot" || value.type == "true-dot" ? "/秒" : ""}${value.additionalLabel || ""}`,
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
                                return <SkillDamage key={def.name} label={def.name} status={props.status} config={props.config} damage={def.constant} skill="item" summonedName={summonedName} multiplier={def.multiplier} />
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
                                                Object.entries(s.damage).map(([key, value]) => {
                                                    return [key, Array.isArray(value) ? value[level] : value]
                                                })
                                            );
                                            const multiplier = s.multiplier ?
                                                (Array.isArray(s.multiplier) ? s.multiplier[level] : s.multiplier) :
                                                undefined
                                            return <BasicAttackDamage name={s.label} status={props.status} config={sanitizedDict} multiplier={multiplier} />;
                                        }
                                        
                                        return <SkillDamage key={s.label} status={props.status} config={props.config} {...s} summonedName={summonedName} />
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
                                <SkillDamage key={def.label} status={props.status} config={props.config} {...def} summonedName={summonedName} />
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
                                return <SkillDamage key={def.name} label={def.name} status={props.status} config={props.config} damage={def.constant} skill="item" summonedName={summonedName} type={type} multiplier={def.multiplier} />
                            })
                        }
                    </tbody>
                </table>
            </div>
        </section>
    );
};

export default damageTable;
