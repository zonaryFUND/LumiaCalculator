import Constants from "./constants.json";
import Decimal from "decimal.js";
import { Language } from "app-types/language";
import { SummonedStatusFunc } from "../summoned-status";

const f: SummonedStatusFunc = (barbaraStatus, config) => ({
    maxHP: new Decimal(Constants.Q.hp.base[config.skillLevels.Q] + config.level * Constants.Q.hp.level),
    attackPower: new Decimal(Constants.sentry_gun.base_attack).add(barbaraStatus.skillAmp.calculatedValue.percent(Constants.T.attack_amp).times(config.level)),
    defense: new Decimal(Constants.sentry_gun.base_defense).add(barbaraStatus.skillAmp.calculatedValue.percent(Constants.T.defense_amp).times(config.level)),
    attackSpeed: new Decimal(Constants.sentry_gun.attack_speed),
    criticalChance: new Decimal(0),
    skillAmp: new Decimal(0),
    armorPenetration: new Decimal(0),
    armorPenetrationRatio: new Decimal(0)
});

export default f;

export const nameKey = "summoned.sentry-gun"