import { Locales } from "@app/App";
import { SubjectConfigDefault } from "app-types/subject-dynamic/config";
import { useStatus } from "app-types/subject-dynamic/status/calculate-status";
import * as React from "react";
import { IntlProvider } from "react-intl";
import Tooltip from "@app/components/tooltip/skill/tooltip"

const config = SubjectConfigDefault;

const bed: React.FC<{code: number, showEquation: boolean}> = ({ code, showEquation }) => {
    const status = useStatus(config);
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
