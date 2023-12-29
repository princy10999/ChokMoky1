import { createTheme } from "@mui/material/styles";

const red = "#BD3D3D";
const white = "#FFFFFF";
const transparent = "ffffff00";
export default createTheme({
  breakpoints: {
    values: {
      xSmall: 320,
      small: 360,
      smartPhone: 385,
      xiph:400,
      iph: 480,
      mobile: 575,
      xTab: 600,
      stab: 650,
      mTab:700,
      tab: 767,
      BigTab:790,
      laptop: 991,
      smallLaptop: 1081,
      xDesktop: 1278,
      mLaptop: 1235,
      sDesktop: 1097,
      desktop: 1199,
      xlDesktop: 1375,
      xxlDesktop: 1500,
    },
  },
  palette: {
    common: {
      red: `${red}`,
      white: `${white}`,
      transparent: `${transparent}`,
    },
    primary: {
      main: `${red}`,
    },
    secondary: {
      main: `${white}`,
    },
  },
});
