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
        body: "#f0f8ff",
        text: "#000000",
        content: "#ffffff",
        lightBlack: "#505050 !important",
        lightBlue: "#809FB8 !important",
        gray: "#D9E1E7",
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
            TO_BE_PAID : "#D9E1E7",
            PAID : "#55EFC466",
            LITIGATION : "#EE5A5A66",
            NEW : "#F5FBFF",
            PENDING : "#F1F4F9",
            FILED : "#D9E1E7",
            REJECTED: "#EE5A5A66",
            REFUSED: "#EE5A5A66",
            ERROR: "#EE5A5A66",
            INTEGRATED: "#D9E1E7"
        },
        text: {
            TO_BE_PAID : "#D9E1E7",
            PAID : "#55EFC466",
            LITIGATION : "#EE5A5A66",
            NEW : "#F5FBFF",
            PENDING : "#F1F4F9",
            FILED : "#D9E1E7",
            REFUSED: "#EE5A5A66",
            REJECTED: "#EE5A5A66",
            ERROR: "#EE5A5A66",
            INTEGRATED: "#D9E1E7"
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