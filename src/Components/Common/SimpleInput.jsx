import { TextField, Typography } from "@mui/material";
import React from "react";
import InputAdornment from "@mui/material/InputAdornment";
import IconButton from "@mui/material/IconButton";
import VisibilityOutlinedIcon from "@mui/icons-material/VisibilityOutlined";
import VisibilityOffOutlinedIcon from "@mui/icons-material/VisibilityOffOutlined";

export const SimpleInput = ({
  className,
  id,
  label,
  variant,
  name,
  type,
  onChange,
  error,
  helperText,
  eye,
  value,
  showPassword,
  handleClickShowPassword,
  showPassword1,
  handleClickShowPassword1,
  marginr,
  eye1,
  disabled,
  onKeyDown,
  InputProps,
  onInput,
  onBlur
}) => {
  return (
    <TextField
      className={className}
      value={value}
      fullWidth
      id={id}
      label={label}
      sx={(theme) => ({
        marginRight: marginr ? marginr : 0,
        [theme.breakpoints.down("iph")]: {
          marginRight: "0px",
        },
      })}
      variant={variant ? variant : "outlined"}
      name={name}
      disabled={disabled}
      onChange={onChange}
      type={!showPassword && !showPassword1 ? "text" : type ? type : "text"}
      helperText={helperText}
      onKeyDown={onKeyDown}
      InputProps={{
        style: {
          height: "60px",
        },
        endAdornment: (
          <>
            {eye && (
              <InputAdornment position="end">
                <Typography
                  sx={{ cursor: "pointer" }}
                  aria-label="toggle password visibility"
                  onClick={handleClickShowPassword}
                >
                  {showPassword ? (
                    <VisibilityOffOutlinedIcon
                      sx={(theme) => ({
                        [theme.breakpoints.down("iph")]: {
                          width: "20px",
                          height: "20px",
                        },
                      })}
                    />
                  ) : (
                    <VisibilityOutlinedIcon
                      sx={(theme) => ({
                        [theme.breakpoints.down("iph")]: {
                          width: "20px",
                          height: "20px",
                        },
                      })}
                    />
                  )}
                </Typography>
              </InputAdornment>
            )}
            {eye1 && (
              <InputAdornment position="end">
                <IconButton
                  aria-label="toggle password visibility"
                  onClick={handleClickShowPassword1}
                >
                  {showPassword1 ? (
                    <VisibilityOffOutlinedIcon
                      sx={(theme) => ({
                        [theme.breakpoints.down("iph")]: {
                          width: "20px",
                          height: "20px",
                        },
                      })}
                    />
                  ) : (
                    <VisibilityOutlinedIcon
                      sx={(theme) => ({
                        [theme.breakpoints.down("iph")]: {
                          width: "20px",
                          height: "20px",
                        },
                      })}
                    />
                  )}
                </IconButton>
              </InputAdornment>
            )}
          </>
        ),
        inputProps: InputProps,
      }}
      onBlur={onBlur}
      onInput={onInput}
    />
  );
};
