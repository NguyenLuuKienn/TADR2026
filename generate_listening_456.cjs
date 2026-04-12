const fs = require('fs');

const existingData = JSON.parse(fs.readFileSync('src/data/listening.json', 'utf8'));

// Topic 4
const topic4Questions = [
  {
    id: "t4_q1",
    question: "1. What did the thieves steal?",
    transcript: "Woman: What exactly is missing, sir?\nMan: I thought the thieves had taken the television set, because it wasn't in its usual place in the dining room. Then I went to check my CD player and CDs - I keep them on an antique chest of drawers. All the CDs were on the floor with the CD player. But the chest had completely disappeared. It wasn't in the garden either, which is where I found the television.\nWoman: Right sir. Well, can you give me a detailed description of it?",
    options: [
      { text: "Television set", imageSeed: "television" },
      { text: "CD player and CDs", imageSeed: "cd-player" },
      { text: "Antique chest of drawers", imageSeed: "chest-drawers" }
    ],
    correctAnswer: 2,
    explanation: "The man says 'But the chest had completely disappeared'."
  },
  {
    id: "t4_q2",
    question: "2. What present will they take?",
    transcript: "Woman: We ought to take a present if we're staying for the weekend.\nMan: Let's get something a bit different. People always take flowers and it's rather hot for chocolates. What about something for the children, like a DVD? Or... some unbreakable glasses they can all use outside or on picnics?\nWoman: Good idea. And let's get a jug to go with them. The children have probably got lots of DVDs.",
    options: [
      { text: "Flowers and chocolates", imageSeed: "flowers-chocolates" },
      { text: "A DVD", imageSeed: "dvd-movie" },
      { text: "Unbreakable glasses and a jug", imageSeed: "glasses-jug" }
    ],
    correctAnswer: 2,
    explanation: "They agree on 'unbreakable glasses' and 'let's get a jug to go with them'."
  },
  {
    id: "t4_q3",
    question: "3. What will the woman eat tonight?",
    transcript: "Man: Hotel York.\nWoman: Hello, I'm staying in your hotel tonight, and I'm arriving quite late, about ten thirty. Will there be any food available in the hotel?\nMan: I'm afraid the restaurant closes at ten o'clock, but the bar does burgers and chips until midnight. And there's always the pizza place opposite which stays open late. Or we can bring sandwiches to your room if you prefer.\nWoman: Fine. I won't want to eat burgers or pizza at that time of night.",
    options: [
      { text: "Burgers and chips", imageSeed: "burger-chips" },
      { text: "Pizza", imageSeed: "pizza" },
      { text: "Sandwiches", imageSeed: "sandwiches" }
    ],
    correctAnswer: 2,
    explanation: "She rejects burgers and pizza ('I won't want to eat burgers or pizza'), leaving sandwiches as the choice."
  },
  {
    id: "t4_q4",
    question: "4. How much will the girl's ticket cost?",
    transcript: "Woman: I'm travelling from Banbury to Witney tomorrow, and I need to be there about ten in the morning. Can you tell me when the trains leave, and how much a single ticket is?\nMan: The eight thirty-five train gets in at nine forty. That's twelve pounds sixty-five for a single. The train after that leaves at nine ten and arrives at ten fifteen. That costs less because you're travelling after nine. The fare is ten pounds forty-five.\nWoman: I'll take the second train. Just after ten is fine. Thanks.",
    options: [
      { text: "£12.65", imageSeed: "money-12" },
      { text: "£10.45", imageSeed: "money-10" },
      { text: "£9.40", imageSeed: "money-9" }
    ],
    correctAnswer: 1,
    explanation: "She takes the second train, and the man says 'The fare is ten pounds forty-five' for that train."
  },
  {
    id: "t4_q5",
    question: "5. What is the grandmother's job now?",
    transcript: "Woman: My grandmother always wanted to be a teacher when she was a little girl, but she had to leave school when she was fourteen and help her mother clean offices and shops. When she was in her thirties she went to college, but she had to work as a waitress in the evenings to pay for her studies. A few years later she finally got the job she'd always wanted and she's done it ever since.",
    options: [
      { text: "Cleaner", imageSeed: "cleaner" },
      { text: "Waitress", imageSeed: "waitress" },
      { text: "Teacher", imageSeed: "teacher" }
    ],
    correctAnswer: 2,
    explanation: "She says 'she finally got the job she'd always wanted and she's done it ever since', and earlier she said her grandmother 'always wanted to be a teacher'."
  },
  {
    id: "t4_q6",
    question: "6. Which button has the boy lost?",
    transcript: "Boy: I've lost a button on my favourite shirt. I could see that it was loose when I put it on last night. If it was the one on my pocket you wouldn't notice, but on the collar it's different. It's easy to see that it's missing from there.\nWoman: Why don't you take one off your sleeve and use that. Here, you'll need some scissors. Be careful you don't cut the material.\nBoy: Okay, will you sew it on for me?\nWoman: Do it yourself! It's easy.",
    options: [
      { text: "Button on the pocket", imageSeed: "shirt-pocket" },
      { text: "Button on the collar", imageSeed: "shirt-collar" },
      { text: "Button on the sleeve", imageSeed: "shirt-sleeve" }
    ],
    correctAnswer: 1,
    explanation: "He says 'but on the collar it's different. It's easy to see that it's missing from there'."
  },
  {
    id: "t4_q7",
    question: "7. What will the man do first?",
    transcript: "Man: Before we start painting I'll wash the kitchen floor because it's really dirty.\nWoman: It'll be easier if you sweep it before you do that, Nick. I'll carry on cleaning the windows.\nMan: OK, and then we can start painting the walls.",
    options: [
      { text: "Wash the floor", imageSeed: "washing-floor" },
      { text: "Sweep the floor", imageSeed: "sweeping-floor" },
      { text: "Paint the walls", imageSeed: "painting-walls" }
    ],
    correctAnswer: 1,
    explanation: "The woman suggests 'It'll be easier if you sweep it before you do that [wash the floor]', and he agrees 'OK'."
  }
];

