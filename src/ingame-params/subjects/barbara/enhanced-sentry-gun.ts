import { SummonedStatusFunc } from "../type";
import Constants from "./constants.json";
import Decimal from "decimal.js";

const f: SummonedStatusFunc = (barbaraStatus, config) => ({
    maxHP: new Decimal(Constants.R.Q.hp.base + config.level * Constants.R.Q.hp.level),
    attackPower: new Decimal(Constants.R.Q.damage.base[config.skillLevels.R]).add(barbaraStatus.skillAmp.calculatedValue.percent(Constants.R.Q.damage.amp).floor()),
    defense: new Decimal(Constants.R.Q.sentry_defence),
    attackSpeed: new Decimal(Constants.Q.sentry_attack_speed + Constants.R.Q.attack_speed),
    criticalChance: new Decimal(0),
    skillAmp: new Decimal(0),
    armorPenetration: new Decimal(0),
    armorPenetrationRatio: new Decimal(0)
});

export default f;

export const nameIntlID = "SummonData/Name/1101"