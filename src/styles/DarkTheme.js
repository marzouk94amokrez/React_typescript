const size = {
    mobileS: '320px',
    mobileM: '375px',
    mobileL: '425px',
    tablet: '768px',
    laptop: '1024px',
    laptopL: '1440px',
    desktop: '2560px'
}

const theme = {
    colors: {
        body: "#000000",
        content: "#000000",
        text: "#ffffff",
        sendBtn : "#6C5CE7",
        cancelBtn : "#809FB8",
        btnBorder : "#D9E1E7",
        btnHover : '#F1F4F9',
        primary : "#2174B9",
        secondary : "#809FB8",
        success : "#00B894",
        danger : '#EE5A5A',
        warning : '#EECC5A',
        redLight : "#EE5A5A66",
        greenLight : "#55EFC466",
        orangeLight : "#EECC5A66"

    },
    status: {
        background: {
            TO_BE_PAID : "#EECC5A66",
            PAID : "#55EFC466",
            LITIGATION : "#EE5A5A66",
            NEW : "#F5FBFF",
            PENDING : "#F1F4F9",
            FILED : "#D9E1E7"
        },
        text: {
            TO_BE_PAID : "#000000",
            PAID : "#00B894",
            LITIGATION : "#EE5A5A",
            NEW : "#0090FF",
            PENDING : "#99B2C6",
            FILED : "#809FB8"
        }
    },
    device : {
        mobileS: `(min-width: ${size.mobileS})`,
        mobileM: `(min-width: ${size.mobileM})`,
        mobileL: `(min-width: ${size.mobileL})`,
        tablet: `(min-width: ${size.tablet})`,
        laptop: `(min-width: ${size.laptop})`,
        laptopL: `(min-width: ${size.laptopL})`,
        desktop: `(min-width: ${size.desktop})`,
        desktopL: `(min-width: ${size.desktop})`
    },
    size : {
        mobileS: '320px',
        mobileM: '375px',
        mobileL: '425px',
        tablet: '768px',
        laptop: '1024px',
        laptopL: '1440px',
        desktop: '2560px'
    }
}

export default theme;