import {styled} from "@mui/material";

export const flexCenter = {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
};
export const flexColumnCenter = {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
};

export const wrapper = {
  width: '800px',
  height: '500px',
  padding: '24px',
  border: '1px solid silver',
  borderRadius: '24px',
  backgroundColor: 'lightgray',
};

export const modal = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 500,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

export const size = {
  minWidth: '60px',
  minHeight: '60px',
  maxWidth: '60px',
  maxHeight: '60px',
};

export const previewImageSize = {
  objectFit: 'cover',
  width: 'auto',
  height: 'auto',
  maxHeight: '100%',
};

export const imageContainer = {
  overflow: 'hidden',
  width: '200px',
  height: '200px',
  border: '2px dashed silver',
  borderRadius: '24px',
  backgroundColor: 'transparent',
  boxShadow: 'none',
  ':hover': {
    backgroundColor: 'transparent',
  },
};

export const uploadIcon = {
  width: '40px',
  height: '40px',
  color: 'silver',
};

export const VisuallyHiddenInput = styled('input')({
  clip: 'rect(0 0 0 0)',
  clipPath: 'inset(50%)',
  height: 1,
  overflow: 'hidden',
  position: 'absolute',
  bottom: 0,
  left: 0,
  whiteSpace: 'nowrap',
  width: 1,
});
