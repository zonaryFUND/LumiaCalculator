import * as React from "react";
import Modal from "react-modal";
import { useToggle } from "react-use";

import { SubjectID } from "app-types/subject-static/id";
import { ArmorTypeID } from "app-types/equipment/armor";
import { Equipment } from "app-types/subject-dynamic/config/equipment";

import Blank from "components/item/blank";
import Item from "components/item/item";
import EquipmentList, { style as listStyle } from "../modal/equipment-list";

import { StateProps } from "@app/util/state";
import { styles } from "@app/util/style";

import common from "@app/common.styl";
import style from "./equipment-slot.module.styl";


type Props = {
    slot: "weapon" | ArmorTypeID 
    subject: SubjectID
    equipment: StateProps<Equipment>
}

const equipmentSlot: React.FC<Props> = props => {
    const [selecting, toggleSelecting] = useToggle(false);
    const onSelect: React.Dispatch<React.SetStateAction<Equipment>> = React.useCallback(equipment => {
        props.equipment[1](equipment);
        toggleSelecting(false);
    }, []);

    return (
        <>
            <div className={styles(style.slot, common["hover-bright"])} onClick={toggleSelecting}>
                {
                    props.equipment[0][props.slot] ?
                    <Item itemID={props.equipment[0][props.slot]} slot={props.slot} inSlot={true} /> :
                    <Blank slot={props.slot} />
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
        </>
    );
};

export default equipmentSlot;