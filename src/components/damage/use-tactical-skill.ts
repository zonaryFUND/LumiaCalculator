import * as React from "react";
import { DamageTableUnit } from "app-types/damage-table/unit";
import { SubjectConfig } from "app-types/subject-dynamic/config";
import TacticalSkillTable from "@app/ingame-params/tactical-skill/damage-table";
import { useIntl } from "react-intl";
import weaponRange from "app-types/subject-dynamic/config/weapon-range";

export default function useTacticalSkill(config: SubjectConfig): (DamageTableUnit & {skillLevel: number})[][] {
    const intl = useIntl();
    const range = weaponRange(config);

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