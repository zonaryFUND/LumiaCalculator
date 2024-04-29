import * as React from "react";
import Decimal from "decimal.js";
import { baseStatus as getBaseStatus } from "@app/entity/base-status";
import { EquipmentStatus, PerLevelStatus, WeaponTypeID, equipmentStatus, weaponBaseStatus } from "@app/entity/equipment";
import { mastery } from "@app/entity/mastery";
import { SubjectConfig } from "./use-subject-config";
import { Status, StatusOverride, StatusProps, from } from "./status";
import { SubjectStatusOverride } from "components/subjects/status-override";
import { BaseBasicAttackRange, BaseCooldownCap, BaseVision, BasicAttackReductionPerMastery, SkillReductionPerMastery } from "./standard-values";

export type DisplayedValues = {
    base: {
        level1: Decimal
        perLevel?: Decimal
    }
    additional: {
        constant?: Decimal
        perLevel?: Decimal
        ratio?: Decimal
    }
}

export type MasteryValues = {
    perMastery?: Decimal
}

type DisplayedStatusValues = {
    effectiveHP: Decimal
    summonedEffectiveHP?: Decimal
    maxHP: DisplayedValues
    hpReg: DisplayedValues
    defense: DisplayedValues
    additionalSkillDamageReduction: Decimal
    maxSP: DisplayedValues
    spReg: DisplayedValues
    
    attackPower: DisplayedValues & MasteryValues
    basicAttackAmp: {
        perLevel?: Decimal
    } & MasteryValues

    attackSpeed: {
        subject: Decimal,
        weapon: Decimal,
        perMastery: Decimal,
        additional: Decimal
    }

    skillAmp: {
        equipmentRatio: Decimal
        perMastery?: Decimal
    }

    movementSpeed: {
        base: Decimal
        additional: Decimal
    }

    additionalVision: Decimal

    basicAttackRange: {
        weapon: Decimal
        additional: Decimal
    }
}

function sumDecimalEquipmentStatus(key: string, status: EquipmentStatus[]): Decimal {
    return status
        .map(s => (s as {[id: string]: any})[key])
        .filter(v => v != undefined)
        .map(v => v as Decimal)
        .reduce((prev, current) => prev.add(current), new Decimal(0))
}

function maxDecimalEquipmentStatus(key: string, status: EquipmentStatus[]): Decimal {
    return Decimal.max(
        ...status
            .map(s => (s as {[id: string]: any})[key] as Decimal)
            .filter(v => v != undefined)
            .map(v => v!), 
        0
    );
}

