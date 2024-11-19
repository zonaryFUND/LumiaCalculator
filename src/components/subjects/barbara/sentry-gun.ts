import { SummonedStatusFunc } from "../dictionary";
import Constants from "./constants.json";
import Decimal from "decimal.js";

const f: SummonedStatusFunc = (barbaraStatus, config) => ({
    maxHP: new Decimal(Constants.Q.hp.base + config.level * Constants.Q.hp.level),
    attackPower: new Decimal(Constants.Q.damage.base[config.skillLevels.Q]).add(barbaraStatus.skillAmp.calculatedValue.percent(Constants.Q.damage.amp).floor()),
    defense: new Decimal(Constants.Q.sentry_defence),
    attackSpeed: new Decimal(Constants.Q.sentry_attack_speed),
    criticalChance: new Decimal(0),
    skillAmp: new Decimal(0),
    armorPenetration: new Decimal(0),
    armorPenetrationRatio: new Decimal(0)
});

export default f;

export const nameIntlID = "SummonData/Name/1100"