import { Status } from "app-types/subject-dynamic/status/type";
import Decimal from "decimal.js";
import { ValueRatio } from "./type";
import { SubjectConfig } from "app-types/subject-dynamic/config";

type Response = { 
    static: Decimal
    dynamic?: {[K in keyof ValueRatio]: Decimal}
    dynamicValueOnly: boolean
}

export function calculateValue(ratio: ValueRatio, status: Status, config: SubjectConfig, skillLevel?: number): Response {
    const values = Object.keys(ratio).reduce((prev: Response, key) => {
        const value = ratio[key as keyof ValueRatio];
        if (value == undefined) return prev;

        const selectedValue: Decimal = (() => {
            if (Array.isArray(value)) {
                if (skillLevel == undefined) {
                    throw new Error("level-dependent value ratio is calculated without its level")
                }
                return new Decimal(value[skillLevel]);
            } else if (typeof value == "object") {
                return calculateValue(value as ValueRatio, status, config, skillLevel).static;
            } else {
                return new Decimal(value);
            }
        })();

        const staticValue = (() => {
            switch (key) {
                case "base":
                    return selectedValue; 
                case "level":
                    return prev.static.add(selectedValue.times(config.level));
                case "maxHP":
                    return prev.static.add(status.maxHp.calculatedValue.percent(selectedValue));
                case "additionalMaxHP":
                    return prev.static.add(status.maxHp.additionalValue?.percent(selectedValue) ?? 0);
                case "maxSP":
                    return prev.static.add(status.maxSp.calculatedValue.percent(selectedValue));
                case "defense":
                    return prev.static.add(status.defense.calculatedValue.percent(selectedValue));
                case "attack":
                    return prev.static.add(status.attackPower.calculatedValue.percent(selectedValue));
                case "additionalAttack":
                    return prev.static.add(status.attackPower.additionalValue?.percent(selectedValue) ?? 0);
                case "basicAttackAmp":
                    return prev.static.addPercent(status.increaseBasicAttackDamageRatio.calculatedValue);
                case "criticalChance":
                    return prev.static.addPercent(status.criticalStrikeChance.calculatedValue.percent(selectedValue));
                case "additionalAttackSpeed":
                    return prev.static.add(status.attackSpeed.additionalValue?.percent(selectedValue) ?? 0);
                case "amp":
                    return prev.static.add(status.skillAmp.calculatedValue.percent(selectedValue));
                case "stack":
                    return prev.static.add(config.stack);
                case "gauge":
                    return prev.static.add(new Decimal(config.gauge).percent(selectedValue));
                default:
                    return undefined;
            }
        })();



        const dynamicValue = (() => {
            const dynamicValueKeys = ["targetHP", "targetMaxHP", "lostHP", "targetLostHP"];
            if (dynamicValueKeys.includes(key)) {
                return {...(prev.dynamic ?? {}), [key]: selectedValue};
            }
            return prev.dynamic;
        })();        

        return { 
            static: staticValue ?? prev.static, 
            dynamic: dynamicValue, 
            dynamicValueOnly: prev.dynamicValueOnly && staticValue == undefined  // If there exists at least one or more staticValue keys, always returns false.
        };
    }, {static: new Decimal(0), dynamic: undefined, dynamicValueOnly: true});

    return values
}