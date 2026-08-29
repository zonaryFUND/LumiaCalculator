import * as React from "react";
import { useSubjectStateStore } from "../store";
import StorageButton from "../components/storage-buttons.view";
import { useToggle } from "react-use";
import Modal from "react-modal";
import common from "@app/common.module.styl";
import LoadBuildModal from "../components/load-build-modal.view";
import loadStyle from "../components/load-build-modal.module.styl";
import SaveBuildModal from "../components/save-build-modal.view";
import saveStyle from "../components/save-build-modal.module.styl";
import { SubjectConfig } from "core/subject-dynamic/config";

const StorageButtons: React.FC = () => {
    const config = useSubjectStateStore(s => s.config);
    const setConfig = useSubjectStateStore(s => s.setConfig);
    const [showingLoad, toggleShowingLoad] = useToggle(false);
    const [showingSave, toggleShowingSave] = useToggle(false);

    const onLoad = React.useCallback((config: SubjectConfig) => {
        setConfig(config);
        toggleShowingLoad();
    }, [])

    return (
        <>
            <StorageButton onLoad={toggleShowingLoad} onSave={toggleShowingSave} />
            <Modal
                isOpen={showingLoad}
                shouldCloseOnOverlayClick
                onRequestClose={toggleShowingLoad}
                className={loadStyle.load}
                overlayClassName={common["modal-overlay"]}
            >
                <LoadBuildModal
                    onSelect={onLoad}
                />
            </Modal>
            <Modal
                isOpen={showingSave}
                shouldCloseOnOverlayClick
                onRequestClose={toggleShowingSave}
                className={saveStyle.save}
                overlayClassName={common["modal-overlay"]}
            >
                <SaveBuildModal
                    currentConfig={config}
                    onDone={toggleShowingSave}
                />
            </Modal>
        </>
    )
}

export default StorageButtons;
