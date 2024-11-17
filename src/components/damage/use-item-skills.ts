import { DamageTableUnit } from "app-types/damage-table/unit";
import { SubjectConfig } from "app-types/subject-dynamic/config";
import { ItemSkillDamageTable } from "components/item-skills/item-skill";
import * as React from "react";
import { useIntl } from "react-intl";
import useRange from "app-types/subject-dynamic/config/use-range";
import { EquipmentStatusDictionary } from "app-types/equipment";
import { ignorePseudoTag } from "components/common/ignore-pseudo-tag";

type Response = {
    basicAttackTriggered: DamageTableUnit[]
    regular: DamageTableUnit[]
}

export default function useItemSkills(config: SubjectConfig): Response {
    const intl = useIntl();
    const range = useRange(config);

    return React.useMemo(() => {
        return Object.values(config.equipment)
            .flatMap(id => {
                if (id == null) return [];
                const abilities = EquipmentStatusDictionary[id].skill ?? [];

                return abilities.flatMap(ability => {
                    const unitsOrGenerator = ItemSkillDamageTable[ability.skillCode];
                    if (unitsOrGenerator == undefined) return [];
                    const entries = typeof unitsOrGenerator == "function" ? unitsOrGenerator(ability.dmg, ability.values) : unitsOrGenerator;
                    return entries.map(entry => {
                        const itemWithSkillName = `${ignorePseudoTag(intl.formatMessage({id: `Item/Skills/${ability.skillCode}/Name`}))}(${intl.formatMessage({id: `Item/Name/${id}`})})`;
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
