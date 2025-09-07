import { DamageTableUnit } from "app-types/damage-table/unit"
import { WeaponTypeID } from "app-types/equipment/weapon"
import { SkillTooltipProps } from "@app/ingame-params/skill-tooltip-props"
import { IntlShape } from "react-intl"

export type WeaponSkillDamageTableUnit = Omit<DamageTableUnit, "origin">;

export type WeaponSkillModule = {
    id: WeaponTypeID
    damageTable?: WeaponSkillDamageTableUnit[] | WeaponSkillDamageTableGenerator
    code: number
    tooltip: SkillTooltipProps
}
export type WeaponSkillDamageTableGenerator = (props: {intl: IntlShape}) => WeaponSkillDamageTableUnit[];
export const defineWeaponSkill = (props: WeaponSkillModule): WeaponSkillModule => props;
