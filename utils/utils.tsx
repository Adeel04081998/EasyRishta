import { Alert, Dimensions, Platform, StatusBar } from 'react-native';

export const getSize = (size: number) => size;

export const check_for_vendor = 1;
export const check_for_customer = 2;

/** Dimensions */
export const width_screen = Dimensions.get('window').width;
export const height_screen = Dimensions.get('window').height;
export const width_ = Dimensions.get('screen').width;
export const height_ = Dimensions.get('screen').height;

export const checkPlatform = Platform.OS;
export const StatusBarHeight = StatusBar.currentHeight;

/* Colors */
export const colors = {
    colorPrimary: '#980303',
    colorSecondary: '#0075FF',
    colorSecondaryOf: '#0057FF',

    lightBlueBack: '#1FAAFF',
    lightWhiteColor: '#E5E5E5',

    greylighColor: '#C4C4C4',
    greydarkColor: '#77818C',
    secondaryDarkColor: '#397CFF',
    secondaryMediumColor: '#68A5FF',
    secondaryLightColor: '#EBF2FF',
    mapTopBack: '#1678F9',

    extraDarkColor: '#0B141F',
    highDarkColor: '#414F60',
    mediumDarkColor: '#8FA0B4',
    lightDarkColor: '#AAB7C6',

    extraLightColor: '#F3F5F9',

    blackColor: '#000000',
    borderColors: '#0075FF26',
    whiteColor: '#ffffff',
    whiteDimColor: '#ffffff29',
    backColorOfGrey: '#F2F2F2',

    colorError: '#FF3737',
    yellowColor: '#FFD04E',
    greenColor: '#148352',
    clackHeadColor: '#2D2C2C',
    greySubHeadColor: '#8B8B8B',
    greenImg: '#03433D',
    grayBttNColor: '#66D8D8D8',
    updateBtnBackColor: '#D8D8D8',
    greyBtnTextColor: '#838383',
    bggreylightColor: '#F5F4F9',
    orangeColor: '#FF8C00',
    btnBackColor: '#00854A',
    redLightColor: '#DCC4C4',
    circleSizeSmall: getSize(50),
    circleSizeMedium: getSize(60),
};

/**Fonts Size */
export const fontSize = {
    fontSizeH1: getSize(23),
    fontSizeH2: getSize(18),
    fontSizeH3: getSize(16),
    fontSizeBodyLarge: getSize(16),
    fontSizeBodyMedium: getSize(12),
    fontSizeBodySmall: getSize(10),
};

/**Fonts Family */
export const fontFamilyStyles = {
    fontDomineBold: "dominebold",
    fontMetroPolisRegular: 'metropolisregular',
    fontPopinsRegular: 'Poppins-Regular',
    fontPopinsBold: 'Poppins-Bold',
};

/** scaling */
export const scaling = {
    UIPaddingHorizontal: '6%',
    UIPaddingVertical: '6%',
    tineScale: height_screen * 0.005,
    firstScale: height_screen * 0.01,
    secondScale: height_screen * 0.015,
    thirdScale: height_screen * 0.02,
    fourScale: height_screen * 0.025,
    fiveScale: height_screen * 0.03,
    sixScale: height_screen * 0.04,
    iosTopPadding: height_screen * 0.05,
    iosTopPadding_firstScale: height_screen * 0.03,
};

/**Border Raduius */
export const borderRadius = {
    borderRadiusXSmall: getSize(3),
    borderRadiusSmall: getSize(8),
    borderRadiusMedium: getSize(10),
    borderRadiusLarge: getSize(30),
    borderRadiusXLarge: getSize(100),
};

export const dummy = {
    dummyUrl: 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png'
}

/**
 * Shadow Styles
 */
export const shadowStyling = {
    shadowStyle: (intensity: number) => ({
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: intensity / 2,
        },
        shadowOpacity: 0.3,
        shadowRadius: intensity * 0.7,
        elevation: intensity,
    }),
};

export const circleStyles = {
    circleStyle: (size: any) => ({
        width: size,
        height: size,
        borderRadius: size,
        alignItems: 'center',
        justifyContent: 'center',
    }),
};

/**
 *
 * Check Empty Array
 */
export const isArrayCheck = (arr: string | any[]) => {
    return Array.isArray(arr) && arr.length > 0;
};

export function range(start: any, end: number) {
    var foo = [];
    for (var i = start; i <= end; i++) {
        foo.push(i);
    }
    return foo;
}
/**
 * Console Log
 */
export const Log = (key = '', value: any) => {
    console.log(key + ' : ', value);
};

/**
 * Alrt Dialog
 */
export const alertMessage = (showText: any, headerText = '') => {
    Alert.alert(headerText, showText);
};

/**
 * Regex
 */
export const EMAIL_REGEX =
    /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

export const PASSWORD_REGEX = /(?=.*[a-z])(?=.*\d)/i;


export const formatAMPM = (date: any) => {
    var hours = date.getHours();
    var minutes = date.getMinutes();
    var ampm = hours >= 12 ? 'pm' : 'am';
    hours = hours % 12;
    hours = hours ? hours : 12; // the hour '0' should be '12'
    minutes = minutes < 10 ? '0' + minutes : minutes;
    var strTime = hours + ':' + minutes + ' ' + ampm;
    return strTime;
}