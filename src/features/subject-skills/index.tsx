import * as React from "react";
import style from "./index.module.styl";
import IconsLine from "./containers/icons-line";
import ConfiguratorsLine from "./containers/configurators-line";

const subjectSkills: React.FC = props => {
    return (
        <div className={style.skills}>
            <IconsLine />
            <ConfiguratorsLine />
        </div>
    )
};

export default subjectSkills;