import { Locales } from "@app/App";
import { SubjectConfigDefault } from "app-types/subject-dynamic/config";
import * as React from "react";
import { IntlProvider } from "react-intl";
import Tooltip from "@app/components/tooltip/skill/tooltip"
import { statusOf } from "app-types/subject-dynamic/status/calculation";

const config = SubjectConfigDefault;

const bed: React.FC<{code: number, showEquation: boolean}> = ({ code, showEquation }) => {
    const status = statusOf(config, 100);
    return (
        <IntlProvider locale="ja" messages={Locales["ja"]}>
            <Tooltip 
                showEquation={showEquation}
                config={config}
                status={status}
                code={+code}
            />
        </IntlProvider>
    )
}

export default bed;
