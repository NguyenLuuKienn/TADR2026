const fs = require('fs');

const existingData = JSON.parse(fs.readFileSync('src/data/listening.json', 'utf8'));

// Topic 7
const topic7Questions = [
  {
    id: "t7_q1",
    question: "1. Which T-shirt does the boy decide to buy?",
    transcript: "Boy: I'd like to buy a black T-shirt with short sleeves, please. Large size.\nWoman: I'm afraid the black ones have long sleeves, but we've got short sleeves in the lighter colours. Do you want a round neck or a V-neck?\nBoy: It must be round neck. Let me think... umm, OK, I'll take one of the short-sleeved ones, the colour's not so important really.",
    options: [
      { text: "Black T-shirt with long sleeves", imageSeed: "black-tshirt-long" },
      { text: "Lighter colour T-shirt with short sleeves and round neck", imageSeed: "light-tshirt-short" },
      { text: "Lighter colour T-shirt with short sleeves and V-neck", imageSeed: "vneck-tshirt" }
    ],
    correctAnswer: 1,
    explanation: "He says 'It must be round neck' and 'I'll take one of the short-sleeved ones, the colour's not so important really' (which are the lighter colours)."
  },
  {
    id: "t7_q2",
    question: "2. Who will be on the stage next?",
    transcript: "Man: And that was Shark, with Jo on piano and Rich on guitar. Lots of music to come, including The Three Biscuits with songs from their new CD. But first, here are Subway - you all know the drummer and guitarist, but singing here with them for the first time is Sarah Ireland, the drummer's sister - please give her a big welcome.",
    options: [
      { text: "Shark", imageSeed: "shark-band" },
      { text: "The Three Biscuits", imageSeed: "biscuits-band" },
      { text: "Subway (with Sarah Ireland)", imageSeed: "subway-band" }
    ],
    correctAnswer: 2,
    explanation: "The announcer says 'But first, here are Subway... singing here with them for the first time is Sarah Ireland'."
  },
  {
    id: "t7_q3",
    question: "3. What time will the pie be ready?",
    transcript: "Girl: What time is it, Mum? Do you think the apple pie will be ready yet?\nMum: It's 4.35.\nGirl: And the pie went into the oven at a quarter past four?\nMum: That's right. You could check it at five and turn the heat down a bit but don't take it out until twenty past. That's forty-five minutes to go!\nGirl: OK, I'm hungry already.",
    options: [
      { text: "4:35", imageSeed: "clock-4-35" },
      { text: "5:00", imageSeed: "clock-5-00" },
      { text: "5:20 (twenty past five)", imageSeed: "clock-5-20" }
    ],
    correctAnswer: 2,
    explanation: "The mother says 'don't take it out until twenty past' (which means 5:20, as it is currently 4:35)."
  },
  {
    id: "t7_q4",
    question: "4. Which photo does the girl dislike?",
    transcript: "Girl: I've got the photos back! Look, this one of us on the beach is just brilliant!\nBoy: Yes... You must get a copy for me to put in my photo album. It was a great day, but that other one's good too!\nGirl: I don't know why you think so, that dress I'm wearing looks awful. I only bought it because it was half-price. The one of us on the boat isn't bad, look.\nBoy: Mm... apart from the fact that we look seasick!",
    options: [
      { text: "Photo on the beach", imageSeed: "photo-beach" },
      { text: "Photo where she's wearing an awful dress", imageSeed: "photo-dress" },
      { text: "Photo on the boat", imageSeed: "photo-boat" }
    ],
    correctAnswer: 1,
    explanation: "She says 'I don't know why you think so, that dress I'm wearing looks awful'."
  },
  {
    id: "t7_q5",
    question: "5. What should the students take on the school trip?",
    transcript: "Teacher: Now, you won't need any money for the bus or your entrance ticket to the museum tomorrow, because that's already paid for. But bring some change for when you get thirsty and want to buy a drink. The only food or drink allowed on the bus is fruit. Bring some with you because it's quite a long trip, and you'll get hungry. And you'll need to bring all your coloured pencils for the work I'm going to ask you to do there.",
    options: [
      { text: "Money for bus/ticket", imageSeed: "money-ticket" },
      { text: "Change, fruit, and coloured pencils", imageSeed: "fruit-pencils" },
      { text: "Sandwiches and drinks", imageSeed: "sandwiches-drinks" }
    ],
    correctAnswer: 1,
    explanation: "The teacher tells them to 'bring some change', 'Bring some [fruit] with you', and 'bring all your coloured pencils'."
  },
  {
    id: "t7_q6",
    question: "6. Where do the boys decide to go?",
    transcript: "Boy 1: So, we've got three hours. Shall we go skateboarding in the park? What do you think?\nBoy 2: Well, there's the latest space film, which is meant to be good, or there's a new computer-game shop which has just opened.\nBoy 1: Oh, well I haven't got enough money to buy a new game anyway. Let's go and watch the film.\nBoy 2: OK. We can go skateboarding any time.",
    options: [
      { text: "Skateboarding in the park", imageSeed: "skateboarding" },
      { text: "To watch the space film", imageSeed: "cinema-space" },
      { text: "To the computer-game shop", imageSeed: "game-shop" }
    ],
    correctAnswer: 1,
    explanation: "Boy 1 says 'Let's go and watch the film' and Boy 2 agrees 'OK'."
  },
  {
    id: "t7_q7",
    question: "7. What has the girl lost?",
    transcript: "Teacher: Can I help you? You look worried. Is everything all right?\nGirl: Well, I was in the playground about ten minutes ago with my friends and I got a call on my mobile phone - I had to get a pen out of my bag to write something down and I think my purse fell out. I can't find it now. Do you know if anyone has handed it in?\nTeacher: You know you're not supposed to bring phones to school - anyway, let me go and check. What colour is it?",
    options: [
      { text: "Her mobile phone", imageSeed: "mobile-phone" },
      { text: "A pen", imageSeed: "pen-lost" },
      { text: "Her purse", imageSeed: "purse-lost" }
    ],
    correctAnswer: 2,
    explanation: "She says 'I think my purse fell out. I can't find it now'."
  }
];

