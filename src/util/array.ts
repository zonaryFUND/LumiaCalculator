export function extractArrayOrValue<T>(arrayOrValue: T | T[], index: number): T {
    return Array.isArray(arrayOrValue) ? arrayOrValue[index] : arrayOrValue;
}