// Topic 5
const topic5Questions = [
  {
    id: "t5_q1",
    question: "1. Which dish did Mark cook in the competition?",
    transcript: "Woman: So you've won the teenage chef competition, Mark - congratulations!\nMark: Thanks! In the competition, you choose whether to cook a meat, fish or vegetarian dish; then you're judged on the taste and how attractive it looks. I couldn't decide between fish and vegetables - I've never been brilliant at meat dishes. Then I found the judge was an expert in cooking fish, which worried me, so I went for my other choice - and won!",
    options: [
      { text: "Meat dish", imageSeed: "meat-dish" },
      { text: "Fish dish", imageSeed: "fish-dish" },
      { text: "Vegetarian dish", imageSeed: "vegetarian-dish" }
    ],
    correctAnswer: 2,
    explanation: "He couldn't decide between fish and vegetables, then avoided fish because the judge was an expert, so he 'went for my other choice' (vegetables)."
  },
  {
    id: "t5_q2",
    question: "2. Where is the girl's book now?",
    transcript: "Girl: Excuse me. I think I left my book on this table - have you seen it?\nMan: Oh yes. I took it inside with the empty glass when I cleared the table. I gave it to the manager, who put it with the other lost property. He keeps it all in the drawer of his desk.\nGirl: I see. Where is he now?\nMan: He's on the phone inside the café. Why don't you go inside - he'll be finished in a minute.",
    options: [
      { text: "On the table", imageSeed: "cafe-table" },
      { text: "In the manager's desk drawer", imageSeed: "desk-drawer" },
      { text: "Inside the café with the man", imageSeed: "cafe-inside" }
    ],
    correctAnswer: 1,
    explanation: "The man says the manager 'keeps it all in the drawer of his desk'."
  },
  {
    id: "t5_q3",
    question: "3. Who lives with Josh in his house?",
    transcript: "Girl: Does your house seem empty now your sister's left home, Josh?\nJosh: Not really. My grandmother's moved into her room, and she doesn't go out much. It's really nice having her there because my dad never comes home until later, and if my mum's out for the evening, Grandma cooks supper for me.",
    options: [
      { text: "His sister", imageSeed: "sister" },
      { text: "His grandmother, dad, and mum", imageSeed: "family-home" },
      { text: "Only his grandmother", imageSeed: "grandmother" }
    ],
    correctAnswer: 1,
    explanation: "He mentions his grandmother moving in, his dad coming home later, and his mum being out for the evening."
  },
  {
    id: "t5_q4",
    question: "4. What will the girl take with her on holiday?",
    transcript: "Boy: Have you packed for your holiday?\nGirl: No, I need to go shopping before I can do that. Last holiday, my suitcase handle got broken, so I need something new to put all my stuff in. But suitcases are so heavy to carry.\nBoy: I always take a backpack - you can carry more that way.\nGirl: Yes, I thought about one of those, but good-quality ones are expensive. I'll get one of those big sports bags. You know, one you can pull along. They don't cost much, so it doesn't matter if it gets torn.",
    options: [
      { text: "A suitcase", imageSeed: "suitcase" },
      { text: "A backpack", imageSeed: "backpack" },
      { text: "A big sports bag", imageSeed: "sports-bag" }
    ],
    correctAnswer: 2,
    explanation: "She says 'I'll get one of those big sports bags'."
  },
  {
    id: "t5_q5",
    question: "5. What time will the train to Manchester leave?",
    transcript: "Man: The train arriving at platform six is the 11.45 from Manchester. The train due to arrive at platform four in approximately five minutes is the delayed 11.30 train to Manchester. The train will now depart at 11.50 and travel non-stop. We apologise to passengers for the delay. Refreshments will not be available on this train.",
    options: [
      { text: "11:30", imageSeed: "clock-11-30" },
      { text: "11:45", imageSeed: "clock-11-45" },
      { text: "11:50", imageSeed: "clock-11-50" }
    ],
    correctAnswer: 2,
    explanation: "The announcer says 'The train will now depart at 11.50'."
  },
  {
    id: "t5_q6",
    question: "6. Where will the friends meet?",
    transcript: "Kimberley: Hi, it's Kimberley. I got your message and I'd love to go to the movies. There's a film called SpyGame, or a comedy - I don't mind which... Shall we meet outside the cinema?\nGirl: Or, I know, at the burger bar on the corner. We could have a snack before we go in or we could meet at the bus station.\nKimberley: Mum's driving me into town this afternoon, to buy some trainers, so I won't be near the station. But something to eat first is a good idea. Shall we say 6 o'clock?\nGirl: OK.",
    options: [
      { text: "Outside the cinema", imageSeed: "cinema" },
      { text: "At the burger bar", imageSeed: "burger-bar" },
      { text: "At the bus station", imageSeed: "bus-station" }
    ],
    correctAnswer: 1,
    explanation: "The girl suggests the burger bar for a snack, and Kimberley agrees saying 'something to eat first is a good idea'."
  },
  {
    id: "t5_q7",
    question: "7. Which sport will the boy do soon at the centre?",
    transcript: "Boy: Have you been to the new water sports centre yet?\nGirl: Oh yes, it's brilliant. There are two indoor pools, one for underwater diving and one for swimming, and you can also have sailing lessons on the lake.\nBoy: That's what I'm doing there next weekend, actually. I was hoping to take waterskiing lessons, but the leaflet says they're not starting those until next year.",
    options: [
      { text: "Underwater diving", imageSeed: "diving" },
      { text: "Sailing", imageSeed: "sailing" },
      { text: "Waterskiing", imageSeed: "waterskiing" }
    ],
    correctAnswer: 1,
    explanation: "The girl mentions sailing lessons, and the boy replies 'That's what I'm doing there next weekend, actually'."
  }
];

