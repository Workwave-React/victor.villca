import React, { useEffect } from "react";
import SpeechRecognition, { useSpeechRecognition } from "react-speech-recognition";
import { Box, IconButton, Tooltip, Typography, Chip } from "@mui/material";
import MicIcon from '@mui/icons-material/Mic';
import MicOffIcon from '@mui/icons-material/MicOff';

interface VoiceSearchProps {
  onVoiceSearch: (term: string) => void;
}


export const VoiceSearch: React.FC<VoiceSearchProps> = ({ onVoiceSearch }) => {
  const { 
    transcript, 
    listening, 
    resetTranscript, 
    browserSupportsSpeechRecognition 
  } = useSpeechRecognition();

  useEffect(() => {
    if (!listening && transcript.trim()) {
      const timer = setTimeout(() => {
        onVoiceSearch(transcript.trim());
        resetTranscript();
      }, 1500);
      
      return () => clearTimeout(timer);
    }
  }, [listening, transcript, onVoiceSearch, resetTranscript]);

  if (!browserSupportsSpeechRecognition) {
    return (
      <Tooltip title="Speech recognition is not supported in your browser">
        <Box sx={{ display: 'inline-flex' }}>
          <IconButton disabled>
            <MicOffIcon />
          </IconButton>
        </Box>
      </Tooltip>
    );
  }

  const handleToggleListening = () => {
    if (listening) {
      SpeechRecognition.stopListening();
    } else {
      resetTranscript();
      SpeechRecognition.startListening({ continuous: false, language: 'en-US' });
    }
  };

  return (
    <Box
      sx={{
        display: "inline-flex",
        alignItems: "center",
        gap: 1,
      }}
    >
      <Tooltip title={listening ? "Stop listening" : "Start voice search"}>
        <IconButton
          onClick={handleToggleListening}
          sx={{
            color: listening ? 'error.main' : 'action.active',
            transition: 'all 0.3s ease',
            '&:hover': {
              backgroundColor: listening ? 'error.light' : 'action.hover',
            },
          }}
        >
          {listening ? <MicIcon /> : <MicIcon />}
        </IconButton>
      </Tooltip>

      {transcript && (
        <Chip
          label={transcript}
          size="small"
          onDelete={resetTranscript}
          sx={{
            maxWidth: 200,
            '& .MuiChip-label': {
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              whiteSpace: 'nowrap',
            },
          }}
        />
      )}

      {listening && (
        <Typography
          variant="caption"
          color="error"
          sx={{
            display: 'flex',
            alignItems: 'center',
            gap: 0.5,
            fontWeight: 600,
          }}
        >
          <Box
            component="span"
            sx={{
              width: 8,
              height: 8,
              borderRadius: '50%',
              backgroundColor: 'error.main',
            }}
          />
          Listening...
        </Typography>
      )}
    </Box>
  );
};