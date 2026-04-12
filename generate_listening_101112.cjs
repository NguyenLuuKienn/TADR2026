const fs = require('fs');

const existingData = JSON.parse(fs.readFileSync('src/data/listening.json', 'utf8'));

// Topic 10
const topic10Questions = [
  {
    id: "t10_q1",
    question: "1. Which sport will the woman learn on holiday?",
    transcript: "Man: ... So if you're interested in water sports, this hotel has two pools, diving boards, and its own private beach. You can learn to water ski there, and guests can windsurf too - although the hotel advises beginners to take a few lessons before going out on their own.\nWoman: Good. I'm quite a strong swimmer, and I have always wanted to try windsurfing, so that would suit me fine. I tried water skiing once, but I didn't like it.\nMan: Well, I'm sure you'll enjoy your stay there then.\nWoman: Good.",
    options: [
      { text: "Water skiing", imageSeed: "water-skiing" },
      { text: "Windsurfing", imageSeed: "windsurfing" },
      { text: "Diving", imageSeed: "diving-board" }
    ],
    correctAnswer: 1,
    explanation: "She says 'I have always wanted to try windsurfing, so that would suit me fine' and mentions she didn't like water skiing."
  },
  {
    id: "t10_q2",
    question: "2. What does the girl's penfriend look like now?",
    transcript: "Woman: Look at these photos of my penfriend and her family. I took them during the trip.\nMan: So is she the one with long hair?\nWoman: Oh, that's her sister. This is her, next to me. She looks a lot like her sister, though, doesn't she? And they used to have hair the same length, but hers has always been curly. It's a shame she had it cut, though - I think it looked better when it was long.",
    options: [
      { text: "Long straight hair", imageSeed: "long-straight-hair" },
      { text: "Long curly hair", imageSeed: "long-curly-hair" },
      { text: "Short curly hair", imageSeed: "short-curly-hair" }
    ],
    correctAnswer: 2,
    explanation: "She says 'hers has always been curly' and 'It's a shame she had it cut, though', meaning she now has short curly hair."
  },
  {
    id: "t10_q3",
    question: "3. Which animals did the children see?",
    transcript: "Woman: Well, the zoo was a bit disappointing. The children enjoyed feeding the horses and watching the monkeys and the birds, but they hoped to see lions and tigers, and there weren't any. Someone told us they don't have them there because the security isn't good enough, but I don't know if that's true.",
    options: [
      { text: "Horses, monkeys, and birds", imageSeed: "horses-monkeys" },
      { text: "Lions and tigers", imageSeed: "lions-tigers" },
      { text: "Only birds", imageSeed: "birds-zoo" }
    ],
    correctAnswer: 0,
    explanation: "She says 'The children enjoyed feeding the horses and watching the monkeys and the birds', and notes there were no lions or tigers."
  },
  {
    id: "t10_q4",
    question: "4. Which TV programme is on first?",
    transcript: "Woman: ... and welcome to our Tuesday evening programmes. At 9.00 we'll have the first of our new programmes on sport, and today you can see live the final of the international tennis cup. But before that we have singer, Jane Shelley in concert. She will perform songs from her new CD. This will be followed by today's news from around the world...",
    options: [
      { text: "Tennis match (sport)", imageSeed: "tennis-tv" },
      { text: "Singer in concert", imageSeed: "singer-concert" },
      { text: "News", imageSeed: "news-tv" }
    ],
    correctAnswer: 1,
    explanation: "The announcer says 'At 9.00 we'll have the first of our new programmes on sport... But before that we have singer, Jane Shelley in concert'."
  },
  {
    id: "t10_q5",
    question: "5. What does the boy decide to buy for his grandmother?",
    transcript: "Boy: My mum says I've got to buy my granny a present because she always gets me one when she goes on holiday. I thought I'd get her a black T-shirt.\nGirl: Don't be silly, old ladies don't wear T-shirts. Why not get her some of the local perfume. It smells of roses, or one of those little wooden boxes - they're great for keeping earrings and stuff in.\nBoy: That's a good idea. She does a lot of travelling, so she can use it to put her jewellery in.",
    options: [
      { text: "A black T-shirt", imageSeed: "black-tshirt" },
      { text: "Perfume", imageSeed: "perfume" },
      { text: "A little wooden box", imageSeed: "wooden-box" }
    ],
    correctAnswer: 2,
    explanation: "He agrees with the girl's suggestion of the wooden box, saying 'she can use it to put her jewellery in'."
  },
  {
    id: "t10_q6",
    question: "6. What time is the man's appointment?",
    transcript: "Woman: Hello. Appointments.\nMan: Hello. Could I make an appointment to see Dr. Smith, next Tuesday please? Early evening, if possible - anything after 6 o'clock.\nWoman: Well, we open at 6.15 on Tuesday evenings, and there's an appointment at 6.35 or 6.50.\nMan: Thanks. I'll take the earlier one. My name's...",
    options: [
      { text: "6:15", imageSeed: "clock-6-15" },
      { text: "6:35", imageSeed: "clock-6-35" },
      { text: "6:50", imageSeed: "clock-6-50" }
    ],
    correctAnswer: 1,
    explanation: "The options are 6.35 or 6.50, and he says 'I'll take the earlier one' (6.35)."
  },
  {
    id: "t10_q7",
    question: "7. What has the woman lost?",
    transcript: "Woman: Excuse me, I was sitting over there ten minutes ago making a call on my mobile phone. I got a pen out of my bag to write something down and I think my purse fell out. I can't find it now. Has anyone handed it to you?",
    options: [
      { text: "Her mobile phone", imageSeed: "mobile-phone" },
      { text: "A pen", imageSeed: "pen" },
      { text: "Her purse", imageSeed: "purse" }
    ],
    correctAnswer: 2,
    explanation: "She says 'I think my purse fell out. I can't find it now'."
  }
];

