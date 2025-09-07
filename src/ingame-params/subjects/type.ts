import { SubjectConfig } from "app-types/subject-dynamic/config";
import { ComponentStatus, Status, SummonedStatus } from "app-types/subject-dynamic/status/type";
import { SkillTooltipProps } from "@app/ingame-params/skill-tooltip-props";
import { DamageTableUnit } from "app-types/damage-table/unit";
import { UniqueValueStrategy } from "./unique-value-strategy";
import { ValueRatio } from "app-types/value-ratio";
import { IntlShape } from "react-intl";
import { StatusValueComponent } from "app-types/subject-dynamic/status/value-component/component";

export type SubjectDamageTableUnit = Omit<DamageTableUnit, "triggeredOnBasicAttack"> & {
    value: ValueRatio | UniqueValueStrategy
}

export type DamageTableGenerator = (props: {config: SubjectConfig, status: Status, intl: IntlShape}) => DamageTable;

export type BasicAttackElement = SubjectDamageTableUnit | "standard" | "disable-critical"

export type DamageTable = {
    basicAttack: BasicAttackElement[]
    skill: SubjectDamageTableUnit[][]
}

export type SkillListHook = (config: SubjectConfig) => Record<"Q" | "W" | "E" | "R" | "T", number | number[] | {
    maxLevel?: number | "none",
    code: number | number[]
}>;

export type SubjectPerpetualStatus = (config: SubjectConfig, currentHPRatio: number) => Partial<Record<keyof ComponentStatus, StatusValueComponent[]>>

export type SummonedStatusFunc = (masterStatus: Status, config: SubjectConfig) => SummonedStatus;
export type SummonInfo = {
    status: SummonedStatusFunc,
    nameIntlID: string
}

export type SubjectGaugeInfo = {
    nameIntlID: string
    threshold: number
}

export type SubjectStackInfo = {
    nameIntlID: string
    max: number
}

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
}

export function defineSubject(module: SubjectModules): SubjectModules { return module };