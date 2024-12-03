import { SubjectConfig } from "app-types/subject-dynamic/config"
import { RangeDependentValueRatio, TooltipValues } from "../skill-tooltip-props"
import { Status } from "app-types/subject-dynamic/status/type"
import { ValueRatio } from "app-types/value-ratio"
import { DamageTableUnit } from "app-types/damage-table/unit"

type EquipmentAbilityImportedProps = {
    importedDamage?: ValueRatio | RangeDependentValueRatio
    importedValues?: Record<string, any>
}

export type EquipmentAbilityDamageTableUnit = Omit<DamageTableUnit, "label" | "value"> & { 
    labelIntlID?: string 
    intlValue?: string
    value: ValueRatio | RangeDependentValueRatio 
};

export type EquipmentAbilityDamageTableGenerator = (props: EquipmentAbilityImportedProps) => EquipmentAbilityDamageTableUnit[]

export type EquipmentAbilityTooltipValues = (props: { showEquation: boolean, config: SubjectConfig, status: Status } & EquipmentAbilityImportedProps) => TooltipValues


export type EquipmentAbilityModule = {
    code: number | number[]
    damageTable?: EquipmentAbilityDamageTableUnit[] | EquipmentAbilityDamageTableGenerator
    tooltipValues: EquipmentAbilityTooltipValues
}

export const defineEquipmentAbility = (module: EquipmentAbilityModule) => { return module }