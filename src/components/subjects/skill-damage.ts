import { Status } from "components/subject/status";
import Decimal from "decimal.js";

export default function skillDamage(status: Status, level: number, skillLevel: number, dictionary: any): Decimal {
    return ["base", "perLevel", "attack", "additionalAttack", "amp", "maxHP", "additionalMaxHP"].reduce((prev, key) => {
        if (dictionary[key] == undefined) return prev;
        const skillValue = new Decimal(Array.isArray(dictionary[key]) ? dictionary[key][skillLevel] : dictionary[key]);

        switch (key) { 
            case "base":
                return skillValue;
            case "perLevel":
                return prev.add(skillValue.times(level));
            case "attack":
                return prev.add(status.attackPower.times(skillValue).dividedBy(100));
            case "additionalAttack":
                return prev.add(status.additionalAttackPower.times(skillValue).dividedBy(100));
            case "amp":
                return prev.add(status.skillAmp.times(skillValue).dividedBy(100));
            case "maxHP":
                const maxHP = status.baseMaxHP.add(status.additionalMaxHP);
                return prev.add(maxHP.times(skillValue).dividedBy(100));
            case "additionalMaxHP":
                return prev.add(status.additionalMaxHP.times(skillValue).dividedBy(100));
        }

        return prev;
    }, new Decimal(0));   
}