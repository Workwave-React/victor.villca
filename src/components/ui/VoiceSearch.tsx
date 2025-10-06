import React from "react";
import SpeechRecognition, { useSpeechRecognition } from "react-speech-recognition";
import { Box, Button, Typography } from "@mui/material";

interface VoiceSearchProps {
  onVoiceSearch: (term: string) => void;
}

export const VoiceSearch: React.FC<VoiceSearchProps> = ({ onVoiceSearch }) => {
  const { transcript, listening, resetTranscript, browserSupportsSpeechRecognition } =
    useSpeechRecognition();

  if (!browserSupportsSpeechRecognition) {
    return <Typography>Browser doesn’t support speech recognition.</Typography>;
  }

  const handleSearch = () => {
    if (transcript.trim()) {
      onVoiceSearch(transcript.trim());
      resetTranscript();
    }
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: 2,
        mb: 4,
      }}
    >
      <Typography variant="body1">🎤 Microphone: {listening ? "On" : "Off"}</Typography>
      <Box sx={{ display: "flex", gap: 1 }}>
        <Button
          variant="contained"
          onClick={() => SpeechRecognition.startListening()}
        >
          Start
        </Button>
        <Button variant="contained" color="secondary" onClick={SpeechRecognition.stopListening}>
          Stop
        </Button>
        <Button variant="outlined" onClick={resetTranscript}>
          Reset
        </Button>
        <Button variant="contained" disabled={!transcript} onClick={handleSearch}>
          Search
        </Button>
      </Box>
      {transcript && (
        <Typography variant="body2" color="text.secondary">
          Transcript: {transcript}
        </Typography>
      )}
    </Box>
  );
};