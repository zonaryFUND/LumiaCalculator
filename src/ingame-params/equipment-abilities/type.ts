import { SubjectConfig } from "core/subject-dynamic/config"
import { RangeDependentValueRatio, TooltipValues } from "../skill-tooltip-props"
import { ComponentStatus, Status } from "core/subject-dynamic/status/type"
import { ValueRatio } from "core/value-ratio"
import { DamageTableUnit } from "core/damage-table/unit"
import { StatusValueComponent } from "core/subject-dynamic/status/value-component/component"
import { BuffDebuffDefinition } from "@app/ingame-params/buff-debuff/type"

export type EquipmentAbilityImportedProps = {
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
     * 装備の効果内容が実験体のconfig（レベル等）に依存しうるため、configを引数に取る関数として定義する。
     * `EquipmentAbilityImportedProps`（`damageTable`/`tooltipValues`と同じ、装備アイテム側から注入される
     * `dmg`/`values`）も受け取れる。同一skillCodeを複数アイテムが共有していても、アイテムごとに異なる
     * 効果量を持つ場合（例: 装備ごとに固有の移動速度上昇量を持つ「疾風の足取り」）はこれで表現する。
     * この関数自体はどのアイテムから呼ばれたか一切知らない（呼び出し側が注入する）
     */
    buffDebuff?: EquipmentAbilitySelfBuffDebuff

    /**
     * 装備アビリティが他者（敵）に与えるバフ・デバフの定義。`SubjectModules.givenBuffDebuff`と異なり、
     * 装備アビリティは同一skillCodeを複数アイテムが共有しうる・かつアイテムごとに内容が異なりうるため、
     * `buffDebuff`と同様`EquipmentAbilityImportedProps`を受け取る関数として定義する（configは引数に含めない。
     * 受信側の計算機は発生源のconfigを保持していないため）。返すRecordのキーはこのアビリティ内でのみ
     * 一意であればよい「ローカルid」（グローバルな一意性は呼び出し側がアイテムIDで名前空間を付与して担保する）
     */
    givenBuffDebuff?: EquipmentAbilityGivenBuffDebuff

    tooltipValues: EquipmentAbilityTooltipValues
}

export const defineEquipmentAbility = (module: EquipmentAbilityModule) => { return module }

export type EquipmentAbilityPerpetualStatus = (config: SubjectConfig, currentHPRatio: number) => Partial<Record<keyof ComponentStatus, StatusValueComponent[]>>

export type EquipmentAbilitySelfBuffDebuff = (config: SubjectConfig, props: EquipmentAbilityImportedProps) => Record<string, BuffDebuffDefinition>

export type EquipmentAbilityGivenBuffDebuff = (props: EquipmentAbilityImportedProps) => Record<string, BuffDebuffDefinition>
