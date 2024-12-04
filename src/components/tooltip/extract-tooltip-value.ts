import { TooltipValue } from "@app/ingame-params/skill-tooltip-props";
import { SubjectConfig } from "app-types/subject-dynamic/config";
import weaponRange from "app-types/subject-dynamic/config/weapon-range";
import { Status } from "app-types/subject-dynamic/status/type";
import { calculateValue } from "app-types/value-ratio/calculation";
import { IntlShape } from "react-intl";

export function ExtractAndCalculateValue(
    value: TooltipValue,
    intl: IntlShape,
    config: SubjectConfig,
    status: Status,
    skillLevel?: number
): string | number {
    if (typeof value == "object" && "value" in value) {
        return value.expression(ExtractAndCalculateValue(value.value, intl, config, status, skillLevel).toString());
    }

    if (Array.isArray(value)) {
        if (skillLevel == undefined) {
            throw new Error("skill level dependent value is defined on a context without it.");
        }
        return value[skillLevel];
    } else if (typeof value == "object") {
        if ("intlID" in value) {
            const replacedValues = value.values
            return Object.entries(replacedValues ?? {}).reduce((prev, [key, value]) => {
                const extractedValue = ExtractAndCalculateValue(value, intl, config, status, skillLevel);
                return prev.replace(`{${key}}`, extractedValue.toString());
            }, intl.formatMessage({id: value.intlID}));
        } else {
            const range = weaponRange(config);
            const rangeDependent = "melee" in value ? value[range] : value;
            return calculateValue(rangeDependent, status, config, skillLevel).static.floor().toString();
        }
    } else {
        return value;
    }
}