import * as React from "react";
import { equipmentStatus } from "app-types/equipment";
import BaseValue from "components/tooltip/value";
import { WeaponTypeID, meleeOrRange } from "app-types/equipment/weapon";
import { useValueContextOptional } from "components/tooltip/value-context";
import { RatioKeys, ValueRatio, isValueRatio } from "app-types/value-ratio";

type Props = {
    ratio: ValueRatio | {
        melee: ValueRatio
        range: ValueRatio
    }
    rangeClassName?: {
        base: string
        range: string
    }
    overrideExpression?: Partial<{[K in RatioKeys | "result"]: {format?: string, className?: string}}>
}

const Value: React.FC<Props> = props => {
    const { config, showEquation } = useValueContextOptional();

    const range = React.useMemo(() => {
        if (config?.equipment.weapon && !showEquation) {
            return meleeOrRange(equipmentStatus(config.equipment.weapon).type as WeaponTypeID);
        } else {
            return undefined;
        }
    }, []);

    if (isValueRatio(props.ratio)) {
        return <BaseValue skill="other" ratio={props.ratio} overrideExpression={props.overrideExpression} />;
    } else {
        if (showEquation != false) {
            return <span className={props.rangeClassName?.base}>(<span className={props.rangeClassName?.range}>近距離：<Value {...props} ratio={props.ratio.melee} overrideExpression={props.overrideExpression} /></span> | <span className={props.rangeClassName?.range}>遠距離：</span><Value {...props} ratio={props.ratio.range} overrideExpression={props.overrideExpression} />)</span>;
        } else {
            return <Value {...props} ratio={props.ratio[range || "melee"]} overrideExpression={props.overrideExpression} />;
        }
    }
}

export default Value;