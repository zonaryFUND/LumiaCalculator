import { Status } from "app-types/subject-dynamic/status/type";
import Decimal from "decimal.js";
import { Source, ValueRatio } from "./type";
import { SubjectConfig } from "app-types/subject-dynamic/config";

export function calculateValue(ratio: ValueRatio, status: Status, config: SubjectConfig, source: Source): Decimal {
    return Object.keys(ratio).reduce((prev, key) => {
        const value = ratio[key as keyof ValueRatio];
        if (value == undefined) return prev;

        const selectedValue: Decimal = (() => {
            if (Array.isArray(value) && source != "item") {
                return new Decimal(value[source.level]);
            } else if (typeof value == "object") {
                return calculateValue(value as ValueRatio, status, config, source);
            } else {
                return new Decimal(value);
            }
        })();

        switch (key) {
            case "base":
                return selectedValue;
            case "level":
                return prev.add(selectedValue.times(config.level));
            case "maxHP":
                return prev.add(status.maxHP.calculatedValue.percent(selectedValue));
            case "additionalMaxHP":
                return prev.add(status.maxHP.additional?.percent(selectedValue) ?? 0);
            case "defense":
                return prev.add(status.defense.calculatedValue.percent(selectedValue));
            case "attack":
                return prev.add(status.attackPower.calculatedValue.percent(selectedValue));
            case "additionalAttack":
                return prev.add(status.attackPower.additional?.percent(selectedValue) ?? 0);
            case "basicAttackAmp":
                return prev.addPercent(status.basicAttackAmp.calculatedValue);
            case "criticalChance":
                return prev.addPercent(status.criticalChance.calculatedValue.percent(selectedValue));
            case "additionalAttackSpeed":
                return prev.add(status.attackSpeed.additional?.percent(selectedValue) ?? 0);
            case "amp":
                return prev.add(status.skillAmp.calculatedValue.percent(selectedValue));
            case "stack":
                return prev.add(config.stack);
            case "summonedAttack":
                return prev.add(status.summonedStatus?.attackPower.percent(selectedValue) ?? 0);
            case "max":
                return prev.clamp(0, selectedValue);
        }

        return prev;
    }, new Decimal(0));
}