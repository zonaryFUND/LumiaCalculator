import Constants from "./constants.json";
import { StatusOverrideFunc } from "../type";
import { AddComponent } from "app-types/subject-dynamic/status/value/type";

const f: StatusOverrideFunc = (status, config) => ({
    ...status,
    attackRange: AddComponent(status.attackRange, {
        origin: "perpetual_status",
        calculationType: "fix",
        intlID: "subject.tsubame.aa-range",
        value: {
            type: "constant",
            value: Constants.T.range
        }
    })
});

export default f;
