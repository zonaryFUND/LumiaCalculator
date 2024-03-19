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
    const subjectContext = React.useContext(SubjectContext)!;
    const equipmentContext = React.useContext(EquipmentContext)!;
    const onClick = React.useCallback(() => {
        if (props.slot == "weapon" && subjectContext.value == null) return;
        setSelection(prev => !prev);
    }, [subjectContext.value]);
    

    return (
        <div className={style.slot} onClick={onClick}>
            <Item itemID={equipmentContext.value[props.slot]} slot={props.slot} />
            {showSelection ? <EquipmentList slot={props.slot} /> : null}
        </div>
    );
};

export default equipmentSlot;