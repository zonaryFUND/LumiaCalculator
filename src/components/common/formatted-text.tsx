import * as React from "react";

type Props = {
    text: string
    values?: Record<number, string | number>
}

function replaceLineBreak(rawText: string): React.ReactNode[] {
    return rawText
        .split("\\n")
        .reduce((prev, current, index) => {
            if (prev.length > 0) return prev.concat([<br key={`${rawText}-${index}`} />, current]);
            return [current];
        }, [] as React.ReactNode[]);
}

function decideTag(matched: string): "color" | "i" {
    if (matched.startsWith("<color")) return "color";
    if (matched.startsWith("<i>")) return "i";
    throw new Error(`undefined pseudo tag found: ${matched}`);
}

const formattedText: React.FC<Props> = ({text, values}) => {
    const tagRegex = /<color=(#[0-9a-fA-F]{3,6}|[a-zA-Z]+)>|<\/color>|<i>|<\/i>/;
    const parse = (text: string): React.ReactNode[] => {
        const match = text.match(tagRegex);
        if (!match) {
            return text ? replaceLineBreak(text) : []
        }

        const tag = decideTag(match[0]);
        const remainingText = text.slice(match.index! + match[0].length);
        const closingIndex = findMatchingClosingTag(tag, remainingText);

        return [
            ...parse(text.slice(0, match.index!)),
            tag == "color" ?
            <span key={remainingText} style={{color: match[1]}}>{parse(remainingText.slice(0, closingIndex))}</span> :
            <i key={remainingText}>{parse(remainingText.slice(0, closingIndex))}</i>,
            ...parse(remainingText.slice(closingIndex + `</${tag}>`.length))
        ];
    }

    const findMatchingClosingTag = (tag: "color" | "i", text: string, depth: number = 0): number => {
        const match = tagRegex.exec(text)!;
        if (!match) return -1;

        const begin = match.index + match[0].length;
        const remainingText = text.slice(begin);
        
        if (match[0].startsWith("<color=") || match[0].startsWith("<i>")) {
            const result = findMatchingClosingTag(decideTag(match[0]), remainingText, depth + 1);
            return result == -1 ? -1 : (begin + result)
        } else {
            if (depth == 0) {
                return match.index;
            }

            const result = findMatchingClosingTag(tag, remainingText, depth - 1);
            return result == -1 ? -1 : (begin + result)
        }
    }

    return parse(
        text.replace(/\{(\d+)\}/g, (match, p) => {
            if (values && +p in values) return values[+p].toString();
            return match;
        })
    );
}

export default formattedText;