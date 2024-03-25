import { ArmorTypeID } from "@app/entity/equipment";
import * as React from "react";
import EquipmentList from "./equipment-list";
import style from "./equipment-slot.module.styl";
import { useToggle } from "react-use";
import Item from "components/items/item";
import { EquipmentContext, SubjectContext } from "./subject-context";

type Props = {
    slot: "weapon" | ArmorTypeID 
}

const equipmentSlot: React.FC<Props> = props => {
    const [showSelection, setSelection] = React.useState(false);
    const [subject] = React.useContext(SubjectContext)!;
    const [equipment] = React.useContext(EquipmentContext)!;
    const onClick = React.useCallback(() => {
        if (props.slot == "weapon" && subject == null) return;
        setSelection(prev => !prev);
    }, [subject]);
    

    return (
        <div className={style.slot} onClick={onClick}>
            {
                equipment[props.slot] ?
                <Item itemID={equipment[props.slot]} slot={props.slot} /> :
                null
            }
            {showSelection ? <EquipmentList slot={props.slot} /> : null}
        </div>
    );
};

export default equipmentSlot;