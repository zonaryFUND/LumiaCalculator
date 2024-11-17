import Constants from "./constants.json";
import { ItemSkillTooltipValuesHook } from "../item-skill";
import { useValueContextOptional } from "components/tooltip/value-context";
import useSanitizedValueRatio from "../use-sanitize-value-ratio";
import { useIntl } from "react-intl";

const values: ItemSkillTooltipValuesHook = (damage, values) => {
    const intl = useIntl();
    const { showEquation } = useValueContextOptional();
    const sanitizedDamage = useSanitizedValueRatio(damage!);

    const meleeMessage = intl.formatMessage({id: "Item/Skills/6007000/Melee"})
        .replace("{0}", `${(values as any).slow.duration}`)
        .replace("{1}", `${(values as any).slow.effect}%`)

    return {
        0: Constants.max_stack,
        1: showEquation ? Constants.distance_per_stack : Constants.max_stack,
        2: Constants.distance_per_stack,
        3: Constants.ms,
        4: Constants.ms,
        6: sanitizedDamage.base as number,
        7: sanitizedDamage.base as number,
        9: meleeMessage,
        10: (values as any).slow.effect,
        11: (values as any).slow.duration
    }
}

export default values;