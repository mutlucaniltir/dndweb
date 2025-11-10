require('dotenv').config();
const express = require('express');
const cors = require('cors');
const OpenAI = require('openai');

const app = express();
const port = process.env.PORT || 3001;

// Initialize OpenAI with API key from environment variables
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

app.use(cors()); // Enable CORS for all routes
app.use(express.json()); // Enable JSON body parsing

// Basic health check endpoint
app.get('/', (req, res) => {
  res.send('RPG Backend is running!');
});

// Chat endpoint to interact with OpenAI
app.post('/chat', async (req, res) => {
  const { messages } = req.body; // Expecting an array of messages from the frontend

  try {
    const completion = await openai.chat.completions.create({
      model: "gpt-3.5-turbo", // Or "gpt-4" if you have access and prefer
      messages: [
        {
          role: "system",
          content: `You are the Game AI for a Dungeon Crawler Carl-style RPG.
          The player's name is Mutlucan. Their pet is Sütlaç, a cat.
          The tone should be dark humor, absurd, and chaotic.
          You are the Game Master, NPCs, and all other characters.
          When the player's inventory or stats change, or a dice roll occurs, you MUST output the changes in a JSON object at the end of your narrative response.
          The JSON object should have the following structure:
          {
            "narrative": "Your narrative response here.",
            "inventory_add": ["item1", "item2"], // Optional: items added to inventory
            "inventory_remove": ["item3"], // Optional: items removed from inventory
            "stat_change": {"health": -10, "stamina": 5}, // Optional: changes to player stats
            "dice_roll": {"roll": 20, "modifier": 0, "total": 20, "description": "natural 20!"} // Optional: details of a dice roll
          }
          If no changes or rolls occur, omit the corresponding keys or leave them as empty arrays/objects.
          Always provide a narrative response.
          `,
        },
        ...messages, // Previous messages from the chat history
      ],
      temperature: 0.7, // Adjust for creativity
      max_tokens: 500,
    });

    const aiResponse = completion.choices[0].message.content;
    res.json({ response: aiResponse });

  } catch (error) {
    console.error('Error calling OpenAI API:', error);
    res.status(500).json({ error: 'Failed to get response from AI.' });
  }
});

app.listen(port, () => {
  console.log(`RPG Backend listening at http://localhost:${port}`);
});
