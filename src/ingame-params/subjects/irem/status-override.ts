import { StatusOverrideFunc } from "../type";
import Decimal from "decimal.js";
import Constants from "./constants.json";
import { AddComponent } from "app-types/subject-dynamic/status/value/type";

// NOTE:
// The range of Irem's basic attack is 4.5 in game, but the range of other test subjects with Throw weapons is 5.7.
// There is a contradiction between the indicated value and the description.
// In this application, the description of Irem's R skill is adopted for the calculation.

const f: StatusOverrideFunc = (status, config) => ({
    ...status,
    attackRange: AddComponent(status.attackRange, config.equipment.Weapon == null ? undefined : {
        origin: "perpetual_status",
        calculationType: "sum",
        intlID: "subject.irem.passive-attack-range",
        value: {
            type: "constant",
            value: Constants.IremR.range_penalty * -1
        }
    })
});

export default f;
