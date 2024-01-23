import global from '../assets/scss/global.scss';

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
        // bleuIcd: colors.bleuIcd,
        // bleuSecondaire: colors.bleuSecondaire, 
        // noirLight: colors.noirLight,
        // gris: colors.gris,
        // grisBleu: colors.grisBleu,
        // grisFond: colors.grisFond,
        // vert: colors.vert,
        // rouge:colors.rouge,
        // violet: colors.violet,
        // vertFond: colors.vertFond,
        // backgroundColor:colors.backgroundColor,
        colorIdentity:global.colorIdentity,
        colorPrinc: global.colorPrinc,
        colorSec: global.colorSec,
        colorDefault: global.colorDefault,
        grisBleu:global.grisBleu,
        body: "#f0f8ff",
        text: global.noirLight,
        content: "#ffffff",
        lightBlack: "#505050 !important",
        lightBlue: "#809FB8 !important",
        gris: global.gris,
        icdgray: "#B8B8B8",
        sendBtn : "#6C5CE7",
        cancelBtn : "#809FB8",
        btnBorder : "#D9E1E7",
        btnHover : '#F1F4F9',
        primary : global.bleuIcd,
        secondary : global.bleuSecondaire,
        success : "#00B894",
        danger : '#EE5A5A',
        warning : '#EECC5A',
        redLight : "#EE5A5A66",
        greenLight : "#55EFC466",
        green: "#55EFC4",
        orangeLight : "#EECC5A66",
      

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