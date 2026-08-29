import { SubjectConfig } from "core/subject-dynamic/config"
import { RangeDependentValueRatio, TooltipValues } from "../skill-tooltip-props"
import { ComponentStatus, Status } from "core/subject-dynamic/status/type"
import { ValueRatio } from "core/value-ratio"
import { DamageTableUnit } from "core/damage-table/unit"
import { StatusValueComponent } from "core/subject-dynamic/status/value-component/component"

type EquipmentAbilityImportedProps = {
    importedDamage?: ValueRatio | RangeDependentValueRatio
    importedValues?: Record<string, any>
}

export type EquipmentAbilityDamageTableUnit = Omit<DamageTableUnit, "label" | "value" | "origin"> & { 
    labelIntlID?: string 
    intlValue?: string
    value: ValueRatio | RangeDependentValueRatio 
};

export type EquipmentAbilityDamageTableGenerator = (props: EquipmentAbilityImportedProps) => EquipmentAbilityDamageTableUnit[]

export type EquipmentAbilityTooltipValues = (props: { showEquation: boolean, config: SubjectConfig, status: Status } & EquipmentAbilityImportedProps) => TooltipValues


export type EquipmentAbilityModule = {
    code: number | number[]
    damageTable?: EquipmentAbilityDamageTableUnit[] | EquipmentAbilityDamageTableGenerator
    perpetualStatus?: EquipmentAbilityPerpetualStatus
    tooltipValues: EquipmentAbilityTooltipValues
}

export const defineEquipmentAbility = (module: EquipmentAbilityModule) => { return module }

export type EquipmentAbilityPerpetualStatus = (config: SubjectConfig, currentHPRatio: number) => Partial<Record<keyof ComponentStatus, StatusValueComponent[]>>
