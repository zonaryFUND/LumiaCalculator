import * as React from "react";
import Decimal from "decimal.js";
import { BaseBasicAttackRange, baseStatus as getBaseStatus } from "@app/entity/base-status";
import { EquipmentStatus, PerLevelStatus, WeaponTypeID, equipmentStatus, weaponBaseStatus } from "@app/entity/equipment";
import { mastery } from "@app/entity/mastery";
import useSubjectConfig, { Response as ConfigResponse, SubjectConfig } from "./use-subject-config";
import { Status, StatusOverride, StatusProps, from } from "./status";
import { SubjectStatusOverride } from "components/subjects/status-override";

type Response = ConfigResponse & { status?: Status }

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

export default function(config: SubjectConfig): Status | undefined {
    const { subject, equipment, level, weaponMastery, movementMastery, skillLevels } = config;

    const baseStatus = React.useMemo(() => subject ? getBaseStatus(subject) : null, [subject]);

    const masteryFactor = (() => {
        if (!subject || equipment.weapon == null) return undefined;
        const weaponType = equipmentStatus(equipment.weapon).type;
        return mastery(subject).find(m => m.weapon == weaponType)
    })();

    if (!baseStatus) return undefined;

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
            .add(masteryFactor?.type == "attack_power" ? masteryFactor.value.times(weaponMastery) : 0)
    const baseAdditionalAttackPower = sumDecimalEquipmentStatus("attackPower", inSlot).add(perLevel.attack.times(level));

    const weaponTypeID = equipment.weapon ? equipmentStatus(equipment.weapon).type as WeaponTypeID : null
    const attackSpeed = (() => {        
        const base = baseStatus.attackSpeed.add(weaponTypeID ? weaponBaseStatus(weaponTypeID).attackSpeed : 0);
        const additional = sumDecimalEquipmentStatus("attackSpeed", inSlot).add(masteryFactor ? masteryFactor.attackSpeed.times(weaponMastery) : 0);
        
        return {
            base, additional,
            calculated: base.times(additional.add(100)).dividedBy(100)
        };
    })();

    const basicAttackRange = (() => {
        const weaponRange = new Decimal(weaponTypeID ? weaponBaseStatus(weaponTypeID).range : 0);
        return BaseBasicAttackRange.add(weaponRange).add(maxDecimalEquipmentStatus("attackRange", inSlot));
    })();

    const basicAttackAmp = perLevel.basicAttackAmp.times(level).add(masteryFactor?.type == "basic_attack_amp" ? masteryFactor.value.times(weaponMastery) : 0);
    const baseSkillAmp = perLevel.skillAmp.times(level).add(sumDecimalEquipmentStatus("skillAmplification", inSlot));
    const skillAmpMultiplier = maxDecimalEquipmentStatus("ampRatio", inSlot)
        .add(masteryFactor?.type == "skill_amp" ? masteryFactor.value.times(weaponMastery) : 0).round();

    const cdrMax = maxDecimalEquipmentStatus("cdrCap", inSlot).add(30)
    const cooldownReduction = (() => {
        const sum = sumDecimalEquipmentStatus("cooldownReduction", inSlot);
        return sum.clamp(0, cdrMax);
    })();

    const base: StatusProps = {
        baseMaxHP: baseStatus.maxHP.add(baseStatus.maxHPperLevel.times(level - 1)),
        additionalMaxHP: sumDecimalEquipmentStatus("maxHP", inSlot).add(perLevel.maxHP.times(level)),
        maxSP: baseStatus.maxSP.add(baseStatus.maxSPperLevel.times(level - 1)).add(sumDecimalEquipmentStatus("maxSP", inSlot)),
        hpReg: baseStatus.hpRegeneration.add(baseStatus.hpRegenPerLevel.times(level - 1)).add(sumDecimalEquipmentStatus("hpRegeneration", inSlot)),
        spReg: baseStatus.spRegeneration.add(baseStatus.spRegenPerLevel.times(level - 1)).add(sumDecimalEquipmentStatus("spRegeneration", inSlot)),
    
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
    
        defense: baseStatus.armor.add(baseStatus.armorPerLevel.times(level - 1)).add(sumDecimalEquipmentStatus("defense", inSlot)),
    
        omnisyphon: sumDecimalEquipmentStatus("omnisyphon", inSlot),
        lifeSteal: sumDecimalEquipmentStatus("lifeSteal", inSlot),
       
        armorPenetration: sumDecimalEquipmentStatus("armorPenetration", inSlot),
        armorPenetrationRatio: sumDecimalEquipmentStatus("armorPenetrationRatio", inSlot),

        healPower: sumDecimalEquipmentStatus("healingPower", inSlot),
        tenacity: maxDecimalEquipmentStatus("tenacity", inSlot),
        
        movementSpeed: baseStatus.movementSpeed.add(sumDecimalEquipmentStatus("movementSpeed", inSlot)).add(new Decimal(movementMastery).times(new Decimal(0.005))),
        basicAttackRange,
        visionRange: sumDecimalEquipmentStatus("vision", inSlot).add(8.5)
    }

    const override: StatusOverride | null = React.useMemo(() => {
        if (!subject) return null;
        return SubjectStatusOverride[subject] ? SubjectStatusOverride[subject].default : null
    }, [subject]);

    return override ? from(override(base, config), base) : from(base);
}