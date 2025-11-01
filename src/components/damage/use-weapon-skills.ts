import { DamageTableUnit } from "app-types/damage-table/unit";
import { EquipmentStatusDictionary } from "app-types/equipment";
import { WeaponTypeID } from "app-types/equipment/weapon";
import { SubjectConfig } from "app-types/subject-dynamic/config";
import { WeaponSkillDamageTableDictionary } from "@app/ingame-params/weapon-skills/dictionary";
import * as React from "react";
import { useIntl } from "react-intl";
import { SubjectDamageTableDictionary, SubjectSkillListExpressionDictionary } from "@app/ingame-params/subjects/dictionary";
import { Status } from "app-types/subject-dynamic/status/type";

type Response = {
    regular: DamageTableUnit[]
    basicAttackTriggered: DamageTableUnit[]
}

export default function useWeaponSkill(config: SubjectConfig, status: Status): Response {
    const intl = useIntl();

    return React.useMemo(() => {
        const subjectD = SubjectSkillListExpressionDictionary[config.subject](config).D;
        if (subjectD != undefined) {
            const table = SubjectDamageTableDictionary[config.subject]({config, status, intl});
            return {
                regular: table.weaponSkill!.filter(u => u.triggeredOnBasicAttack != true),
                basicAttackTriggered: table.weaponSkill!.filter(u => u.triggeredOnBasicAttack != true)
            }
        }

        if (config.equipment.Weapon == null) return {regular: [], basicAttackTriggered: []};

        const weaponType = EquipmentStatusDictionary[config.equipment.Weapon].type as WeaponTypeID;
    
        const generator = WeaponSkillDamageTableDictionary[weaponType];
        if (generator == undefined) return {regular: [], basicAttackTriggered: []};

        const units: DamageTableUnit[] = (generator({intl}))
            .map(unit => ({...unit, origin: "D" }));
    
        return {
            regular: units.filter(u => u.triggeredOnBasicAttack != true),
            basicAttackTriggered: units.filter(u => u.triggeredOnBasicAttack)
        }
    }, [config.equipment.Weapon, config.weaponMastery]);
}
