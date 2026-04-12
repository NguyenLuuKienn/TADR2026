const fs = require('fs');

const existingData = JSON.parse(fs.readFileSync('src/data/reading.json', 'utf8'));

const newData = [
  {
    "topic": 7,
    "part": "A",
    "title": "Part A: Short Texts",
    "content": "Look at the text in each question. What does it say?\n\n1. Sam, dinner's in the oven. Please put the leftovers in the fridge and your dirty dishes in the dishwasher. Love,\n\n2. Jeff, I have to work till 9p.m. today. Could you get dinner ready? It's in the fridge and just needs warming up. Jane\n\n3. Dave, there's no milk left. I'll get some on my way home. Buy some eggs and tell Mary to make herself a salad. Betty\n\n4. Special offer for two days only! Food items at very, very low prices!\n\n5. Dear customers, Because of building work, the supermarket will be closed until further notice. Sorry for the inconvenience!",
    "questions": [
      {
        "text": "1. Sam, dinner's in the oven...",
        "options": ["A. Sam should heat up her food before she eats it.", "B. Sam should clean up after she's eaten.", "C. Sam should take the food out of the fridge and eat it.", "D. Sam should take the food out of the oven and put it in the fridge."],
        "correctAnswer": "B",
        "explanation": "Put the leftovers in the fridge and dirty dishes in the dishwasher = Sam should clean up after she's eaten."
      },
      {
        "text": "2. Jeff, I have to work till 9p.m. today...",
        "options": ["A. Jane needs to think about food for dinner.", "B. Jeff will buy something for dinner.", "C. Jeff needs to prepare dinner.", "D. Jane needs to cook food when she finishes work."],
        "correctAnswer": "C",
        "explanation": "Could you get dinner ready? = Jeff needs to prepare dinner."
      },
      {
        "text": "3. Dave, there's no milk left...",
        "options": ["A. Dave will go to buy some milk.", "B. There's some milk in the fridge.", "C. Betty will buy some eggs for Mary.", "D. Mary knows how to make a salad."],
        "correctAnswer": "D",
        "explanation": "Tell Mary to make herself a salad = Mary knows how to make a salad."
      },
      {
        "text": "4. Special offer for two days only!...",
        "options": ["A. All food items are half price.", "B. The supermarket doesn't offer low price every day.", "C. Kitchen items are very cheap.", "D. Food will be sold in two days only."],
        "correctAnswer": "B",
        "explanation": "Special offer for two days only = The supermarket doesn't offer low price every day."
      },
      {
        "text": "5. Dear customers, Because of building work...",
        "options": ["A. The supermarket will be opened next week.", "B. Customers can go to the supermarket as usual.", "C. The supermarket will not be opened again.", "D. Customers don't know when the supermarket will be opened again."],
        "correctAnswer": "D",
        "explanation": "Closed until further notice = Customers don't know when the supermarket will be opened again."
      }
    ]
  },
  {
    "topic": 7,
    "part": "B",
    "title": "Part B: Reading Comprehension",
    "content": "I was born in Newcastle, a city in the North East of England. Newcastle is on the bank of the River Tyne. It is quite big, with a population of about 2000,000 people. There is a cathedral and a university. There are five bridges over the Rive Tyne, which link Newcastle to the next town, Gates head, where there is one of the biggest shopping centers in the world. A few years ago, the main industries were shipbuilding and coalmining, but now the chemical and soap industries are important. I moved to London ten years ago but I often return to Newcastle. I miss the people, who are very friendly, and I miss the beautiful countryside near the city, where there are so many hills and streams.",
    "questions": [
      {
        "text": "1. Newcastle is ______________.",
        "options": ["A. a city in the North of England", "B. a city near the North East of England", "C. a city in the North East of England", "D. a small town in England"],
        "correctAnswer": "C",
        "explanation": "Đoạn 1: 'Newcastle, a city in the North East of England.'"
      },
      {
        "text": "2. The population of Newcastle is ______________.",
        "options": ["A. 200,000 people", "B. about 2000,000 people", "C. much less than 200,000 people", "D. much more than 200,00 people"],
        "correctAnswer": "B",
        "explanation": "Đoạn 1: 'with a population of about 2000,000 people.'"
      },
      {
        "text": "3. Gates head has one of ______________.",
        "options": ["A. the biggest shopping centers", "B. the most beautiful country sides", "C. the largest rivers", "D. the most important shipbuilding industries"],
        "correctAnswer": "A",
        "explanation": "Đoạn 1: 'Gates head, where there is one of the biggest shopping centers in the world.'"
      },
      {
        "text": "4. According to the passage, the writer ______________.",
        "options": ["A. doesn’t live in Newcastle any more", "B. has come back to live in Newcastle", "C. is still living in Newcastle", "D. has never returned to Newcastle"],
        "correctAnswer": "A",
        "explanation": "Đoạn 1: 'I moved to London ten years ago but I often return to Newcastle.' (Tác giả đã chuyển đến London nên không còn sống ở Newcastle nữa)."
      },
      {
        "text": "5. Which of the following is not true about Newcastle?",
        "options": ["A. It is next to Gate head", "B. Its main industry now is shipbuilding", "C. It has a cathedral and a university", "D. It has a lot of people"],
        "correctAnswer": "B",
        "explanation": "Đoạn 1: 'A few years ago, the main industries were shipbuilding... but now the chemical and soap industries are important.' (Công nghiệp đóng tàu là trong quá khứ, không phải hiện tại)."
      }
    ]
  },
  {
    "topic": 7,
    "part": "C",
    "title": "Part C: Cloze Test",
    "content": "Fresh Bouquets is a small company, but in the last few years it has become a big (1)…….. story. Entrepreneurs Graham Hodson and Shaun Caulfield (2)…….. the company in 1991. Since then, they have developed a very good (3)……. for last-minute gifts of flowers. In the last four years, they have increased (4)…….. by over 100% per year, from $40,000 to $6,4 million.\n\nAt first, Fresh Bouquets grew its own supplies of flowers at its base in south-east England. Soon, the company needed to import (5)…….. from other countries, such as Turkey and Kenya.\n\nTheir first big (6)…….. was the short life of cut flowers, and this remained the biggest challenge up to the present time. Every day, flowers travel perhaps (7)…….. of kilometers and have to reach the company’s 4,500 customers – mainly petrol stations and supermarkets – in top condition. (8)……, several years ago, the company decided to spend $500,000 a year on information technology for its (9)……. system. It has continued to invest this amount each year since then.\n\nHowever, all the hard work and investment have produced great result. At the beginning of this year, Fresh Bouquets has appeared at number 27 (10)……. the list of Britain’s 100 fastest-growing companies.",
    "questions": [
      { "text": "Blank (1)", "options": ["A. successful", "B. succeed", "C. success", "D. successfully"], "correctAnswer": "C", "explanation": "a big success story (một câu chuyện thành công lớn)." },
      { "text": "Blank (2)", "options": ["A. founded", "B. found", "C. founder", "D. find"], "correctAnswer": "A", "explanation": "founded the company (thành lập công ty)." },
      { "text": "Blank (3)", "options": ["A. shop", "B. market", "C. supermarket", "D. store"], "correctAnswer": "B", "explanation": "developed a very good market (phát triển một thị trường rất tốt)." },
      { "text": "Blank (4)", "options": ["A. selling", "B. seller", "C. sales", "D. sell"], "correctAnswer": "C", "explanation": "increased sales (tăng doanh số bán hàng)." },
      { "text": "Blank (5)", "options": ["A. vegetables", "B. foods", "C. fruits", "D. flowers"], "correctAnswer": "D", "explanation": "import flowers (nhập khẩu hoa)." },
      { "text": "Blank (6)", "options": ["A. work", "B. problem", "C. change", "D. job"], "correctAnswer": "B", "explanation": "Their first big problem (Vấn đề lớn đầu tiên của họ)." },
      { "text": "Blank (7)", "options": ["A. thousands", "B. one thousand", "C. a thousand", "D. thousand"], "correctAnswer": "A", "explanation": "thousands of kilometers (hàng ngàn km)." },
      { "text": "Blank (8)", "options": ["A. But", "B. However", "C. So", "D. Or else"], "correctAnswer": "C", "explanation": "So, several years ago... (Vì vậy, vài năm trước...)." },
      { "text": "Blank (9)", "options": ["A. distribute", "B. distribution", "C. distributed", "D. distributing"], "correctAnswer": "B", "explanation": "distribution system (hệ thống phân phối)." },
      { "text": "Blank (10)", "options": ["A. on", "B. at", "C. in", "D. off"], "correctAnswer": "A", "explanation": "on the list (trên danh sách)." }
    ]
  },
  {
    "topic": 8,
    "part": "A",
    "title": "Part A: Short Texts",
    "content": "Look at the text in each question. What does it say?\n\n1. If it's too cold for you, so is it for your pet. Bring them inside.\n\n2. DO NOT DISTURB\n\n3. Jazz on summer evening\nNo Tickets Left for Sunday Performance\n\n4. STAY OFF THE ROADS\nNOT OUT IN THE WEATHER.\n\n5. FEMA CENTRE CLOSED DUE TO THE WEATHER.",
    "questions": [
      {
        "text": "1. If it's too cold for you, so is it for your pet. Bring them inside.",
        "options": ["A. Stay at home in bad weather.", "B. Go out with your pet when it's cold.", "C. You and your pet shouldn't go out together.", "D. Keep your pet at home."],
        "correctAnswer": "D",
        "explanation": "Bring them inside = Keep your pet at home."
      },
      {
        "text": "2. DO NOT DISTURB",
        "options": ["A. Don't go inside.", "B. Don't close the door.", "C. Go this way.", "D. Come in, please."],
        "correctAnswer": "A",
        "explanation": "Do not disturb = Don't go inside (không làm phiền/không vào trong)."
      },
      {
        "text": "3. Jazz on summer evening. No Tickets Left for Sunday Performance",
        "options": ["A. You can buy tickets here for any evening.", "B. A ticket is not necessary for Sunday evening.", "C. All Sunday evening tickets have been sold out.", "D. No tickets are sold for Sunday."],
        "correctAnswer": "C",
        "explanation": "No Tickets Left = All tickets have been sold out."
      },
      {
        "text": "4. STAY OFF THE ROADS. NOT OUT IN THE WEATHER.",
        "options": ["A. You should stay on the roads because of bad weather.", "B. Don't go out, stay inside.", "C. The weather is good, let's go to the road.", "D. Don't stay inside when the weather's nice."],
        "correctAnswer": "B",
        "explanation": "Stay off the roads, not out in the weather = Don't go out, stay inside."
      },
      {
        "text": "5. FEMA CENTRE CLOSED DUE TO THE WEATHER.",
        "options": ["A. When the weather is good, FEMA centre is opened.", "B. The weather is not suitable to go to FEMA centre.", "C. FEMA centre is closed because of bad weather.", "D. The weather does not affect FEMA centre's activities."],
        "correctAnswer": "C",
        "explanation": "Closed due to the weather = Closed because of bad weather."
      }
    ]
  },
  {
    "topic": 8,
    "part": "B",
    "title": "Part B: Reading Comprehension",
    "content": "In the UK there are four seasons, spring, summer, autumn and winter; and the weather is different in each of them. However, there is not a sudden change between the seasons. It takes several weeks for the weather to change enough for people to notice the difference.\n\nThe summer is the season with the best weather. In general, it is hot and sunny with only a little rain sometimes. However, it can sometimes be cold and wet for one or two weeks at a time. After the summer is the autumn. In this season the weather gets colder and there are stronger winds, also it will rain more. All the leaves will start to fall off the trees as it is cold. Frost might start to form on the ground towards the end of the autumn.\n\nWinter is the coldest season in the UK. The temperature will often be at zero degrees Celsius. This means that ice will often form on the ground overnight where there were puddles. This makes it difficult to walk sometimes. There might also be snow, but the UK does not get much snow, mainly just cold rain in the winter. Then when winter ends the spring starts. The temperature will start to get warmer and the winds will not be as strong. Plants start to grow again and new leaves form.\n\nMany people in the UK complain about the weather, but as the weather changes so much it is very interesting and gives the people something to talk about all year round.",
    "questions": [
      {
        "text": "1. How can the weather in the UK be described?",
        "options": ["A. Mild", "B. Humid", "C. Changeable", "D. Rainy"],
        "correctAnswer": "C",
        "explanation": "Đoạn cuối: 'as the weather changes so much...' (thời tiết thay đổi rất nhiều -> Changeable)."
      },
      {
        "text": "2. What is the weather like in summer in the UK?",
        "options": ["A. It's hot and sunny", "B. It's rainy and wet", "C. It's cold and dry", "D. It's a little cold and windy"],
        "correctAnswer": "A",
        "explanation": "Đoạn 2: 'In general, it is hot and sunny with only a little rain sometimes.'"
      },
      {
        "text": "3. When will frost first appear?",
        "options": ["A. In spring", "B. In summer", "C. In autumn", "D. In winter"],
        "correctAnswer": "C",
        "explanation": "Đoạn 2: 'Frost might start to form on the ground towards the end of the autumn.'"
      },
      {
        "text": "4. What does the word “puddles” mean?",
        "options": ["A. water", "B. frost", "C. stones", "D. snow"],
        "correctAnswer": "A",
        "explanation": "Puddles là vũng nước nhỏ (water)."
      },
      {
        "text": "5. Why do people like the spring?",
        "options": ["A. It is not winter.", "B. It is the shortest season.", "C. It only happens every other year.", "D. It has really nice weather."],
        "correctAnswer": "D",
        "explanation": "Mùa xuân thời tiết ấm lên, gió yếu đi, cây cối mọc lại (thời tiết rất đẹp)."
      }
    ]
  },
  {
    "topic": 8,
    "part": "C",
    "title": "Part C: Cloze Test",
    "content": "The relationship between students and teachers is (1)__________formal in the USA than in many other countries, especially at the college level. American college students do not (2) __________ when their teacher enters the room. Students are generally (3)__________to ask questions in class, to stop in the professor's of lice for extra help, and to phone if they are (4) __________ and need information. (5) ____________teachers allow students to enter class late or leave early, if necessary. (6) __________the lack of formality, students are still expected to be (7) ___________to their teacher and fellow classmates. When students want to ask questions, they usually (8)__________a hand and wait to be (9) _________ on. When the teacher or a student is speaking to the class, it is rude to begin whispering to another classmate. When a test is being given, talking to' a classmate is not only rude but also risky. Most American teachers consider that students who are talking to each other during a test are (10)_________.",
    "questions": [
      { "text": "Blank (1)", "options": ["A. much", "B. most", "C. a little", "D. less"], "correctAnswer": "D", "explanation": "less formal (ít trang trọng hơn)." },
      { "text": "Blank (2)", "options": ["A. sit up", "B. stand up", "C. go up", "D. stay up"], "correctAnswer": "B", "explanation": "do not stand up (không đứng lên)." },
      { "text": "Blank (3)", "options": ["A. encouraged", "B. encouraging", "C. to encourage", "D. encourage"], "correctAnswer": "A", "explanation": "are generally encouraged (thường được khuyến khích)." },
      { "text": "Blank (4)", "options": ["A. wanted", "B. present", "C. absent", "D. healthy"], "correctAnswer": "C", "explanation": "if they are absent (nếu họ vắng mặt)." },
      { "text": "Blank (5)", "options": ["A. Most", "B. Most of", "C. Many of", "D. Much of"], "correctAnswer": "A", "explanation": "Most teachers (Hầu hết các giáo viên)." },
      { "text": "Blank (6)", "options": ["A. Though", "B. Although", "C. In spite to", "D. Despite"], "correctAnswer": "D", "explanation": "Despite the lack of formality (Mặc dù thiếu sự trang trọng)." },
      { "text": "Blank (7)", "options": ["A. impolite", "B. rude", "C. polite", "D. kind"], "correctAnswer": "C", "explanation": "expected to be polite (được mong đợi là sẽ lịch sự)." },
      { "text": "Blank (8)", "options": ["A. raise", "B. hold", "C. hang", "D. rise"], "correctAnswer": "A", "explanation": "raise a hand (giơ tay)." },
      { "text": "Blank (9)", "options": ["A. gone", "B. called", "C. invited", "D. left"], "correctAnswer": "B", "explanation": "wait to be called on (đợi được gọi tên)." },
      { "text": "Blank (10)", "options": ["A. friendly", "B. obidient", "C. cheating", "D. playing"], "correctAnswer": "C", "explanation": "are cheating (đang gian lận)." }
    ]
  },
  {
    "topic": 9,
    "part": "A",
    "title": "Part A: Short Texts",
    "content": "Look at the text in each question. What does it say?\n\n1. Parking form\nComplete and give it to security\nCar registration……\nDate…………………\n\n2. Allow at least two hours for your visit to the museum.\n\n3. More parking spaces behind the hotel.\n\n4. City buses\nPlease have ready the exact fare for your journey\n\n5. Nothing of value is left in this car at night",
    "questions": [
      {
        "text": "1. Parking form. Complete and give it to security...",
        "options": ["A. Register your car here by filling in this form.", "B. Go to security to fill in this form.", "C. Bring the completed form to security.", "D. Ask security to give this form before parking car."],
        "correctAnswer": "C",
        "explanation": "Complete and give it to security = Bring the completed form to security."
      },
      {
        "text": "2. Allow at least two hours for your visit to the museum.",
        "options": ["A. Each tour of the museum lasts less than two hours.", "B. Two hours is the minimum time recommended for a visit to the museum.", "C. Visitors only have two hours to visit the museum.", "D. Visitors are only allowed to spend two hours inside the museum."],
        "correctAnswer": "B",
        "explanation": "Allow at least two hours = Two hours is the minimum time recommended."
      },
      {
        "text": "3. More parking spaces behind the hotel.",
        "options": ["A. It is better to park behind the hotel.", "B. Don't park in front of this hotel.", "C. A new hotel car park is opening soon.", "D. Parking car has been moved behind the hotel."],
        "correctAnswer": "A",
        "explanation": "More parking spaces behind = It is better to park behind the hotel."
      },
      {
        "text": "4. City buses. Please have ready the exact fare for your journey",
        "options": ["A. You need the right ticket for your journey.", "B. You need to keep your ticket ready for checking.", "C. Ticket must be bought before boarding the bus.", "D. You need to have the correct money when you board the bus."],
        "correctAnswer": "D",
        "explanation": "Have ready the exact fare = You need to have the correct money."
      },
      {
        "text": "5. Nothing of value is left in this car at night",
        "options": ["A. This car is not available at night.", "B. Valuable objects are removed at night.", "C. This car is locked at night.", "D. This car contains nothing of value."],
        "correctAnswer": "B",
        "explanation": "Nothing of value is left = Valuable objects are removed at night."
      }
    ]
  },
  {
    "topic": 9,
    "part": "B",
    "title": "Part B: Reading Comprehension",
    "content": "People who traveled frequently on business or pleasure often suffer from health problems, yet over half of these problems can be easily prevented. The most common ailment, a headache, can be avoided by taking along an ample supply of aspirins or other pain relievers. Another common affliction is motion sickness caused by the constant movement of a vehicle. Ginger capsules, sold in most health-food stores, have been found effective as remedy. Other familiar problems include sunburn, which can be prevented by using an effective sunscreen, and insect bites, which can be controlled with a repellent spray or ointment. For everyday cuts and scratches, a first-aid kit containing bandages and antiseptic scream is recommended.",
    "questions": [
      {
        "text": "1. What is the best title for the passage?",
        "options": ["A. Common Health Problems", "B. Frequent Travelers", "C. Avoiding Travel Ailments", "D. Traveling for Business or Pleasure"],
        "correctAnswer": "A",
        "explanation": "Đoạn văn liệt kê các vấn đề sức khỏe phổ biến khi đi du lịch (đau đầu, say tàu xe, cháy nắng...)."
      },
      {
        "text": "2. According to the passage, travelers are most commonly bothered by__________.",
        "options": ["A. sunburn", "B. insect bites", "C. headaches", "D. motion sickness"],
        "correctAnswer": "D",
        "explanation": "Dựa theo đáp án của tài liệu (Mặc dù trong bài có nhắc tới 'The most common ailment, a headache', nhưng đáp án chuẩn của đề thi là D. motion sickness)."
      },
      {
        "text": "3. The word affliction can best be replaced by __________.",
        "options": ["A. ailment", "B. result", "C. experience", "D. supply"],
        "correctAnswer": "A",
        "explanation": "'affliction' (nỗi đau đớn, bệnh tật) đồng nghĩa với 'ailment' (bệnh tật)."
      },
      {
        "text": "4. According to the passage, what can be used to remedy to motion sickness?",
        "options": ["A. A moving vehicle", "B. Pain-killers", "C. Ginger capsules", "D. A first-aid kit"],
        "correctAnswer": "C",
        "explanation": "Đoạn 1: 'Ginger capsules, sold in most health-food stores, have been found effective as remedy.'"
      },
      {
        "text": "5. Which of the following is NOT mentioned in the passage as a solution to a health problem?",
        "options": ["A. sunscreen", "B. repellent spray", "C. cold cream", "D. aspirin"],
        "correctAnswer": "C",
        "explanation": "Trong bài có nhắc đến sunscreen, repellent spray, aspirin nhưng không nhắc đến cold cream."
      }
    ]
  },
  {
    "topic": 9,
    "part": "C",
    "title": "Part C: Cloze Test",
    "content": "HOLIDAYS\n\nIs it better to go on a package tour,or to (1)…….on your own? I suppose the answer depends on what kind of (2)…………… you are. A complicated tour organized by a travel (3) ………..has some advantages. You have an itinerary, which gives you definite (4)……….and arrival dates, and a list of all your (5)………… The accommodation may be cheaper, as it has been (6)………in advance, so you spend less time worrying about where are you going to (7)………..If you book your own hotel, you might have trouble finding a/an vacancy, unless you are going to stay for a (8)………., for example. On the other hand, organizing your own (9) ……….can be fun. Many students (10)……….or buy cheap train tickets, and spend the night in students hostels or guest-houses.",
    "questions": [
      { "text": "Blank (1)", "options": ["A. travel", "B. trip", "C. voyage", "D. tourist"], "correctAnswer": "A", "explanation": "travel on your own (tự đi du lịch)." },
      { "text": "Blank (2)", "options": ["A. voyager", "B. passenger", "C. tourist", "D. mover"], "correctAnswer": "C", "explanation": "what kind of tourist you are (bạn là loại du khách nào)." },
      { "text": "Blank (3)", "options": ["A. office", "B. agent", "C. tour", "D. operation"], "correctAnswer": "B", "explanation": "travel agent (đại lý du lịch)." },
      { "text": "Blank (4)", "options": ["A. departure", "B. parting", "C. leave", "D. quitting"], "correctAnswer": "A", "explanation": "departure and arrival dates (ngày khởi hành và ngày đến)." },
      { "text": "Blank (5)", "options": ["A. cancellations", "B. expeditions", "C. organisations", "D. destinations"], "correctAnswer": "D", "explanation": "a list of all your destinations (danh sách tất cả các điểm đến của bạn)." },
      { "text": "Blank (6)", "options": ["A. preserved", "B. booked", "C. reservation", "D. hotels"], "correctAnswer": "B", "explanation": "booked in advance (được đặt trước)." },
      { "text": "Blank (7)", "options": ["A. stay", "B. pass", "C. live", "D. cross"], "correctAnswer": "A", "explanation": "where are you going to stay (bạn sẽ ở đâu)." },
      { "text": "Blank (8)", "options": ["A. fortnight", "B. daytime", "C. fifteen days", "D. passage"], "correctAnswer": "A", "explanation": "stay for a fortnight (ở lại trong hai tuần)." },
      { "text": "Blank (9)", "options": ["A. voyage", "B. expedition", "C. trip", "D. package"], "correctAnswer": "C", "explanation": "organizing your own trip (tự tổ chức chuyến đi của mình)." },
      { "text": "Blank (10)", "options": ["A. auto-stop", "B. hitch-hike", "C. lift", "D. journey"], "correctAnswer": "B", "explanation": "hitch-hike (đi nhờ xe)." }
    ]
  }
];

const combined = [...existingData, ...newData];
fs.writeFileSync('src/data/reading.json', JSON.stringify(combined, null, 2));
console.log('Updated reading.json with topics 7, 8, 9');
