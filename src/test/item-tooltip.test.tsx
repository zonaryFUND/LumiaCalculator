import * as React from "react";
import { render } from "@testing-library/react";
import { describe, expect, test } from "vitest";
import Weapons from "@app/ingame-params/json/weapon.json";
import Armors from "@app/ingame-params/json/armor.json";
import { Locales } from "@app/App";
import { SubjectConfigDefault } from "app-types/subject-dynamic/config";
import { useStatus } from "app-types/subject-dynamic/status/use-status";
import { IntlProvider } from "react-intl";
import Tooltip from "@app/components/tooltip/item/item-tooltip"

const config = SubjectConfigDefault;

const Bed: React.FC<{code: number, showEquation: boolean}> = ({ code, showEquation }) => {
    const [status] = useStatus(config);
    return (
        <IntlProvider locale="ja" messages={Locales["ja"]}>
            <Tooltip 
                showEquation={showEquation}
                config={config}
                status={status}
                itemID={+code}
            />
        </IntlProvider>
    )
}

const weaponCodeWithName = Weapons.map(w => ({ code: w.code, name: Locales["ja"][`Item/Name/${w.code}`] }))
const armorCodeWithName = Armors.map(w => ({ code: w.code, name: Locales["ja"][`Item/Name/${w.code}`] }))

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
