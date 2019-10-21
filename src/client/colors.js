const palette = {
    black1: '#272727',
    blue1: '#0b0a3a',
    red1: '#a90936',
    white1: '#f7f7f7',
    red2: '#e4547c',
    grey1: '#969696',
    red3: '#f0e2df'
}

const lightTheme = {
    font: palette.black1,
    background: palette.white1,
    title: palette.red1,
    ...palette
}

const darkTheme = {
    font: palette.white1,
    background: palette.black1,
    title: palette.red2,
    ...palette
}

export {
    darkTheme,
    lightTheme
}