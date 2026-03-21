import * as React from "react";
import { useSubjectStateStore } from "../store";
import Images from "@app/resources/image";
import common from "@app/common.module.styl";
import Modal from "react-modal";
import { useToggle } from "react-use";
import style from "./subject-avator.module.styl";
import SubjectList, { style as subjectsStyle } from "components/modal/subject-list";
import { styles } from "@app/util/style";

const SubjectAvator: React.FC = () => {
    const subject = useSubjectStateStore(s => s.config.subject);
    const setSubject = useSubjectStateStore(s => s.setSubject);
    const [selectingSubject, toggleSelectingSubject] = useToggle(false);

    return (
        <>
            <img className={styles(common.hover, style.avator)} src={Images.subject[subject]} onClick={toggleSelectingSubject} />
            <Modal 
                isOpen={selectingSubject} 
                shouldCloseOnOverlayClick
                onRequestClose={toggleSelectingSubject}
                className={subjectsStyle}
                overlayClassName={common["modal-overlay"]}
            >
                <SubjectList current={subject} onSelect={setSubject} />
            </Modal>
        </>
    )
}

export default SubjectAvator;