import { ArmorTypeID } from "@app/entity/equipment";
import { EquipmentID } from "@app/entity/equipment-id";
import Images from "@app/resources/image";
import * as React from "react";

type Props = {
    slot: "weapon" | ArmorTypeID
    itemID?: EquipmentID
}

const item: React.FC<Props> = props => {
    const Items = (() => {
        switch (props.slot) {
            case "weapon":  return Images.weapon;
            case "head":    return Images.head;
            case "chest":   return Images.chest;
            case "arm":     return Images.arm;
            case "leg":     return Images.leg;
        }
    })()

    const src = React.useMemo(() => {
        if (props.itemID == undefined) return undefined;
        if (props.itemID.endsWith("_crimson") || props.itemID.endsWith("_dawn")) {
            return Items[props.itemID.substring(0, props.itemID.lastIndexOf("_"))];
        } 
          
        return Items[props.itemID];
    }, [props.itemID]);

    return (
        <img src={src} />
    )
}

export default item;
