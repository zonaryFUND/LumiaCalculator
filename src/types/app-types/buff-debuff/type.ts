import { SkillKey } from "app-types/skill"
import { Status } from "app-types/subject-dynamic/status/type"
import { ValueRatio } from "app-types/value-ratio"

type StatusBuffDebuff = {
    type: "status"
    value: Record<keyof Status, number | ValueRatio>
}

type BuffDebuffEffect = StatusBuffDebuff

type Constant = {
    type: "constant"
    effect: BuffDebuffEffect
}

type NumberDependent = {
    type: "number-dependent"
    labelIntlID: string
    generator: (value: number) => BuffDebuffEffect
}

export type BuffDebuff = {
    target: "self" | "opponent" | "both"
    skill?: SkillKey
    effect: Constant | NumberDependent
}