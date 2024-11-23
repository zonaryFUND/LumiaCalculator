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

export const SubjectConfigDefault: SubjectConfig = {
    subject: 1,
    equipment: {
        Weapon: null,
        Head: null,
        Chest: null,
        Arm: null,
        Leg: null
    },
    level: 1,
    weaponMastery: 1,
    defenseMastery: 1,
    movementMastery: 1,
    skillLevels: { Q: 0, W: 0, E: 0, R: 0, T: 0 },
    gauge: 0,
    stack: 0
}