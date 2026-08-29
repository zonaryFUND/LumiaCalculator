import * as React from "react";
import Config from "@app/features/subject-config";
import Status from "@app/features/subject-status";
import TabUnit from "components/common/tab/tab-unit";
import style from "./subject.module.styl";

const subject: React.FC = () => {
    return (
        <TabUnit title="実験体" className={style.subject}>
            <Config />
            <Status />
        </TabUnit>
    )
};

export default subject;
