import { DamageTableUnit } from "app-types/damage-table/unit"
import { WeaponTypeID } from "app-types/equipment/weapon"
import { TooltipProps } from "components/tooltip/skill/tooltip-props"
import { IntlShape } from "react-intl"

export type WeaponSkillModule = {
    id: WeaponTypeID
    damageTable?: DamageTableUnit[] | WeaponSkillDamageTableGenerator
    code: number
    tooltip: TooltipProps
}
export type WeaponSkillDamageTableGenerator = (props: {intl: IntlShape}) => DamageTableUnit[];
export const defineWeaponSkill = (props: WeaponSkillModule): WeaponSkillModule => props;
