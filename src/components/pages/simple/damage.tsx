import { SubjectID } from "@app/entity/subject";
import * as React from "react";
import { StateProps } from "util/state";
import index from "./index.module.styl";

type Props = {
    subject: StateProps<SubjectID>
}

const damages: React.FC = props => {
    return (
        <div className={index.row}>
            <header>
                <h1>ダメージ</h1>
            </header>
            <hr />
        </div>
    )
};

export default damages;