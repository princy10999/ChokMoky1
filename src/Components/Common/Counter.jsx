import React from "react";
import { makeStyles } from "tss-react/mui";
import {
  Button,
  OutlinedInput,
  FormControl,
  InputAdornment,
  Box,
} from "@mui/material";

const useStyles = makeStyles()((theme) => {
  return {
    countForm: {
      height: "41.44px",
      borderRadius: "0px",
      [`& input`]: {
        textAlign: "center",
      },
    },
    buttonCount: {
      width: "20px",
      minWidth: "20px",
      fontSize: "1rem",
      color: "#9D9B9B",
    },
  };
});
const Counter = ({
  incrementCounter,
  decrementCounter,
  counter,
  id,
  cartid,
  stock,
}) => {
  const { classes } = useStyles();

  return (
    <Box className={classes?.boxcount}>
      <FormControl
        sx={{ width: "11ch" }}
        variant="outlined"
        className={classes?.countForm}
      >
        <OutlinedInput
          id="count"
          value={counter}
          size="small"
          className={classes?.countForm}
          InputProps={{
            className: classes.inputText,
          }}
          startAdornment={
            <InputAdornment position="start" sx={{ mr: 0 }}>
              <Button
                // onClick={decrementCounter}
                onClick={() => decrementCounter(cartid)}
                className={classes?.buttonCount}
              >
                -
              </Button>
            </InputAdornment>
          }
          endAdornment={
            <InputAdornment position="and" sx={{ mr: 0 }}>
              <Button
                onClick={() => incrementCounter(id, stock)}
                className={classes?.buttonCount}
              >
                +
              </Button>
            </InputAdornment>
          }
        />
      </FormControl>
    </Box>
  );
};

export default Counter;
