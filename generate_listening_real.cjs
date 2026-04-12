const fs = require('fs');

const existingData = JSON.parse(fs.readFileSync('src/data/listening.json', 'utf8'));

// Update Topic 1 with the exact transcript from the user's image
existingData[0].questions = [
  {
    id: "t1_q1",
    question: "1. Where will the friends meet?",
    transcript: "Girl: Hi, it's Maria. Got your message. Yeah, I'd like to go to the movies. There's a film called Lightworld Two, or a comedy - I don't mind which... Shall we meet outside the cinema?\nBoy: Or, I know, at the coffee bar on the corner, we could have a snack before we go in. We could meet at the bus stop.\nGirl: Mum's driving me into town this afternoon, to buy some trainers, so I won't have to get the bus. But something to eat first is a good idea. Shall we say six o'clock?\nBoy: OK.",
    options: [
      { text: "A coffee bar", imageSeed: "coffee-shop" },
      { text: "Outside the cinema", imageSeed: "cinema-building" },
      { text: "At a bus stop", imageSeed: "bus-stop" }
    ],
    correctAnswer: 0,
    explanation: "The boy suggests the coffee bar for a snack, and the girl agrees saying 'something to eat first is a good idea'."
  },
  {
    id: "t1_q2",
    question: "2. What has the girl forgotten to bring?",
    transcript: "Boy: Drink up your coffee - we'll be late for class. What are you looking for now? Don't tell me you've left your essay at home. You said you were working on it till midnight.\nGirl: Don't worry, it was the first thing I put in my bag - look, here it is. I won't be a second... just checking everything. Pen... now where did I...? Oh dear, you'll be able to lend me one, won't you? Keys? - oh, here they are, in my pocket as usual...",
    options: [
      { text: "Her essay", imageSeed: "essay-paper" },
      { text: "A pen", imageSeed: "pen" },
      { text: "Her keys", imageSeed: "keys" }
    ],
    correctAnswer: 1,
    explanation: "She can't find her pen and asks the boy 'you'll be able to lend me one, won't you?'."
  },
  {
    id: "t1_q3",
    question: "3. Which TV programme is on at nine o'clock tonight?",
    transcript: "Woman: Because of the ski jumping finals we're late finishing, so there are some changes to this evening's programmes. We won't now show the Nature Programme, about the dolphins found near the Florida coast, at nine o'clock. Instead, Tim Wong's Chinese Kitchen will be at this time, an hour later than advertised. You can see the Nature Programme at its usual time next week.",
    options: [
      { text: "Ski jumping", imageSeed: "ski-jumping" },
      { text: "Nature Programme (Dolphins)", imageSeed: "dolphins" },
      { text: "Chinese Kitchen (Cooking)", imageSeed: "cooking-show" }
    ],
    correctAnswer: 2,
    explanation: "The announcer says 'Instead, Tim Wong's Chinese Kitchen will be at this time [nine o'clock]'."
  },
  {
    id: "t1_q4",
    question: "4. How will the man book tickets for the show?",
    transcript: "Woman: Shall we go to the Boat Show? It's on for three weeks - but you need to book if you want to go on the first night because there's a party.\nMan: Really? Let's go. How do you book?\nWoman: On the Internet or by phone... or there's a form to fill in, in this week's TV magazine with a discount on each ticket.\nMan: I like saving money, but the post's always so slow. I prefer to talk to someone when I'm making a booking - just leave it to me.",
    options: [
      { text: "On the Internet", imageSeed: "internet-booking" },
      { text: "By phone", imageSeed: "telephone" },
      { text: "By post (form)", imageSeed: "mail-post" }
    ],
    correctAnswer: 1,
    explanation: "He says 'I prefer to talk to someone when I'm making a booking', which implies booking by phone."
  }
];

fs.writeFileSync('src/data/listening.json', JSON.stringify(existingData, null, 2));
console.log('Updated listening.json with real Topic 1 data');
