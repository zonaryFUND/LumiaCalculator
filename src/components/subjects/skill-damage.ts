import { Status } from "components/subject/status";
import { SubjectConfig } from "components/subject/use-subject-config";
import Decimal from "decimal.js";

export default function skillDamage(status: Status, config: SubjectConfig, skill: "Q" | "W" | "E" | "R" | "T", dictionary: any): Decimal {
    
    const skillLevel = config.skillLevels[skill];
    return [
        "base", "perLevel", "attack", "additionalAttack", "basicAttackAmp", 
        "amp", "maxHP", "additionalMaxHP", "criticalChance", "summoned_attack", 
        "stack", "attackSpeed"
    ].reduce((prev, key) => {
        if (dictionary[key] == undefined) return prev;
        const skillValue = new Decimal(Array.isArray(dictionary[key]) ? dictionary[key][skillLevel] : dictionary[key]);

        switch (key) { 
            case "base":
                return skillValue;
            case "perLevel":
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
            case "additionalMaxHP":
                return prev.add(status.additionalMaxHP.percent(skillValue));
            case "criticalChance":
                return prev.addPercent(status.criticalChance.percent(skillValue));
            case "summoned_attack":
                return prev.add(status.summonedStatus!.attackPower.percent(skillValue));
            case "stack":
                return prev.add(config.stack);
            case "attackSpeed":
                return prev.add(status.attackSpeed.multiplier.percent(skillValue));
        }

        return prev;
    }, new Decimal(0));   
}
