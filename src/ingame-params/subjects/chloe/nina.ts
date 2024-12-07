import { SummonedStatusFunc } from "../type";
import Constants from "./constants.json";
import Decimal from "decimal.js";

const f: SummonedStatusFunc = (chloeStatus, config) => {
    const chloeRatio = Constants.T.base_chloe_status_ratio + Constants.T.per_level_chloe_status_ratio * config.level;
    const chloeTLevel = config.skillLevels.T;

    const tMaxHP = Constants.T.nina_maxhp[chloeTLevel];
    const tAttack = Constants.T.nina_attack[chloeTLevel];
    const tDefense = Constants.T.nina_defense[chloeTLevel];

    return {
        maxHP: chloeStatus.maxHp.calculatedValue.percent(chloeRatio).add(tMaxHP),
        attackPower: chloeStatus.attackPower.calculatedValue.percent(chloeRatio).add(tAttack).add(Constants.nina.base_attack),
        defense: chloeStatus.defense.calculatedValue.percent(chloeRatio).add(tDefense).add(Constants.nina.base_defense),
        attackSpeed: new Decimal(Constants.nina.attack_speed),
        criticalChance: chloeStatus.criticalStrikeChance.calculatedValue.percent(chloeRatio),
        skillAmp: chloeStatus.skillAmp.calculatedValue.percent(chloeRatio),
        armorPenetration: chloeStatus.penetrationDefense.calculatedValue.percent(chloeRatio),
        armorPenetrationRatio: chloeStatus.penetrationDefenseRatio.calculatedValue.percent(chloeRatio)
    }
}

export default f;

export const nameIntlID = "SummonData/Name/1191"