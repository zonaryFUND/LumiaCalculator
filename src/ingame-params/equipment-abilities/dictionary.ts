import { EquipmentAbilityDamageTableGenerator, EquipmentAbilityModule, EquipmentAbilityPerpetualStatus, EquipmentAbilityTooltipValues } from "./type";

export const modules = import.meta.glob<{ default: EquipmentAbilityModule }>("./**/index.ts", {eager: true})

export const [
    EquipmentAbilityTooltipDictionary, 
    EquipmentAbilityDamageTable,
    EquipmentAbilityPerpetualStatusDictionary
] = Object.entries(modules).reduce(([tooltips, damageTables, perpetuals], [path, m]) => {
    if (m.default == undefined || m.default.code == undefined) return [tooltips, damageTables, perpetuals];
    const codes = Array.isArray(m.default.code) ? m.default.code : [m.default.code];
    return codes.reduce(([tooltips, damageTables, perpetuals], code) => {
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
            },
            {
                ...perpetuals,
                ...(
                    m.default.perpetualStatus ? { [code]: m.default.perpetualStatus} : {}
                )
            }
        ]
    }, [tooltips, damageTables, perpetuals]);
}, [
    {} as Record<number, EquipmentAbilityTooltipValues>,
    {} as Record<number, EquipmentAbilityDamageTableGenerator>,
    {} as Record<number, EquipmentAbilityPerpetualStatus>
]) 
