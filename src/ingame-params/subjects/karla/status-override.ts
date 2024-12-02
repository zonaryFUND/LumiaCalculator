import Constants from "./constants.json";
import Decimal from "decimal.js";
import { StatusOverrideFunc } from "../type";
import { attackSpeedCalc } from "app-types/subject-dynamic/status/attack-speed-calculation";

const f: StatusOverrideFunc = (status, config) => {
    const threshold = new Decimal(Constants.T.max_attack_speed);
    const attackSpeed = attackSpeedCalc(status.attackSpeed, {mastery: config.weaponMastery});
    if (attackSpeed.calculatedValue.greaterThan(threshold)) {
        const excess = attackSpeed.calculatedValue.sub(threshold).abs();
        return {
            ...status,
            attackSpeed: {
                ...status.attackSpeed,
                overrideFix: {
                    nameKey: "subject.karla.passive-attack-speed-max",
                    value: new Decimal(threshold)
                },
                calculatedValue: new Decimal(threshold)
            },
            skillAmp: {
                ...status.skillAmp,
                overrideAdditional: {
                    nameKey: "subject.karla.passive-amp",
                    value: excess.times(Constants.T.amp_conversion).times(100).round()
                }
            }
        }
    } else {
        return {
            ...status,
            attackSpeed
        }
    }
 }

 export default f;
