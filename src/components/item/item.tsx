import * as React from "react";
import { EquipmentID } from "app-types/equipment/id";
import Images from "@app/resources/image";
import style from "./item.module.styl";
import { styles } from "@app/util/style";
import { ArmorTypeID } from "app-types/equipment/armor";
import { ArmorStatusDictionary, EquipmentStatusDictionary } from "app-types/equipment";
import { TooltipContext } from "components/tooltip/tooltip-context";
import { useResponsiveUIType } from "@app/hooks/use-responsive-ui-type";
import { SubjectSideContext } from "@app/ingame-params/subjects/subject-side";

type Props = {
    slot: "Weapon" | ArmorTypeID
    itemID: EquipmentID
    inSlot: boolean
    onSingleClick: () => void
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

    const uiType = useResponsiveUIType();
    const clickCountRef = React.useRef(0);
    const tooltipContext = React.useContext(TooltipContext);
    const side = React.useContext(SubjectSideContext);

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
            className={styles(className, style.base)} 
            data-tooltip-id="weapon"
            data-tooltip-content={`${props.itemID}${props.inSlot ? "%slot" : ""}`}
            onClick={onClick}
        >
            <img 
                src={src} 
            />
        </div>
    )
}

export default item;
