import { TooltipValue } from "@app/ingame-params/skill-tooltip-props";
import { SubjectConfig, weaponRangeOf } from "core/subject-dynamic/config";
import { Status } from "core/subject-dynamic/status/type";
import { calculateValue, extractSkillLevel, ValueOrigin } from "core/value-ratio";
import { IntlShape } from "react-intl";

export function ExtractAndCalculateValue(
    value: TooltipValue,
    intl: IntlShape,
    config: SubjectConfig,
    status: Status,
    origin: ValueOrigin
): string | number {
    if (typeof value == "object" && "value" in value) {
        return value.expression(ExtractAndCalculateValue(value.value, intl, config, status, origin).toString());
    }

    if (Array.isArray(value)) {
        const skillLevel = extractSkillLevel(config, origin);
        if (skillLevel == undefined) {
            throw new Error("skill level dependent value is defined on a context without it.");
        }
        return value[skillLevel];
    } else if (typeof value == "object") {
        if ("intlID" in value) {
            const replacedValues = value.values
            return Object.entries(replacedValues ?? {}).reduce((prev, [key, value]) => {
                const extractedValue = ExtractAndCalculateValue(value, intl, config, status, origin);
                return prev.replace(`{${key}}`, extractedValue.toString());
            }, intl.formatMessage({id: value.intlID}));
        } else {
            const range = weaponRangeOf(config);
            const rangeDependent = "melee" in value ? value[range] : value;
            return calculateValue(rangeDependent, status, config, origin).static.floor().toString();
        }
    } else {
        return value;
    }
}