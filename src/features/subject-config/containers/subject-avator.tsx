import * as React from "react";
import { useSubjectStateStore } from "../store";
import Images from "@app/resources/image";
import common from "@app/common.module.styl";
import Modal from "react-modal";
import { useToggle } from "react-use";
import style from "./subject-avator.module.styl";
import SubjectListModal, { style as subjectsStyle } from "../components/subject-list-modal.view";
import { styles } from "@app/util/style";

const SubjectAvator: React.FC = () => {
    const subject = useSubjectStateStore(s => s.config.subject);
    const setSubject = useSubjectStateStore(s => s.setSubject);
    const [selectingSubject, toggleSelectingSubject] = useToggle(false);
    const onSelect = React.useCallback((code: Parameters<typeof setSubject>[0]) => {
        setSubject(code);
        toggleSelectingSubject(false);
    }, [setSubject]);

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
                <SubjectListModal current={subject} onSelect={onSelect} />
            </Modal>
        </>
    )
}

export default SubjectAvator;