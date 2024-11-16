import { SubjectCode } from "app-types/subject-static"
import { Equipment } from "./equipment"
import { SkillLevels } from "./skill-levels"

export type SubjectConfig = {
    subject: SubjectCode
    equipment: Equipment
    level: number
    weaponMastery: number
    defenseMastery: number
    movementMastery: number
    skillLevels: SkillLevels
    gauge: number
    stack: number
}