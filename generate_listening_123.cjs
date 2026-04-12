const fs = require('fs');

const existingData = JSON.parse(fs.readFileSync('src/data/listening.json', 'utf8'));

// Topic 1
const topic1Questions = [
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
  },
  {
    id: "t1_q5",
    question: "5. What will the man do this winter?",
    transcript: "Woman: Will you go on working as a gardener when winter comes, Jim? You'll get very cold and wet working outside.\nMan: Well, last winter I took a job in a supermarket. They're advertising for staff again at the moment, but I prefer being in the fresh air - even when the weather's bad. I'd really like to get a job abroad in the sun, but all the ones I've seen need building skills, which I haven't got. So I'll just stay in my present job for the time being.",
    options: [
      { text: "Work in a supermarket", imageSeed: "supermarket-worker" },
      { text: "Work as a builder abroad", imageSeed: "builder" },
      { text: "Work as a gardener", imageSeed: "gardener" }
    ],
    correctAnswer: 2,
    explanation: "He says 'I'll just stay in my present job for the time being', and his present job is a gardener."
  },
  {
    id: "t1_q6",
    question: "6. How does the man want the woman to help him?",
    transcript: "Man: Sarah, could you do something for me?\nWoman: Well, it depends what it is.\nMan: I want to clean the bedroom windows this afternoon, but I lent the ladder to John... could you give me a lift to his house and then bring me back with the ladder?\nWoman: Of course - no problem.",
    options: [
      { text: "Clean the windows", imageSeed: "cleaning-windows" },
      { text: "Give him a lift to get the ladder", imageSeed: "driving-car" },
      { text: "Lend him a ladder", imageSeed: "ladder" }
    ],
    correctAnswer: 1,
    explanation: "He asks 'could you give me a lift to his house and then bring me back with the ladder?'."
  },
  {
    id: "t1_q7",
    question: "7. Which house did the woman stay in?",
    transcript: "Woman 1: I love these photos of your holiday. Is this the house you stayed in? I love the balconies and all those plants growing up the walls. Oh, and there's a lovely big swimming pool.\nWoman 2: Let me see. Oh, you're looking at the wrong photo - that was the house our friends stayed in. Ours was exactly like that one, but we only had the sea to swim in. Here, let me show you a photo of our house. It was just as nice.",
    options: [
      { text: "House with balconies, plants, and a swimming pool", imageSeed: "house-pool" },
      { text: "House with balconies, plants, and the sea", imageSeed: "house-sea" },
      { text: "House with no balconies", imageSeed: "simple-house" }
    ],
    correctAnswer: 1,
    explanation: "She says 'Ours was exactly like that one [with balconies and plants], but we only had the sea to swim in'."
  }
];

