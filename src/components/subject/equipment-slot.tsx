import { ArmorTypeID } from "@app/entity/equipment";
import * as React from "react";
import EquipmentList, { style as listStyle } from "../modal/equipment-list";
import style from "./equipment-slot.module.styl";
import Item from "components/items/item";
import { SubjectID } from "@app/entity/subject";
import { Equipment } from "./use-subject-config";
import Modal from "react-modal";
import { useToggle } from "react-use";
import common from "@app/common.styl";
import { StateProps } from "@app/util/state";
import Blank from "components/items/blank";
import { styles } from "@app/util/style";

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