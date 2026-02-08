import Constants from "./constants";
import Decimal from "decimal.js";
import { SubjectPerpetualStatus } from "../type";

const f: SubjectPerpetualStatus = (config) => ({
    preventBasicAttackDamaged: [
        {
            origin: "perpetual_status",
            calculationType: "sum",
            intlID: "subject.garnet.passive-damage-reduction",
            value: {
                type: "status-conversion",
                func: status => new Decimal(Constants.T.reduction.base[config.skillLevels.T])
                    .add(status.skillAmp.calculatedValue.percent(Constants.T.reduction.amp))
                    .add(status.maxHp.calculatedValue.percent(Constants.T.reduction.maxHP))
                    .floor()
            }
        }
    ]
});

export default f;
