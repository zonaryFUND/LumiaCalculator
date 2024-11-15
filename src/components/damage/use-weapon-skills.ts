import { DamageTableUnit } from "app-types/damage-table/unit";
import { equipmentStatus } from "app-types/equipment";
import { WeaponTypeID } from "app-types/equipment/weapon";
import { SubjectConfig } from "app-types/subject-dynamic/config";
import { weaponSkillLevel } from "app-types/subject-dynamic/status/weapon-skill-level";
import { WeaponSkillDamageTable } from "components/subjects/damage-table";
import * as React from "react";
import { useIntl } from "react-intl";

type Response = {
    regular: (DamageTableUnit & {skillLevel: number})[]
    basicAttackTriggered: (DamageTableUnit & {skillLevel: number})[]
}

export default function useWeaponSkill(config: SubjectConfig): Response {
    const intl = useIntl();

    return React.useMemo(() => {
        if (config.equipment.weapon == null) return {regular: [], basicAttackTriggered: []};

        const weaponType = equipmentStatus(config.equipment.weapon).type as WeaponTypeID;
        const skillLevel = weaponSkillLevel(config.weaponMastery);
    
        const generator = WeaponSkillDamageTable[weaponType];
        if (generator == undefined) return {regular: [], basicAttackTriggered: []};

        const units = (generator({intl}))
            .map(unit => ({...unit, skillLevel}));
    
        return {
            regular: units.filter(u => u.triggeredOnBasicAttack != true),
            basicAttackTriggered: units.filter(u => u.triggeredOnBasicAttack)
        }
    }, [config.equipment.weapon, config.weaponMastery]);
}
