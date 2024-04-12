import { StatusProps } from "components/subject/status";
import Constants from "./constants.json";
import Decimal from "decimal.js";

export default function(status: StatusProps): StatusProps {
    return {
        ...status,
        attackSpeed: {
            ...status.attackSpeed,
            calculated: new Decimal(Constants.common.attackSpeed)
        }
    }
}