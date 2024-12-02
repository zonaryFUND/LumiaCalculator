import Constants from "./constants.json";
import { ItemSkillTooltipValuesHook } from "../item-skill";
import { useValueContextOptional } from "components/tooltip/value-context";
import useSanitizedValueRatio from "../use-sanitize-value-ratio";
import { useIntl } from "react-intl";
import weaponRange from "app-types/subject-dynamic/config/weapon-range";

const values: ItemSkillTooltipValuesHook = (damage, values) => {
    const intl = useIntl();
    const { config, showEquation } = useValueContextOptional();
    const range = weaponRange(config);
    const sanitizedDamage = useSanitizedValueRatio(damage!);

    const meleeMessage = intl.formatMessage({id: "Item/Skills/6007000/Melee"})
        .replace("{0}", `${(values as any).slow.duration}`)
        .replace("{1}", `${(values as any).slow.effect}%`)

    return {
        0: Constants.max_stack,
        1: showEquation ? values?.tick as number : Constants.max_stack,
        2: values?.tick as number,
        3: values?.ms as number,
        4: values?.ms as number,
        6: sanitizedDamage.base as number,
        7: sanitizedDamage.base as number,
        9: range == "melee" ? meleeMessage : "",
        10: `${(values as any).slow.effect}%`,
        11: (values as any).slow.duration
    }
}

export default values;