import * as React from "react";

type Props = {
    text: string
}

const formattedText: React.FC<Props> = ({text}) => {
    return (
        <>
        {
            text.split(/(<color=#[0-9A-Fa-f]{6}>.*?<\/color>)/).map((part, index) => {
                const match = part.match(/<color=#([0-9A-Fa-f]{6})>(.*?)<\/color>/)
                if (match) {
                    return (
                        <span key={index} style={{color: `#${match[1]}`}}>{match[2]}</span>
                    )
                } else {
                    return <React.Fragment key={index}>{part}</React.Fragment>;
                }
            })
        }
        </>
    );  
}

export default formattedText;