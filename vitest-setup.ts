import '@testing-library/jest-dom/vitest';
import "./src/decimal.extension";

const mocks = vi.hoisted(() => {
    const mockProxy = new Proxy<Record<string, string>>({} as Record<string, string>, {
        get: (_, prop) => {
            if (typeof prop == "string") {
                return `${prop}`
            }
            return undefined
        }
    });

    return {
        default: {
            subject: mockProxy,
            weapon: mockProxy,
            chest: mockProxy,
            head: mockProxy,
            arm: mockProxy,
            leg: mockProxy,
            skill: new Proxy<Record<number, string>>({} as Record<number, string>, {
                get: (_, prop) => {
                    if (typeof prop == "string" && !isNaN(Number(prop))) {
                        return `${Number(prop)}`
                    }
                    return undefined
                }
            })
        }
    }
})

vi.mock("@app/resources/image", () => mocks)