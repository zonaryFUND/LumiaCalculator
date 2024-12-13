import Constants from "./constants.json";
import { StatusOverrideFunc } from "../type";
import Decimal from "decimal.js";
import { AddComponent } from "app-types/subject-dynamic/status/value/type";

const f: StatusOverrideFunc = (status, config) => {
    const value = new Decimal(Constants.T.reduction.base[config.skillLevels.T])
        .add(status.skillAmp.calculatedValue.percent(Constants.T.reduction.amp))
        .add(status.maxHp.calculatedValue.percent(Constants.T.reduction.maxHP))
        .floor();

    return {
        ...status,
        preventBasicAttackDamaged: AddComponent(status.preventBasicAttackDamaged,
            {
                origin: "perpetual_status",
                calculationType: "sum",
                intlID: "subject.garnet.passive-damage-reduction",
                value: {
                    type: "constant",
                    value
                }
            }
        )
    }
};

export default f;
