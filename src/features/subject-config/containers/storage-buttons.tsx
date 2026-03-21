import * as React from "react";
import { useSubjectStateStore } from "../store";
import StorageButton from "../components/storage-buttons.view";
import { useToggle } from "react-use";
import Modal from "react-modal";
import common from "@app/common.module.styl";
import LoadBuild from "components/modal/load-build";
import loadStyle from "components/modal/load-build/index.module.styl";
import SaveBuild from "components/modal/save-build";
import saveStyle from "components/modal/save-build/index.module.styl";
import { SubjectConfig } from "app-types/subject-dynamic/config";

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
                <LoadBuild 
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
                <SaveBuild 
                    currentConfig={config}
                    onDone={toggleShowingSave}
                />
            </Modal>
        </>
    )
}

export default StorageButtons;
