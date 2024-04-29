import { Status, StatusProps, SummonedStatus } from "components/subject/status";
import { SubjectConfig } from "components/subject/use-subject-config";
import Constants from "./constants.json";
import Decimal from "decimal.js";
import { Language } from "@app/entity/language";

export default function(chloeStatus: Status, config: SubjectConfig): SummonedStatus {
    const chloeRatio = Constants.T.base_chloe_status_ratio + Constants.T.per_level_chloe_status_ratio * config.level;
    const chloeTLevel = config.skillLevels.T;

    const tMaxHP = Constants.T.nina_maxhp[chloeTLevel];
    const tAttack = Constants.T.nina_attack[chloeTLevel];
    const tDefense = Constants.T.nina_defense[chloeTLevel];

    return {
        maxHP: chloeStatus.maxHP.percent(chloeRatio).add(tMaxHP),
        attackPower: chloeStatus.attackPower.percent(chloeRatio).add(tAttack).add(Constants.nina.base_attack),
        defense: chloeStatus.defense.percent(chloeRatio).add(tDefense).add(Constants.nina.base_defense),
        attackSpeed: new Decimal(Constants.nina.attack_speed),
        criticalChance: chloeStatus.criticalChance.percent(chloeRatio),
        skillAmp: chloeStatus.skillAmp.percent(chloeRatio),
        armorPenetration: chloeStatus.armorPenetration.percent(chloeRatio),
        armorPenetrationRatio: chloeStatus.armorPenetrationRatio.percent(chloeRatio)
    }
}

export function name(language: Language): string {
    switch (language) {
        case "jp":
            return "ニナ";
    }
}