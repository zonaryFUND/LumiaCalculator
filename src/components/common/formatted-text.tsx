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

type Node = {
    text?: string
    color?: string
    children?: Node[]
}

const formattedText: React.FC<Props> = ({text, values}) => {
    const tagRegex = /<color=(#[0-9a-fA-F]{6}|[a-zA-Z]+)>|<\/color>/;
    const parse = (text: string): React.ReactNode[] => {
        const match = text.match(tagRegex);
        if (!match) {
            return text ? replaceLineBreak(text) : []
        }

        const remainingText = text.slice(match.index! + match[0].length);
        const closingIndex = findMatchingClosingTag(remainingText);

        return [
            ...parse(text.slice(0, match.index!)),
            <span key={remainingText} style={{color: match[1]}}>{parse(remainingText.slice(0, closingIndex))}</span>,
            ...parse(remainingText.slice(closingIndex + "</color>".length))
        ];
    }

    const findMatchingClosingTag = (text: string, depth: number = 0): number => {
        const match = tagRegex.exec(text)!;
        if (!match) return -1;

        const begin = match.index + match[0].length;
        const remainingText = text.slice(begin);
        if (match[0].startsWith("<color=")) {
            const result = findMatchingClosingTag(remainingText, depth + 1);
            return result == -1 ? -1 : (begin + result)
        } else {
            if (depth == 0) {
                return match.index;
            }

            const result = findMatchingClosingTag(remainingText, depth - 1);
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