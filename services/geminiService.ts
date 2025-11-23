import { AestheticResponse } from '../types';

// Curated list of aesthetic, profound, and poetic quotes to replace the API
const QUOTES: AestheticResponse[] = [
  { text: "The echo of a dream is often louder than the voice of reality.", author: "Lumina" },
  { text: "In the silence of the heart, the universe speaks.", author: "Unknown" },
  { text: "Starlight is just a memory that hasn't faded yet.", author: "Cosmos" },
  { text: "The ocean stirs the heart, inspires the imagination and brings eternal joy to the soul.", author: "Wyland" },
  { text: "To see a World in a Grain of Sand and a Heaven in a Wild Flower.", author: "William Blake" },
  { text: "Keep your face always toward the sunshine—and shadows will fall behind you.", author: "Walt Whitman" },
  { text: "The poetry of the earth is never dead.", author: "John Keats" },
  { text: "Everything has beauty, but not everyone sees it.", author: "Confucius" },
  { text: "Simplicity is the ultimate sophistication.", author: "Leonardo da Vinci" },
  { text: "Look deep into nature, and then you will understand everything better.", author: "Albert Einstein" },
  { text: "Float like a cloud, flow like water.", author: "Lumina" },
  { text: "Blue is the closest color to truth.", author: "Steven Tyler" },
  { text: "Softness is not weakness. It is the truest form of strength.", author: "Unknown" },
  { text: "Breathe in the future, breathe out the past.", author: "Mindfulness" },
  { text: "Where flowers bloom, so does hope.", author: "Lady Bird Johnson" },
  { text: "The moon is a friend for the lonesome to talk to.", author: "Carl Sandburg" },
  { text: "And into the forest I go, to lose my mind and find my soul.", author: "John Muir" },
  { text: "Stars can't shine without darkness.", author: "D.H. Sidebottom" },
  { text: "Adopt the pace of nature: her secret is patience.", author: "Ralph Waldo Emerson" }
];

export const generateAestheticText = async (): Promise<AestheticResponse> => {
  // Simulate a short delicate delay for the UI experience
  await new Promise(resolve => setTimeout(resolve, 600));

  // Select a random quote
  const randomIndex = Math.floor(Math.random() * QUOTES.length);
  return QUOTES[randomIndex];
};