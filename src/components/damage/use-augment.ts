import * as React from "react";
import { DamageTableUnit } from "app-types/damage-table/unit";
import { SubjectConfig } from "app-types/subject-dynamic/config";
import { useIntl } from "react-intl";
import { AugmentTableValues } from "@app/ingame-params/augment/table-value";
import { ValueRatio } from "app-types/value-ratio";
import { UniqueValueStrategy } from "@app/ingame-params/subjects/unique-value-strategy";
import weaponRange from "app-types/subject-dynamic/config/weapon-range";

type Unit = Omit<DamageTableUnit, "value"> & {
    value: ValueRatio | UniqueValueStrategy
}

export default function useAugment(config: SubjectConfig): Unit[][] {
    const intl = useIntl();
    const range = weaponRange(config);

    return React.useMemo(() => {
        return AugmentTableValues(intl).map(chunk => 
            chunk.map(unit => {
                if ("melee" in unit.value) {
                    return {
                        ...unit,
                        value: unit.value[range]
                    }
                } else {
                    return {
                        ...unit,
                        value: unit.value
                    };
                }
            })
        )
    }, [range])
}