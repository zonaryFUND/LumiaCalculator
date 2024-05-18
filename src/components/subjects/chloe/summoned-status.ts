import Constants from "./constants.json";
import Decimal from "decimal.js";
import { Language } from "app-types/language";
import { SummonedStatusFunc } from "../summoned-status";

const f: SummonedStatusFunc = (chloeStatus, config) => {
    const chloeRatio = Constants.T.base_chloe_status_ratio + Constants.T.per_level_chloe_status_ratio * config.level;
    const chloeTLevel = config.skillLevels.T;

    const tMaxHP = Constants.T.nina_maxhp[chloeTLevel];
    const tAttack = Constants.T.nina_attack[chloeTLevel];
    const tDefense = Constants.T.nina_defense[chloeTLevel];

    return {
        maxHP: chloeStatus.maxHP.calculatedValue.percent(chloeRatio).add(tMaxHP),
        attackPower: chloeStatus.attackPower.calculatedValue.percent(chloeRatio).add(tAttack).add(Constants.nina.base_attack),
        defense: chloeStatus.defense.calculatedValue.percent(chloeRatio).add(tDefense).add(Constants.nina.base_defense),
        attackSpeed: new Decimal(Constants.nina.attack_speed),
        criticalChance: chloeStatus.criticalChance.calculatedValue.percent(chloeRatio),
        skillAmp: chloeStatus.skillAmp.calculatedValue.percent(chloeRatio),
        armorPenetration: chloeStatus.armorPenetration.calculatedValue.percent(chloeRatio),
        armorPenetrationRatio: chloeStatus.armorPenetrationRatio.calculatedValue.percent(chloeRatio)
    }
}

export default f;

export const nameKey = "summoned.nina";
