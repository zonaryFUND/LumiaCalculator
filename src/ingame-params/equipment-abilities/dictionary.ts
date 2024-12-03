import { EquipmentAbilityDamageTableGenerator, EquipmentAbilityModule, EquipmentAbilityTooltipValues } from "./type";

export const modules = import.meta.glob<{ default: EquipmentAbilityModule }>("./**/index.ts", {eager: true})

export const [
    EquipmentAbilityTooltipDictionary, 
    EquipmentAbilityDamageTable
] = Object.entries(modules).reduce(([tooltips, damageTables], [path, m]) => {
    if (m.default == undefined || m.default.code == undefined) return [tooltips, damageTables];
    const codes = Array.isArray(m.default.code) ? m.default.code : [m.default.code];
    return codes.reduce(([tooltips, damageTables], code) => {
        const damageTable = m.default.damageTable;
        const generator: EquipmentAbilityDamageTableGenerator | undefined = 
            damageTable == undefined ? undefined :
            typeof damageTable == "function" ? damageTable :
            () => damageTable;

        return [
            {
                ...tooltips,
                [code]: m.default.tooltipValues
            },
            {
                ...damageTables,
                ...(
                    generator ? { [code]: generator} : {}
                )
            }
        ]
    }, [tooltips, damageTables]);
}, [
    {} as Record<number, EquipmentAbilityTooltipValues>,
    {} as Record<number, EquipmentAbilityDamageTableGenerator>
]) 
