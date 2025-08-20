import { SubjectCode } from "app-types/subject-static"
import { Equipment } from "./equipment"
import { SkillLevels } from "./skill-levels"
import { PerpetualOuterBuff } from "./perpetual-outer-buff"

/**
 * ユーザが任意に編集できる対象実験体の現在設定
 */
export type SubjectConfig = {
    /**
     * 実験体ID
     */
    subject: SubjectCode

    /**
     * 装備
     */
    equipment: Equipment

    /**
     * レベル
     */
    level: number

    /**
     * 武器熟練度
     */
    weaponMastery: number

    /**
     * 防御熟練度
     */
    defenseMastery: number

    /**
     * 移動熟練度
     */
    movementMastery: number

    /**
     * 武器スキルを除く各スキルのレベル
     */
    skillLevels: SkillLevels

    /**
     * 固有ゲージ量
     */
    gauge: number

    /**
     * 固有スタック数
     */
    stack: number

    /**
     * 実験体のパッシブスキル以外の効果で得られる永続バフ（一部特性やアルファ、オメガ討伐など）
     */
    perpetualOuterBuffs: PerpetualOuterBuff[]
}

export const SubjectConfigDefault: SubjectConfig = {
    subject: 1,
    equipment: {
        Weapon: null,
        Head: null,
        Chest: null,
        isChestDavid: false,
        Arm: null,
        Leg: null
    },
    level: 1,
    weaponMastery: 1,
    defenseMastery: 1,
    movementMastery: 1,
    skillLevels: { Q: 0, W: 0, E: 0, R: 0, T: 0 },
    gauge: 0,
    stack: 0,
    perpetualOuterBuffs: []
}