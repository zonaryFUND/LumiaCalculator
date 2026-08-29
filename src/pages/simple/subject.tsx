import * as React from "react";
import Config from "@app/features/subject-config";
import Status from "@app/features/subject-status";
import Pane from "components/layout/pane/pane";
import style from "./subject.module.styl";

const subject: React.FC = () => {
    return (
        <Pane title="実験体" className={style.subject}>
            <Config />
            <Status />
        </Pane>
    )
};

export default subject;
