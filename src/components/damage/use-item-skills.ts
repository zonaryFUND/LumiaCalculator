import { DamageTableUnit } from "app-types/damage-table/unit";
import { SubjectConfig, weaponRangeOf } from "app-types/subject-dynamic/config";
import { EquipmentAbilityDamageTable } from "@app/ingame-params/equipment-abilities/dictionary";
import * as React from "react";
import { useIntl } from "react-intl";
import { EquipmentStatusDictionary } from "app-types/equipment";
import { ignorePseudoTag } from "components/common/ignore-pseudo-tag";
import { Status } from "app-types/subject-dynamic/status/type";

type Response = {
    basicAttackTriggered: DamageTableUnit[]
    regular: DamageTableUnit[]
}

export default function useItemSkills(config: SubjectConfig): Response {
    const intl = useIntl();
    const range = weaponRangeOf(config);

    return React.useMemo(() => {
        const {isChestDavid, ...equipment} = config.equipment;
        return Object.entries(equipment)
            .flatMap(([position, id]) => {
                if (id == null) return [];
                const rawStatus = EquipmentStatusDictionary[id];

                return (rawStatus.skill ?? [])
                    .flatMap(ability => {
                        if (EquipmentAbilityDamageTable[ability.skillCode] == undefined) return [];

                        return EquipmentAbilityDamageTable[ability.skillCode]({
                            importedDamage: ability.dmg,
                            importedValues: ability.values
                        }).map(entry => {
                            const itemWithSkillName = `${ignorePseudoTag(intl.formatMessage({id: `Item/Skills/${ability.skillCode}/Name`}))}(${intl.formatMessage({id: `Item/Name/${id}${position == "Chest" && isChestDavid ? "_D" : ""}`})})`;
                            const label = entry.labelIntlID ? intl.formatMessage({id: entry.labelIntlID}, {item: itemWithSkillName, value: entry.intlValue}) : itemWithSkillName;
                            const value = "melee" in entry.value ? entry.value[range] : entry.value;
                            return {...entry, label, value}
                        }) ?? [];
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
