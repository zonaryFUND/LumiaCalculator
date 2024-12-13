import Constants from "./constants.json";
import { StatusOverrideFunc } from "../type";
import { AddComponent } from "app-types/subject-dynamic/status/value/type";

const f: StatusOverrideFunc = (status, config) => {
    return {
        ...status,
        tenacity: AddComponent(status.tenacity,
            {
                origin: "perpetual_status",
                calculationType: "sum",
                intlID: "T",
                value: {
                    type: "constant",
                    value: Constants.T.tenacity[config.skillLevels.T]
                }
            }
        )
    }
};

export default f;
