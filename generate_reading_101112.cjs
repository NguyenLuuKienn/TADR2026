const fs = require('fs');

const existingData = JSON.parse(fs.readFileSync('src/data/reading.json', 'utf8'));

const newData = [
  // Topic 10
  {
    "topic": 10,
    "part": "A",
    "title": "Part A: Short Texts",
    "content": "Look at the text in each question. What does it say?\n\n1. Please keep off the grass.\n\n2. OUT OF ORDER\n\n3. No parking in front of the gates.\n\n4. Beware of the dog.\n\n5. STAFF ONLY",
    "questions": [
      {
        "text": "1. Please keep off the grass.",
        "options": ["A. You can sit on the grass.", "B. Do not walk on the grass.", "C. The grass is being cut.", "D. Keep the grass clean."],
        "correctAnswer": "B",
        "explanation": "Keep off = Do not walk on."
      },
      {
        "text": "2. OUT OF ORDER",
        "options": ["A. This machine is not working.", "B. You must order outside.", "C. The items are out of stock.", "D. Please stand in order."],
        "correctAnswer": "A",
        "explanation": "Out of order = Not working/broken."
      },
      {
        "text": "3. No parking in front of the gates.",
        "options": ["A. You can park near the gates.", "B. Do not leave your car here.", "C. The gates are closed for parking.", "D. Parking is allowed behind the gates."],
        "correctAnswer": "B",
        "explanation": "No parking = Do not leave your car here."
      },
      {
        "text": "4. Beware of the dog.",
        "options": ["A. The dog is friendly.", "B. Please feed the dog.", "C. Be careful because of the dog.", "D. Dogs are not allowed here."],
        "correctAnswer": "C",
        "explanation": "Beware of = Be careful of."
      },
      {
        "text": "5. STAFF ONLY",
        "options": ["A. Only people who work here can enter.", "B. Customers can enter here.", "C. Staff are not allowed here.", "D. Everyone can enter."],
        "correctAnswer": "A",
        "explanation": "Staff only = Only employees/workers can enter."
      }
    ]
  },
  {
    "topic": 10,
    "part": "B",
    "title": "Part B: Reading Comprehension",
    "content": "Recycling is very important as waste has a huge negative impact on the natural environment. Harmful chemicals and greenhouse gasses are released from rubbish in landfill sites. Recycling helps to reduce the pollution caused by waste. Habitat destruction and global warming are some the affects caused by deforestation. Recycling reduces the need for raw materials so that the rainforests can be preserved. Huge amounts of energy are used when making products from raw materials. Recycling requires much less energy and therefore helps to preserve natural resources.",
    "questions": [
      {
        "text": "1. What is the main idea of the passage?",
        "options": ["A. The history of recycling", "B. The benefits of recycling", "C. How to recycle at home", "D. The cost of recycling"],
        "correctAnswer": "B",
        "explanation": "Đoạn văn nói về các lợi ích của việc tái chế (giảm ô nhiễm, bảo vệ rừng, tiết kiệm năng lượng)."
      },
      {
        "text": "2. What is released from rubbish in landfill sites?",
        "options": ["A. Natural resources", "B. Raw materials", "C. Harmful chemicals and greenhouse gasses", "D. Energy"],
        "correctAnswer": "C",
        "explanation": "Đoạn 1: 'Harmful chemicals and greenhouse gasses are released from rubbish in landfill sites.'"
      },
      {
        "text": "3. How does recycling help the rainforests?",
        "options": ["A. It plants more trees.", "B. It reduces the need for raw materials.", "C. It stops global warming immediately.", "D. It creates more land for forests."],
        "correctAnswer": "B",
        "explanation": "Đoạn 1: 'Recycling reduces the need for raw materials so that the rainforests can be preserved.'"
      },
      {
        "text": "4. Making products from raw materials requires ____________.",
        "options": ["A. huge amounts of energy", "B. less energy than recycling", "C. no energy", "D. only human labor"],
        "correctAnswer": "A",
        "explanation": "Đoạn 1: 'Huge amounts of energy are used when making products from raw materials.'"
      },
      {
        "text": "5. The word 'preserved' in the passage is closest in meaning to ____________.",
        "options": ["A. destroyed", "B. protected", "C. discovered", "D. replaced"],
        "correctAnswer": "B",
        "explanation": "'preserved' (được bảo tồn, bảo vệ) gần nghĩa nhất với 'protected'."
      }
    ]
  },
  {
    "topic": 10,
    "part": "C",
    "title": "Part C: Cloze Test",
    "content": "Learning a second language can be very (1)________. It can help you when you travel, and it can also (2)________ your brain. Many people choose to learn English because it is an international (3)________. When you learn a new language, you need to practice (4)________ day. You can read books, listen to music, or watch movies in the target language. It is also helpful to (5)________ with native speakers. Don't be afraid of making (6)________. Everyone makes them when they are learning. The most important thing is to keep (7)________ and not give up. Some people find grammar (8)________, but it is necessary for building correct sentences. Vocabulary is also crucial, so try to learn a few new (9)________ every week. With time and effort, you will become (10)________.",
    "questions": [
      { "text": "Blank (1)", "options": ["A. useful", "B. useless", "C. use", "D. used"], "correctAnswer": "A", "explanation": "very useful (rất hữu ích)." },
      { "text": "Blank (2)", "options": ["A. damage", "B. improve", "C. hurt", "D. break"], "correctAnswer": "B", "explanation": "improve your brain (cải thiện não bộ của bạn)." },
      { "text": "Blank (3)", "options": ["A. country", "B. nation", "C. language", "D. speech"], "correctAnswer": "C", "explanation": "international language (ngôn ngữ quốc tế)." },
      { "text": "Blank (4)", "options": ["A. some", "B. all", "C. every", "D. few"], "correctAnswer": "C", "explanation": "every day (mỗi ngày)." },
      { "text": "Blank (5)", "options": ["A. talk", "B. talking", "C. talked", "D. talks"], "correctAnswer": "A", "explanation": "helpful to talk (hữu ích khi nói chuyện)." },
      { "text": "Blank (6)", "options": ["A. mistakes", "B. choices", "C. decisions", "D. friends"], "correctAnswer": "A", "explanation": "making mistakes (phạm sai lầm)." },
      { "text": "Blank (7)", "options": ["A. try", "B. trying", "C. tried", "D. to try"], "correctAnswer": "B", "explanation": "keep trying (tiếp tục cố gắng)." },
      { "text": "Blank (8)", "options": ["A. easy", "B. difficult", "C. fun", "D. interesting"], "correctAnswer": "B", "explanation": "find grammar difficult (thấy ngữ pháp khó)." },
      { "text": "Blank (9)", "options": ["A. words", "B. letters", "C. numbers", "D. sounds"], "correctAnswer": "A", "explanation": "new words (từ mới)." },
      { "text": "Blank (10)", "options": ["A. fluent", "B. fluently", "C. fluency", "D. fluents"], "correctAnswer": "A", "explanation": "become fluent (trở nên trôi chảy)." }
    ]
  },
  // Topic 11
  {
    "topic": 11,
    "part": "A",
    "title": "Part A: Short Texts",
    "content": "Look at the text in each question. What does it say?\n\n1. Please pay for your goods before leaving the store.\n\n2. SILENCE. EXAMS IN PROGRESS.\n\n3. Do not leave your luggage unattended.\n\n4. Please wait here until the light turns green.\n\n5. NO SMOKING IN THIS AREA.",
    "questions": [
      {
        "text": "1. Please pay for your goods before leaving the store.",
        "options": ["A. You can pay later.", "B. You must pay before you leave.", "C. Goods are free today.", "D. Leave the store without paying."],
        "correctAnswer": "B",
        "explanation": "Pay before leaving = You must pay before you leave."
      },
      {
        "text": "2. SILENCE. EXAMS IN PROGRESS.",
        "options": ["A. You must be quiet because people are taking exams.", "B. You can talk loudly here.", "C. Exams are finished.", "D. Please ask questions about the exam."],
        "correctAnswer": "A",
        "explanation": "Silence = You must be quiet."
      },
      {
        "text": "3. Do not leave your luggage unattended.",
        "options": ["A. You can leave your bags here.", "B. Someone will watch your bags.", "C. You must stay with your bags at all times.", "D. Luggage is not allowed."],
        "correctAnswer": "C",
        "explanation": "Do not leave unattended = Stay with your bags."
      },
      {
        "text": "4. Please wait here until the light turns green.",
        "options": ["A. Go when the light is red.", "B. Stop when the light is green.", "C. Do not move until you see the green light.", "D. The light is always green."],
        "correctAnswer": "C",
        "explanation": "Wait until green = Do not move until green."
      },
      {
        "text": "5. NO SMOKING IN THIS AREA.",
        "options": ["A. You can smoke here.", "B. Smoking is permitted.", "C. You are not allowed to smoke here.", "D. Buy cigarettes here."],
        "correctAnswer": "C",
        "explanation": "No smoking = Not allowed to smoke."
      }
    ]
  },
  {
    "topic": 11,
    "part": "B",
    "title": "Part B: Reading Comprehension",
    "content": "The Internet has changed the way we live, work, and communicate. It provides instant access to a vast amount of information. People can read news, research topics, and learn new skills online. Social media platforms allow us to connect with friends and family around the world. However, the Internet also has some disadvantages. Spending too much time online can lead to addiction and isolation. There are also concerns about privacy and security, as personal information can be stolen by hackers. It is important to use the Internet responsibly and be aware of the potential risks.",
    "questions": [
      {
        "text": "1. What is the main topic of the passage?",
        "options": ["A. The history of the Internet", "B. The advantages and disadvantages of the Internet", "C. How to use social media", "D. Internet security"],
        "correctAnswer": "B",
        "explanation": "Đoạn văn nói về cả lợi ích (thông tin, kết nối) và tác hại (nghiện, bảo mật) của Internet."
      },
      {
        "text": "2. According to the passage, what can people do online?",
        "options": ["A. Only read news", "B. Only connect with friends", "C. Read news, research, and learn skills", "D. Only play games"],
        "correctAnswer": "C",
        "explanation": "Đoạn 1: 'People can read news, research topics, and learn new skills online.'"
      },
      {
        "text": "3. What is a potential negative effect of spending too much time online?",
        "options": ["A. Becoming smarter", "B. Addiction and isolation", "C. Making more friends", "D. Improving health"],
        "correctAnswer": "B",
        "explanation": "Đoạn 1: 'Spending too much time online can lead to addiction and isolation.'"
      },
      {
        "text": "4. Why are there concerns about privacy on the Internet?",
        "options": ["A. Because information is always safe", "B. Because hackers can steal personal information", "C. Because social media is private", "D. Because no one uses the Internet"],
        "correctAnswer": "B",
        "explanation": "Đoạn 1: 'personal information can be stolen by hackers.'"
      },
      {
        "text": "5. The author suggests that we should ____________.",
        "options": ["A. stop using the Internet completely", "B. only use the Internet for work", "C. use the Internet responsibly", "D. share all our personal information online"],
        "correctAnswer": "C",
        "explanation": "Đoạn cuối: 'It is important to use the Internet responsibly...'"
      }
    ]
  },
  {
    "topic": 11,
    "part": "C",
    "title": "Part C: Cloze Test",
    "content": "Eating a balanced diet is essential for good (1)________. Your body needs a variety of nutrients to function (2)________. These include carbohydrates, proteins, fats, vitamins, and minerals. Fruits and vegetables are excellent (3)________ of vitamins and minerals. You should try to eat at least five (4)________ of them every day. Protein is important for building and repairing (5)________, and can be found in meat, fish, eggs, and beans. Carbohydrates give you (6)________, and are found in foods like bread, rice, and pasta. It is also important to drink plenty of (7)________, especially water, to stay hydrated. Avoid eating too much sugar and salt, as they can cause health (8)________. Regular exercise is also a key part of a healthy (9)________. By eating well and staying active, you can feel better and live (10)________.",
    "questions": [
      { "text": "Blank (1)", "options": ["A. health", "B. healthy", "C. heal", "D. healing"], "correctAnswer": "A", "explanation": "good health (sức khỏe tốt)." },
      { "text": "Blank (2)", "options": ["A. proper", "B. properly", "C. property", "D. properties"], "correctAnswer": "B", "explanation": "function properly (hoạt động đúng cách)." },
      { "text": "Blank (3)", "options": ["A. resources", "B. sources", "C. places", "D. origins"], "correctAnswer": "B", "explanation": "sources of vitamins (nguồn vitamin)." },
      { "text": "Blank (4)", "options": ["A. portions", "B. pieces", "C. slices", "D. parts"], "correctAnswer": "A", "explanation": "five portions (5 khẩu phần)." },
      { "text": "Blank (5)", "options": ["A. muscles", "B. bones", "C. hair", "D. skin"], "correctAnswer": "A", "explanation": "repairing muscles (phục hồi cơ bắp)." },
      { "text": "Blank (6)", "options": ["A. power", "B. strength", "C. energy", "D. force"], "correctAnswer": "C", "explanation": "give you energy (cung cấp năng lượng)." },
      { "text": "Blank (7)", "options": ["A. liquids", "B. fluids", "C. drinks", "D. water"], "correctAnswer": "B", "explanation": "plenty of fluids (nhiều chất lỏng)." },
      { "text": "Blank (8)", "options": ["A. issues", "B. benefits", "C. advantages", "D. improvements"], "correctAnswer": "A", "explanation": "health issues (vấn đề sức khỏe)." },
      { "text": "Blank (9)", "options": ["A. lifestyle", "B. life", "C. style", "D. living"], "correctAnswer": "A", "explanation": "healthy lifestyle (lối sống lành mạnh)." },
      { "text": "Blank (10)", "options": ["A. long", "B. longer", "C. longest", "D. length"], "correctAnswer": "B", "explanation": "live longer (sống lâu hơn)." }
    ]
  },
  // Topic 12
  {
    "topic": 12,
    "part": "A",
    "title": "Part A: Short Texts",
    "content": "Look at the text in each question. What does it say?\n\n1. Please turn off your mobile phones during the performance.\n\n2. FASTEN SEATBELTS WHILE SEATED.\n\n3. Do not feed the animals.\n\n4. Wash your hands before returning to work.\n\n5. CAUTION: WET FLOOR.",
    "questions": [
      {
        "text": "1. Please turn off your mobile phones during the performance.",
        "options": ["A. You can use your phone now.", "B. Phones must be switched off while the show is on.", "C. Please call during the performance.", "D. Phones are provided here."],
        "correctAnswer": "B",
        "explanation": "Turn off = switched off."
      },
      {
        "text": "2. FASTEN SEATBELTS WHILE SEATED.",
        "options": ["A. You don't need a seatbelt.", "B. Keep your seatbelt fastened when you are sitting down.", "C. Stand up to fasten your seatbelt.", "D. Seatbelts are only for children."],
        "correctAnswer": "B",
        "explanation": "Fasten while seated = Keep fastened when sitting."
      },
      {
        "text": "3. Do not feed the animals.",
        "options": ["A. You can give food to the animals.", "B. The animals are hungry.", "C. Visitors must not give food to the animals.", "D. Buy animal food here."],
        "correctAnswer": "C",
        "explanation": "Do not feed = Must not give food."
      },
      {
        "text": "4. Wash your hands before returning to work.",
        "options": ["A. Wash your hands after work.", "B. You must wash your hands before you go back to work.", "C. Work with dirty hands.", "D. Only wash your hands at home."],
        "correctAnswer": "B",
        "explanation": "Before returning to work = Before you go back to work."
      },
      {
        "text": "5. CAUTION: WET FLOOR.",
        "options": ["A. The floor is dry.", "B. Be careful because the floor is wet.", "C. Please wash the floor.", "D. You can run here."],
        "correctAnswer": "B",
        "explanation": "Caution = Be careful."
      }
    ]
  },
  {
    "topic": 12,
    "part": "B",
    "title": "Part B: Reading Comprehension",
    "content": "Tourism is a major industry in many countries around the world. It provides jobs for millions of people in hotels, restaurants, and transportation. When tourists visit a country, they spend money on accommodation, food, souvenirs, and attractions. This brings valuable foreign currency into the local economy. However, tourism can also have negative impacts. Large numbers of visitors can cause overcrowding and damage to historical sites. The environment can also suffer from increased pollution and waste. Therefore, it is important to promote sustainable tourism, which aims to minimize the negative effects while maximizing the benefits for local communities.",
    "questions": [
      {
        "text": "1. What is the main benefit of tourism mentioned in the passage?",
        "options": ["A. It causes pollution.", "B. It provides jobs and brings in money.", "C. It damages historical sites.", "D. It makes countries crowded."],
        "correctAnswer": "B",
        "explanation": "Đoạn 1: 'It provides jobs... brings valuable foreign currency into the local economy.'"
      },
      {
        "text": "2. Where do tourists typically spend their money?",
        "options": ["A. Only on flights", "B. Only on souvenirs", "C. On accommodation, food, souvenirs, and attractions", "D. They don't spend money"],
        "correctAnswer": "C",
        "explanation": "Đoạn 1: 'they spend money on accommodation, food, souvenirs, and attractions.'"
      },
      {
        "text": "3. What is a negative impact of tourism?",
        "options": ["A. Creating jobs", "B. Overcrowding and environmental damage", "C. Learning about new cultures", "D. Helping local communities"],
        "correctAnswer": "B",
        "explanation": "Đoạn 1: 'cause overcrowding and damage to historical sites. The environment can also suffer...'"
      },
      {
        "text": "4. What is the goal of sustainable tourism?",
        "options": ["A. To stop people from traveling", "B. To increase pollution", "C. To minimize negative effects and maximize benefits", "D. To build more hotels"],
        "correctAnswer": "C",
        "explanation": "Đoạn cuối: 'aims to minimize the negative effects while maximizing the benefits...'"
      },
      {
        "text": "5. The word 'valuable' in the passage means ____________.",
        "options": ["A. worthless", "B. cheap", "C. precious or worth a lot of money", "D. useless"],
        "correctAnswer": "C",
        "explanation": "'valuable' (có giá trị) nghĩa là precious or worth a lot of money."
      }
    ]
  },
  {
    "topic": 12,
    "part": "C",
    "title": "Part C: Cloze Test",
    "content": "Finding a good job can be a challenging (1)________. First, you need to prepare a strong resume or CV that highlights your (2)________ and experience. It is important to tailor your resume for each job you (3)________ for. Next, you can search for job openings online, in newspapers, or through networking. When you find a suitable position, you should write a cover (4)________ explaining why you are the best candidate for the role. If the employer is impressed, they will invite you for an (5)________. During the interview, you should dress professionally and answer questions (6)________. It is also a good idea to ask your own questions about the company and the (7)________. After the interview, you can send a thank-you note to express your (8)________. If you are successful, you will receive a job (9)________. Remember that finding the right job takes time and (10)________, so don't get discouraged if you face rejection.",
    "questions": [
      { "text": "Blank (1)", "options": ["A. process", "B. processing", "C. proceed", "D. procedure"], "correctAnswer": "A", "explanation": "challenging process (quá trình đầy thử thách)." },
      { "text": "Blank (2)", "options": ["A. skills", "B. hobbies", "C. interests", "D. friends"], "correctAnswer": "A", "explanation": "highlights your skills (làm nổi bật kỹ năng của bạn)." },
      { "text": "Blank (3)", "options": ["A. ask", "B. apply", "C. look", "D. search"], "correctAnswer": "B", "explanation": "apply for (ứng tuyển)." },
      { "text": "Blank (4)", "options": ["A. book", "B. note", "C. letter", "D. message"], "correctAnswer": "C", "explanation": "cover letter (thư xin việc)." },
      { "text": "Blank (5)", "options": ["A. meeting", "B. interview", "C. party", "D. test"], "correctAnswer": "B", "explanation": "invite you for an interview (mời bạn phỏng vấn)." },
      { "text": "Blank (6)", "options": ["A. confidently", "B. confident", "C. confidence", "D. confide"], "correctAnswer": "A", "explanation": "answer questions confidently (trả lời câu hỏi một cách tự tin)." },
      { "text": "Blank (7)", "options": ["A. role", "B. place", "C. building", "D. desk"], "correctAnswer": "A", "explanation": "about the company and the role (về công ty và vai trò)." },
      { "text": "Blank (8)", "options": ["A. appreciation", "B. anger", "C. sadness", "D. regret"], "correctAnswer": "A", "explanation": "express your appreciation (bày tỏ sự trân trọng)." },
      { "text": "Blank (9)", "options": ["A. offer", "B. offering", "C. offered", "D. offers"], "correctAnswer": "A", "explanation": "receive a job offer (nhận được lời mời làm việc)." },
      { "text": "Blank (10)", "options": ["A. patience", "B. patient", "C. patiently", "D. patients"], "correctAnswer": "A", "explanation": "takes time and patience (cần thời gian và sự kiên nhẫn)." }
    ]
  }
];

const combined = [...existingData, ...newData];
fs.writeFileSync('src/data/reading.json', JSON.stringify(combined, null, 2));
console.log('Updated reading.json with topics 10, 11, 12');
