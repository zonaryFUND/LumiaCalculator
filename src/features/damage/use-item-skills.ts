import { DamageTableUnit } from "core/damage-table/unit";
import { SubjectConfig, weaponRangeOf } from "core/subject-dynamic/config";
import { EquipmentAbilityDamageTable } from "@app/ingame-params/equipment-abilities/dictionary";
import * as React from "react";
import { useIntl } from "react-intl";
import { EquipmentStatusDictionary } from "core/equipment";
import { ignorePseudoTag } from "@app/util/ignore-pseudo-tag";
import { ValueRatio } from "core/value-ratio";
import { UniqueValueStrategy } from "@app/ingame-params/subjects/unique-value-strategy";

type Unit = Omit<DamageTableUnit, "value"> & {
    value: ValueRatio | UniqueValueStrategy
}

type Response = {
    basicAttackTriggered: DamageTableUnit[]
    regular: Unit[]
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
                            const value = typeof entry.value != "function" && "melee" in entry.value ? entry.value[range] : entry.value;
                            return {...entry, label, value, origin: "other"} satisfies Unit
                        }) ?? [];
                    });
            })
            .reduce((prev, entry) => {
                if (entry.triggeredOnBasicAttack) {
                    const { value } = entry;
                    if (typeof value == "function") {
                        throw new Error(`UniqueValueStrategy is not supported for basic-attack-triggered item skills: ${entry.label}`);
                    }
                    return {
                        basicAttackTriggered: prev.basicAttackTriggered.concat({...entry, value}),
                        regular: prev.regular
                    }
                } else {
                    return {
                        basicAttackTriggered: prev.basicAttackTriggered,
                        regular: prev.regular.concat(entry)   
                    }
                }
            }, {basicAttackTriggered: [] as DamageTableUnit[], regular: [] as Unit[]});
    }, [range, config.equipment])
}
