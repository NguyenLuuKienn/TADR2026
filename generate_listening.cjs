const fs = require('fs');

const listeningData = [];

const topics = [
  { id: 1, name: "People Description" },
  { id: 2, name: "Free time, leisure and hobby" },
  { id: 3, name: "Sports" },
  { id: 4, name: "Work and jobs" },
  { id: 5, name: "House and home" },
  { id: 6, name: "Shopping" },
  { id: 7, name: "Food and drink" },
  { id: 8, name: "Weather" },
  { id: 9, name: "Travel and transport" },
  { id: 10, name: "Health" },
  { id: 11, name: "Environment" },
  { id: 12, name: "Technology" }
];

const generateQuestions = (topicId) => {
  const questions = [];
  if (topicId === 1) {
    questions.push({
      id: `t1_q1`,
      question: "Which boy is the girl's brother?",
      transcript: "Boy: Is that your brother over there? The one with blonde hair?\nGirl: No, my brother has dark hair.\nBoy: Oh, is he the one wearing glasses?\nGirl: Yes, that's him. He's wearing a striped sweater today.",
      options: [
        { text: "A boy with blonde hair", imageSeed: "blonde-boy" },
        { text: "A boy with dark hair and glasses", imageSeed: "boy-glasses" },
        { text: "A boy with dark hair and no glasses", imageSeed: "dark-hair-boy" }
      ],
      correctAnswer: 1,
      explanation: "The girl says her brother has dark hair and is wearing glasses."
    });
    questions.push({
      id: `t1_q2`,
      question: "What does the man's new boss look like?",
      transcript: "Woman: Have you met the new boss yet?\nMan: Yes, I just had a meeting with her. She seems very nice.\nWoman: What does she look like? Is she the tall woman with long curly hair?\nMan: No, she's quite short and has straight blonde hair.",
      options: [
        { text: "Tall with curly hair", imageSeed: "tall-curly" },
        { text: "Short with straight blonde hair", imageSeed: "short-blonde" },
        { text: "Tall with straight hair", imageSeed: "tall-straight" }
      ],
      correctAnswer: 1,
      explanation: "The man describes her as 'quite short and has straight blonde hair'."
    });
  } else if (topicId === 2) {
    questions.push({
      id: `t2_q1`,
      question: "What does the man usually do on Saturday mornings?",
      transcript: "Woman: Do you want to play tennis this Saturday morning?\nMan: I'd love to, but I usually go for a run on Saturday mornings. Last week I stayed in and read a book because it was raining, but the weather looks good this weekend.",
      options: [
        { text: "Playing tennis", imageSeed: "tennis" },
        { text: "Reading a book", imageSeed: "reading" },
        { text: "Going for a run", imageSeed: "running" }
      ],
      correctAnswer: 2,
      explanation: "He says 'I usually go for a run on Saturday mornings'."
    });
  } else if (topicId === 3) {
    questions.push({
      id: `t3_q1`,
      question: "Which sport did the girl play yesterday?",
      transcript: "Boy: Did you go to the basketball game yesterday?\nGirl: No, I couldn't make it. I had a volleyball match with my school team.\nBoy: Oh, I thought you were playing tennis this season.\nGirl: That's next term.",
      options: [
        { text: "Basketball", imageSeed: "basketball" },
        { text: "Volleyball", imageSeed: "volleyball" },
        { text: "Tennis", imageSeed: "tennis-court" }
      ],
      correctAnswer: 1,
      explanation: "The girl says 'I had a volleyball match with my school team'."
    });
  } else if (topicId === 4) {
    questions.push({
      id: `t4_q1`,
      question: "What is the man's job?",
      transcript: "Woman: Do you work in a hospital?\nMan: Well, I used to be a nurse, but I wanted a change. Now I work in a school.\nWoman: Oh, are you a teacher?\nMan: Actually, I'm the school librarian.",
      options: [
        { text: "Nurse", imageSeed: "nurse" },
        { text: "Teacher", imageSeed: "teacher" },
        { text: "Librarian", imageSeed: "library" }
      ],
      correctAnswer: 2,
      explanation: "He says 'Actually, I'm the school librarian'."
    });
  } else if (topicId === 5) {
    questions.push({
      id: `t5_q1`,
      question: "Which room is the woman painting?",
      transcript: "Man: How is the decorating going? Have you finished the living room?\nWoman: Yes, that's done. And the bedroom is finished too.\nMan: So what are you doing now?\nWoman: I'm just painting the kitchen walls yellow. It's taking a long time!",
      options: [
        { text: "Living room", imageSeed: "living-room" },
        { text: "Bedroom", imageSeed: "bedroom" },
        { text: "Kitchen", imageSeed: "kitchen" }
      ],
      correctAnswer: 2,
      explanation: "She says 'I'm just painting the kitchen walls yellow'."
    });
  } else if (topicId === 6) {
    questions.push({
      id: `t6_q1`,
      question: "What did the boy buy at the shops?",
      transcript: "Girl: Did you get the new video game you wanted?\nBoy: No, it was too expensive. I was going to buy a new t-shirt instead, but I couldn't find one I liked.\nGirl: So did you get anything?\nBoy: Yes, I just got a book to read on the train.",
      options: [
        { text: "Video game", imageSeed: "video-game" },
        { text: "T-shirt", imageSeed: "t-shirt" },
        { text: "A book", imageSeed: "book" }
      ],
      correctAnswer: 2,
      explanation: "He says 'I just got a book to read on the train'."
    });
  } else if (topicId === 7) {
    questions.push({
      id: `t7_q1`,
      question: "What will they have for dinner?",
      transcript: "Man: Shall we have pizza for dinner tonight?\nWoman: We had pizza yesterday! Let's have something healthier. How about chicken and rice?\nMan: I don't really like rice. Let's have pasta with tomato sauce instead.\nWoman: Okay, that sounds good.",
      options: [
        { text: "Pizza", imageSeed: "pizza" },
        { text: "Chicken and rice", imageSeed: "chicken-rice" },
        { text: "Pasta", imageSeed: "pasta" }
      ],
      correctAnswer: 2,
      explanation: "They agree on 'pasta with tomato sauce instead'."
    });
  } else if (topicId === 8) {
    questions.push({
      id: `t8_q1`,
      question: "What will the weather be like tomorrow?",
      transcript: "Newsreader: And now for the weather forecast. Today has been very sunny and warm. However, things will change overnight. Tomorrow morning will be very cloudy, and we expect heavy rain in the afternoon. The snow won't arrive until the weekend.",
      options: [
        { text: "Sunny", imageSeed: "sunny" },
        { text: "Rainy", imageSeed: "rain" },
        { text: "Snowy", imageSeed: "snow" }
      ],
      correctAnswer: 1,
      explanation: "The forecast for tomorrow says 'we expect heavy rain in the afternoon'."
    });
  } else if (topicId === 9) {
    questions.push({
      id: `t9_q1`,
      question: "How did the woman travel to work today?",
      transcript: "Man: You're late! Did you miss the bus?\nWoman: No, I decided to drive today because it was raining. But my car broke down on the way!\nMan: Oh no! So how did you get here?\nWoman: I had to leave my car at the garage and catch a taxi.",
      options: [
        { text: "By bus", imageSeed: "bus" },
        { text: "By car", imageSeed: "car" },
        { text: "By taxi", imageSeed: "taxi" }
      ],
      correctAnswer: 2,
      explanation: "She says 'I had to leave my car at the garage and catch a taxi'."
    });
  } else if (topicId === 10) {
    questions.push({
      id: `t10_q1`,
      question: "What is the matter with the man?",
      transcript: "Doctor: Good morning. How can I help you?\nPatient: Well, I've been feeling terrible. I thought I had a cold because I had a headache yesterday.\nDoctor: Do you still have a headache?\nPatient: No, but now my stomach hurts a lot. I can't eat anything.",
      options: [
        { text: "A cold", imageSeed: "cold-sick" },
        { text: "A headache", imageSeed: "headache" },
        { text: "A stomachache", imageSeed: "stomachache" }
      ],
      correctAnswer: 2,
      explanation: "He says 'now my stomach hurts a lot'."
    });
  } else if (topicId === 11) {
    questions.push({
      id: `t11_q1`,
      question: "What is the town doing to help the environment?",
      transcript: "Man: Our town is really trying to be greener. We already have a good recycling program for paper and plastic.\nWoman: That's great. Are they going to plant more trees?\nMan: They want to do that next year. But right now, they are building new bicycle lanes to encourage people to leave their cars at home.",
      options: [
        { text: "Recycling program", imageSeed: "recycling" },
        { text: "Planting trees", imageSeed: "planting-trees" },
        { text: "Building bicycle lanes", imageSeed: "bicycle-lane" }
      ],
      correctAnswer: 2,
      explanation: "He says 'right now, they are building new bicycle lanes'."
    });
  } else if (topicId === 12) {
    questions.push({
      id: `t12_q1`,
      question: "Which device is the man having trouble with?",
      transcript: "Woman: Can you help me print this document?\nMan: I can't right now. I'm trying to fix my laptop. The screen keeps going black.\nWoman: Oh, I thought you were having problems with your smartphone.\nMan: No, I got a new phone yesterday, so that's working fine.",
      options: [
        { text: "Printer", imageSeed: "printer" },
        { text: "Laptop", imageSeed: "laptop" },
        { text: "Smartphone", imageSeed: "smartphone" }
      ],
      correctAnswer: 1,
      explanation: "He says 'I'm trying to fix my laptop. The screen keeps going black'."
    });
  }

  // Add a generic second question for topics that only have 1
  if (questions.length === 1) {
    questions.push({
      id: `t${topicId}_q2`,
      question: "What time will they meet?",
      transcript: "Man: Shall we meet at half past three?\nWoman: I don't finish work until three forty-five. Let's meet at four o'clock instead.\nMan: Okay, four o'clock is perfect. See you then.",
      options: [
        { text: "3:30", imageSeed: "clock-3-30" },
        { text: "3:45", imageSeed: "clock-3-45" },
        { text: "4:00", imageSeed: "clock-4-00" }
      ],
      correctAnswer: 2,
      explanation: "They agree on 'Let's meet at four o'clock instead'."
    });
  }

  return questions;
};

topics.forEach(topic => {
  listeningData.push({
    topic: topic.id,
    title: `Topic ${topic.id}: ${topic.name}`,
    questions: generateQuestions(topic.id)
  });
});

fs.writeFileSync('src/data/listening.json', JSON.stringify(listeningData, null, 2));
console.log('Generated listening.json');
