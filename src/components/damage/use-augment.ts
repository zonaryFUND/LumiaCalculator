import { DamageTableUnit } from "app-types/damage-table/unit";
import { SubjectConfig, weaponRangeOf } from "app-types/subject-dynamic/config";
import { useIntl } from "react-intl";
import { AugmentTableValues } from "@app/ingame-params/augment/table-value";
import { ValueRatio } from "app-types/value-ratio";
import { UniqueValueStrategy } from "@app/ingame-params/subjects/unique-value-strategy";

type Unit = Omit<DamageTableUnit, "value"> & {
    value: ValueRatio | UniqueValueStrategy
}

export default function useAugment(config: SubjectConfig): Unit[][] {
    const intl = useIntl();
    const range = weaponRangeOf(config);

    return AugmentTableValues(intl, config).map(chunk => 
        chunk.map(unit => {
            if ("melee" in unit.value) {
                return {
                    ...unit,
                    origin: "other",
                    value: unit.value[range]
                }
            } else {
                return {
                    ...unit,
                    origin: "other",
                    value: unit.value
                };
            }
        })
    )
}