export default function(config: SubjectConfig): [Status, DisplayedStatusValues] {
    const { subject, equipment, level, weaponMastery, movementMastery, skillLevels } = config;

    const baseStatus = React.useMemo(() => getBaseStatus(subject), [subject]);

    const masteryFactor = (() => {
        if (!subject || equipment.weapon == null) return undefined;
        const weaponType = equipmentStatus(equipment.weapon).type;
        return mastery(subject).find(m => m.weapon == weaponType)
    })();

    const inSlot = Object.values(equipment).filter(v => v != null).map(id => equipmentStatus(id!));
    const perLevel = (() => {
        const perLevel = inSlot.map(s => (s as {[id: string]: any})["perLevelStatus"] as PerLevelStatus).filter(v => v != undefined);
        function sum(key: string): Decimal {
            return perLevel.filter(s => s.type == key).reduce((prev, current) => prev.add(current.value), new Decimal(0));
        }
        return {
            maxHP: sum("max_hp"),
            attack: sum("attack_power"),
            basicAttackAmp: sum("aa_amp"),
            skillAmp: sum("skill_amp"),
        }
    })();

    const baseAttackPower = baseStatus.attackPower.add(baseStatus.apPerLevel.times(level - 1))
            .add(masteryFactor?.type == "attack_power" ? masteryFactor.value.times(weaponMastery) : 0).floor()
    const additionalConstantAttackPower = sumDecimalEquipmentStatus("attackPower", inSlot);
    const baseAdditionalAttackPower = additionalConstantAttackPower.add(perLevel.attack.times(level));

    const weaponTypeID = equipment.weapon ? equipmentStatus(equipment.weapon).type as WeaponTypeID : null
    const [attackSpeed, displayedAttackSpeed] = (() => {        
        const weapon = weaponTypeID ? weaponBaseStatus(weaponTypeID).attackSpeed : 0;
        const base = baseStatus.attackSpeed.add(weapon).floor2();
        const perMastery = masteryFactor ? masteryFactor.attackSpeed.times(weaponMastery) : 0;
        const multiplier = sumDecimalEquipmentStatus("attackSpeed", inSlot).add(perMastery);
        return [
            {
                base:  base, 
                multiplier,
                calculated: base.addPercent(multiplier).round2()
            },
            {
                subject: baseStatus.attackSpeed,
                weapon: new Decimal(weapon),
                perMastery: new Decimal(perMastery),
                additional: sumDecimalEquipmentStatus("attackSpeed", inSlot)
            }
        ];
    })();

    const basicAttackRange = (() => {
        const weaponRange = new Decimal(weaponTypeID ? weaponBaseStatus(weaponTypeID).range : 0);
        return BaseBasicAttackRange.add(weaponRange).add(maxDecimalEquipmentStatus("attackRange", inSlot));
    })();

    const basicAttackAmp = perLevel.basicAttackAmp.times(level).add(masteryFactor?.type == "basic_attack_amp" ? masteryFactor.value.times(weaponMastery) : 0);
    const baseSkillAmp = perLevel.skillAmp.times(level).add(sumDecimalEquipmentStatus("skillAmplification", inSlot));
    const equipmentRatio = maxDecimalEquipmentStatus("ampRatio", inSlot);
    const skillAmpMultiplier = equipmentRatio
        .add(masteryFactor?.type == "skill_amp" ? masteryFactor.value.times(weaponMastery) : 0).round();

    const cdrMax = maxDecimalEquipmentStatus("cdrCap", inSlot).add(BaseCooldownCap)
    const cooldownReduction = (() => {
        const sum = sumDecimalEquipmentStatus("cooldownReduction", inSlot);
        return sum.clamp(0, cdrMax);
    })();

    const additionalConstMaxHP = sumDecimalEquipmentStatus("maxHP", inSlot);
    const additionalHPReg = sumDecimalEquipmentStatus("hpRegeneration", inSlot);
    const additionalDefense = sumDecimalEquipmentStatus("defense", inSlot);
    const additionalSkillDamageReduction = sumDecimalEquipmentStatus("skillDamageReduction", inSlot);
    const additionalMaxSP = sumDecimalEquipmentStatus("maxSP", inSlot);
    const additionalSPReg = sumDecimalEquipmentStatus("spRegeneration", inSlot);
    const additionalMovementSpeed = sumDecimalEquipmentStatus("movementSpeed", inSlot);
    const additionalVision = sumDecimalEquipmentStatus("vision", inSlot);
    const additionalRange = maxDecimalEquipmentStatus("attackRange", inSlot);

    const base: StatusProps = {
        baseMaxHP: baseStatus.maxHP.add(baseStatus.maxHPperLevel.times(level - 1)),
        additionalMaxHP: additionalConstMaxHP.add(perLevel.maxHP.times(level)),
        maxSP: baseStatus.maxSP.add(baseStatus.maxSPperLevel.times(level - 1)).add(additionalMaxSP),
        hpReg: baseStatus.hpRegeneration.add(baseStatus.hpRegenPerLevel.times(level - 1)).round2().addPercent(additionalHPReg),
        spReg: baseStatus.spRegeneration.add(baseStatus.spRegenPerLevel.times(level - 1)).addPercent(additionalSPReg),
    
        baseAttackPower,
        baseAdditionalAttackPower,
        attackSpeed,
        criticalChance: sumDecimalEquipmentStatus("criticalChance", inSlot).clamp(0, 100),
        criticalDamage: sumDecimalEquipmentStatus("criticalDamage", inSlot),
        basicAttackAmp,        

        baseSkillAmp,
        skillAmpMultiplier,

        adaptiveStatus: sumDecimalEquipmentStatus("adaptiveStatus", inSlot),

        cdrMax,
        cooldownReduction,
    
        defense: baseStatus.armor.add(baseStatus.armorPerLevel.times(level - 1)).add(additionalDefense).floor(),
        basicAttackReduction: new Decimal(BasicAttackReductionPerMastery).times(config.defenseMastery),
        skillReduction: new Decimal(SkillReductionPerMastery).times(config.defenseMastery).add(additionalSkillDamageReduction),
    
        omnisyphon: sumDecimalEquipmentStatus("omnisyphon", inSlot),
        lifeSteal: sumDecimalEquipmentStatus("lifeSteal", inSlot),
       
        armorPenetration: sumDecimalEquipmentStatus("armorPenetration", inSlot),
        armorPenetrationRatio: sumDecimalEquipmentStatus("armorPenetrationRatio", inSlot),

        healPower: sumDecimalEquipmentStatus("healingPower", inSlot),
        tenacity: maxDecimalEquipmentStatus("tenacity", inSlot),
        
        movementSpeed: baseStatus.movementSpeed.add(additionalMovementSpeed).add(new Decimal(movementMastery).times(new Decimal(5).dividedBy(1000))).floor2(),
        basicAttackRange,
        visionRange: additionalVision.add(BaseVision)
    }

    const override: StatusOverride | null = (() => {
        if (!subject) return null;
        return SubjectStatusOverride[subject] ? SubjectStatusOverride[subject].default : null
    })();

    const calculated = override ? from(override(base, config), config, base) : from(base, config);

    const displayed: DisplayedStatusValues = {
        effectiveHP: calculated.maxHP.times(calculated.defense.add(100).dividedBy(100)),
        summonedEffectiveHP: calculated.summonedStatus ? calculated.summonedStatus.maxHP.times(calculated.summonedStatus.defense.add(100).dividedBy(100)) : undefined,
        maxHP: {
            base: { level1: baseStatus.maxHP, perLevel: baseStatus.maxHPperLevel },
            additional: { constant: additionalConstMaxHP, perLevel: perLevel.maxHP }
        },
        hpReg: {
            base: { level1: baseStatus.hpRegeneration, perLevel: baseStatus.hpRegenPerLevel },
            additional: { ratio: additionalHPReg }
        },
        defense: {
            base: { level1: baseStatus.armor, perLevel: baseStatus.armorPerLevel },
            additional: { constant: additionalDefense }
        },
        additionalSkillDamageReduction,
        maxSP: {
            base: { level1: baseStatus.maxSP, perLevel: baseStatus.maxSPperLevel },
            additional: { constant: additionalMaxSP }
        },
        spReg: {
            base: { level1: baseStatus.spRegeneration, perLevel: baseStatus.spRegenPerLevel },
            additional: { ratio: additionalSPReg }
        },
        attackPower: {
            base: { level1: baseStatus.attackPower, perLevel: baseStatus.apPerLevel },
            additional: { constant: additionalConstantAttackPower, perLevel: perLevel.attack },
            perMastery: masteryFactor?.type == "attack_power" ? masteryFactor.value : undefined
        },
        basicAttackAmp: {
            perLevel: perLevel.basicAttackAmp,
            perMastery: masteryFactor?.type == "basic_attack_amp" ? masteryFactor.value : undefined
        },
        attackSpeed: displayedAttackSpeed,
        skillAmp: {
            equipmentRatio,
            perMastery: masteryFactor?.type == "skill_amp" ? masteryFactor.value : undefined
        },
        movementSpeed: {
            base: baseStatus.movementSpeed,
            additional: additionalMovementSpeed
        },
        additionalVision,
        basicAttackRange: {
            weapon: new Decimal(weaponTypeID ? weaponBaseStatus(weaponTypeID).range : 0),
            additional: additionalRange
        }
    }

    return [
        calculated,
        displayed
    ];
}
