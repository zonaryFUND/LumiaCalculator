import { SubjectConfig } from "app-types/subject-dynamic/config";
import { Status } from "components/subject/status";
import Decimal from "decimal.js";

export function skillLevel(skill: "Q" | "W" | "E" | "R" | "T" | "D", config: SubjectConfig): number {
    if (skill == "D") {
        return config.weaponMastery < 10 ? 0 :
        config.weaponMastery < 15 ? 1 : 
        2; 
    }

    return config.skillLevels[skill]
}

export function skillDamageSimple(status: Status, config: SubjectConfig, dictionary: any): Decimal {
    return ["base", "level", "attack", "additionalAttack", "basicAttackAmp", "amp", "maxHP", "defense", "additionalMaxHP", "criticalChance", "summoned_attack", "stack", "additionalAttackSpeed", "max"].reduce((prev, key) => {
        if (dictionary[key] == undefined) return prev;
        const skillValue = new Decimal(dictionary[key]);

        switch (key) { 
            case "base":
                return skillValue;
            case "level":
                return prev.add(skillValue.times(config.level));
            case "attack":
                return prev.add(status.attackPower.percent(skillValue));
            case "additionalAttack":
                return prev.add(status.additionalAttackPower.percent(skillValue));
            case "basicAttackAmp":
                return prev.addPercent(status.basicAttackAmp);
            case "amp":
                return prev.add(status.skillAmp.percent(skillValue));
            case "maxHP":
                const maxHP = status.baseMaxHP.add(status.additionalMaxHP);
                return prev.add(maxHP.percent(skillValue));
            case "defense":
                return prev.add(status.defense.percent(skillValue));
            case "additionalMaxHP":
                return prev.add(status.additionalMaxHP.percent(skillValue));
            case "criticalChance":
                return prev.addPercent(status.criticalChance.percent(skillValue));
            case "summoned_attack":
                return prev.add(status.summonedStatus!.attackPower.percent(skillValue));
            case "stack":
                return prev.add(config.stack);
            case "additionalAttackSpeed":
                return prev.add(status.attackSpeed.multiplier.percent(skillValue));
            case "max":
                return prev.clamp(0, skillValue);
        }

        return prev;
    }, new Decimal(0)); 
}

export default function skillDamage(status: Status, config: SubjectConfig, skill: "Q" | "W" | "E" | "R" | "T" | "D" | "item", dictionary: any): Decimal {
    if (skill == "item") {
        return skillDamageSimple(status, config, dictionary);
    } else {
        const level = skillLevel(skill, config)
        const sanitizedDict = Object.fromEntries(
            Object.entries(dictionary).map(([key, value]) => {
                return [key, Array.isArray(value) ? value[level] : value]
            })
        );

        return skillDamageSimple(status, config, sanitizedDict);
    }
}
