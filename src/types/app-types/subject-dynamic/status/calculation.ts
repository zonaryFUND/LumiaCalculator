import { BaseStatus, BaseStatusType, LevelUpStatus, LevelUpStatusType, WeaponMasteryStatus } from "app-types/subject-static";
import { adaptiveForceTargetOf, SubjectConfig, weaponTypeIDOf } from "../config";
import { ComponentStatus, ComponentStatusValue, Status } from "./type";
import { DavidChestArmorUpgradeDictionary, EquipmentBaseStatus, EquipmentStatusDictionary } from "app-types/equipment";
import Decimal from "decimal.js";
import { WeaponTypeStatus } from "app-types/equipment/weapon";
import { createComponentValue, equipmentConstant, StatusValueComponent } from "./value-component/component";
import { BaseBasicAttackRange, BaseVision, BasicAttackReductionPerMastery, MovementSpeedPerMastery, SkillReductionPerMastery } from "./standard-values";
import { calculateCooldownValue, calculateMovementSpeedValue, calculateStatusValue } from "./combine-components";
import * as es from "es-toolkit";
import { SubjectPerpetualStatusDictionary } from "@app/ingame-params/subjects/dictionary";

export function statusOf(config: SubjectConfig, currentHPRatio: number): Status {
    const level1Status = BaseStatus[config.subject];
    const levelupStatus = LevelUpStatus[config.subject];
    const equipmentStatus = Object.entries(config.equipment)
        .flatMap(([position, equipmentID]) => {
            if (equipmentID == null || typeof equipmentID != "number") {
                return []
            }

            const status = EquipmentStatusDictionary[equipmentID];
            const upgrade = DavidChestArmorUpgradeDictionary[equipmentID];
            if (position == "Chest" && config.equipment.isChestDavid && upgrade != undefined) {
                const upgrade = DavidChestArmorUpgradeDictionary[equipmentID];
                return Object.entries(upgrade).reduce((prev, [statusKey, value]) => {
                    return {
                        ...prev,
                        [statusKey]: (prev[statusKey as keyof EquipmentBaseStatus] ?? new Decimal(0)).add(value)
                    }
                }, status);
            } else {
                return status;
            }
        });

    const sumOfEquipmentStatus = (statusKey: keyof EquipmentBaseStatus): Decimal | undefined =>
        equipmentStatus
            .map(s => s[statusKey])
            .filter((v): v is Decimal => v != undefined)
            .reduce((prev, current) => (prev ?? new Decimal(0)).add(current), undefined as Decimal | undefined);

    const maxOfEquipmentStatus = (statusKey: keyof EquipmentBaseStatus): Decimal | undefined =>
        equipmentStatus
            .map(s => s[statusKey])
            .filter((v): v is Decimal => v != undefined)
            .reduce((prev, current) => Decimal.max(prev ?? 0, current), undefined as Decimal | undefined);

    const [weaponType, weaponBaseStatus] = (() => {
        const type = weaponTypeIDOf(config);
        if (type == undefined) return [undefined, undefined];
        return [type, WeaponTypeStatus[type]];
    })();

    const weaponMasteryStatus = weaponType == undefined ? undefined : WeaponMasteryStatus[config.subject][weaponType];

    const adaptiveForceTarget = adaptiveForceTargetOf(config);

    const statusComponent = (
        calculationType: StatusValueComponent["calculationType"],
        key: keyof BaseStatusType | keyof LevelUpStatusType
    ): StatusValueComponent | undefined => {
        
        const value = createComponentValue(
            config.level, 
            true, 
            {
                base: level1Status[key], 
                levelProportional: key != "moveSpeed" && key != "attackSpeed" ? levelupStatus[key] : undefined
            }
        );

        if (!value) return undefined;
        return { origin: "subject-status", calculationType, value };
    };

    const equipmentComponent = (
        calculationType: StatusValueComponent["calculationType"],
        values: {
            base?: Decimal,
            levelProportional?: Decimal
        }
    ): StatusValueComponent | undefined => {
        const value = createComponentValue(config.level, false, values);

        if (!value) return undefined;
        return { origin: "equipment", calculationType, value };
    };

    const masteryComponent = (
        calculationType: "sum" | "mul",
        mastery: Decimal.Value,
        multiplier: Decimal.Value
    ): StatusValueComponent => ({
        origin: "subject-status",
        calculationType,
        intlID: "app.mastery",
        value: {
            type: "level-dependent",
            incrementalFactor: {
                type: "mastery",
                value: mastery
            },
            multiplier,
            value: new Decimal(mastery).mul(multiplier)
        }
    });

    const adaptiveComponent = (
        origin: StatusValueComponent["origin"],
        intlID: string,
        value: Decimal.Value | undefined
    ): StatusValueComponent | undefined => {
        if (!value) return undefined;
        return {
            origin,
            calculationType: "sum",
            intlID,
            value: {
                type: "constant",
                value: new Decimal(value).mul(adaptiveForceTarget == "skillAmp" ? 2 : 1)
            }
        }
    };

    const weaponComponent = (
        subject: Decimal.Value,
        weapon?: Decimal.Value
    ): StatusValueComponent => ({
        origin: "weapon-base",
        calculationType: "sum",
        value: {
            type: "weapon-base",
            subject,
            weapon,
            value: new Decimal(subject).add(weapon ?? 0)
        }
    });

    const baseComponentStatus: ComponentStatus = {
        // 耐久
        maxHp: {
            digit: 0,
            components: [
                statusComponent("sum", "maxHp"),
                equipmentComponent(
                    "sum", 
                    {base: sumOfEquipmentStatus("maxHp"), levelProportional: sumOfEquipmentStatus("maxHpByLv")}
                )
            ].filter((c): c is StatusValueComponent => c != undefined)
        },
        hpRegen: {
            digit: 2,
            components: [
                statusComponent("sum", "hpRegen"),
                equipmentComponent(
                    "mul", 
                    {base: sumOfEquipmentStatus("hpRegenRatio")}
                )
            ].filter((c): c is StatusValueComponent => c != undefined)
        },
        defense: {
            digit: 0,
            components: [
                statusComponent("sum", "defense"),
                equipmentComponent(
                    "sum", 
                    {base: sumOfEquipmentStatus("defense")}
                )
            ].filter((c): c is StatusValueComponent => c != undefined)
        },
        preventBasicAttackDamaged: { digit: 0, components: [] },
        preventBasicAttackDamagedRatio: {
            digit: 1,
            components: [
                masteryComponent("sum", config.defenseMastery, BasicAttackReductionPerMastery)
            ]
        },
        preventSkillDamagedRatio: {
            digit: 1,
            components: [
                masteryComponent("sum", config.defenseMastery, SkillReductionPerMastery)
            ]
        },

        // スタミナ
        maxSp: {
            digit: 0,
            components: [
                statusComponent("sum", "maxSp"),
                equipmentComponent(
                    "sum",
                    {base: sumOfEquipmentStatus("maxSp")}
                )
            ].filter((c): c is StatusValueComponent => c != undefined)
        },
        spRegen: {
            digit: 2,
            components: [
                statusComponent("sum", "spRegen"),
                equipmentComponent(
                    "mul",
                    {base: sumOfEquipmentStatus("spRegenRatio")}
                )
            ].filter((c): c is StatusValueComponent => c != undefined)
        },

        // basic attack
        attackPower: {
            digit: 0,
            components: [
                statusComponent("sum", "attackPower"),
                equipmentComponent(
                    "sum",
                    {base: sumOfEquipmentStatus("attackPower"), levelProportional: sumOfEquipmentStatus("attackPowerByLv")}
                ),
                adaptiveForceTarget != "skillAmp" ? adaptiveComponent("equipment", "equipment.status.adaptive", sumOfEquipmentStatus("adaptiveForce")) : undefined,
                weaponMasteryStatus?.type == "attack_power" ? masteryComponent("sum", config.weaponMastery, weaponMasteryStatus.value) : undefined
            ].filter((c): c is StatusValueComponent => c != undefined)
        },
        increaseBasicAttackDamageRatio: {
            digit: 1,
            components: [
                equipmentComponent("sum", {levelProportional: sumOfEquipmentStatus("increaseBasicAttackDamageRatioByLv")}),
                weaponMasteryStatus?.type == "basic_attack_amp" ? masteryComponent("sum", config.weaponMastery, weaponMasteryStatus.value) : undefined
            ].filter((c): c is StatusValueComponent => c != undefined)
        },
        attackSpeed: {
            digit: 2,
            max: 2.5,
            components: [
                weaponComponent(level1Status.attackSpeed, weaponBaseStatus?.attackSpeed),
                equipmentComponent("mul", {base: sumOfEquipmentStatus("attackSpeedRatio")}),
                weaponMasteryStatus ? masteryComponent("mul", config.weaponMastery, weaponMasteryStatus.attackSpeed) : undefined
            ].filter((c): c is StatusValueComponent => c != undefined)
        },
        criticalStrikeChance: {
            digit: 0,
            max: 100,
            components: [
                equipmentComponent("sum", {base: sumOfEquipmentStatus("criticalStrikeChance")})
            ].filter((c): c is StatusValueComponent => c != undefined)
        },
        criticalStrikeDamage: {
            digit: 0,
            components: [
                equipmentComponent("sum", {base: sumOfEquipmentStatus("criticalStrikeDamage")})
            ].filter((c): c is StatusValueComponent => c != undefined)
        },

        // skill
        skillAmp: {
            digit: 0,
            components: [
                equipmentComponent("sum", {base: sumOfEquipmentStatus("skillAmp"), levelProportional: sumOfEquipmentStatus("skillAmpByLevel")}),
                adaptiveForceTarget == "skillAmp" ? adaptiveComponent("equipment", "equipment.status.adaptive", sumOfEquipmentStatus("adaptiveForce")) : undefined,
                equipmentComponent("mul", {base: maxOfEquipmentStatus("uniqueSkillAmpRatio")}),
                equipmentComponent("mul", {base: sumOfEquipmentStatus("skillAmpRatio")}),
                weaponMasteryStatus?.type == "skill_amp" ? masteryComponent("mul", config.weaponMastery, weaponMasteryStatus.value) : undefined
            ].filter((c): c is StatusValueComponent => c != undefined)
        },
        cooldownReduction: {
            digit: 0,
            components: [
                equipmentComponent("sum", {base: sumOfEquipmentStatus("cooldownReduction")})
            ].filter((c): c is StatusValueComponent => c != undefined)
        },
        ultCooldownReduction: {
            digit: 0,
            components: [
                equipmentComponent("sum", {base: sumOfEquipmentStatus("ultCooldownReduction")})
            ].filter((c): c is StatusValueComponent => c != undefined)
        },
        tacticalSkillCooldownReduction: {
            digit: 0,
            components: [
                equipmentComponent("sum", {base: sumOfEquipmentStatus("tacticalCooldownReduction")})
            ].filter((c): c is StatusValueComponent => c != undefined)
        },

        // penetration
        penetrationDefense: {
            digit: 0,
            components: [
                equipmentComponent("sum", {base: sumOfEquipmentStatus("penetrationDefense")})
            ].filter((c): c is StatusValueComponent => c != undefined)
        },
        penetrationDefenseRatio: {
            digit: 0,
            components: [
                equipmentComponent("sum", {base: sumOfEquipmentStatus("penetrationDefenseRatio")})
            ].filter((c): c is StatusValueComponent => c != undefined)
        },

        // heal
        lifeSteal: {
            digit: 0,
            components: [
                equipmentComponent("sum", {base: sumOfEquipmentStatus("lifeSteal")})
            ].filter((c): c is StatusValueComponent => c != undefined)
        },
        normalLifeSteal: {
            digit: 0,
            components: [
                equipmentComponent("sum", {base: sumOfEquipmentStatus("normalLifeSteal")})
            ].filter((c): c is StatusValueComponent => c != undefined)
        },
        healerGiveHpHealRatio: {
            digit: 0,
            components: [
                equipmentComponent("sum", {base: sumOfEquipmentStatus("healerGiveHpHealRatio")})
            ].filter((c): c is StatusValueComponent => c != undefined)
        },

        // misc
        tenacity: {
            digit: 0,
            components: [
                equipmentComponent("sum", {base: maxOfEquipmentStatus("uniqueTenacity")})
            ].filter((c): c is StatusValueComponent => c != undefined)
        },
        moveSpeed: {
            digit: 2,
            components: [
                statusComponent("sum", "moveSpeed"),
                (() => {
                    const eqConst = equipmentConstant("sum", sumOfEquipmentStatus("moveSpeed"));
                    if (eqConst == undefined) return undefined;
                    return {
                        ...eqConst,
                        intlID: "status.equipment-constant"
                    }
                })(),
                masteryComponent("sum", config.movementMastery, MovementSpeedPerMastery),
                (() => {
                    const eqRatio = equipmentConstant("mul", sumOfEquipmentStatus("moveSpeedRatio"));
                    if (eqRatio == undefined) return undefined;
                    return {
                        ...eqRatio,
                        intlID: "status.equipment-ratio"
                    }
                })()
            ].filter((c): c is StatusValueComponent => c != undefined)
        },
        slowResist: {
            digit: 0,
            components: [
                equipmentComponent("sum", {base: sumOfEquipmentStatus("slowResistRatio")})
            ].filter((c): c is StatusValueComponent => c != undefined)
        },
        sightRange: {
            digit: 1,
            components: [
                {origin: "subject-status", calculationType: "sum", value: {type: "constant", value: new Decimal(BaseVision)}},
                equipmentComponent("sum", {base: sumOfEquipmentStatus("sightRange")})
            ].filter((c): c is StatusValueComponent => c != undefined)
        },
        attackRange: {
            digit: 1,
            components: [
                weaponComponent(BaseBasicAttackRange, weaponBaseStatus?.range),
                equipmentComponent("sum", {base: maxOfEquipmentStatus("uniqueAttackRange")})
            ].filter((c): c is StatusValueComponent => c != undefined)
        }
    }

    const perpetulStatus = SubjectPerpetualStatusDictionary[config.subject](config, currentHPRatio);
    const componentStatus = Object.entries(perpetulStatus ?? {}).reduce((prev, [key, components]) => {
        const prevComponent = (prev[key as keyof ComponentStatus] as ComponentStatusValue ?? []);
        return {
            ...prev,
            [key]: {
                ...prevComponent,
                components: [...prevComponent.components, ...(components ?? [])]
            } satisfies ComponentStatusValue
        }
        
    }, baseComponentStatus);

    const statusWithoutConversion: Status = {
        ...es.mapValues(es.omit(componentStatus, ["cooldownReduction", "ultCooldownReduction", "tacticalSkillCooldownReduction", "moveSpeed"]), v => calculateStatusValue(v)),
        cooldownReduction: calculateCooldownValue(componentStatus.cooldownReduction),
        ultCooldownReduction: calculateCooldownValue(componentStatus.ultCooldownReduction),
        tacticalSkillCooldownReduction: calculateCooldownValue(componentStatus.tacticalSkillCooldownReduction),
        moveSpeed: calculateMovementSpeedValue(componentStatus.moveSpeed)
    };


    return {
        ...es.mapValues(es.omit(componentStatus, ["cooldownReduction", "ultCooldownReduction", "tacticalSkillCooldownReduction", "moveSpeed"]), v => calculateStatusValue(v, statusWithoutConversion)),
        cooldownReduction: calculateCooldownValue(componentStatus.cooldownReduction, statusWithoutConversion),
        ultCooldownReduction: calculateCooldownValue(componentStatus.ultCooldownReduction, statusWithoutConversion),
        tacticalSkillCooldownReduction: calculateCooldownValue(componentStatus.tacticalSkillCooldownReduction, statusWithoutConversion),
        moveSpeed: calculateMovementSpeedValue(componentStatus.moveSpeed, statusWithoutConversion)
    };
}