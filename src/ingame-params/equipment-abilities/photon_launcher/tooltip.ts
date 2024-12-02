import Constants from "./constants.json";
import { ItemSkillTooltipValuesHook } from "../item-skill";
import { useValueContextOptional } from "components/tooltip/value-context";
import weaponRange from "app-types/subject-dynamic/config/weapon-range";
import useSanitizedValueRatio from "../use-sanitize-value-ratio";

const values: ItemSkillTooltipValuesHook = (damage, values) => {
    const { config, showEquation } = useValueContextOptional();
    const sanitizedDamage = useSanitizedValueRatio(damage!);

    return {
        1: sanitizedDamage.base as number,
        2: sanitizedDamage.attack as number,
        3: sanitizedDamage.level as number,
        4: values?.heal as number,
        5: sanitizedDamage,
        6: sanitizedDamage
    }
}

export default values;