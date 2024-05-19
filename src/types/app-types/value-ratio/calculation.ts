import { Status } from "app-types/subject-dynamic/status/type";
import Decimal from "decimal.js";
import { Source, ValueRatio } from "./type";
import { SubjectConfig } from "app-types/subject-dynamic/config";

type Response = { 
    static: Decimal
    dynamic?: {[K in keyof ValueRatio]: Decimal}
    dynamicValueOnly: boolean
}

export function calculateValue(ratio: ValueRatio, status: Status, config: SubjectConfig, source: Source, multiplier?: number): Response {
    const values = Object.keys(ratio).reduce((prev: Response, key) => {
        const value = ratio[key as keyof ValueRatio];
        if (value == undefined) return prev;

        const selectedValue: Decimal = (() => {
            if (Array.isArray(value) && source != "item") {
                return new Decimal(value[source.level]);
            } else if (typeof value == "object") {
                return calculateValue(value as ValueRatio, status, config, source).static;
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
                    return prev.static.add(status.maxHP.calculatedValue.percent(selectedValue));
                case "additionalMaxHP":
                    return prev.static.add(status.maxHP.additional?.percent(selectedValue) ?? 0);
                case "maxSP":
                    return prev.static.add(status.maxSP.calculatedValue.percent(selectedValue));
                case "defense":
                    return prev.static.add(status.defense.calculatedValue.percent(selectedValue));
                case "attack":
                    return prev.static.add(status.attackPower.calculatedValue.percent(selectedValue));
                case "additionalAttack":
                    return prev.static.add(status.attackPower.additional?.percent(selectedValue) ?? 0);
                case "basicAttackAmp":
                    return prev.static.addPercent(status.basicAttackAmp.calculatedValue);
                case "criticalChance":
                    return prev.static.addPercent(status.criticalChance.calculatedValue.percent(selectedValue));
                case "additionalAttackSpeed":
                    return prev.static.add(status.attackSpeed.additional?.percent(selectedValue) ?? 0);
                case "amp":
                    return prev.static.add(status.skillAmp.calculatedValue.percent(selectedValue));
                case "stack":
                    return prev.static.add(config.stack);
                case "summonedAttack":
                    return prev.static.add(status.summonedStatus?.attackPower.percent(selectedValue) ?? 0);
                case "max":
                    return prev.static.clamp(0, selectedValue);
                default:
                    return undefined;
            }
        })();

        const dynamicValue = (() => {
            const dynamicValueKeys = ["targetMaxHP", "lostHP", "targetLostHP"];
            if (dynamicValueKeys.includes(key)) {
                return {...prev.dynamic, [key]: selectedValue};
            }
            return prev.dynamic;
        })();

        return { 
            static: staticValue ?? prev.static, 
            dynamic: dynamicValue, 
            dynamicValueOnly: prev.dynamicValueOnly && staticValue == undefined  // If there exists at least one or more staticValue keys, always returns false.
        };
    }, {static: new Decimal(0), dynamic: undefined, dynamicValueOnly: true});

    return {...values, static: multiplier ? values.static.percent(multiplier) : values.static}
}