// Topic 2
const topic2Questions = [
  {
    id: "t2_q1",
    question: "1. Where are the dictionaries?",
    transcript: "Man: As this is your first visit to the library, I'll show you round. As you can see, shelves are clearly labelled according to subject. Most books you may take home with you but some, such as foreign language dictionaries, must stay in the library. These can be found over there behind the computers and it's best if you take them to the desks by the window and study them there. Or you can use these armchairs if you prefer to sit somewhere more comfortable.",
    options: [
      { text: "Behind the computers", imageSeed: "computers-library" },
      { text: "On the desks by the window", imageSeed: "desk-window" },
      { text: "On the armchairs", imageSeed: "armchair" }
    ],
    correctAnswer: 0,
    explanation: "He says 'These can be found over there behind the computers'."
  },
  {
    id: "t2_q2",
    question: "2. Which evening dress does the woman decide to wear?",
    transcript: "Man: Why are you taking so long to decide what to wear tomorrow night? The black dress with the long sleeves will be fine!\nWoman: Mmm... Long sleeves are a bit uncomfortable, but yes, it's a nice dress. Trouble is, I've lent my short-sleeved dress to Angela. That would be perfect, it's a long dress with a wide belt... Anyway, let's see what I've got here... this one, also black, short-sleeved - but it's got white flowers on the sleeves.\nMan: Why don't you phone Angela and get your dress back?",
    options: [
      { text: "Black dress with long sleeves", imageSeed: "black-dress-long" },
      { text: "Long dress with a wide belt", imageSeed: "dress-belt" },
      { text: "Black dress, short-sleeved with white flowers", imageSeed: "black-dress-flowers" }
    ],
    correctAnswer: 2,
    explanation: "She considers the options and ends up looking at the 'black, short-sleeved - but it's got white flowers on the sleeves'."
  },
  {
    id: "t2_q3",
    question: "3. What is the man's job now?",
    transcript: "Man: When I was young, I used to paint. I always dreamed of being an artist, painting pictures for a living. But I didn't do very well at school and so I left early to join my dad working in the family photography business. After a few years of that I got bored, and felt I wanted to go back and study. That's when I did my degree and teacher training, and I've taught photography ever since, although I still paint in my spare time.",
    options: [
      { text: "Artist/Painter", imageSeed: "painter" },
      { text: "Photographer", imageSeed: "photographer" },
      { text: "Photography teacher", imageSeed: "teacher-class" }
    ],
    correctAnswer: 2,
    explanation: "He says 'I've taught photography ever since'."
  },
  {
    id: "t2_q4",
    question: "4. Which calendar will the boy buy?",
    transcript: "Boy: Mum asked me to buy her a calendar. Shall I get this one with pictures of mountains, or this one with boats on it?\nGirl: She loves sailing, so get that one. I like that one with wild animals, but I don't suppose Mum would. And you can't get the one with mountains because she had that last year.\nBoy: Yes, I know. I'll get the one you suggested then.",
    options: [
      { text: "Mountains", imageSeed: "mountains-calendar" },
      { text: "Boats/Sailing", imageSeed: "boats-calendar" },
      { text: "Wild animals", imageSeed: "animals-calendar" }
    ],
    correctAnswer: 1,
    explanation: "The girl suggests the one with boats because 'She loves sailing', and the boy agrees 'I'll get the one you suggested then'."
  },
  {
    id: "t2_q5",
    question: "5. What time will the writer arrive at the bookshop?",
    transcript: "Man: All fans of Peter Robbins should go to the South Street book store tomorrow afternoon, where Peter will sign copies of his book Love of Life and answer questions. He is expected at a quarter past two and promises to stay until half past three, when he has to leave for another appointment. Get there as soon as you can because, if it's anything like Peter's last visit, queues will start to form at quarter to two or even earlier. Don't miss this opportunity to meet everyone's favourite writer.",
    options: [
      { text: "1:45 (quarter to two)", imageSeed: "clock-1-45" },
      { text: "2:15 (quarter past two)", imageSeed: "clock-2-15" },
      { text: "3:30 (half past three)", imageSeed: "clock-3-30" }
    ],
    correctAnswer: 1,
    explanation: "The announcer says 'He is expected at a quarter past two'."
  },
  {
    id: "t2_q6",
    question: "6. What did the woman leave in the restaurant?",
    transcript: "Man: Hello... back again. Did you leave something behind?\nWoman: Yes. I don't know if you remember but when I wanted to pay the bill I couldn't find my purse, so I emptied everything out of my bag to look for it, and that's when I took my keys out. When I got back to the car, I realised they weren't in my bag...\nMan: Which table were you sitting at?",
    options: [
      { text: "Her purse", imageSeed: "purse" },
      { text: "Her bag", imageSeed: "handbag" },
      { text: "Her keys", imageSeed: "keys-car" }
    ],
    correctAnswer: 2,
    explanation: "She says 'that's when I took my keys out. When I got back to the car, I realised they weren't in my bag'."
  },
  {
    id: "t2_q7",
    question: "7. Where is the bicycle?",
    transcript: "Boy: I think someone's stolen my bicycle. I left it by that tree on the pavement, but it's not there any more.\nGirl: Perhaps it got in my father's way when he was parking his car.\nBoy: Oh yeah, I think you're right. It's on the other side of the road, by that street light. He probably moved it. I'll remember to leave it well away from the tree in future!\nGirl: Yes, and lock it next time as well.",
    options: [
      { text: "By the tree on the pavement", imageSeed: "tree-pavement" },
      { text: "By the car", imageSeed: "parked-car" },
      { text: "By the street light on the other side", imageSeed: "street-light" }
    ],
    correctAnswer: 2,
    explanation: "The boy spots it and says 'It's on the other side of the road, by that street light'."
  }
];

