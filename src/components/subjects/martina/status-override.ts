import Constants from "./constants.json";
import { StatusOverrideFunc } from "../status-override";
import Decimal from "decimal.js";

const f: StatusOverrideFunc = (status, config) => {
    const ratio = (status.attackSpeed.equipment?.ratio ?? new Decimal(0)).add(status.attackSpeed.perMastery?.ratio?.times(config.weaponMastery) ?? 0);
    const count = ratio.dividedBy(Constants.T.attack_speed_conversion.from).floor();

    return {
        ...status,
        attackPower: {
            ...status.attackPower,
            overrideAdditional: {
                nameKey: "subject.martina.passive-attack",
                ratio: count.times(Constants.T.attack_speed_conversion.to)
            }
        }
    }
}

export default f;
