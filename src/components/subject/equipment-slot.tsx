import { ArmorTypeID } from "@app/entity/equipment";
import * as React from "react";
import EquipmentList from "./equipment-list";
import style from "./equipment-slot.module.styl";
import { useToggle } from "react-use";
import Item from "components/items/item";

type Props = {
    slot: "weapon" | ArmorTypeID 
}

const equipmentSlot: React.FC<Props> = props => {
    const [showSelection, toggleSelection] = useToggle(false);

    return (
        <div className={style.slot} onClick={toggleSelection}>
            <Item slot={props.slot} />
            {showSelection ? <EquipmentList slot={props.slot} /> : null}
        </div>
    );
};

export default equipmentSlot;