// Topic 11
const topic11Questions = [
  {
    id: "t11_q1",
    question: "1. What is the weather forecast for tomorrow?",
    transcript: "Man: And now for the weather. As we go through today, the temperature will slowly rise, and the snow we've had for the last few days will disappear by the end of the afternoon. Tomorrow we can expect some rain, but by the end of the week, some sunny weather is likely.",
    options: [
      { text: "Snow", imageSeed: "snow" },
      { text: "Rain", imageSeed: "rain" },
      { text: "Sunny", imageSeed: "sunny" }
    ],
    correctAnswer: 1,
    explanation: "The announcer says 'Tomorrow we can expect some rain'."
  },
  {
    id: "t11_q2",
    question: "2. What will they buy at the supermarket?",
    transcript: "Woman: Look, Kate, there are some of those biscuits you like!\nGirl: Oh, yes. Mmm... they're a bit expensive, though, Mum. Why don't we have this cake instead? Remember we've got guests coming tomorrow.\nWoman: Oh, I haven't forgotten. I've already made a cake, and I've bought lots of ice cream for the children.\nGirl: Well, I suppose the biscuits would be nice with ice cream. Let's see... oh, good. I've got enough money in my purse.",
    options: [
      { text: "Cake", imageSeed: "cake" },
      { text: "Ice cream", imageSeed: "ice-cream" },
      { text: "Biscuits", imageSeed: "biscuits" }
    ],
    correctAnswer: 2,
    explanation: "The mum already has cake and ice cream. The girl agrees to buy the biscuits ('I suppose the biscuits would be nice with ice cream... I've got enough money')."
  },
  {
    id: "t11_q3",
    question: "3. Which T-shirt does the woman buy?",
    transcript: "Woman: I'd like to buy a white T-shirt with short sleeves, please. Large size.\nMan: I'm afraid the white ones have long sleeves, but we've got short sleeves in the darker colours. Do you want a round neck or a V-neck?\nWoman: It must be round neck. Let me think... umm, OK, I'll take one of the short-sleeved ones - the colour's not so important really.",
    options: [
      { text: "White T-shirt with long sleeves", imageSeed: "white-tshirt-long" },
      { text: "Darker colour T-shirt with short sleeves and round neck", imageSeed: "dark-tshirt-short" },
      { text: "Darker colour T-shirt with short sleeves and V-neck", imageSeed: "dark-tshirt-vneck" }
    ],
    correctAnswer: 1,
    explanation: "She says 'It must be round neck' and 'I'll take one of the short-sleeved ones' (which are the darker colours)."
  },
  {
    id: "t11_q4",
    question: "4. What will the girl take with her on holiday?",
    transcript: "Man: Have you packed for your holiday?\nWoman: No, I need to go shopping before I can do that. Last holiday, my suitcase handle got broken, so I need something that's better quality this time. But suitcases are so heavy to carry.\nMan: I always take a big sports bag - it's light, and not expensive, so it doesn't matter if it gets torn.\nWoman: Yes, I thought about one of those, but you need something stronger when it's going on a plane. I'll get something I can put on my back - you can carry more that way.",
    options: [
      { text: "A suitcase", imageSeed: "suitcase" },
      { text: "A big sports bag", imageSeed: "sports-bag" },
      { text: "A backpack", imageSeed: "backpack" }
    ],
    correctAnswer: 2,
    explanation: "She rejects the sports bag as not strong enough for a plane and says 'I'll get something I can put on my back' (a backpack)."
  },
  {
    id: "t11_q5",
    question: "5. Which exercise is the teacher describing?",
    transcript: "Woman: OK everybody. This next exercise is a bit difficult, but it's really good for your legs. All you do is put your back against the wall... place your feet about half a metre away from the wall... move your back down the wall, so your knees are bent at 90 degrees. Now put your hands out straight in front of you... right... make sure your head is against the wall. Now, see how long you can stay like that! If you do two minutes, you're doing well.",
    options: [
      { text: "Back against wall, knees bent 90 degrees, hands straight out", imageSeed: "wall-sit-exercise" },
      { text: "Touching toes", imageSeed: "touching-toes" },
      { text: "Push-ups", imageSeed: "push-ups" }
    ],
    correctAnswer: 0,
    explanation: "She describes a wall sit: 'back against the wall... knees are bent at 90 degrees... hands out straight in front of you'."
  },
  {
    id: "t11_q6",
    question: "6. What time will the train to London leave?",
    transcript: "Man: The train arriving at platform six is the 4.45 from London. The train due to arrive at platform four in approximately five minutes is the delayed 4.30 train to London. This train will now depart at 4.50 and travel non-stop. We apologise to passengers for the delay. Refreshments will not be available on this train.",
    options: [
      { text: "4:30", imageSeed: "clock-4-30" },
      { text: "4:45", imageSeed: "clock-4-45" },
      { text: "4:50", imageSeed: "clock-4-50" }
    ],
    correctAnswer: 2,
    explanation: "The announcer says 'This train will now depart at 4.50'."
  },
  {
    id: "t11_q7",
    question: "7. Which sport will the boy do soon at the centre?",
    transcript: "Boy: Have you been to the new watersports centre yet?\nGirl: Oh yes, it's brilliant. There are two indoor pools, one for diving and one for swimming, and you can also have sailing lessons on the lake.\nBoy: That's what I'm doing there next weekend, actually. I was hoping to take windsurfing lessons, but the leaflet says they're not starting those until next year.",
    options: [
      { text: "Diving", imageSeed: "diving" },
      { text: "Sailing", imageSeed: "sailing" },
      { text: "Windsurfing", imageSeed: "windsurfing" }
    ],
    correctAnswer: 1,
    explanation: "The girl mentions sailing lessons, and the boy replies 'That's what I'm doing there next weekend, actually'."
  }
];

