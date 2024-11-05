import { DamageTableUnit } from "app-types/damage-table/unit";
import { equipmentStatus } from "app-types/equipment";
import { meleeOrRange, WeaponTypeID } from "app-types/equipment/weapon";
import { SubjectConfig } from "app-types/subject-dynamic/config";
import { ItemSkillDamageTable } from "components/item-skills/item-skill";
import { name as abilityName } from "app-types/equipment/ability";
import { name as equipmentName } from "app-types/equipment";
import * as React from "react";
import { useIntl } from "react-intl";

type Response = {
    basicAttackTriggered: DamageTableUnit[]
    regular: DamageTableUnit[]
}

export default function useItemSkills(config: SubjectConfig): Response {
    const intl = useIntl();

    const range = React.useMemo(() => {
        if (config.equipment.weapon == null) return "melee";
        const weaponType = equipmentStatus(config.equipment.weapon).type as WeaponTypeID;
        return meleeOrRange(weaponType);
    }, [config.equipment.weapon])

    return React.useMemo(() => {
        return Object.values(config.equipment)
            .flatMap(id => {
                if (id == null) return [];
                const abilities = equipmentStatus(id).option ?? [];

                return abilities.flatMap(ability => {
                    const unitsOrGenerator = ItemSkillDamageTable[ability.id];
                    if (unitsOrGenerator == undefined) return [];
                    const entries = typeof unitsOrGenerator == "function" ? unitsOrGenerator(ability.values.dmg) : unitsOrGenerator;
                    return entries.map(entry => {
                        const itemWithSkillName = `${abilityName(ability.id, "jp")}(${equipmentName(id, "jp")})`;
                        const label = entry.labelIntlID ? intl.formatMessage({id: entry.labelIntlID}, {item: itemWithSkillName, value: entry.intlValue}) : itemWithSkillName;
                        const value = "melee" in entry.value ? entry.value[range] : entry.value;
                        return {...entry, label, value}
                    });
                });
            })
            .reduce((prev, entry) => {
                if (entry.triggeredOnBasicAttack) {
                    return {
                        basicAttackTriggered: prev.basicAttackTriggered.concat(entry),
                        regular: prev.regular
                    }
                } else {
                    return {
                        basicAttackTriggered: prev.basicAttackTriggered,
                        regular: prev.regular.concat(entry)   
                    }
                }
            }, {basicAttackTriggered: [] as DamageTableUnit[], regular: [] as DamageTableUnit[]});
    }, [range, config.equipment])
}
