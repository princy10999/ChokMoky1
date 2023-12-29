import * as React from "react";
import anime from "animejs/lib/anime.es.js";
import { Box } from "@mui/material";

const SVGComponent = (props) => {
  const [firstSvgAnimation, setFirstSvgAnimation] = React.useState(false);
  React.useEffect(() => {
    anime({
      targets: "#animate path",
      strokeDashoffset: [anime.setDashoffset, 0],
      easing: "easeInOutSine",
      duration: 18000,
      delay: function (el, i) {
        return i * 500;
      },
      direction: "alternate",
      loop: true,
    });
  }, []);
  React.useEffect(() => {
    setTimeout(() => {
      setFirstSvgAnimation(true);
    }, 3000);
  }, []);
  return (
    <Box
      className={`${firstSvgAnimation ? "svg" : "firstSvgAnimation"}`}
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        width: "100%",
        height: "100%",
        position: "fixed",
        right: "0",
        top: "0",
        left: "0",
        bottom: "0",
        zIndex: "9999",
        overflow: "hidden",
        bgcolor: "whitesmoke",
        paddingLeft: "15px",
        paddingRight: "15px",
      }}
    >
      <svg
        width={1300}
        height={480}
        viewBox="0 0 1288 480"
        fill="white"
        id="animate"
        xmlns="http://www.w3.org/2000/svg"
        {...props}
      >
        <mask id="path-1-inside-1_15_11" fill="white">
          <path d="M242.55 300.17C243.62 300.76 243.16 304.29 242.22 311.35C241.664 315.554 240.859 319.722 239.81 323.83C236.05 340.32 229.62 356.49 222.19 371.66C214.762 386.838 205.849 401.241 195.58 414.66C185.523 427.809 174.195 439.934 161.76 450.86C148.76 462.27 134.16 472.54 117.43 476.94C81.2301 486.46 41.8701 465.3 21.7201 433.76C1.5701 402.22 -2.2799 362.76 1.0801 325.46C6.0001 271.86 24.6901 220.46 46.8501 171.46C71.0001 118 100.43 65.2305 144.66 26.6105C158.49 14.4805 174.33 3.61047 192.44 0.67047C210.55 -2.26953 231.26 4.52047 240.06 20.6705C250.06 38.9505 242.19 61.4405 234.24 80.6705L199.67 164.35C195.72 173.92 191.32 184.05 182.67 189.78C174.02 195.51 159.95 194.09 156.09 184.49C152.77 176.23 158.31 167.32 163.32 159.95C188.682 122.575 206.39 80.5465 215.42 36.2905C216.64 30.2905 216.82 22.5305 211.31 19.9605C206.77 17.8405 201.61 21.0205 197.69 24.1405C136 73.2005 97.3401 145.68 68.5801 219.16C44.1001 281.73 25.3801 350.68 42.8301 415.57C47.3601 432.42 56.3701 450.57 73.1801 455.24C83.6201 458.14 94.7701 455.05 104.72 450.78C119.409 444.339 132.999 435.641 145 425C157.1 414.251 168.043 402.266 177.65 389.24C187.431 376.066 196.445 362.34 204.65 348.13C205.01 347.51 206.65 344.43 209.16 340.37C209.16 340.37 210.98 337.37 212.9 334.48C216.06 329.54 238.09 297.7 242.55 300.17ZM403.65 356.46C410.56 369.58 423.86 372.28 434.52 372.82H434.63C443.109 373.108 451.476 370.821 458.63 366.26C475.69 355.56 485.68 335.87 492.5 317.6C496.4 307.08 500.8 293.83 498.25 282.51C494.61 266.36 475.79 255.75 461.03 251.63C451.13 248.87 439.67 249.15 430.76 254.73C423.6 259.22 418.26 266.13 413.92 273.26C402.92 291.26 392.56 316.48 397.38 338.26C398.541 344.609 400.654 350.745 403.65 356.46ZM472.31 303.18C468.879 315.116 463.573 326.431 456.59 336.7C453.08 341.91 449.11 346.93 443.98 350.56C439.48 353.74 430.9 357.28 424.98 355.44C418.34 353.38 418.32 345.34 419.08 339.66C421.044 326.055 424.898 312.79 430.53 300.25C435.65 288.59 441.61 276.65 450.66 267.52C453.98 264.17 458.82 259.93 463.86 260.26C471.86 260.78 475.16 270.81 475.86 277.44C476.69 286.12 474.65 294.88 472.31 303.18ZM907.31 353.61C909.791 359.216 913.435 364.23 918 368.32C919.951 370.101 922.067 371.692 924.32 373.07C929.664 376.098 935.637 377.847 941.77 378.18H941.88C950.358 378.471 958.725 376.187 965.88 371.63C982.94 360.92 992.94 341.24 999.75 322.96C1003.65 312.46 1008.01 299.21 1005.5 287.89C1001.86 271.74 983.04 261.12 968.28 257.01C958.38 254.25 946.92 254.52 938.01 260.11C930.85 264.59 925.51 271.5 921.17 278.63C921.17 278.63 904.51 303.89 903.47 329.79C903.274 335.552 903.835 341.315 905.14 346.93C905.689 349.214 906.425 351.448 907.34 353.61H907.31ZM979.5 308.56C976.073 320.496 970.77 331.81 963.79 342.08C960.27 347.29 956.3 352.31 951.17 355.94C946.67 359.12 938.09 362.66 932.17 360.82C925.53 358.76 925.51 350.72 926.27 345.03C928.234 331.425 932.088 318.16 937.72 305.62C942.86 294 948.82 282 957.88 272.9C961.19 269.55 966.03 265.3 971.07 265.63C979.07 266.15 982.37 276.19 983.07 282.82C983.91 291.49 981.88 300.26 979.53 308.56H979.5ZM681.19 354.29C680.82 350.71 682.02 348.29 678.51 348.85C673.87 349.59 673.51 349.1 669.96 349.34C635.96 351.66 601.81 347.57 567.96 344.41C551.02 342.84 567.57 325.91 572.55 319.36C596.81 287.46 626.87 258.74 663.95 242.92C668.08 241.16 673.16 238.08 672.19 233.65C671.666 232.006 670.701 230.536 669.4 229.4C663.92 223.73 657.01 217.9 649.25 218.98C644.92 219.59 641.2 222.28 637.71 224.98C623.45 235.89 610.27 246.21 597.41 258.81C592.47 263.7 579.34 277.62 567.11 291.72C567.86 280.57 578.18 260.44 582.03 250.05C586.03 239.16 590.42 228.4 594.12 217.39C602.18 193.43 610.107 169.43 617.9 145.39C629.38 109.93 642.8 72.0005 640.3 34.2005C639.93 28.6405 639.16 23.0105 636.92 17.9105C631.18 5.00047 614.71 -0.99953 601.8 4.00047C590.67 8.36047 583.52 19.2805 578.1 29.4905C564.18 55.7905 556.1 83.7105 547.27 111.98C543.71 123.38 540.253 136.78 536.9 152.18C536.14 155.69 535.3 159.18 534.53 162.7C517.24 241.36 510.09 321.58 515.7 402C515.99 406.29 516.39 410.75 518.59 414.43C521.77 419.74 528 422.23 533.89 423.95C535.541 424.497 537.255 424.833 538.99 424.95C540.749 425.1 542.503 424.61 543.93 423.57C547.05 421.15 546.99 416.46 546.64 412.5C545.25 397.15 543.49 379.28 542.11 363.94C587.53 371.36 634.66 370.09 678.2 361.94C683.05 361.06 681.69 359 681.19 354.29ZM556.85 218.35C567.058 155.179 583.784 93.2346 606.76 33.5105C608.92 27.9405 616.66 14.9105 622.12 24.1905C625.35 29.6905 624.12 39.0805 623.85 45.0905C623.173 59.2797 621.188 73.3761 617.92 87.2005C615.92 95.6305 613.48 103.97 610.92 112.28C605.92 128.75 601.11 145.28 596.02 161.71C588.21 186.71 580.02 211.52 569.32 235.48C563.63 248.26 558.05 261.32 551.32 273.63C551.16 258 554.31 233.85 556.85 218.35ZM1194.35 355.35C1193.98 351.77 1195.19 349.35 1191.63 349.91C1186.93 350.65 1186.56 350.16 1182.97 350.4C1148.6 352.72 1113.97 348.63 1079.67 345.48C1062.51 343.9 1079.27 326.97 1084.31 320.42C1108.87 288.52 1139.31 259.8 1176.86 243.99C1181.04 242.22 1186.18 239.15 1185.2 234.72C1184.67 233.07 1183.69 231.597 1182.38 230.46C1176.83 224.79 1169.84 218.97 1161.97 220.05C1157.59 220.65 1153.82 223.34 1150.29 226.05C1135.85 236.96 1122.5 247.28 1109.49 259.89C1104.49 264.78 1091.18 278.69 1078.81 292.79C1079.56 281.65 1090.01 261.51 1093.92 251.12C1098.01 240.24 1102.4 229.47 1106.15 218.46C1114.31 194.52 1122.34 170.52 1130.23 146.46C1141.85 111.03 1155.44 73.1505 1152.91 35.3005C1152.54 29.7405 1151.76 24.1105 1149.49 19.0205C1143.71 6.08047 1127 0.0704703 1114 5.11047C1102.73 9.47047 1095.49 20.3905 1090 30.6005C1075.9 56.9005 1067.71 84.8205 1058.79 113.09C1055.19 124.49 1051.69 137.89 1048.29 153.29C1047.51 156.8 1046.67 160.29 1045.88 163.82C1028.37 242.47 1021.12 322.69 1026.8 403.15C1027.1 407.44 1027.5 411.91 1029.73 415.58C1032.95 420.89 1039.26 423.38 1045.23 425.11C1046.91 425.657 1048.64 425.993 1050.4 426.11C1052.18 426.255 1053.95 425.767 1055.4 424.73C1058.55 422.31 1058.49 417.62 1058.13 413.66C1056.73 398.32 1054.95 380.45 1053.55 365.1C1099.55 372.52 1147.27 371.25 1191.36 363.1C1196.25 362.19 1194.87 360.1 1194.36 355.41L1194.35 355.35ZM1067.9 219.47C1078.1 156.298 1094.83 94.3532 1117.81 34.6305C1119.97 29.0505 1127.71 16.0205 1133.17 25.3105C1136.4 30.8105 1135.17 40.1905 1134.9 46.2005C1134.23 60.3883 1132.25 74.4843 1129 88.3105C1122.86 113.48 1113.76 137.8 1107.38 162.89L1101.08 180.59C1095.65 200.31 1089.02 219.7 1079.67 237.93C1074.33 248.36 1068.02 264.56 1062.5 274.74C1062.21 259.14 1065.36 235 1067.9 219.47ZM903.59 317.58C903.57 314.92 903.34 312.265 902.9 309.64C902.5 307.12 902.4 303.71 901.02 301.41C899.48 298.84 896.85 299.24 895.23 301.41C891.8 305.93 891.12 311.95 889.87 317.41C888.91 321.673 887.442 325.806 885.5 329.72C884.78 331.187 883.993 332.61 883.14 333.99C879.99 339.12 875.67 344.88 870.05 346.77C864.78 348.55 862.34 343.17 860.26 338.96C858.459 335.28 856.964 331.457 855.79 327.53C853.533 319.653 851.796 311.636 850.59 303.53C849.11 294.81 847.83 286.05 845.71 277.47C843.87 269.83 841.64 261.07 835.65 256C825.49 247.39 809.8 251.63 801.09 260.46C796.29 265.32 793.2 272.46 790.34 278.86C787.74 284.65 785.75 290.81 782.86 296.46C781.71 298.75 780.32 299.53 779.41 296.55C777.35 289.82 775.9 282.9 774.15 276.08C772.61 270.08 771.51 263.43 768.54 258.08C765.13 251.89 759.2 248.52 752.8 247.39C747.29 246.39 740.7 246.26 735.34 248.05C731.464 249.35 728.179 251.992 726.08 255.5C724.787 257.868 723.664 260.324 722.72 262.85C721.21 266.53 719.85 270.34 718.03 273.85C717.29 275.28 715.64 277.95 715.11 274.85C713.32 264.46 717.04 251.6 719.85 240.96C721.29 235.53 722.85 228.86 716.91 225.64C716.202 225.271 715.453 224.982 714.68 224.78C708.439 223.122 701.933 222.701 695.53 223.54C694.068 223.597 692.665 224.127 691.53 225.05C690.15 226.39 689.85 228.58 689.7 230.58C684.807 278.58 682.183 326.75 681.83 375.09C681.804 376.623 682.147 378.139 682.83 379.51C683.248 380.518 683.863 381.432 684.639 382.198C685.415 382.964 686.337 383.566 687.35 383.97C695.88 386.97 703.9 388.24 712.94 386.72C713.56 373.27 714.59 359.54 717.54 346.44C719.9 336.13 722.03 324.85 724.74 314.66C724.74 314.66 729.26 298.33 731.06 291.93L734.55 282.93C738.22 273.37 743.14 257.34 747.18 264.74C753.74 276.8 747.86 319.09 764.79 339.24C767.55 342.49 771.23 345.01 775.25 345.24C780.59 345.55 785.55 341.78 788.62 337.01C791.69 332.24 793.22 326.56 794.95 321.01C800.53 302.72 804.43 283.01 817.07 270.2C822.27 264.91 825.53 294.61 827.9 308.3C830.27 321.99 833.81 336.02 842.74 345.87C849.24 353.03 858.05 357.41 866.99 359.54C873.12 361.01 879.3 361.74 885.37 359.4C887.42 358.619 889.349 357.551 891.1 356.23C895.465 352.846 898.726 348.241 900.47 343C903.23 335.26 903.8 326.74 903.59 318.52V317.58ZM1286.07 267.14C1286.36 267.621 1286.62 268.119 1286.85 268.63C1287.5 270.176 1287.84 271.834 1287.85 273.51C1288.08 283.36 1285.38 295.1 1282.13 304.94C1276.01 323.49 1271.86 332.41 1265.62 345.94C1258.94 360.4 1255.04 365.6 1244.11 371.53C1239.91 373.834 1235.12 374.872 1230.34 374.517C1225.56 374.162 1220.99 372.43 1217.17 369.53C1209.17 363.43 1203.98 354.35 1200.44 344.96C1192.86 324.8 1192.24 302.72 1193.29 281.22C1193.77 268.908 1195.13 256.646 1197.38 244.53C1197.87 241.911 1199.21 239.526 1201.19 237.74C1203.36 235.747 1206.2 234.662 1209.15 234.711C1212.09 234.759 1214.9 235.937 1217 238C1224.16 244.59 1221.42 257.89 1220.15 265.83C1216.72 287.35 1213.83 311 1217.37 332.45C1218.37 338.25 1220.78 346.56 1223.86 351.56C1226.86 356.39 1231.35 358.88 1234.07 358.24C1240.38 356.76 1245.64 351.63 1248.36 347.67C1261.92 327.83 1267.03 300.08 1271.94 276.54C1272.37 273.86 1272.97 271.209 1273.72 268.6C1274.13 267.363 1274.89 266.27 1275.91 265.449C1276.92 264.628 1278.15 264.113 1279.45 263.965C1280.74 263.817 1282.05 264.042 1283.23 264.613C1284.4 265.184 1285.39 266.078 1286.07 267.19V267.14ZM1230.21 211.8C1227.67 212.49 1224.14 211.09 1222.02 210.47C1214.82 208.35 1208.85 205.22 1206.87 197.31C1205.38 191.4 1206.65 185.11 1208.87 179.45C1209.38 177.777 1210.38 176.296 1211.75 175.2C1212.97 174.506 1214.34 174.109 1215.75 174.04C1219.35 173.621 1222.98 173.43 1226.61 173.47C1229.81 173.47 1232.61 174.68 1233.81 177.84C1234.32 179.375 1234.59 180.975 1234.63 182.59C1234.89 188.56 1234.76 194.54 1234.22 200.49C1234.04 203.85 1234.41 210.72 1230.22 211.85L1230.21 211.8ZM395.26 324.92C395.088 324.715 394.89 324.534 394.67 324.38C393.801 323.864 392.795 323.628 391.787 323.705C390.78 323.782 389.82 324.168 389.04 324.81C384.61 328.47 381.36 333.42 378.34 338.23C370.7 350.41 362.72 363.64 355.86 351.83C349.18 340.33 351 320.73 350.08 307.52L346.49 256C345.61 243.24 338.03 230.63 325.42 235.46C311.2 240.91 302.64 262.35 297.02 276.73C290.38 293.73 285.8 311.63 280.66 329.26C279.17 334.36 274.03 345.66 274.86 350.77C272.24 334.61 269.62 317.86 273.11 301.91C277.82 280.15 290.56 258.44 299.66 238.64C308.58 219.24 315.75 202.34 321.17 187.94C333.12 156.2 342.88 123.28 348.86 89.3705C353.49 63.1305 363.45 17.9305 335.62 3.19047C321.93 -3.99953 305 3.73047 295.18 16.7605C283.53 32.0505 279.6 52.3705 274.43 71.1705C268.25 93.6105 262.81 116.31 258.34 139.28C250.513 178.72 246.329 218.795 245.84 259L245.58 289C245.58 318 246.98 340 249.78 355C253.62 377.6 266.22 404.3 267.61 405.7C268.974 407.078 270.577 408.196 272.34 409C273.9 409.757 275.606 410.166 277.34 410.2C278.262 410.216 279.17 409.97 279.959 409.493C280.748 409.015 281.386 408.325 281.8 407.5C283.72 404.5 285.387 397.4 286.8 386.2C287.742 376.524 289.231 366.909 291.26 357.4C295.37 338.95 299.34 320.57 303.77 302.21C304.57 298.89 305.37 295.56 306.34 292.3C308.86 283.87 312.71 273.57 318.22 266.13C318.47 265.769 318.797 265.467 319.177 265.246C319.557 265.025 319.981 264.89 320.419 264.851C320.857 264.812 321.298 264.869 321.711 265.02C322.125 265.17 322.5 265.409 322.81 265.72C323.177 266.09 323.466 266.529 323.662 267.011C323.858 267.493 323.956 268.01 323.95 268.53C323.902 281.933 324.569 295.329 325.95 308.66C327.71 325 330 342 338.39 355.27C345.7 366.79 359.39 374.97 371.8 370.27C379.26 367.45 383.94 360.48 387.51 353.76C389.955 349.203 391.964 344.425 393.51 339.49C394.29 336.984 394.957 334.444 395.51 331.87C395.89 329.75 396.85 326.79 395.26 324.92ZM276.66 249.64C277.527 230.7 279.48 207.81 282.52 180.97C285.755 152.979 290.664 125.205 297.22 97.8005C300.671 82.7328 304.961 67.8696 310.07 53.2805C312.22 47.2805 314.28 41.2805 316.67 35.3505C320.14 26.7605 328.27 6.35047 335.28 23.9105C340.41 36.7405 338.28 51.2305 337.53 65.3505C334.53 121.59 315.59 176.28 293.85 225.88C290.85 232.79 287.85 239.64 284.73 246.43L275.88 265.67L276.66 249.64Z" />
        </mask>
        <path
          d="M242.55 300.17C243.62 300.76 243.16 304.29 242.22 311.35C241.664 315.554 240.859 319.722 239.81 323.83C236.05 340.32 229.62 356.49 222.19 371.66C214.762 386.838 205.849 401.241 195.58 414.66C185.523 427.809 174.195 439.934 161.76 450.86C148.76 462.27 134.16 472.54 117.43 476.94C81.2301 486.46 41.8701 465.3 21.7201 433.76C1.5701 402.22 -2.2799 362.76 1.0801 325.46C6.0001 271.86 24.6901 220.46 46.8501 171.46C71.0001 118 100.43 65.2305 144.66 26.6105C158.49 14.4805 174.33 3.61047 192.44 0.67047C210.55 -2.26953 231.26 4.52047 240.06 20.6705C250.06 38.9505 242.19 61.4405 234.24 80.6705L199.67 164.35C195.72 173.92 191.32 184.05 182.67 189.78C174.02 195.51 159.95 194.09 156.09 184.49C152.77 176.23 158.31 167.32 163.32 159.95C188.682 122.575 206.39 80.5465 215.42 36.2905C216.64 30.2905 216.82 22.5305 211.31 19.9605C206.77 17.8405 201.61 21.0205 197.69 24.1405C136 73.2005 97.3401 145.68 68.5801 219.16C44.1001 281.73 25.3801 350.68 42.8301 415.57C47.3601 432.42 56.3701 450.57 73.1801 455.24C83.6201 458.14 94.7701 455.05 104.72 450.78C119.409 444.339 132.999 435.641 145 425C157.1 414.251 168.043 402.266 177.65 389.24C187.431 376.066 196.445 362.34 204.65 348.13C205.01 347.51 206.65 344.43 209.16 340.37C209.16 340.37 210.98 337.37 212.9 334.48C216.06 329.54 238.09 297.7 242.55 300.17ZM403.65 356.46C410.56 369.58 423.86 372.28 434.52 372.82H434.63C443.109 373.108 451.476 370.821 458.63 366.26C475.69 355.56 485.68 335.87 492.5 317.6C496.4 307.08 500.8 293.83 498.25 282.51C494.61 266.36 475.79 255.75 461.03 251.63C451.13 248.87 439.67 249.15 430.76 254.73C423.6 259.22 418.26 266.13 413.92 273.26C402.92 291.26 392.56 316.48 397.38 338.26C398.541 344.609 400.654 350.745 403.65 356.46ZM472.31 303.18C468.879 315.116 463.573 326.431 456.59 336.7C453.08 341.91 449.11 346.93 443.98 350.56C439.48 353.74 430.9 357.28 424.98 355.44C418.34 353.38 418.32 345.34 419.08 339.66C421.044 326.055 424.898 312.79 430.53 300.25C435.65 288.59 441.61 276.65 450.66 267.52C453.98 264.17 458.82 259.93 463.86 260.26C471.86 260.78 475.16 270.81 475.86 277.44C476.69 286.12 474.65 294.88 472.31 303.18ZM907.31 353.61C909.791 359.216 913.435 364.23 918 368.32C919.951 370.101 922.067 371.692 924.32 373.07C929.664 376.098 935.637 377.847 941.77 378.18H941.88C950.358 378.471 958.725 376.187 965.88 371.63C982.94 360.92 992.94 341.24 999.75 322.96C1003.65 312.46 1008.01 299.21 1005.5 287.89C1001.86 271.74 983.04 261.12 968.28 257.01C958.38 254.25 946.92 254.52 938.01 260.11C930.85 264.59 925.51 271.5 921.17 278.63C921.17 278.63 904.51 303.89 903.47 329.79C903.274 335.552 903.835 341.315 905.14 346.93C905.689 349.214 906.425 351.448 907.34 353.61H907.31ZM979.5 308.56C976.073 320.496 970.77 331.81 963.79 342.08C960.27 347.29 956.3 352.31 951.17 355.94C946.67 359.12 938.09 362.66 932.17 360.82C925.53 358.76 925.51 350.72 926.27 345.03C928.234 331.425 932.088 318.16 937.72 305.62C942.86 294 948.82 282 957.88 272.9C961.19 269.55 966.03 265.3 971.07 265.63C979.07 266.15 982.37 276.19 983.07 282.82C983.91 291.49 981.88 300.26 979.53 308.56H979.5ZM681.19 354.29C680.82 350.71 682.02 348.29 678.51 348.85C673.87 349.59 673.51 349.1 669.96 349.34C635.96 351.66 601.81 347.57 567.96 344.41C551.02 342.84 567.57 325.91 572.55 319.36C596.81 287.46 626.87 258.74 663.95 242.92C668.08 241.16 673.16 238.08 672.19 233.65C671.666 232.006 670.701 230.536 669.4 229.4C663.92 223.73 657.01 217.9 649.25 218.98C644.92 219.59 641.2 222.28 637.71 224.98C623.45 235.89 610.27 246.21 597.41 258.81C592.47 263.7 579.34 277.62 567.11 291.72C567.86 280.57 578.18 260.44 582.03 250.05C586.03 239.16 590.42 228.4 594.12 217.39C602.18 193.43 610.107 169.43 617.9 145.39C629.38 109.93 642.8 72.0005 640.3 34.2005C639.93 28.6405 639.16 23.0105 636.92 17.9105C631.18 5.00047 614.71 -0.99953 601.8 4.00047C590.67 8.36047 583.52 19.2805 578.1 29.4905C564.18 55.7905 556.1 83.7105 547.27 111.98C543.71 123.38 540.253 136.78 536.9 152.18C536.14 155.69 535.3 159.18 534.53 162.7C517.24 241.36 510.09 321.58 515.7 402C515.99 406.29 516.39 410.75 518.59 414.43C521.77 419.74 528 422.23 533.89 423.95C535.541 424.497 537.255 424.833 538.99 424.95C540.749 425.1 542.503 424.61 543.93 423.57C547.05 421.15 546.99 416.46 546.64 412.5C545.25 397.15 543.49 379.28 542.11 363.94C587.53 371.36 634.66 370.09 678.2 361.94C683.05 361.06 681.69 359 681.19 354.29ZM556.85 218.35C567.058 155.179 583.784 93.2346 606.76 33.5105C608.92 27.9405 616.66 14.9105 622.12 24.1905C625.35 29.6905 624.12 39.0805 623.85 45.0905C623.173 59.2797 621.188 73.3761 617.92 87.2005C615.92 95.6305 613.48 103.97 610.92 112.28C605.92 128.75 601.11 145.28 596.02 161.71C588.21 186.71 580.02 211.52 569.32 235.48C563.63 248.26 558.05 261.32 551.32 273.63C551.16 258 554.31 233.85 556.85 218.35ZM1194.35 355.35C1193.98 351.77 1195.19 349.35 1191.63 349.91C1186.93 350.65 1186.56 350.16 1182.97 350.4C1148.6 352.72 1113.97 348.63 1079.67 345.48C1062.51 343.9 1079.27 326.97 1084.31 320.42C1108.87 288.52 1139.31 259.8 1176.86 243.99C1181.04 242.22 1186.18 239.15 1185.2 234.72C1184.67 233.07 1183.69 231.597 1182.38 230.46C1176.83 224.79 1169.84 218.97 1161.97 220.05C1157.59 220.65 1153.82 223.34 1150.29 226.05C1135.85 236.96 1122.5 247.28 1109.49 259.89C1104.49 264.78 1091.18 278.69 1078.81 292.79C1079.56 281.65 1090.01 261.51 1093.92 251.12C1098.01 240.24 1102.4 229.47 1106.15 218.46C1114.31 194.52 1122.34 170.52 1130.23 146.46C1141.85 111.03 1155.44 73.1505 1152.91 35.3005C1152.54 29.7405 1151.76 24.1105 1149.49 19.0205C1143.71 6.08047 1127 0.0704703 1114 5.11047C1102.73 9.47047 1095.49 20.3905 1090 30.6005C1075.9 56.9005 1067.71 84.8205 1058.79 113.09C1055.19 124.49 1051.69 137.89 1048.29 153.29C1047.51 156.8 1046.67 160.29 1045.88 163.82C1028.37 242.47 1021.12 322.69 1026.8 403.15C1027.1 407.44 1027.5 411.91 1029.73 415.58C1032.95 420.89 1039.26 423.38 1045.23 425.11C1046.91 425.657 1048.64 425.993 1050.4 426.11C1052.18 426.255 1053.95 425.767 1055.4 424.73C1058.55 422.31 1058.49 417.62 1058.13 413.66C1056.73 398.32 1054.95 380.45 1053.55 365.1C1099.55 372.52 1147.27 371.25 1191.36 363.1C1196.25 362.19 1194.87 360.1 1194.36 355.41L1194.35 355.35ZM1067.9 219.47C1078.1 156.298 1094.83 94.3532 1117.81 34.6305C1119.97 29.0505 1127.71 16.0205 1133.17 25.3105C1136.4 30.8105 1135.17 40.1905 1134.9 46.2005C1134.23 60.3883 1132.25 74.4843 1129 88.3105C1122.86 113.48 1113.76 137.8 1107.38 162.89L1101.08 180.59C1095.65 200.31 1089.02 219.7 1079.67 237.93C1074.33 248.36 1068.02 264.56 1062.5 274.74C1062.21 259.14 1065.36 235 1067.9 219.47ZM903.59 317.58C903.57 314.92 903.34 312.265 902.9 309.64C902.5 307.12 902.4 303.71 901.02 301.41C899.48 298.84 896.85 299.24 895.23 301.41C891.8 305.93 891.12 311.95 889.87 317.41C888.91 321.673 887.442 325.806 885.5 329.72C884.78 331.187 883.993 332.61 883.14 333.99C879.99 339.12 875.67 344.88 870.05 346.77C864.78 348.55 862.34 343.17 860.26 338.96C858.459 335.28 856.964 331.457 855.79 327.53C853.533 319.653 851.796 311.636 850.59 303.53C849.11 294.81 847.83 286.05 845.71 277.47C843.87 269.83 841.64 261.07 835.65 256C825.49 247.39 809.8 251.63 801.09 260.46C796.29 265.32 793.2 272.46 790.34 278.86C787.74 284.65 785.75 290.81 782.86 296.46C781.71 298.75 780.32 299.53 779.41 296.55C777.35 289.82 775.9 282.9 774.15 276.08C772.61 270.08 771.51 263.43 768.54 258.08C765.13 251.89 759.2 248.52 752.8 247.39C747.29 246.39 740.7 246.26 735.34 248.05C731.464 249.35 728.179 251.992 726.08 255.5C724.787 257.868 723.664 260.324 722.72 262.85C721.21 266.53 719.85 270.34 718.03 273.85C717.29 275.28 715.64 277.95 715.11 274.85C713.32 264.46 717.04 251.6 719.85 240.96C721.29 235.53 722.85 228.86 716.91 225.64C716.202 225.271 715.453 224.982 714.68 224.78C708.439 223.122 701.933 222.701 695.53 223.54C694.068 223.597 692.665 224.127 691.53 225.05C690.15 226.39 689.85 228.58 689.7 230.58C684.807 278.58 682.183 326.75 681.83 375.09C681.804 376.623 682.147 378.139 682.83 379.51C683.248 380.518 683.863 381.432 684.639 382.198C685.415 382.964 686.337 383.566 687.35 383.97C695.88 386.97 703.9 388.24 712.94 386.72C713.56 373.27 714.59 359.54 717.54 346.44C719.9 336.13 722.03 324.85 724.74 314.66C724.74 314.66 729.26 298.33 731.06 291.93L734.55 282.93C738.22 273.37 743.14 257.34 747.18 264.74C753.74 276.8 747.86 319.09 764.79 339.24C767.55 342.49 771.23 345.01 775.25 345.24C780.59 345.55 785.55 341.78 788.62 337.01C791.69 332.24 793.22 326.56 794.95 321.01C800.53 302.72 804.43 283.01 817.07 270.2C822.27 264.91 825.53 294.61 827.9 308.3C830.27 321.99 833.81 336.02 842.74 345.87C849.24 353.03 858.05 357.41 866.99 359.54C873.12 361.01 879.3 361.74 885.37 359.4C887.42 358.619 889.349 357.551 891.1 356.23C895.465 352.846 898.726 348.241 900.47 343C903.23 335.26 903.8 326.74 903.59 318.52V317.58ZM1286.07 267.14C1286.36 267.621 1286.62 268.119 1286.85 268.63C1287.5 270.176 1287.84 271.834 1287.85 273.51C1288.08 283.36 1285.38 295.1 1282.13 304.94C1276.01 323.49 1271.86 332.41 1265.62 345.94C1258.94 360.4 1255.04 365.6 1244.11 371.53C1239.91 373.834 1235.12 374.872 1230.34 374.517C1225.56 374.162 1220.99 372.43 1217.17 369.53C1209.17 363.43 1203.98 354.35 1200.44 344.96C1192.86 324.8 1192.24 302.72 1193.29 281.22C1193.77 268.908 1195.13 256.646 1197.38 244.53C1197.87 241.911 1199.21 239.526 1201.19 237.74C1203.36 235.747 1206.2 234.662 1209.15 234.711C1212.09 234.759 1214.9 235.937 1217 238C1224.16 244.59 1221.42 257.89 1220.15 265.83C1216.72 287.35 1213.83 311 1217.37 332.45C1218.37 338.25 1220.78 346.56 1223.86 351.56C1226.86 356.39 1231.35 358.88 1234.07 358.24C1240.38 356.76 1245.64 351.63 1248.36 347.67C1261.92 327.83 1267.03 300.08 1271.94 276.54C1272.37 273.86 1272.97 271.209 1273.72 268.6C1274.13 267.363 1274.89 266.27 1275.91 265.449C1276.92 264.628 1278.15 264.113 1279.45 263.965C1280.74 263.817 1282.05 264.042 1283.23 264.613C1284.4 265.184 1285.39 266.078 1286.07 267.19V267.14ZM1230.21 211.8C1227.67 212.49 1224.14 211.09 1222.02 210.47C1214.82 208.35 1208.85 205.22 1206.87 197.31C1205.38 191.4 1206.65 185.11 1208.87 179.45C1209.38 177.777 1210.38 176.296 1211.75 175.2C1212.97 174.506 1214.34 174.109 1215.75 174.04C1219.35 173.621 1222.98 173.43 1226.61 173.47C1229.81 173.47 1232.61 174.68 1233.81 177.84C1234.32 179.375 1234.59 180.975 1234.63 182.59C1234.89 188.56 1234.76 194.54 1234.22 200.49C1234.04 203.85 1234.41 210.72 1230.22 211.85L1230.21 211.8ZM395.26 324.92C395.088 324.715 394.89 324.534 394.67 324.38C393.801 323.864 392.795 323.628 391.787 323.705C390.78 323.782 389.82 324.168 389.04 324.81C384.61 328.47 381.36 333.42 378.34 338.23C370.7 350.41 362.72 363.64 355.86 351.83C349.18 340.33 351 320.73 350.08 307.52L346.49 256C345.61 243.24 338.03 230.63 325.42 235.46C311.2 240.91 302.64 262.35 297.02 276.73C290.38 293.73 285.8 311.63 280.66 329.26C279.17 334.36 274.03 345.66 274.86 350.77C272.24 334.61 269.62 317.86 273.11 301.91C277.82 280.15 290.56 258.44 299.66 238.64C308.58 219.24 315.75 202.34 321.17 187.94C333.12 156.2 342.88 123.28 348.86 89.3705C353.49 63.1305 363.45 17.9305 335.62 3.19047C321.93 -3.99953 305 3.73047 295.18 16.7605C283.53 32.0505 279.6 52.3705 274.43 71.1705C268.25 93.6105 262.81 116.31 258.34 139.28C250.513 178.72 246.329 218.795 245.84 259L245.58 289C245.58 318 246.98 340 249.78 355C253.62 377.6 266.22 404.3 267.61 405.7C268.974 407.078 270.577 408.196 272.34 409C273.9 409.757 275.606 410.166 277.34 410.2C278.262 410.216 279.17 409.97 279.959 409.493C280.748 409.015 281.386 408.325 281.8 407.5C283.72 404.5 285.387 397.4 286.8 386.2C287.742 376.524 289.231 366.909 291.26 357.4C295.37 338.95 299.34 320.57 303.77 302.21C304.57 298.89 305.37 295.56 306.34 292.3C308.86 283.87 312.71 273.57 318.22 266.13C318.47 265.769 318.797 265.467 319.177 265.246C319.557 265.025 319.981 264.89 320.419 264.851C320.857 264.812 321.298 264.869 321.711 265.02C322.125 265.17 322.5 265.409 322.81 265.72C323.177 266.09 323.466 266.529 323.662 267.011C323.858 267.493 323.956 268.01 323.95 268.53C323.902 281.933 324.569 295.329 325.95 308.66C327.71 325 330 342 338.39 355.27C345.7 366.79 359.39 374.97 371.8 370.27C379.26 367.45 383.94 360.48 387.51 353.76C389.955 349.203 391.964 344.425 393.51 339.49C394.29 336.984 394.957 334.444 395.51 331.87C395.89 329.75 396.85 326.79 395.26 324.92ZM276.66 249.64C277.527 230.7 279.48 207.81 282.52 180.97C285.755 152.979 290.664 125.205 297.22 97.8005C300.671 82.7328 304.961 67.8696 310.07 53.2805C312.22 47.2805 314.28 41.2805 316.67 35.3505C320.14 26.7605 328.27 6.35047 335.28 23.9105C340.41 36.7405 338.28 51.2305 337.53 65.3505C334.53 121.59 315.59 176.28 293.85 225.88C290.85 232.79 287.85 239.64 284.73 246.43L275.88 265.67L276.66 249.64Z"
          stroke="black"
          stroke-width="4"
          mask="url(#path-1-inside-1_15_11)"
        />
      </svg>
    </Box>
  );
};
export default SVGComponent;