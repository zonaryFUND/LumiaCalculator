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
import RioConstants from "components/subjects/rio/constants.json";
import SegmentedControl from "components/common/segmented-control";
import { CombatHPContext } from "./combat-hp-context";

type Props = {
    hideHeader?: boolean
    left: {
        status: Status
        config: SubjectConfig
        hp: number
    }
    right: {
        status: Status
        config: SubjectConfig
        hp: number
    }
}

const damageTable: React.FC<Props> = props => {
    const ltr = React.useState<string | undefined>("ltr");
    const [attacker, defender] = ltr[0] == "ltr" ? [props.left, props.right] : [props.right, props.left]
    const weaponTypeID = React.useMemo(() => {
        if (!attacker.config.equipment.weapon) return undefined;
        return equipmentStatus(attacker.config.equipment.weapon).type as WeaponTypeID;
    }, [attacker.config.equipment.weapon]);

    const intl = useIntl();
    const definition = React.useMemo(() => {
        const raw = SubjectDamageTable[attacker.config.subject];
        if (typeof raw === "object") {
            return raw;
        } else {
            return raw({
                status: attacker.status, 
                skillLevels: attacker.config.skillLevels, 
                weaponType: weaponTypeID, 
                weapon: attacker.config.equipment.weapon ?? undefined,
                gauge: attacker.config.gauge,
                intl
            });
        }
    }, [attacker.config.subject, attacker.status, attacker.config.skillLevels, weaponTypeID]);

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
        return Object.values(attacker.config.equipment)
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
    }, [range, attacker.config.equipment]);

    const rioPassivePenetration = (() => {
        if (attacker.config.subject != "rio") return 0;
        return RioConstants.T.defense_decline.base[attacker.config.skillLevels.T] + attacker.status.criticalChance.calculatedValue.toNumber() * RioConstants.T.defense_decline.criticalChance;
    })();

    return (
        <CombatHPContext.Provider value={{hp: attacker.hp, targetHP: defender.hp, targetMaxHP: defender.status.maxHP.calculatedValue}} >
        <MitigationContext.Provider value={createMitigation(attacker.status, defender.status, rioPassivePenetration)} >
        <section className={style.damage}>
            <header className={style.switch}>
                <SegmentedControl 
                    name="direction" 
                    segments={[{title: "左→右", value: "ltr"}, {title:  "右→左", value: "rtl"}]} 
                    value={ltr}
                    style={{verticalPadding: 2}}
                />
            </header>
            <div className={table["table-base"]}>
                <table>
                    <BasicAttack status={attacker.status} config={attacker.config} table={definition!} weaponType={weaponTypeID}>
                        {
                            itemSkillDamage?.filter(def => def.type == "basic").map(def => {
                                return <SkillDamage 
                                    key={def.name} 
                                    label={def.name} 
                                    status={attacker.status} 
                                    config={attacker.config} 
                                    value={def.ratio} 
                                    skill="other" 
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
                                            const level = (attacker.config.skillLevels as any)[s.skill];
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
                                                status={attacker.status} 
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
                                                        status={attacker.status} 
                                                        config={attacker.config} 
                                                        selfTarget={true}
                                                    />
                                                    <SkillDamage 
                                                        {...s}
                                                        key={s.label + "_opponent"} 
                                                        label={s.label + "(相手)"} 
                                                        status={attacker.status} 
                                                        config={attacker.config} 
                                                    />
                                                </>
                                            )
                                        } 

                                        if (s.type == "kenneth-heal") {
                                            return (
                                                <>
                                                    <KennethHeal status={attacker.status} config={attacker.config} onEEffect={false} />
                                                    <KennethHeal status={attacker.status} config={attacker.config} onEEffect={true} />
                                                </>
                                            )
                                        }

                                        return <SkillDamage 
                                            key={s.label} 
                                            status={attacker.status} 
                                            config={attacker.config} {...s}
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
                                    status={attacker.status} 
                                    config={attacker.config} 
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
                                            return "count";
                                        case "true":
                                            return "true"
                                        case "skill":
                                            return undefined;
                                    }
                                })();
                                
                                return <SkillDamage 
                                    key={def.name} 
                                    label={def.name} 
                                    status={attacker.status} 
                                    config={attacker.config} 
                                    value={def.ratio} 
                                    skill="other" 
                                    type={type}
                                    multiplier={def.multiplier}
                                    selfTarget={def.type == "heal" || def.type == "shield"}
                                />
                            })
                        }
                    </tbody>
                </table>
            </div>
        </section>
        </MitigationContext.Provider>
        </CombatHPContext.Provider>
    );
};

export default damageTable;