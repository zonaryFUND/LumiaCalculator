import { EquipmentAbilityDamageTableGenerator, EquipmentAbilityModule, EquipmentAbilityPerpetualStatus, EquipmentAbilitySelfBuffDebuff, EquipmentAbilityTooltipValues } from "./type";
import { BuffDebuffDefinition } from "@app/ingame-params/buff-debuff/type";

export const modules = import.meta.glob<{ default: EquipmentAbilityModule }>("./**/index.ts", {eager: true})

export const [
    EquipmentAbilityTooltipDictionary,
    EquipmentAbilityDamageTable,
    EquipmentAbilityPerpetualStatusDictionary,
    EquipmentAbilityBuffDebuffDictionary,
    EquipmentAbilityIncomingBuffDebuffCatalog
] = Object.entries(modules).reduce(([tooltips, damageTables, perpetuals, buffDebuff, incomingCatalog], [path, m]) => {
    if (m.default == undefined || m.default.code == undefined) return [tooltips, damageTables, perpetuals, buffDebuff, incomingCatalog];
    const codes = Array.isArray(m.default.code) ? m.default.code : [m.default.code];
    return codes.reduce(([tooltips, damageTables, perpetuals, buffDebuff, incomingCatalog], code) => {
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
            },
            {
                ...buffDebuff,
                ...(
                    m.default.buffDebuff ? { [code]: m.default.buffDebuff} : {}
                )
            },
            {
                ...incomingCatalog,
                ...(m.default.givenBuffDebuff ?? {})
            }
        ]
    }, [tooltips, damageTables, perpetuals, buffDebuff, incomingCatalog]);
}, [
    {} as Record<number, EquipmentAbilityTooltipValues>,
    {} as Record<number, EquipmentAbilityDamageTableGenerator>,
    {} as Record<number, EquipmentAbilityPerpetualStatus>,
    {} as Record<number, EquipmentAbilitySelfBuffDebuff>,
    {} as Record<string, BuffDebuffDefinition>
])