// Topic 3
const topic3Questions = [
  {
    id: "t3_q1",
    question: "1. What regular exercise does David do at the moment?",
    transcript: "Cathy: You're looking well, David! Have you been to the gym a lot recently or something?\nDavid: Well, I joined a gym earlier this year, but I stopped going - it was just too difficult. And expensive, too! I've done a lot of swimming instead, and I feel much better for it!\nCathy: It shows! I'm thinking of taking up tennis again. Would you be interested in a game one day? You used to be quite good, didn't you?\nDavid: Well, I haven't played for a long time but... why not?",
    options: [
      { text: "Gym", imageSeed: "gym-workout" },
      { text: "Swimming", imageSeed: "swimming-pool" },
      { text: "Tennis", imageSeed: "tennis-racket" }
    ],
    correctAnswer: 1,
    explanation: "David says 'I've done a lot of swimming instead'."
  },
  {
    id: "t3_q2",
    question: "2. What should Suzie take to Emma's house?",
    transcript: "Woman: Suzie? It's Emma. We've got to make some paper flowers so the classroom looks nice for the end-of-term party. Can you come to my house this evening to help me do it? There's some paint left over from last time, but I can't find any brushes. Have you got one? Bring it if you have. And if we have a pair of scissors each, we can work faster, so don't forget yours. We'll need coloured paper, but I'm getting that from college. See you around six.",
    options: [
      { text: "Paint and paper", imageSeed: "paint-paper" },
      { text: "Brushes and scissors", imageSeed: "brushes-scissors" },
      { text: "Coloured paper and scissors", imageSeed: "paper-scissors" }
    ],
    correctAnswer: 1,
    explanation: "Emma asks Suzie to bring brushes ('Have you got one? Bring it if you have') and scissors ('don't forget yours')."
  },
  {
    id: "t3_q3",
    question: "3. Which kind of T-shirt did the boy choose?",
    transcript: "Girl: Look, it's your present. Just choose a T-shirt and then you can have anything you like printed on it. They've got three types - a picture like this one with boats on, or there are some with words, and this type has shapes on it.\nBoy: Well, I really don't like writing - it makes me feel like an advertisement! And those pictures are awful...\nGirl: Right then, I know which one you'll choose...",
    options: [
      { text: "T-shirt with boats (picture)", imageSeed: "tshirt-boats" },
      { text: "T-shirt with words", imageSeed: "tshirt-words" },
      { text: "T-shirt with shapes", imageSeed: "tshirt-shapes" }
    ],
    correctAnswer: 2,
    explanation: "He rejects writing and pictures, leaving the T-shirt with shapes as the only option."
  },
  {
    id: "t3_q4",
    question: "4. What frightened the man?",
    transcript: "Woman: How was your camping holiday in Africa?\nMan: Oh... fantastic... we saw all sorts of wildlife. You know, lots of lions and all that.\nWoman: Wasn't it frightening with all those animals so close to your tent?\nMan: Not really, to be honest, what scared me most were the bats... they flew so close at night... I thought I'd be frightened of all the other things like elephants... but in the end I wasn't because we only saw them during the day and they were mostly quite a long way away.",
    options: [
      { text: "Lions", imageSeed: "lion" },
      { text: "Bats", imageSeed: "bats" },
      { text: "Elephants", imageSeed: "elephant" }
    ],
    correctAnswer: 1,
    explanation: "He says 'what scared me most were the bats'."
  },
  {
    id: "t3_q5",
    question: "5. Where is the man calling from?",
    transcript: "Man: Hello, Mary. Could you come and collect me? I went to a client's house by taxi, and I can't get one back.\nWoman: Sure, where are you exactly?\nMan: You know the bridge over the river on the North Road? If you go over that and take the first left, you see a bar on the right. I'll be waiting there. I'm actually in the farmhouse down the road from there at the moment - Mrs Collins has been kind enough to let me use her phone.\nWoman: Fine, see you in the bar soon.",
    options: [
      { text: "A bar", imageSeed: "bar-pub" },
      { text: "A farmhouse", imageSeed: "farmhouse" },
      { text: "A bridge", imageSeed: "bridge" }
    ],
    correctAnswer: 1,
    explanation: "He says 'I'm actually in the farmhouse down the road from there at the moment... to let me use her phone'."
  },
  {
    id: "t3_q6",
    question: "6. How did the woman spend her last holiday?",
    transcript: "Man: You're looking well. How was your holiday in the mountains?\nWoman: Not so good. I hurt my foot on the day I arrived, so climbing was just impossible. While everyone else was going off to the mountains, I stayed and read a book by the hotel pool... not my idea of a good holiday...\nMan: Sorry to hear that. Well, at least you had a good rest... Is your foot better now?\nWoman: Not really. I sit and watch television a lot and try to be patient.",
    options: [
      { text: "Climbing mountains", imageSeed: "mountain-climbing" },
      { text: "Reading a book by the hotel pool", imageSeed: "reading-pool" },
      { text: "Watching television", imageSeed: "watching-tv" }
    ],
    correctAnswer: 1,
    explanation: "She says 'I stayed and read a book by the hotel pool'."
  },
  {
    id: "t3_q7",
    question: "7. Where is the girl's purse?",
    transcript: "Girl: Mum, I'm just off to the shop. Oh, wait a minute, where's my money?\nWoman: Oh, I found your purse lying on the table earlier, so I put it back in your bag.\nGirl: Well, it's not in there now. Maybe it's fallen on the floor somewhere. Can you help me look under the sofa? That's where I was sitting a minute ago.\nWoman: Just a minute, let me check. Yes, look, it is in here after all. I told you that's where I'd put it. You just didn't look properly!",
    options: [
      { text: "On the table", imageSeed: "table" },
      { text: "Under the sofa", imageSeed: "sofa" },
      { text: "In her bag", imageSeed: "handbag-purse" }
    ],
    correctAnswer: 2,
    explanation: "The mother checks the bag and says 'Yes, look, it is in here after all. I told you that's where I'd put it'."
  }
];

existingData[0].questions = topic1Questions;
existingData[1].questions = topic2Questions;
existingData[2].questions = topic3Questions;

fs.writeFileSync('src/data/listening.json', JSON.stringify(existingData, null, 2));
console.log('Updated listening.json with real Topic 1, 2, 3 data');
