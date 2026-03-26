import * as React from "react";
import style from "./subject-card.module.styl";
import SubjectAvator from "../containers/subject-avator";
import StorageButtons from "../containers/storage-buttons";
import LevelPulldown from "../containers/level-pulldown";
import SubjectName from "../containers/subject-name";

const SubjectCardLayout: React.FC = () => {
    return (
        <div className={style.subjectCard}>
            <SubjectAvator />
            <div className={style.right}>
                <SubjectName />
                <StorageButtons />
                <LevelPulldown />
            </div>
        </div>
    )
}

export default SubjectCardLayout;