// Topic 12
const topic12Questions = [
  {
    id: "t12_q1",
    question: "1. Which of Miranda's things will Lucy be able to use?",
    transcript: "Woman: Lucy's joining the tennis club, so that'll be more equipment I have to buy.\nMan: Oh well, don't waste too much money. We bought Miranda everything, but then she only went once because she didn't like the teacher. Actually, I think we've still got some of it somewhere. There's a box of balls in the cupboard certainly, but she gave her cousin the racket, and she wears the shoes for other things. But I could look in the cupboard and give you what's there.\nWoman: Oh thanks, that'd be great. That would be really helpful.",
    options: [
      { text: "Tennis balls", imageSeed: "tennis-balls" },
      { text: "Tennis racket", imageSeed: "tennis-racket" },
      { text: "Tennis shoes", imageSeed: "tennis-shoes" }
    ],
    correctAnswer: 0,
    explanation: "The man says 'There's a box of balls in the cupboard certainly', noting the racket was given away and the shoes are used for other things."
  },
  {
    id: "t12_q2",
    question: "2. What can't the woman find?",
    transcript: "Woman: I'm going to mend and paint the shelves in your bedroom today.\nMan: Great, Mum. Anything I can do to help?\nWoman: Yes, can you go to the shop and get me a new paint brush - this one's too old. But before you do that, ask your father what he's done with the hammer - I've looked everywhere for it. There was nothing in the toolbox except this pair of scissors which I lost months ago!",
    options: [
      { text: "A paint brush", imageSeed: "paintbrush" },
      { text: "A hammer", imageSeed: "hammer" },
      { text: "A pair of scissors", imageSeed: "scissors" }
    ],
    correctAnswer: 1,
    explanation: "She asks him to find out 'what he's done with the hammer - I've looked everywhere for it'."
  },
  {
    id: "t12_q3",
    question: "3. Which ring has the woman lost?",
    transcript: "Woman: I wonder if you can help me? I ate here in this restaurant last night, and I think I left my ring in the bathroom when I washed my hands. Have you seen it? It's got a square bluey-green stone with lots of smaller stones round it. It's quite valuable but that's not the point - it was my grandmother's and I'd hate to lose it.",
    options: [
      { text: "Ring with a square stone and smaller stones around it", imageSeed: "square-ring" },
      { text: "Ring with a round stone", imageSeed: "round-ring" },
      { text: "Plain gold ring", imageSeed: "plain-ring" }
    ],
    correctAnswer: 0,
    explanation: "She describes it as having 'a square bluey-green stone with lots of smaller stones round it'."
  },
  {
    id: "t12_q4",
    question: "4. What time did the girl arrive?",
    transcript: "Man: Sorry I'm late - have you been here long?\nWoman: Well... not really, about five or ten minutes perhaps. I left home at five past six and got here at exactly quarter to seven.\nMan: Well... if we hurry, we'll still make it for the beginning of the film at seven.",
    options: [
      { text: "6:05 (five past six)", imageSeed: "clock-6-05" },
      { text: "6:45 (quarter to seven)", imageSeed: "clock-6-45" },
      { text: "7:00", imageSeed: "clock-7-00" }
    ],
    correctAnswer: 1,
    explanation: "She says 'I left home at five past six and got here at exactly quarter to seven'."
  },
  {
    id: "t12_q5",
    question: "5. What will be on television at 10 o'clock this evening?",
    transcript: "Man: Here is an announcement about a change to our advertised programmes this evening. The football match between Spain and Hungary is now going to finish later than expected. When the match ends at 10.30 our programmes will continue as planned with a visit to an open air rock concert. But 'The Blue World' programme about life under the sea, which was due to begin at 10.00 o'clock this evening will now be shown next week instead.",
    options: [
      { text: "Football match", imageSeed: "football-tv" },
      { text: "Rock concert", imageSeed: "rock-concert-tv" },
      { text: "The Blue World (under the sea)", imageSeed: "under-sea-tv" }
    ],
    correctAnswer: 0,
    explanation: "The football match is finishing late ('ends at 10.30'), meaning it will still be on at 10 o'clock. 'The Blue World' is postponed."
  },
  {
    id: "t12_q6",
    question: "6. Where will the party be?",
    transcript: "Man: What time are we leaving for Maria's party tonight?\nWoman: Not too early. It'll only take ten minutes to get to the nightclub.\nMan: Oh, I thought we were all meeting at the outdoor concert?\nWoman: There's been a change of plan. The two of us are meeting Maria at the club. We've told her the party's there. But the other guests will go to her flat and prepare everything while we keep Maria busy. We'll take her back there after about an hour - she will be surprised!",
    options: [
      { text: "At the nightclub", imageSeed: "nightclub" },
      { text: "At the outdoor concert", imageSeed: "outdoor-concert" },
      { text: "At Maria's flat", imageSeed: "flat-party" }
    ],
    correctAnswer: 2,
    explanation: "The woman explains the real party is at Maria's flat ('the other guests will go to her flat and prepare everything... We'll take her back there')."
  },
  {
    id: "t12_q7",
    question: "7. What did the man buy?",
    transcript: "Woman: Oh, good, you're home! Did you get all the shopping? How about the orange juice?\nMan: Well, actually, at first I thought the shop didn't have any orange juice. I was thinking we'd have to manage without. Then I realised they'd moved it to a different shelf. I hope this is enough.\nWoman: Don't worry, that's plenty. Did you find the grapes?\nMan: Yes, there were lots of grapes. Only they looked a bit sour, so I got strawberries instead. They were a bit expensive, though.",
    options: [
      { text: "Orange juice and grapes", imageSeed: "juice-grapes" },
      { text: "Orange juice and strawberries", imageSeed: "juice-strawberries" },
      { text: "Only strawberries", imageSeed: "strawberries" }
    ],
    correctAnswer: 1,
    explanation: "He bought orange juice ('I hope this is enough') and strawberries instead of grapes ('so I got strawberries instead')."
  }
];

existingData[9].questions = topic10Questions;
existingData[10].questions = topic11Questions;
existingData[11].questions = topic12Questions;

fs.writeFileSync('src/data/listening.json', JSON.stringify(existingData, null, 2));
console.log('Updated listening.json with real Topic 10, 11, 12 data');