// Topic 6
const topic6Questions = [
  {
    id: "t6_q1",
    question: "1. What can't the woman find?",
    transcript: "Mum: I'm going to mend and paint the cupboard in your bedroom today.\nDaughter: Great, Mum. Anything I can do to help?\nMum: Yes, can you go to the shop and get me a new hammer - this one's broken. But before you do that, ask your dad what he's done with the paintbrush - I've looked everywhere for it. There weren't any in the garage; all I could find was this knife which I lost months ago!",
    options: [
      { text: "A hammer", imageSeed: "hammer" },
      { text: "A paintbrush", imageSeed: "paintbrush" },
      { text: "A knife", imageSeed: "knife" }
    ],
    correctAnswer: 1,
    explanation: "She asks her daughter to find out 'what he's done with the paintbrush - I've looked everywhere for it'."
  },
  {
    id: "t6_q2",
    question: "2. What is the weather forecast for tomorrow?",
    transcript: "Man: And now for those of you planning to go to the rock festival tomorrow, you'll want to know what the weather's going to be like. As we go through today, the heavy rain will gradually disappear by the end of the afternoon. Tomorrow we can expect some sunshine with just a few light showers, and then some very hot and dry weather is likely by the weekend.",
    options: [
      { text: "Heavy rain", imageSeed: "heavy-rain" },
      { text: "Sunshine with light showers", imageSeed: "sun-rain" },
      { text: "Very hot and dry", imageSeed: "hot-dry" }
    ],
    correctAnswer: 1,
    explanation: "The forecast for tomorrow is 'some sunshine with just a few light showers'."
  },
  {
    id: "t6_q3",
    question: "3. What did the boy buy?",
    transcript: "Son: I got most of the shopping you asked for, Mum. I got the last of the bread and some orange juice but sorry, there weren't any newspapers left.\nMum: Oh, never mind, I need to remember to go in the morning. But what about the tomatoes for the salad?\nSon: Ah... I forgot. I'll go back for them.\nMum: Oh, don't worry, I'll stop and pick some up when I go out to collect your sister.",
    options: [
      { text: "Bread and orange juice", imageSeed: "bread-juice" },
      { text: "Newspapers", imageSeed: "newspapers" },
      { text: "Tomatoes", imageSeed: "tomatoes" }
    ],
    correctAnswer: 0,
    explanation: "He says 'I got the last of the bread and some orange juice'."
  },
  {
    id: "t6_q4",
    question: "4. Which present has the girl bought her mother?",
    transcript: "Jane: Hi... it's me, Jane... I've got Mum's birthday present. I think she'll like it... Yes, that's right, a gold-coloured one. She's always writing letters, so she'll find it useful... Mmm. I thought about a CD but I'm never really sure what music she likes, and Dad's bought her a new pair of earrings for her birthday anyway. I'm sure she'll like what I've got her.",
    options: [
      { text: "A gold-coloured pen", imageSeed: "gold-pen" },
      { text: "A CD", imageSeed: "cd" },
      { text: "A pair of earrings", imageSeed: "earrings" }
    ],
    correctAnswer: 0,
    explanation: "She bought 'a gold-coloured one' and says 'She's always writing letters, so she'll find it useful', which implies a pen."
  },
  {
    id: "t6_q5",
    question: "5. Which TV programme will they watch together?",
    transcript: "Girl: Hasn't that basketball match finished yet? You know I want to watch the wildlife programme at nine o'clock.\nBoy: It's cancelled, and everything's running late because the rock concert finished later than expected. Sit down and watch this match with me. It's really exciting, and more interesting than looking at animals.\nGirl: Oh, OK then.",
    options: [
      { text: "Wildlife programme", imageSeed: "wildlife-tv" },
      { text: "Rock concert", imageSeed: "rock-concert" },
      { text: "Basketball match", imageSeed: "basketball-tv" }
    ],
    correctAnswer: 2,
    explanation: "The boy asks her to 'Sit down and watch this match with me' (the basketball match), and she agrees 'Oh, OK then'."
  },
  {
    id: "t6_q6",
    question: "6. What time is the swimming lesson today?",
    transcript: "Girl: Hi Judy - do you want to play tennis after school - say about 4.30?\nJudy: Mmm - that would be fun but I've got a swimming lesson. It's usually at a quarter past five but it's half an hour earlier this evening, at a quarter to five. It takes me ages to cycle to the swimming pool, so I really don't think I'll have time today - let's try tomorrow.\nGirl: OK!",
    options: [
      { text: "4:30", imageSeed: "clock-4-30" },
      { text: "4:45 (quarter to five)", imageSeed: "clock-4-45" },
      { text: "5:15 (quarter past five)", imageSeed: "clock-5-15" }
    ],
    correctAnswer: 1,
    explanation: "Judy says 'it's half an hour earlier this evening, at a quarter to five'."
  },
  {
    id: "t6_q7",
    question: "7. Which subject does the boy like best?",
    transcript: "Boy: I really like the new IT teacher - our project for this term is to design a new website. I've always wanted to know how to do that. The sports teacher is much more serious but that's still my favourite subject. Last year I used to really like geography, but the teacher we have now gives us so much homework.",
    options: [
      { text: "IT (Information Technology)", imageSeed: "computer-class" },
      { text: "Sports", imageSeed: "sports-class" },
      { text: "Geography", imageSeed: "geography-class" }
    ],
    correctAnswer: 1,
    explanation: "He says 'The sports teacher is much more serious but that's still my favourite subject'."
  }
];

existingData[3].questions = topic4Questions;
existingData[4].questions = topic5Questions;
existingData[5].questions = topic6Questions;

fs.writeFileSync('src/data/listening.json', JSON.stringify(existingData, null, 2));
console.log('Updated listening.json with real Topic 4, 5, 6 data');
