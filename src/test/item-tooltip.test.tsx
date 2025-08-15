import * as React from "react";
import { render } from "@testing-library/react";
import { describe, expect, test } from "vitest";
import { Locales } from "@app/App";
import { SubjectConfigDefault } from "app-types/subject-dynamic/config";
import { IntlProvider } from "react-intl";
import Tooltip from "@app/components/tooltip/item/item-tooltip"
import { NimbleAPIJSON } from "@app/params-json";
import { statusOf } from "app-types/subject-dynamic/status/calculation";

const config = SubjectConfigDefault;

const Bed: React.FC<{code: number, showEquation: boolean}> = ({ code, showEquation }) => {
    const status = statusOf(config, 100);
    return (
        <IntlProvider locale="ja" messages={Locales["ja"]}>
            <Tooltip 
                showEquation={showEquation}
                config={config}
                isDavid={false}
                status={status}
                itemID={+code}
            />
        </IntlProvider>
    )
}

const weaponCodeWithName = NimbleAPIJSON.WeaponStatus.map(w => ({ code: w.code, name: Locales["ja"][`Item/Name/${w.code}`] }))
const armorCodeWithName = NimbleAPIJSON.ArmorStatus.map(w => ({ code: w.code, name: Locales["ja"][`Item/Name/${w.code}`] }))

describe.each([...weaponCodeWithName, ...armorCodeWithName])("$name's", ({ code }) => {
    test("tooltip match snapshot", () => {
        const { container } = render(<Bed code={+code} showEquation={false} />);
        expect(container).toMatchSnapshot()            
    })
    test("detailed tooltip match snapshot", () => {
        const { container } = render(<Bed code={+code} showEquation={true} />);
        expect(container).toMatchSnapshot()            
    })
})
