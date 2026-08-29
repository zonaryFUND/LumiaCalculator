import * as React from "react";
import { Upload, Download } from "@phosphor-icons/react"
import style from "./storage-buttons.module.styl";
import { FormattedMessage } from "react-intl";

type Props = {
    onLoad: () => void
    onSave: () => void
}

const StorageButton: React.FC<Props> = props => {
    return (
        <div className={style.storageButtons}>
            <button className={style.storageButton} onClick={props.onLoad}>
                <Upload fontSize={28} />
                <p><FormattedMessage id="app.load" /></p>
            </button>
            <button className={style.storageButton} onClick={props.onSave}>
                <Download fontSize={28} />
                <p><FormattedMessage id="app.save" /></p>
            </button>
        </div>
    )
    
}

export default StorageButton;