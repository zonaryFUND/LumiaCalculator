import { SubjectConfig } from "core/subject-dynamic/config"
import { RangeDependentValueRatio, TooltipValues } from "../skill-tooltip-props"
import { ComponentStatus, Status } from "core/subject-dynamic/status/type"
import { ValueRatio } from "core/value-ratio"
import { DamageTableUnit } from "core/damage-table/unit"
import { StatusValueComponent } from "core/subject-dynamic/status/value-component/component"
import { BuffDebuffDefinition, SlowSourceInfo } from "@app/ingame-params/buff-debuff/type"
import { Tier } from "core/equipment"

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

export type EquipmentAbilityTooltipValues = (props: { showEquation: boolean, config: SubjectConfig, status: Status, itemGrade: Tier } & EquipmentAbilityImportedProps) => TooltipValues


export type EquipmentAbilityModule = {
    code: number | number[]
    damageTable?: EquipmentAbilityDamageTableUnit[] | EquipmentAbilityDamageTableGenerator
    perpetualStatus?: EquipmentAbilityPerpetualStatus

    /**
     * 装備アビリティによって得られる自己バフの定義。実験体固有スキルの`SubjectModules.buffDebuff`と同様、
     * 装備の効果内容が実験体のconfig（レベル等）・計算済みのStatus（例: スキル増幅の値に応じて変化する
     * 効果量）に依存しうるため、`config`/`status`を受け取る。`EquipmentAbilityImportedProps`
     * （`damageTable`/`tooltipValues`と同じ、装備アイテム側から注入される`dmg`/`values`）も受け取れる。
     * 同一skillCodeを複数アイテムが共有していても、アイテムごとに異なる効果量を持つ場合（例: 装備ごとに
     * 固有の移動速度上昇量を持つ「疾風の足取り」）はこれで表現する。この関数自体はどのアイテムから
     * 呼ばれたか一切知らない（呼び出し側が注入する）。`EquipmentAbilityTooltipValues`と同じ
     * オブジェクト引数スタイル
     */
    buffDebuff?: EquipmentAbilitySelfBuffDebuff

    /**
     * 装備アビリティが他者（敵または味方。例: `encourage`は自分以外の味方が対象）に与えるバフ・デバフの
     * 定義。`SubjectModules.givenBuffDebuff`と異なり、
     * 装備アビリティは同一skillCodeを複数アイテムが共有しうる・かつアイテムごとに内容が異なりうるため、
     * `buffDebuff`と同様`EquipmentAbilityImportedProps`を受け取る関数として定義する（configは引数に含めない。
     * 受信側の計算機は発生源のconfigを保持していないため）。返すRecordのキーはこのアビリティ内でのみ
     * 一意であればよい「ローカルid」（グローバルな一意性は呼び出し側がアイテムIDで名前空間を付与して担保する）
     */
    givenBuffDebuff?: EquipmentAbilityGivenBuffDebuff

    /**
     * この装備アビリティが持つ移動速度減少（スロウ）効果の一覧。移動速度減少自体は`givenBuffDebuff`に
     * 個別登録せず、汎用デバフ（`ingame-params/buff-debuff/generic-slow.ts`）1本にまとめる方針のため、
     * ここには「辞書」表示専用の参照データとして宣言する（`ingame-params/README.md`参照）
     */
    slowSources?: SlowSourceInfo[]

    tooltipValues: EquipmentAbilityTooltipValues
}

export const defineEquipmentAbility = (module: EquipmentAbilityModule) => { return module }

export type EquipmentAbilityPerpetualStatus = (config: SubjectConfig, currentHPRatio: number) => Partial<Record<keyof ComponentStatus, StatusValueComponent[]>>

export type EquipmentAbilitySelfBuffDebuff = (props: { config: SubjectConfig, status: Status } & EquipmentAbilityImportedProps) => Record<string, BuffDebuffDefinition>

export type EquipmentAbilityGivenBuffDebuff = (props: EquipmentAbilityImportedProps) => Record<string, BuffDebuffDefinition>
