import { ArmorTypeID } from "@app/entity/equipment";
import * as React from "react";
import EquipmentList from "./equipment-list";
import style from "./equipment-slot.module.styl";
import Item from "components/items/item";
import { SubjectID } from "@app/entity/subject";
import { Equipment } from "./use-subject-config";

type Props = {
    slot: "weapon" | ArmorTypeID 
    subject: SubjectID | null
    equipment: [Equipment, React.Dispatch<React.SetStateAction<Equipment>>]
}

const equipmentSlot: React.FC<Props> = props => {
    const [showSelection, setSelection] = React.useState(false);
    const onClick = React.useCallback(() => {
        if (props.slot == "weapon" && props.subject == null) return;
        setSelection(prev => !prev);
    }, [props.subject]);
    

    return (
        <div className={style.slot} onClick={onClick}>
            {
                props.equipment[0][props.slot] ?
                <Item itemID={props.equipment[0][props.slot]} slot={props.slot} /> :
                null
            }
            {showSelection ? <EquipmentList slot={props.slot} subject={props.subject} equipment={props.equipment} /> : null}
        </div>
    );
};

export default equipmentSlot;