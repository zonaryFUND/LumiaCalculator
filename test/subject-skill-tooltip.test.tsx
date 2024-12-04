import * as React from "react";
import "../src/decimal.extension";
import { render } from "@testing-library/react";
import { SubjectTooltipDictionary } from "../src/ingame-params/subjects/dictionary"
import { describe, expect, test } from "vitest"
import Tooltip from "../src/components/tooltip/skill/tooltip"
import { SubjectConfigDefault } from "../src/types/app-types/subject-dynamic/config"
import { useStatus } from "../src/types/app-types/subject-dynamic/status/use-status";

const config = SubjectConfigDefault;
const status = useStatus(config);

describe.each(Object.keys(SubjectTooltipDictionary))("all subject skill tooltips", code => {

    test("match snapshot", () => {
        const { container } = render(
            <Tooltip 
                showEquation={false}
                config={config}
                status={status}
                code={+code}
            />
        );
        expect(container).toMatchSnapshot()
    })
})
