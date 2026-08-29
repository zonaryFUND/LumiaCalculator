import * as React from "react";
import { useSubjectStateStore } from "../store";
import { FormattedMessage } from "react-intl";

const SubjectName: React.FC = () => {
    const subject = useSubjectStateStore(s => s.config.subject);

    return (
        <h2><FormattedMessage id={`Character/Name/${subject}`} /></h2>
    )
}

export default SubjectName;
