import { IntlShape } from "react-intl";
import Havoc from "./havoc.json";
import Chaos from "./chaos.json";
import { ValueRatio } from "app-types/value-ratio";

type ValueProps = {
    label: string
    ratio: ValueRatio
}

export function augmentTableValues(props: {intl: IntlShape}): ValueProps[] {
    return [
        {label: props.intl.formatMessage({id: "augment.frailty_infliction"}), ratio: Havoc.frailty_infliction.damage},
    ];
}