import React from "react";

export function text(fontSize = 14, fontWeight = 400, fontType = 1, largerGap = false, color = '#fff', lineHeight) {

    return {
        fontFamily: 'Montserrat, sans-serif',
        fontSize: fontSize + 'px',
        color: color,
        fontWeight: fontWeight,
        lineHeight: lineHeight ? lineHeight + 'px' : largerGap ? '120%' : '100%',
    }
}

export default ({
                    size,
                    weight,
                    color = '#fff',
                    fontType,
                    gap,
                    style={},
                    className='',
                    largerGap,
                    lineHeight,
                    div=false,
                    ...props
                }) => {
    return div ?
        <div className={className}
             style={{
                 ...text(parseInt(size), weight, fontType, gap, largerGap, lineHeight),
                 ...style,
                 color: color,
             }}
             {...props}
        >{props.children}</div>
        : <span className={className}
                style={{
                    ...text(parseInt(size), weight, fontType, gap, largerGap, lineHeight),
                    ...style,
                    color: color,
                }}
                {...props}
        >{props.children}</span>;
}
