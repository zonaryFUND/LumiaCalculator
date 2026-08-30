import { SubjectConfig } from "core/subject-dynamic/config"
import { RangeDependentValueRatio, TooltipValues } from "../skill-tooltip-props"
import { ComponentStatus, Status } from "core/subject-dynamic/status/type"
import { ValueRatio } from "core/value-ratio"
import { DamageTableUnit } from "core/damage-table/unit"
import { StatusValueComponent } from "core/subject-dynamic/status/value-component/component"
import { BuffDebuffDefinition } from "@app/ingame-params/buff-debuff/type"

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

    /**
     * 装備アビリティによって得られる自己バフの定義。実験体固有スキルの`SubjectModules.buffDebuff`と同様、
     * 装備の効果内容が実験体のconfig（レベル等）に依存しうるため、configを引数に取る関数として定義する
     */
    buffDebuff?: EquipmentAbilitySelfBuffDebuff

    /**
     * 装備アビリティが他者（敵）に与えるバフ・デバフの定義。`SubjectModules.givenBuffDebuff`と同様、
     * 受信側の計算機は発生源のconfigを保持していないため、configを引数に取らない定数カタログとして定義する
     */
    givenBuffDebuff?: Record<string, BuffDebuffDefinition>

    tooltipValues: EquipmentAbilityTooltipValues
}

export const defineEquipmentAbility = (module: EquipmentAbilityModule) => { return module }

export type EquipmentAbilityPerpetualStatus = (config: SubjectConfig, currentHPRatio: number) => Partial<Record<keyof ComponentStatus, StatusValueComponent[]>>

export type EquipmentAbilitySelfBuffDebuff = (config: SubjectConfig) => Record<string, BuffDebuffDefinition>
