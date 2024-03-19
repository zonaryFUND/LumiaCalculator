import * as React from "react";
import { EquipmentID } from "@app/entity/equipment-id";
import Images from "@app/resources/image";
import { equipmentStatus, name, tierName, typeName } from "@app/entity/equipment";
import Options from "./options";
import style from "./item-tooltip.module.styl";

type Props = {
    itemID: EquipmentID
}

const itemTooltip: React.FC<Props> = props => {
    const status = equipmentStatus(props.itemID);
    const itemName = name(props.itemID, "jp");

    const src = React.useMemo(() => {
        const itemType = equipmentStatus(props.itemID).type;
        const Items = (() => {
            switch (itemType) {
                case "head":    return Images.head;
                case "chest":   return Images.chest;
                case "arm":     return Images.arm;
                case "leg":     return Images.leg;
                default:        return Images.weapon;
            }
        })()
        if (props.itemID.endsWith("_crimson") || props.itemID.endsWith("_dawn")) {
            return Items[props.itemID.substring(0, props.itemID.lastIndexOf("_"))];
        } 
          
        return Items[props.itemID];
    }, [props.itemID]);

    return (
        <div className={`${style.tooltip} ${style[status.tier]}`}>
            <header>
                <div>
                    <h1>{itemName}</h1>
                    <p>{tierName(status.tier, "jp")}</p>
                    <p>{typeName(status.type, "jp")}</p>
                </div>
                <img src={src} />
            </header>
            <Options {...status} />
        </div>
    )
}

export default itemTooltip;