import { Modal, Box, IconButton, Typography, Fade } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import type { ImageModalData } from '../../types/modal.types';

interface ImageModalProps {
  open: boolean;
  onClose: () => void;
  data: ImageModalData | null;
}

export function ImageModal({ open, onClose, data }: ImageModalProps) {
  if (!data) return null;

  return (
    <Modal
      open={open}
      onClose={onClose}
      closeAfterTransition
    >
      <Fade in={open}>
        <Box
          sx={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            bgcolor: 'background.paper',
            borderRadius: 2,
            boxShadow: 24,
            p: 4,
            maxWidth: '90vw',
            maxHeight: '90vh',
            outline: 'none',
            display: 'flex',
            flexDirection: 'column',
            gap: 2,
          }}
        >
          <IconButton
            onClick={onClose}
            sx={{
              position: 'absolute',
              right: 8,
              top: 8,
              color: 'grey.500',
            }}
          >
            <CloseIcon />
          </IconButton>

          <Typography
            variant="h5"
            component="h2"
            sx={{ fontWeight: 600, pr: 4 }}
          >
            {data.title}
          </Typography>

          <Box
            sx={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              minHeight: 150,
            }}
          >
            <Box
              component="img"
              src={data.imageUrl}
              alt={data.title}
              sx={{
                maxWidth: '100%',
                maxHeight: '60vh',
                objectFit: 'contain',
              }}
            />
          </Box>

            <Typography
              variant="body2"
              color="text.secondary"
              sx={{ textAlign: 'center' }}
            >
              Click outside or press ESC to close
            </Typography>
        </Box>
      </Fade>
    </Modal>
  );
}