// Topic 8
const topic8Questions = [
  {
    id: "t8_q1",
    question: "1. When will Jack's mum pick him up?",
    transcript: "Jack: Mum, I'm ringing to tell you I'm at Tim's house. Football practice finished early, so we walked here together.\nMum: OK. Well, it's half past five now, so I'll come in the car and pick you up. It'll take me about half an hour, so I'll see you at six.\nJack: Oh, there's something good on television then. Can you come and get me after it, at seven?\nMum: I can't, Jack, I've got to pick your dad up from the station then.",
    options: [
      { text: "5:30", imageSeed: "clock-5-30" },
      { text: "6:00", imageSeed: "clock-6-00" },
      { text: "7:00", imageSeed: "clock-7-00" }
    ],
    correctAnswer: 1,
    explanation: "The mum says 'It'll take me about half an hour, so I'll see you at six', and she refuses to change it to 7:00."
  },
  {
    id: "t8_q2",
    question: "2. Which postcard will they send?",
    transcript: "Girl: We mustn't forget to send Mum a postcard... how about this one with a picture of the mountain?\nBoy: Well, it's nice but we can't actually see it from where we're staying. What about a view of the lake and the village instead? Or perhaps one of the garden pictures if you think she'd prefer it. Look at the cottage and all the flowers...\nGirl: Mmm... I think your first idea was better... we could put a cross to show where we're staying.",
    options: [
      { text: "Picture of the mountain", imageSeed: "mountain-postcard" },
      { text: "View of the lake and village", imageSeed: "lake-village" },
      { text: "Garden picture with cottage and flowers", imageSeed: "garden-cottage" }
    ],
    correctAnswer: 1,
    explanation: "The girl says 'I think your first idea was better' referring to the boy's first suggestion: 'a view of the lake and the village'."
  },
  {
    id: "t8_q3",
    question: "3. What do they decide to buy?",
    transcript: "Mum: Look, Kate, there are some of those biscuits you like!\nKate: Oh, yes. Mm... there aren't many in a packet though, Mum. Why don't we have this cake instead? Remember I've got my friends coming tomorrow.\nMum: Oh, I haven't forgotten. I've already made a cake, and I've bought lots of ice cream.\nKate: Well, I suppose some biscuits would be nice with ice cream. Do we need anything else...?",
    options: [
      { text: "Cake", imageSeed: "cake" },
      { text: "Ice cream", imageSeed: "ice-cream" },
      { text: "Biscuits", imageSeed: "biscuits" }
    ],
    correctAnswer: 2,
    explanation: "The mum already has cake and ice cream. Kate agrees 'I suppose some biscuits would be nice with ice cream'."
  },
  {
    id: "t8_q4",
    question: "4. What has the girl forgotten to bring?",
    transcript: "Boy: Finish your drink - we'll be late for class. What are you looking for now? Don't tell me you've forgotten your homework. You said you were working on it really late.\nGirl: Don't worry, it was the first thing I put in my bag - look, here it is. I won't be a second... just checking everything. Pencil case, now where did I...? Oh... you'll be able to lend me a pen, won't you? Phone? Oh, here it is, in my pocket as usual...",
    options: [
      { text: "Homework", imageSeed: "homework" },
      { text: "Pencil case/pen", imageSeed: "pencil-case" },
      { text: "Phone", imageSeed: "phone" }
    ],
    correctAnswer: 1,
    explanation: "She can't find her pencil case and asks 'you'll be able to lend me a pen, won't you?'."
  },
  {
    id: "t8_q5",
    question: "5. How does the man want his son to help him?",
    transcript: "Dad: Jamie, could you do something for me?\nJamie: Well, it depends what it is. I'm meeting my mates in town.\nDad: I want to clean the upstairs windows this afternoon, but I lent the ladder to John... Could you come next door with me and help me carry it back? I'll give you a lift into town afterwards if you like.\nJamie: Sure, Dad.",
    options: [
      { text: "Clean the upstairs windows", imageSeed: "cleaning-windows" },
      { text: "Help carry the ladder back", imageSeed: "carrying-ladder" },
      { text: "Give him a lift into town", imageSeed: "driving" }
    ],
    correctAnswer: 1,
    explanation: "The dad asks 'Could you come next door with me and help me carry it [the ladder] back?'."
  },
  {
    id: "t8_q6",
    question: "6. Which TV programme is on at nine o'clock tonight?",
    transcript: "Woman: Because of the football finishing late, there are some changes to this evening's programmes. We won't now show the Nature Programme, about the sharks found in the Pacific, at nine o'clock. Instead, the cartoon film the Mighty Heroes will be at this time, an hour later than advertised. You can see the Nature Programme at its usual time next week.",
    options: [
      { text: "Football", imageSeed: "football-tv" },
      { text: "Nature Programme (Sharks)", imageSeed: "sharks-tv" },
      { text: "Cartoon film (Mighty Heroes)", imageSeed: "cartoon-tv" }
    ],
    correctAnswer: 2,
    explanation: "The announcer says 'Instead, the cartoon film the Mighty Heroes will be at this time [nine o'clock]'."
  },
  {
    id: "t8_q7",
    question: "7. What will the boy do first?",
    transcript: "Boy: I'm off now, Mum. I'm going to meet Ben at the youth club because he's bought a new wheel for his bike and he wants me to help him put it on... and I've got to go to the library to take my books back sometime today too.\nMum: Well, do that before you start work on the bike because it isn't open this afternoon.\nBoy: OK. And we're going to play table tennis after we've done the bike, so I won't see you until supper this evening. Bye!",
    options: [
      { text: "Help put a wheel on a bike", imageSeed: "bike-wheel" },
      { text: "Go to the library", imageSeed: "library" },
      { text: "Play table tennis", imageSeed: "table-tennis" }
    ],
    correctAnswer: 1,
    explanation: "The mum tells him to go to the library first ('do that before you start work on the bike'), and he agrees 'OK'."
  }
];

