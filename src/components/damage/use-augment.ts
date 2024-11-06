import * as React from "react";
import { DamageTableUnit } from "app-types/damage-table/unit";
import { SubjectConfig } from "app-types/subject-dynamic/config";
import { useIntl } from "react-intl";
import { equipmentStatus } from "app-types/equipment";
import { meleeOrRange, WeaponTypeID } from "app-types/equipment/weapon";
import { AugmentTableValues } from "components/augment/table-value";
import { ValueRatio } from "app-types/value-ratio";
import { UniqueValueStrategy } from "components/subjects/unique-value-strategy";

type Unit = Omit<DamageTableUnit, "value"> & {
    value: ValueRatio | UniqueValueStrategy
}

export default function useAugment(config: SubjectConfig): Unit[][] {
    const intl = useIntl();

    const range = React.useMemo(() => {
        if (config.equipment.weapon == null) return "melee";
        const weaponType = equipmentStatus(config.equipment.weapon).type as WeaponTypeID;
        return meleeOrRange(weaponType);
    }, [config.equipment.weapon])

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