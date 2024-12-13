import Constants from "./constants.json";
import { StatusOverrideFunc } from "../type";
import { AddComponent } from "app-types/subject-dynamic/status/value/type";

const f: StatusOverrideFunc = (status, config) => ({
    ...status,
    attackSpeed: AddComponent(status.attackSpeed, {
        origin: "perpetual_status",
        calculationType: "fix",
        intlID: "subject.nathapon.passive-attack-speed",
        value: {
            type: "constant",
            value: Constants.common.attackSpeed
        }
    })
});

export default f;
