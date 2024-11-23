import { SubjectConfigV1 } from "./config"

export type PresetWithKeyV1 = {
    version: undefined,
    name: string
    key: number
    isPremadeSample?: boolean
    config: SubjectConfigV1   
}
