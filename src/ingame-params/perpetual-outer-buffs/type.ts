import { ComponentStatus } from "core/subject-dynamic/status/type"
import { StatusValueComponent } from "core/subject-dynamic/status/value-component/component"

export type PerpetualOuterBuffDefinition = {
    availableStacks?: number[] | string[]
    buff: (stack: number) => Partial<Record<keyof ComponentStatus | "adaptiveForce", StatusValueComponent>>
}