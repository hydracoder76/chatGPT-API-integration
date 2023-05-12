import styled from "@emotion/styled";
import { TextField } from "@mui/material";

export const CustomInputs = styled(TextField)({
    width : '100%',
    paddign : '10.5px 14px',
    '& label.Mui-focused': {
      color: 'orange',
    },
  
    '& .MuiInput-underline:after': {
      borderBottomColor: 'orange',
    },
    '& .MuiInputBase-input.MuiOutlinedInput-input': {
      height: '15px ',
      '&:focus': {
        outline: 'none',
      },
    },
    '& .MuiInputBase-root.MuiOutlinedInput-root.MuiInputBase-colorPrimary.MuiInputBase-formControl':
      {
        borderRadius: '7px !important ',
        padding : '9.5px 14px !important'
      },
    '& .MuiOutlinedInput-root': {
      '& fieldset': {
        borderColor: '#0000001A',
      },
      '&:hover fieldset': {
        borderColor: '#0000001A',
      },
    },
});