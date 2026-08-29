import * as React from "react";
import { DamageTableUnit } from "core/damage-table/unit";
import { SubjectConfig, weaponRangeOf } from "core/subject-dynamic/config";
import TacticalSkillTable from "@app/ingame-params/tactical-skill/damage-table";
import { useIntl } from "react-intl";

export default function useTacticalSkill(config: SubjectConfig): DamageTableUnit[][] {
    const intl = useIntl();
    const range = weaponRangeOf(config);

    return React.useMemo(() => {
        return TacticalSkillTable(intl).map(chunk => 
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
                    }
                }
            })
        )
    }, [range])
}