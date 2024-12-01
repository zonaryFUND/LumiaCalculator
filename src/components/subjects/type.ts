import { SubjectConfig } from "app-types/subject-dynamic/config";
import { Status, SummonedStatus } from "app-types/subject-dynamic/status/type";
import { DamageTableGenerator } from "./damage-table";
import { TooltipProps } from "components/tooltip/skill/tooltip-props";
import { StatusOverrideFunc } from "./status-override";

export type SkillListHook = (config: SubjectConfig) => Record<"Q" | "W" | "E" | "R" | "T", number | number[] | {
    maxLevel?: number | "none",
    code: number | number[]
}>;

export type SummonedStatusFunc = (masterStatus: Status, config: SubjectConfig) => SummonedStatus;
export type SummonInfo = {
    status: SummonedStatusFunc,
    nameIntlID: string
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
        tooltip: Record<number, TooltipProps>
    }

    statusOverride?: StatusOverrideFunc
    summoned?: SummonInfo[]
    stackInfo?: SubjectStackInfo
}

export function defineSubject(module: SubjectModules): SubjectModules { return module };