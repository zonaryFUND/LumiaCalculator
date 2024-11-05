import * as React from "react";
import { DamageTableUnit } from "app-types/damage-table/unit";
import { SubjectConfig } from "app-types/subject-dynamic/config";
import TacticalSkillTable from "components/tactical-skill/damage-table";
import { useIntl } from "react-intl";
import { equipmentStatus } from "app-types/equipment";
import { meleeOrRange, WeaponTypeID } from "app-types/equipment/weapon";

export default function useTacticalSkill(config: SubjectConfig): (DamageTableUnit & {skillLevel: number})[][] {
    const intl = useIntl();

    const range = React.useMemo(() => {
        if (config.equipment.weapon == null) return "melee";
        const weaponType = equipmentStatus(config.equipment.weapon).type as WeaponTypeID;
        return meleeOrRange(weaponType);
    }, [config.equipment.weapon])

    return React.useMemo(() => {
        return TacticalSkillTable(intl).map(chunk => 
            chunk.map(unit => {
                if ("melee" in unit.value) {
                    return {
                        ...unit,
                        skillLevel: unit.skillLevel - 1,
                        value: unit.value[range]
                    } 
                } else {
                    return {
                        ...unit,
                        skillLevel: unit.skillLevel - 1,
                        value: unit.value
                    }
                }
            })
        )
    }, [range])
}