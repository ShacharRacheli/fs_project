import { useState } from "react"
import { Box, Button, Modal, CircularProgress, Typography, List, ListItem } from "@mui/material"
const apiUrl = import.meta.env.VITE_APP_API_URL;

export default function SendPrompt({ challengeTopic ,challengeDescription}: { challengeTopic: string ,challengeDescription:string}) {
  const [open, setOpen] = useState(false)
  const [loading, setLoading] = useState(false)
  const [suggestions, setSuggestions] = useState<string[]>([])

  const handleClick = async () => {
    setOpen(true)
    setLoading(true)

    try {
      const response = await fetch(`${apiUrl}/api/PromptSuggestions`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ topic: challengeTopic , description: challengeDescription})
      })

      const data = await response.json()
      setSuggestions(data.prompts)
    } catch (err) {
      console.error("Error fetching prompts:", err)
    } finally {
      setLoading(false)
    }
  }

  return (
    <>
      <Button onClick={handleClick} variant="outlined" sx={{
        textTransform: 'none',
        borderColor: 'pink',
        color: 'black',
        backgroundColor: 'transparent',
        '&:hover': { backgroundColor: 'transparent', borderColor: 'black', color: 'pink' }
      }}>
        צריך השראה?
      </Button>

      <Modal open={open} onClose={() => setOpen(false)}>
        <Box sx={{
          padding: 4,
          backgroundColor: 'white',
          width: 400,
          maxHeight: 500,
          overflowY: 'auto',
          margin: 'auto',
          marginTop: 10,
          borderRadius: 2
        }}>
          <Typography variant="h6" mb={2}>הצעות לפרומפטים לאתגר:</Typography>

          {loading ? (
            <Box display="flex" justifyContent="center"><CircularProgress /></Box>
          ) : (
            <List>
              {suggestions.map((s, i) => (
                <ListItem key={i} sx={{ paddingLeft: 0 }}>{i + 1}. {s}</ListItem>
              ))}
            </List>
          )}
        </Box>
      </Modal>
    </>
  )
}

