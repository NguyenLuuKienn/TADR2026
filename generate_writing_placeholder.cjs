const fs = require('fs');

const writingData = Array.from({ length: 12 }, (_, i) => ({
  id: `topic${i + 1}`,
  title: `Topic ${i + 1}`,
  prompt: `Please provide the writing prompt for Topic ${i + 1} here.`,
  notes: ["Note 1", "Note 2", "Note 3", "Note 4"],
  sampleResponse: `Sample response for Topic ${i + 1} will be generated once the prompt is provided.`
}));

fs.writeFileSync('src/data/writing.json', JSON.stringify(writingData, null, 2));
console.log('Created src/data/writing.json with placeholder data.');
