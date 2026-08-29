import { SubjectConfig } from "core/subject-dynamic/config";
import { ComponentStatus, Status, SummonedStatus } from "core/subject-dynamic/status/type";
import { SkillTooltipProps } from "@app/ingame-params/skill-tooltip-props";
import { DamageTableUnit } from "core/damage-table/unit";
import { UniqueValueStrategy } from "./unique-value-strategy";
import { ValueRatio } from "core/value-ratio";
import { IntlShape } from "react-intl";
import { StatusValueComponent } from "core/subject-dynamic/status/value-component/component";
import { SelfBuffDefinition } from "@app/ingame-params/buff-debuff/type";

export type SubjectDamageTableUnit = Omit<DamageTableUnit, "triggeredOnBasicAttack"> & {
    value: ValueRatio | UniqueValueStrategy
}

export type DamageTableGenerator = (props: {config: SubjectConfig, status: Status, intl: IntlShape}) => DamageTable;

export type BasicAttackElement = SubjectDamageTableUnit | "standard" | "disable-critical"

export type DamageTable = {
    basicAttack: BasicAttackElement[]
    skill: SubjectDamageTableUnit[][]
    weaponSkill?: DamageTableUnit[]
}

// 実験体の各固有スキルについて、キーに対応するl10nコード、またはその配列、あるいはそれに非標準の最大レベルを追加したもの
export type SkillCodes = number | number[] | { 
    maxLevel?: number | "none",
    code: number | number[]
 }

export type SkillListHook = (config: SubjectConfig) => Record<"Q" | "W" | "E" | "R" | "T", SkillCodes> & {
    D?: SkillCodes
};

export type SubjectPerpetualStatus = (config: SubjectConfig, currentHPRatio: number) => Partial<Record<keyof ComponentStatus, StatusValueComponent[]>>

export type SummonedStatusFunc = (masterStatus: Status, config: SubjectConfig) => SummonedStatus;
export type SummonInfo = {
    status: SummonedStatusFunc,
    nameIntlID: string
}

export type SubjectGaugeInfo = {
    nameIntlID: string
    threshold?: number
    max?: number | { maxHPRatio: number }
    changeColorOnMax: boolean
}

export type SubjectStackInfo = {
    nameIntlID: string
    max: number
}

export type SelfBuffDebuffs = Record<string, SelfBuffDefinition>

/**
 * 実験体固有のスキルによる自己バフの定義を、実験体設定から算出する
 *
 * スキルレベル等によって効果内容（`nameIntlID`・`availableStacks`・`buff`の効果量）が変化しうるため、
 * `SubjectPerpetualStatus`と同様に`SubjectConfig`を受け取る関数として定義する
 */
export type SubjectSelfBuffDebuff = (config: SubjectConfig) => SelfBuffDebuffs

export type SubjectModules = {
    code: number
    damageTable: DamageTableGenerator

    skills: {
        listExpression: SkillListHook // | React.FC<SkillsStandardProps>
        tooltip: Record<number, SkillTooltipProps>
    }

    perpetualStatus?: SubjectPerpetualStatus
    summoned?: SummonInfo[]
    stackInfo?: SubjectStackInfo
    gaugeInfo?: SubjectGaugeInfo

    /**
     * 実験体固有のスキルによって得られる自己バフの定義
     */
    buffDebuff?: SubjectSelfBuffDebuff

    weaponSkillLevelOverride?: (mastery: number) => number
}

export function defineSubject(module: SubjectModules): SubjectModules { return module };