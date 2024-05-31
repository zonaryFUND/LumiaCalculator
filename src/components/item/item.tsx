import * as React from "react";
import { EquipmentID } from "app-types/equipment/id";
import Images from "@app/resources/image";
import style from "./item.module.styl";
import { styles } from "@app/util/style";
import { ArmorTypeID } from "app-types/equipment/armor";
import { equipmentStatus } from "app-types/equipment";

type Props = {
    slot: "weapon" | ArmorTypeID
    itemID: EquipmentID | null
    inSlot: boolean
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

    const className = React.useMemo(() => {
        if (props.itemID == undefined) return undefined;
        switch (equipmentStatus(props.itemID).tier) {
            case "epic":        return style.epic;
            case "legendary":   return style.legendary;
            case "mythic":      return style.mythic;
        }
    }, [props.itemID])

    return (
        <div
            className={styles(className, style.base)} 
            data-tooltip-id="weapon"
            data-tooltip-content={`${props.itemID}${props.inSlot ? "%slot" : ""}`}
        >
            <img 
                src={src} 
            />
        </div>
    )
}

export default item;
