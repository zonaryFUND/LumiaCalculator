export function styles(...styles: (string | undefined)[]): string {
    return styles.filter(s => s != undefined).join(" ");
}