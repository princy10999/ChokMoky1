import * as React from "react";
import Box from "@mui/material/Box";
import FormControl from "@mui/material/FormControl";
import { makeStyles } from "tss-react/mui";
import { Autocomplete, InputAdornment, TextField } from "@mui/material";

const useStyles = makeStyles()((theme) => {
  return {
    selectBox: {
      width: "100%",
      [theme.breakpoints.down("tab")]: {
        marginTop: "10px",
      },
    },
    formCon: {
      width: "100%",
    },
    commslc: {
      width: "100%",
      [`& fieldset`]: {
        borderRadius: "0 !important",
      },
      [`& label`]: {
        fontFamily: "League Spartan !important",
        fontWeight: "400",
        fontSize: "17px",
        letterSpacing: "0.05em",
        textTransform: "capitalize",
        color: "#7E7F84",
        top: "-1px",
        left: "-2px",
        [theme.breakpoints.down("iph")]: {
          fontSize: "16px !important",
        },
      },

      [` & div `]: {
        paddingTop: "3px !important ",
        paddingBottom: "3px !important ",
      },
      [` & div div`]: {
        top: "calc(50% - 17px) !important",
      },
    },
    inputAd: {
      [` & p `]: {
        fontFamily: "League Spartan !important",
        fontWeight: "400",
        fontSize: "17px",
        letterSpacing: "0.05em",
        color: "#7E7F84",
        textTransform: "capitalize",
        paddingTop: "3px",
      },
    },
    textField: {
      div: {
        flexWrap: "nowrap !important",
      },
    },
  };
});
export default function SelectStartAdornment(props) {
  const { classes } = useStyles();
  return (
    <Box className={classes.selectBox}>
      <FormControl className={classes.formCon} size="small">
        <div className={classes.root}>
          <Autocomplete
            className={classes.commslc}
            id="tags-standard"
            options={props?.options}
            value={props?.value}
            onChange={(event, newValue) => {
              if (typeof newValue === "string") {
                props?.setValue({
                  name: newValue,
                  value: event?.id,
                });
              } else {
                props?.setValue(newValue);
              }
            }}
            getOptionLabel={(option) => {
              if (typeof option === "string") {
                return option;
              }
              return option.name;
            }}
            onInputChange={(event, newInputValue) => {
              props?.setInputValue(newInputValue);
            }}
            renderOption={(props, option) => <li {...props}>{option?.name}</li>}
            renderInput={(params) => {
              return (
                <TextField
                  onKeyPress={(e) => {
                    e.preventDefault();
                  }}
                  className={classes.textField}
                  {...params}
                  label={props?.title}
                  fullWidth
                  InputProps={{
                    ...params.InputProps,

                    startAdornment: (
                      <>
                        <InputAdornment
                          position="start"
                          className={classes.inputAd}
                        >
                          {props?.inputAdornment}
                        </InputAdornment>
                        {params.InputProps.startAdornment}
                      </>
                    ),
                  }}
                />
              );
            }}
          />
        </div>
      </FormControl>
    </Box>
  );
}
