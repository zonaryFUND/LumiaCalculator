import { DamageTableUnit } from "core/damage-table/unit"
import { WeaponTypeID } from "core/equipment/weapon"
import { SkillTooltipProps } from "@app/ingame-params/skill-tooltip-props"
import { IntlShape } from "react-intl"
import { SubjectConfig } from "core/subject-dynamic/config"
import { BuffDebuffDefinition } from "@app/ingame-params/buff-debuff/type"

export type WeaponSkillDamageTableUnit = Omit<DamageTableUnit, "origin">;

export type WeaponSkillModule = {
    id: WeaponTypeID
    damageTable?: WeaponSkillDamageTableUnit[] | WeaponSkillDamageTableGenerator
    code: number
    tooltip: SkillTooltipProps

    /**
     * この武器種の武器スキルによって得られる自己バフの定義。実験体固有スキルの`SubjectModules.buffDebuff`と
     * 同様、`SubjectConfig`（武器熟練度等に応じて内容が変化しうるため）を引数に取る関数として定義する。
     * `WeaponTypeID`は1武器種につき1モジュールで一意なため（装備アビリティのように複数アイテムが
     * 1skillCodeを共有することがない）、装備アビリティのような値の注入は不要
     */
    buffDebuff?: WeaponSkillSelfBuffDebuff

    /**
     * 武器スキルが他者（敵）に与えるバフ・デバフの定義。`SubjectModules.givenBuffDebuff`と同様、
     * 受信側の計算機は発生源のconfigを保持していないため、configを引数に取らない定数カタログとして定義する。
     * 発生源（どの武器種か）の識別に迷いはないため、装備アビリティのようなアイテム単位の名前空間付与は不要
     */
    givenBuffDebuff?: Record<string, BuffDebuffDefinition>
}
export type WeaponSkillDamageTableGenerator = (props: {intl: IntlShape}) => WeaponSkillDamageTableUnit[];
export type WeaponSkillSelfBuffDebuff = (config: SubjectConfig) => Record<string, BuffDebuffDefinition>
export const defineWeaponSkill = (props: WeaponSkillModule): WeaponSkillModule => props;
