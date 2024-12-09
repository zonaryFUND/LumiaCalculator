import * as React from "react";
import Modal from "react-modal";
import { useToggle } from "react-use";

import { ArmorTypeID } from "app-types/equipment/armor";
import { Equipment } from "app-types/subject-dynamic/config/equipment";

import Blank from "components/item/blank";
import Item from "components/item/item";
import EquipmentList, { style as listStyle } from "../modal/equipment-list";

import { StateProps } from "@app/util/state";
import { styles } from "@app/util/style";

import common from "@app/common.module.styl";
import style from "./equipment-slot.module.styl";
import { SubjectCode } from "app-types/subject-static";


type Props = {
    slot: "Weapon" | ArmorTypeID 
    subject: SubjectCode
    equipment: StateProps<Equipment>
}

const equipmentSlot: React.FC<Props> = props => {
    const [selecting, toggleSelecting] = useToggle(false);
    
    const onSelect: React.Dispatch<React.SetStateAction<Equipment>> = React.useCallback(equipment => {
        props.equipment[1](equipment);
        toggleSelecting(false);
    }, []);

    return (
        <div className={style.slot}>
            <div className={styles(style.equipment, common["hover-bright"])}>
                {
                    props.equipment[0][props.slot] ?
                    <Item 
                        itemID={props.equipment[0][props.slot]!} 
                        slot={props.slot} 
                        inSlot={true} 
                        onSingleClick={toggleSelecting}
                    /> :
                    <Blank slot={props.slot} onClick={toggleSelecting} />
                }
            </div>
            <Modal
                isOpen={selecting} 
                shouldCloseOnOverlayClick
                onRequestClose={toggleSelecting}
                className={listStyle}
                overlayClassName={common["modal-overlay"]}
            >
                <EquipmentList {...props} equipment={[props.equipment[0], onSelect]} />
            </Modal>
        </div>
    );
};

export default equipmentSlot;