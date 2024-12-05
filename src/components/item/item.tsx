import * as React from "react";
import { EquipmentID } from "app-types/equipment/id";
import Images from "@app/resources/image";
import style from "./item.module.styl";
import { styles } from "@app/util/style";
import { ArmorTypeID } from "app-types/equipment/armor";
import { ArmorStatusDictionary, EquipmentStatusDictionary } from "app-types/equipment";

type Props = {
    slot: "Weapon" | ArmorTypeID
    itemID: EquipmentID | null
    inSlot: boolean
}

const item: React.FC<Props> = props => {
    const Items = (() => {
        switch (props.slot) {
            case "Weapon":  return Images.weapon;
            case "Head":    return Images.head;
            case "Chest":   return Images.chest;
            case "Arm":     return Images.arm;
            case "Leg":     return Images.leg;
        }
    })()

    const src = React.useMemo(() => {
        if (props.itemID == undefined) return undefined;
        const davidFrom = ArmorStatusDictionary[props.itemID]?.david?.from;
        if (davidFrom) {
            return Items[`${davidFrom}`]
        }
        return Items[props.itemID];
    }, [props.itemID]);

    const className = React.useMemo(() => {
        if (props.itemID == null) return undefined;
        switch (EquipmentStatusDictionary[props.itemID].itemGrade) {
            case "Epic":        return style.epic;
            case "Legend":   return style.legendary;
            case "Mythic":      return style.mythic;
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
