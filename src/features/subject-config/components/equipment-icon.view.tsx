import * as React from "react";
import { EquipmentID } from "app-types/equipment/id";
import Images from "@app/resources/image";
import style from "./equipment-icon.module.styl";
import { styles } from "@app/util/style";
import { ArmorTypeID } from "app-types/equipment/armor";
import { ArmorStatusDictionary, EquipmentStatusDictionary } from "app-types/equipment";
import { TooltipContext } from "components/tooltip/tooltip-context";
import { useResponsiveUIType } from "@app/hooks/use-responsive-ui-type";
import { TooltipSubjectSideContext } from "components/tooltip/subject-side-context";

type Props = {
    slot: "Weapon" | ArmorTypeID
    itemID: EquipmentID
    isDavid: boolean
    inSlot: boolean
    onSingleClick: () => void
}

const equipmentIcon: React.FC<Props> = props => {
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

    const shardClass = React.useMemo(() => {
        if (props.itemID == null) return undefined;
        switch (EquipmentStatusDictionary[props.itemID].shard) {
            case undefined: return undefined;
            case "red":     return style.redshard;
            case "blue":     return style.blueshard;
        }
    }, [props.itemID])

    const uiType = useResponsiveUIType();
    const clickCountRef = React.useRef(0);
    const tooltipContext = React.useContext(TooltipContext);
    const side = React.useContext(TooltipSubjectSideContext);

    const onClick: React.MouseEventHandler<HTMLElement> = React.useCallback(event => {
        if (uiType != "mobile") {
            props.onSingleClick();
            return
        }

        clickCountRef.current++;
        if (clickCountRef.current < 2) {
            setTimeout(() => {
                if (clickCountRef.current == 1) {
                    props.onSingleClick();
                } else {
                    tooltipContext?.openModalItem.current({
                        itemCode: props.itemID,
                        isDavid: props.isDavid,
                        onSlot: props.inSlot,
                        subjectSide: side
                    });
                }
                clickCountRef.current = 0;
            }, 200);
        }
    }, [props.itemID])

    return (
        <div
            className={styles(className, shardClass, style.base)}
            data-tooltip-id="weapon"
            data-tooltip-content={`${props.itemID}${props.isDavid ? "_D" : ""}${props.inSlot ? "%slot" : ""}`}
            data-tooltip-subject-side={side}
            onClick={onClick}
        >
            <img 
                src={src} 
            />
        </div>
    )
}

export default equipmentIcon;
