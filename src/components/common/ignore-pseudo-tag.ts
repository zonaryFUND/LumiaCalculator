export function ignorePseudoTag(text: string): string {
    return text.replaceAll(/<color=(#[0-9a-fA-F]{6}|[a-zA-Z]+)>|<\/color>/g, "");
}