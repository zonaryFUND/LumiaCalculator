import * as React from "react";
import style from "./subject-card-layout.module.styl";
import SubjectAvator from "../containers/subject-avator";
import { FormattedMessage } from "react-intl";
import StorageButtons from "../containers/storage-buttons";
import LevelPulldown from "../containers/level-pulldown";
import { SubjectCode } from "app-types/subject-static";

type Props = {
    subject: SubjectCode
}

const SubjectCardLayout: React.FC<Props> = props => {
    return (
        <div className={style.subjectCard}>
            <SubjectAvator />
            <div className={style.right}>
                <h2><FormattedMessage id={`Character/Name/${props.subject}`} /></h2>
                <StorageButtons />
                <LevelPulldown />
            </div>
        </div>
    )
}

export default SubjectCardLayout;