// Topic 9
const topic9Questions = [
  {
    id: "t9_q1",
    question: "1. What was damaged in the storm?",
    transcript: "Man: Was the roof of your house all right after the storm, Anna? I saw a workman there with a ladder today.\nWoman: I'd had the roof repaired recently so that wasn't a problem. The workman was putting some new glass in an upstairs window. I think a branch from a tree broke it when it fell off in the wind. I was quite lucky - it didn't damage my car which was parked right under the tree.",
    options: [
      { text: "The roof", imageSeed: "roof-damage" },
      { text: "An upstairs window", imageSeed: "broken-window" },
      { text: "Her car", imageSeed: "car-damage" }
    ],
    correctAnswer: 1,
    explanation: "She says 'The workman was putting some new glass in an upstairs window. I think a branch from a tree broke it'."
  },
  {
    id: "t9_q2",
    question: "2. What present does the man decide to take?",
    transcript: "Man: My boss has invited me to dinner at his house tomorrow night, but I don't know what sort of present I should take.\nWoman: I suppose flowers are best, but it's not a good time of year for them... and people always take chocolates; that's really boring. What about a plant?\nMan: I think I'd be happier with the boring chocolates than with a plant actually, but thanks for the ideas, anyway.",
    options: [
      { text: "Flowers", imageSeed: "flowers-gift" },
      { text: "Chocolates", imageSeed: "chocolates-gift" },
      { text: "A plant", imageSeed: "plant-gift" }
    ],
    correctAnswer: 1,
    explanation: "He says 'I think I'd be happier with the boring chocolates than with a plant actually'."
  },
  {
    id: "t9_q3",
    question: "3. Which is the woman's jacket?",
    transcript: "Woman: Excuse me, has anyone found my jacket? I left it on the plane. It's grey, with two buttons down the front and one on each sleeve.\nMan: Anything in the pockets, madam?\nWoman: I don't think so.\nMan: Yes, I've got it here.",
    options: [
      { text: "Grey jacket, 2 buttons down front, 1 on each sleeve", imageSeed: "grey-jacket" },
      { text: "Jacket with many buttons", imageSeed: "jacket-buttons" },
      { text: "Jacket with no buttons", imageSeed: "jacket-no-buttons" }
    ],
    correctAnswer: 0,
    explanation: "She describes it as 'grey, with two buttons down the front and one on each sleeve'."
  },
  {
    id: "t9_q4",
    question: "4. Which sport is not included in the price of the holiday?",
    transcript: "Man: Hello. This is the travel agency returning your call. You left a message about the holiday you've booked, asking which sports are included in the cost. There is an extra charge for windsurfing but if you want to play golf, that's free for all hotel guests and horse-riding is also available at no extra charge, which is good because I think you were especially interested in that. Let me know if I can help you with any other information. Goodbye.",
    options: [
      { text: "Windsurfing", imageSeed: "windsurfing" },
      { text: "Golf", imageSeed: "golf" },
      { text: "Horse-riding", imageSeed: "horse-riding" }
    ],
    correctAnswer: 0,
    explanation: "The man says 'There is an extra charge for windsurfing'."
  },
  {
    id: "t9_q5",
    question: "5. Which postcard will they send?",
    transcript: "Woman: We mustn't forget to send Mum a postcard... how about this one with a picture of a castle?\nMan: Well, it's nice, but it's not where we're actually staying. What about a view of the beach and town instead? Or perhaps one of the garden pictures if you think she'd prefer it. Look at the cottage and all the flowers...\nWoman: Mmm... I think your first idea was better... we could put a cross to show where we're staying.\nMan: Right then, let's do that.",
    options: [
      { text: "Picture of a castle", imageSeed: "castle-postcard" },
      { text: "View of the beach and town", imageSeed: "beach-town" },
      { text: "Garden picture with cottage and flowers", imageSeed: "garden-cottage" }
    ],
    correctAnswer: 1,
    explanation: "The woman says 'I think your first idea was better' referring to the man's first suggestion: 'a view of the beach and town'."
  },
  {
    id: "t9_q6",
    question: "6. Where do they decide to go?",
    transcript: "Woman: So, we've got three hours free. Shall we go to an exhibition? What do you think?\nMan: Well, there's an exhibition of photographs at the city museum, or there's a sculpture exhibition at the art gallery, which is meant to be good.\nWoman: Oh, sculpture's boring! Let's go to the museum. I like photos, and we haven't been there since last year when they had that really interesting exhibition of clothes. Do you remember?\nMan: OK. I can go and see the sculptures another day.",
    options: [
      { text: "Exhibition of photographs at the city museum", imageSeed: "photo-exhibition" },
      { text: "Sculpture exhibition at the art gallery", imageSeed: "sculpture-exhibition" },
      { text: "Exhibition of clothes", imageSeed: "clothes-exhibition" }
    ],
    correctAnswer: 0,
    explanation: "The woman says 'Let's go to the museum. I like photos' and the man agrees 'OK'."
  },
  {
    id: "t9_q7",
    question: "7. What has the boy lost?",
    transcript: "Boy: Mum, I'm just off to the shop. Oh, wait a minute, where's my money?\nWoman: Oh, I found your purse lying on the table earlier, so I put it back in your bag.\nBoy: Well, it's not in there now. Maybe it's fallen on the floor somewhere. Can you help me look under the sofa? That's where I was sitting a minute ago.\nWoman: Just a minute, let me check. Yes, look, it is in here after all. I told you that's where I'd put it. You just didn't look properly!",
    options: [
      { text: "His money/purse", imageSeed: "purse-money" },
      { text: "His bag", imageSeed: "bag" },
      { text: "His keys", imageSeed: "keys" }
    ],
    correctAnswer: 0,
    explanation: "He asks 'where's my money?' and the mother talks about finding his 'purse'."
  }
];

existingData[6].questions = topic7Questions;
existingData[7].questions = topic8Questions;
existingData[8].questions = topic9Questions;

fs.writeFileSync('src/data/listening.json', JSON.stringify(existingData, null, 2));
console.log('Updated listening.json with real Topic 7, 8, 9 data');
