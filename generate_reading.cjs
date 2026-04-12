const fs = require('fs');

const existingData = JSON.parse(fs.readFileSync('src/data/reading.json', 'utf8'));

const newData = [
  {
    "topic": 4,
    "part": "A",
    "title": "Part A: Short Texts",
    "content": "Look at the text in each question. What does it say?\n\n1. All employees must carry their identity Cards with them all the time.\n\n2. To: All maths students\nFrom: The secretary\nThis week's lecture will be in the main hall and not in the library as usual. Next week the lecture will be in the library, as normal. Please don't be late.\n\n3. If the ticket machine is out of order, please pay staff on the train.\n\n4. Please show the librarian all books when you leave the library\n\n5. Manager's room\nWorkers please knock before entering.",
    "questions": [
      {
        "text": "1. All employees must carry their identity Cards with them all the time.",
        "options": ["A. You can get your identity card from security.", "B. You must show your identity card at all times.", "C. The company insists you always have your identity card with you.", "D. The company keeps your identity card for a long time."],
        "correctAnswer": "C",
        "explanation": "Must carry identity cards all the time = The company insists you always have your identity card with you."
      },
      {
        "text": "2. To: All maths students...",
        "options": ["A. The location of the lecture has changed.", "B. The time of the lecture has changed.", "C. The name of the lecturer has changed.", "D. The subject of the lecture has changed."],
        "correctAnswer": "A",
        "explanation": "Lecture will be in the main hall and not in the library = The location of the lecture has changed."
      },
      {
        "text": "3. If the ticket machine is out of order, please pay staff on the train.",
        "options": ["A. You can only buy tickets from a member of staff.", "B. There is a ticket machine in this place.", "C. You must always buy a ticket on the train.", "D. Call staff if the ticket machine is out of order."],
        "correctAnswer": "B",
        "explanation": "If the ticket machine is out of order = There is a ticket machine in this place."
      },
      {
        "text": "4. Please show the librarian all books when you leave the library",
        "options": ["A. The librarian will show you where to put your books.", "B. Return your books before you leave the library.", "C. The librarian needs to see your books before you go.", "D. Make sure you take all your books with you."],
        "correctAnswer": "C",
        "explanation": "Show the librarian all books when you leave = The librarian needs to see your books before you go."
      },
      {
        "text": "5. Manager's room. Workers please knock before entering.",
        "options": ["A. Workers can enter the room freely.", "B. Workers must enter the room before knocking.", "C. Workers are not allowed to enter the manager's room.", "D. Workers can enter the manager's room after knocking."],
        "correctAnswer": "D",
        "explanation": "Knock before entering = Workers can enter the manager's room after knocking."
      }
    ]
  },
  {
    "topic": 4,
    "part": "B",
    "title": "Part B: Reading Comprehension",
    "content": "I had been happily working in the same company as a graphics designer for over ten years, so it came as a huge surprise when one day, without warning I was made redundant. In fact, most of the people in my department lost their jobs that day. When the personnel manager gave me the bad news, she explained that the company had been taken over by a big multinational corporation that was demanding a lot of changes.\n\nSo, one day I was in a comfortable job with a generous salary and plenty of annual leave and the next day I was unemployed. While it was nice to have time on my hands, I knew I would have to find a job fairly quickly. I soon found out that it wasn't so easy. No one was taking on new staff. Every morning I searched the Classified Ads, but there was nothing suitable, not even part-time positions.\n\nFinally, a friend asked me if I was interested in helping out in her new cake shop. She needed somebody to deal with customers and to help her with the cake designs. At first, she could only pay me by the hour at rather a low hourly rate. To my surprise, I love the work.\n\nI've been a cake designer for three years now. I'm so glad I didn't turn down my friend's job offer. We have so much work and now I'm no longer an employee. My friend and I are now partners in the best cake shop in town.",
    "questions": [
      {
        "text": "1. What is the writer's main aim in writing the text?",
        "options": ["A. To advise people how to change the job", "B. To talk about his changes in career", "C. To describe his new job", "D. To talk about differences between two jobs"],
        "correctAnswer": "B",
        "explanation": "Bài viết kể về quá trình thay đổi công việc của tác giả từ một người thiết kế đồ họa sang thiết kế bánh."
      },
      {
        "text": "2. What does the writer say about his past job?",
        "options": ["A. It was a hard job but high salary.", "B. It was a part-time job with low salary.", "C. It was an interesting job at a big multinational corporation.", "D. It was a comfortable job with high salary."],
        "correctAnswer": "D",
        "explanation": "Đoạn 2: 'I was in a comfortable job with a generous salary...'"
      },
      {
        "text": "3. What did the writer do after losing his job?",
        "options": ["A. He ran his own business.", "B. He asked his friend for a part-time job.", "C. He tried to find another job.", "D. He worked part-time job for Classified Ads."],
        "correctAnswer": "C",
        "explanation": "Đoạn 2: 'I knew I would have to find a job fairly quickly... Every morning I searched the Classified Ads...'"
      },
      {
        "text": "4. What did the writer think about his current job at first?",
        "options": ["A. He really loved it.", "B. The salary was low.", "C. He was so interested.", "D. It was hard."],
        "correctAnswer": "B",
        "explanation": "Đoạn 3: 'At first, she could only pay me by the hour at rather a low hourly rate.'"
      },
      {
        "text": "5. What is the current job of the writer?",
        "options": ["A. Graphics designer", "B. Cake designer", "C. Personnel manager", "D. Employee at the cake shop"],
        "correctAnswer": "B",
        "explanation": "Đoạn 4: 'I've been a cake designer for three years now.'"
      }
    ]
  },
  {
    "topic": 4,
    "part": "C",
    "title": "Part C: Cloze Test",
    "content": "My grandpa had a long career. After graduating from university, he started a work as an assistant and worked his way to the top. He ran the company with over 300 (1) ……………... He was very (2) …………….. and he saved the company (3) …………….. disaster many times. When he was in charge, he was never (4) …………….. . He understood people and all the employees (5) …………….. him. My grandpa was an (6) …………….. , which is quite a difficult (7) …………….. , and for 40 years he worked on many projects. Finally, he reached 65, which was the official age of (8) …………….. in his company. He was very (9) …………….. to other engineers – you might even say he was famous! He was always very busy when he was working, but now he is (10) …………….. , he's got more time to spend with his grandchildren and to enjoy his hobby. He really likes fishing and collecting stamps.",
    "questions": [
      { "text": "Blank (1)", "options": ["A. employees", "B. engineer", "C. retirement", "D. employers"], "correctAnswer": "A", "explanation": "over 300 employees (hơn 300 nhân viên)." },
      { "text": "Blank (2)", "options": ["A. retired", "B. bossy", "C. well-known", "D. successful"], "correctAnswer": "D", "explanation": "He was very successful (Ông ấy rất thành công)." },
      { "text": "Blank (3)", "options": ["A. to", "B. into", "C. from", "D. for"], "correctAnswer": "C", "explanation": "saved the company from disaster (cứu công ty khỏi thảm họa)." },
      { "text": "Blank (4)", "options": ["A. bossy", "B. well-known", "C. retired", "D. successful"], "correctAnswer": "A", "explanation": "he was never bossy (ông ấy không bao giờ hống hách)." },
      { "text": "Blank (5)", "options": ["A. retired", "B. well-known", "C. admired", "D. successful"], "correctAnswer": "C", "explanation": "all the employees admired him (tất cả nhân viên đều ngưỡng mộ ông)." },
      { "text": "Blank (6)", "options": ["A. occupation", "B. employees", "C. engineer", "D. admired"], "correctAnswer": "C", "explanation": "My grandpa was an engineer (Ông tôi là một kỹ sư)." },
      { "text": "Blank (7)", "options": ["A. occupation", "B. employees", "C. engineer", "D. admired"], "correctAnswer": "A", "explanation": "which is quite a difficult occupation (đó là một nghề khá khó khăn)." },
      { "text": "Blank (8)", "options": ["A. occupation", "B. salary", "C. retirement", "D. contract"], "correctAnswer": "C", "explanation": "official age of retirement (độ tuổi nghỉ hưu chính thức)." },
      { "text": "Blank (9)", "options": ["A. bossy", "B. well-known", "C. retired", "D. successful"], "correctAnswer": "B", "explanation": "He was very well-known to other engineers (Ông rất nổi tiếng với các kỹ sư khác)." },
      { "text": "Blank (10)", "options": ["A. bossy", "B. well-known", "C. retired", "D. successful"], "correctAnswer": "C", "explanation": "now he is retired (bây giờ ông đã nghỉ hưu)." }
    ]
  },
  {
    "topic": 5,
    "part": "A",
    "title": "Part A: Short Texts",
    "content": "Look at the text in each question. What does it say?\n\n1. No parking in front of these gates. 24 hours access required\n\n2. USE THESE DOORS ONLY IN AN EMERGENCY.\n\n3. Wait for lift door to close before pressing button.\n\n4. THIS BUILDING HAS 24-HOUR SECURITY CAMERAS IN OPERATION.\n\n5. To: Jim\nFrom: Tom\nDid I leave a watch in your house? The problem is it's not mine. I borrowed it and I must give it back.",
    "questions": [
      {
        "text": "1. No parking in front of these gates. 24 hours access required",
        "options": ["A. Don't leave your car touching these gates.", "B. Don't park your car here within 24 hours.", "C. There is no overnight parking here.", "D. Don't park your cars here because access is needed at all times"],
        "correctAnswer": "D",
        "explanation": "24 hours access required = access is needed at all times."
      },
      {
        "text": "2. USE THESE DOORS ONLY IN AN EMERGENCY.",
        "options": ["A. You mustn't open these doors in any cases.", "B. The door can be used if necessary.", "C. Only some people can use these doors.", "D. These doors are locked all times."],
        "correctAnswer": "B",
        "explanation": "Only in an emergency = The door can be used if necessary (khi khẩn cấp)."
      },
      {
        "text": "3. Wait for lift door to close before pressing button.",
        "options": ["A. Press the button to close the lift doors.", "B. Press the button after the doors close.", "C. Press the button and the lift will wait.", "D. Press the button while waiting for the doors to close."],
        "correctAnswer": "B",
        "explanation": "Wait for lift door to close before pressing = Press the button after the doors close."
      },
      {
        "text": "4. THIS BUILDING HAS 24-HOUR SECURITY CAMERAS IN OPERATION.",
        "options": ["A. The cameras are not operating at the moment.", "B. This building is only open during the day.", "C. There is security in this building day and night.", "D. This building is under operation."],
        "correctAnswer": "C",
        "explanation": "24-hour security cameras = There is security in this building day and night."
      },
      {
        "text": "5. To: Jim From: Tom... What does Tom want Jim to do?",
        "options": ["A. Return the watch he borrowed", "B. Lend him a watch", "C. Look for the borrowed watch", "D. Inform about the borrowed watch"],
        "correctAnswer": "C",
        "explanation": "Did I leave a watch in your house? = Look for the borrowed watch."
      }
    ]
  },
  {
    "topic": 5,
    "part": "B",
    "title": "Part B: Reading Comprehension",
    "content": "Indonesia is a group of islands, located between Asia and Australia. It is close to the equator, so it never gets cold. Every day, the temperature is between 21°C and 32°C. Indonesia is covered with tropical rainforests. For many years, Indonesians have used wood to build their homes. Most of the old houses have wooden frames, walls and floors. Local people have cleared land for farming, and loggers have cut down miles of trees to sell the wood to other countries. Now there is a serious shortage of trees.\n\nNowadays, in Indonesia's rural areas, many of the houses are built on stilts. They raise the houses up, keep the living area off the wet soil, and also keep the houses from flooding during the rainy season. Some people still live in houses with only one room, and some of these houses do not have electricity or running water, but they cannot afford to improve their housing.\n\nIn Indonesian cities, more and more people live in crowded apartment buildings. However, it is hard for people to find good housing. The electricity often goes out throughout these whole buildings. Moreover, landlords do not want to rent their property to poor people, and banks do not want to lend them money to buy homes.\n\nBecause of its location, natural disasters such as floods, droughts, earthquakes and forest fires frequently occur, which destroys buildings and leaves people homeless. These disasters affect people both in the city and in the country.",
    "questions": [
      {
        "text": "1. According to the passage, what causes the shortage of trees in Indonesia?",
        "options": ["A. Clearing land for farming", "B. Building wooden houses", "C. Smuggling wood", "D. A, B, C are correct."],
        "correctAnswer": "D",
        "explanation": "Đoạn 1 nhắc đến việc dùng gỗ xây nhà (B), dọn đất làm nông (A) và chặt cây bán (tương đương C/buôn lậu hoặc bán). Đáp án D là hợp lý nhất theo tài liệu."
      },
      {
        "text": "2. What does the word “They” in paragraph 2 refer to?",
        "options": ["A. A kind of material", "B. A part of house", "C. A type of house", "D. A name of place"],
        "correctAnswer": "B",
        "explanation": "'They' thay thế cho 'stilts' (nhà sàn/cột nhà), là một phần của ngôi nhà (A part of house)."
      },
      {
        "text": "3. What natural disaster is NOT mentioned in the passage?",
        "options": ["A. Floods", "B. Droughts", "C. Storms", "D. Earthquakes"],
        "correctAnswer": "C",
        "explanation": "Đoạn cuối nhắc đến: floods, droughts, earthquakes, forest fires. Không có storms."
      },
      {
        "text": "4. What makes poor people difficult to find houses in cities of Indonesia?",
        "options": ["A. Lack of housing", "B. Lack of financial support from banks", "C. Lack of electricity or running water", "D. Lack of trees"],
        "correctAnswer": "B",
        "explanation": "Đoạn 3: 'banks do not want to lend them money to buy homes' (Thiếu sự hỗ trợ tài chính từ ngân hàng)."
      },
      {
        "text": "5. What can be the title for the passage?",
        "options": ["A. Indonesian houses", "B. Indonesian culture", "C. Indonesian housing problems", "D. Indonesian lifestyle"],
        "correctAnswer": "C",
        "explanation": "Bài viết tập trung vào các vấn đề về nhà ở tại Indonesia (thiếu gỗ xây nhà, nhà ngập nước, khó tìm nhà ở thành phố...)."
      }
    ]
  },
  {
    "topic": 5,
    "part": "C",
    "title": "Part C: Cloze Test",
    "content": "Ford Duncan lives in a beautiful round cottage. His parents built it based on the design of a 100-year-old cottage in the same area. Inside, there are two levels. The (1)…………………. floor is the largest, containing 3 rooms. The living room has beautiful lake (2)…………………. The dining room opens to the terrace where the family can sit and (3)…………………. The kitchen is well-equipped with (4)…………………., oven and fridge. Upstairs, the second floor has two king size bedrooms, a (5)………………….home office and a comfortable bathroom. The house also has central heating and it's very cosy, but (6)………………….is a danger here because it is made of (7)………………….\n\nLiving in the round cottage brings a few changes to normal life. The family found the shape of their new home a little (8)………………….at first. All the rooms are round, so there are no (9)………………….and the ceilings seem quite small (10)………………….to the floors.",
    "questions": [
      { "text": "Blank (1)", "options": ["A. ground", "B. fire", "C. wood", "D. view"], "correctAnswer": "A", "explanation": "The ground floor (tầng trệt)." },
      { "text": "Blank (2)", "options": ["A. sightseeing", "B. view", "C. fire", "D. wood"], "correctAnswer": "B", "explanation": "beautiful lake view (cảnh hồ tuyệt đẹp)." },
      { "text": "Blank (3)", "options": ["A. choose", "B. stand", "C. relax", "D. go"], "correctAnswer": "C", "explanation": "sit and relax (ngồi và thư giãn)." },
      { "text": "Blank (4)", "options": ["A. blanket", "B. dishwasher", "C. sofa", "D. toilet"], "correctAnswer": "B", "explanation": "well-equipped with dishwasher... (được trang bị tốt với máy rửa bát...)." },
      { "text": "Blank (5)", "options": ["A. noisy", "B. strange", "C. well-organized", "D. compared"], "correctAnswer": "C", "explanation": "a well-organized home office (một phòng làm việc tại nhà được tổ chức tốt)." },
      { "text": "Blank (6)", "options": ["A. ground", "B. fire", "C. stone", "D. wood"], "correctAnswer": "B", "explanation": "fire is a danger here (hỏa hoạn là một mối nguy hiểm ở đây)." },
      { "text": "Blank (7)", "options": ["A. blanket", "B. wardrobe", "C. fire", "D. wood"], "correctAnswer": "D", "explanation": "made of wood (làm bằng gỗ)." },
      { "text": "Blank (8)", "options": ["A. strange", "B. well-organized", "C. noisy", "D. dishwasher"], "correctAnswer": "A", "explanation": "a little strange at first (hơi kỳ lạ lúc đầu)." },
      { "text": "Blank (9)", "options": ["A. rooms", "B. floors", "C. terraces", "D. corners"], "correctAnswer": "D", "explanation": "there are no corners (không có góc cạnh nào vì phòng hình tròn)." },
      { "text": "Blank (10)", "options": ["A. compared", "B. well-organized", "C. noisy", "D. well-equipped"], "correctAnswer": "A", "explanation": "compared to the floors (so với sàn nhà)." }
    ]
  },
  {
    "topic": 6,
    "part": "A",
    "title": "Part A: Short Texts",
    "content": "Look at the text in each question. What does it say?\n\n1. NOTICE! Discount Day next Friday! Hundreds of our most popular products will be reduced for one day only! Don't miss it!\n\n2. There is no longer a delivery charge on orders of pizza.\n\n3. Please show your staff discount card before you pay for your goods.\n\n4. FOR SALE Laptop computer 1 year old. In good condition Suitable for computer games. Phone or email Nick: Ph: 4567967 Email: nick123@gmail.com\n\n5. Special offer! Buy two dresses and get the second one half price.",
    "questions": [
      {
        "text": "1. NOTICE! Discount Day next Friday!...",
        "options": ["A. This shop will sell everything cheaper on Friday.", "B. Many items will be discounted on Friday.", "C. The shop's most popular products will cost less after Friday.", "D. Many item will be bought on Friday."],
        "correctAnswer": "B",
        "explanation": "Hundreds of products will be reduced = Many items will be discounted."
      },
      {
        "text": "2. There is no longer a delivery charge on orders of pizza.",
        "options": ["A. A free pizza will be given with every order.", "B. You don't have to pay for a pizza delivery.", "C. This restaurant does not deliver some orders of pizza.", "D. You can’t buy pizza at this restaurant."],
        "correctAnswer": "B",
        "explanation": "No longer a delivery charge = You don't have to pay for a pizza delivery."
      },
      {
        "text": "3. Please show your staff discount card before you pay for your goods.",
        "options": ["A. This shop gives a discount to some people.", "B. Discounts are not allowed for staff.", "C. Staff will always ask you for your discount card.", "D. You have to pay more."],
        "correctAnswer": "A",
        "explanation": "Staff discount card = This shop gives a discount to some people (staff)."
      },
      {
        "text": "4. FOR SALE Laptop computer 1 year old...",
        "options": ["A. The laptop computer is almost old.", "B. The laptop computer is not very new but still works well.", "C. The laptop computer is not good for computer games.", "D. The laptop computer is over 2 years old."],
        "correctAnswer": "B",
        "explanation": "1 year old, in good condition = Not very new but still works well."
      },
      {
        "text": "5. Special offer! Buy two dresses and get the second one half price.",
        "options": ["A. If you buy two dresses, you will have a 50% discount on both of them.", "B. If you buy two dresses, we will give you 50% off your next dress.", "C. If you buy two dresses, we will give you 50% off one of them.", "D. If you buy two dresses, we will give you one."],
        "correctAnswer": "C",
        "explanation": "Get the second one half price = Give you 50% off one of them."
      }
    ]
  },
  {
    "topic": 6,
    "part": "B",
    "title": "Part B: Reading Comprehension",
    "content": "Brussels is Belgium’s capital city and its administrative, financial, and cultural center. It has two official languages, French and Dutch, and a population of almost a million inhabitants. It is also the ‘capital of the EU’, as the European Parliament is there. The headquarters of NATO are in Brussels and many multinational companies have their European head offices in the city.\n\nManufacturing and service industries are important to its economy. The main manufacturing industries are metal, electrical, pharmaceutical, and chemical, and the main service industries banking, financial services, and tourism.\n\nBrussels has a modern and efficient metro, bus, and tram network. It has Eurostar train connections to Paris and London, and an international airport. The historic center is Grand Palace, one of the Europe’s most beautiful city squares. In December a traditional Christmas Market is held there. North of Grand Palace are elegant 19th-century shopping arcades and Butcher’s Street, a lively area called ‘the stomach of Brussels’ because it is full of restaurants. Brussels also have many attractive cafés and bars. It is one of the best places in Europe to eat and drink, and is known as ‘the beer capital of the world’.\n\nIt has an impressive cathedral and offers all cultural attractions of a European city – museums, theater, music, dance, opera, and international films. There are sports and leisure facilities in the city center, and golf courses, and woods outside where you can enjoy walking, cycling, and jogging, and boating or ice-skating on the lake, depending on the season.",
    "questions": [
      {
        "text": "1. Why is Brussels called ‘the capital of the EU’?",
        "options": ["A. Because the headquarters of NATO are there.", "B. Because the European Parliament is there.", "C. Because many multinational companies are there.", "D. Because it is a cultural center."],
        "correctAnswer": "B",
        "explanation": "Đoạn 1: 'It is also the ‘capital of the EU’, as the European Parliament is there.'"
      },
      {
        "text": "2. What are the official languages in Brussels?",
        "options": ["A. French and German", "B. English and French", "C. French and Dutch", "D. French and Spanish"],
        "correctAnswer": "C",
        "explanation": "Đoạn 1: 'It has two official languages, French and Dutch...'"
      },
      {
        "text": "3. What is Grand Palace?",
        "options": ["A. a shop", "B. a bar", "C. a restaurant", "D. a historic center"],
        "correctAnswer": "D",
        "explanation": "Đoạn 3: 'The historic center is Grand Palace...'"
      },
      {
        "text": "4. What can you find in Butcher’s Street?",
        "options": ["A. restaurants", "B. cafés", "C. bars", "D. shops"],
        "correctAnswer": "A",
        "explanation": "Đoạn 3: 'Butcher’s Street, a lively area called ‘the stomach of Brussels’ because it is full of restaurants.'"
      },
      {
        "text": "5. Which of the following is TRUE about manufacturing industries in Brussels?",
        "options": ["A. sports, banking, pharmaceutical, and chemical", "B. metal, electrical, pharmaceutical, and chemical", "C. metal, tourism, pharmaceutical, and chemical", "D. metal, electrical, banking, and tourism"],
        "correctAnswer": "B",
        "explanation": "Đoạn 2: 'The main manufacturing industries are metal, electrical, pharmaceutical, and chemical...'"
      }
    ]
  },
  {
    "topic": 6,
    "part": "C",
    "title": "Part C: Cloze Test",
    "content": "Black Friday refers to the day just after Thanksgiving in the US. Because so many companies have a four day weekend, many people begin their Christmas shopping on this day. Black Friday is often reported as one of the busiest (1) …………. days of the year. Many stores have (2) …………. to draw more customers. Shopping malls are packed with people, parking lots are (3) …………., and the stores and sidewalks are overflowing with (4) ………….. Traffic jams fill the roads into the downtown area every year.\n\nThe word \"black\" to describe the Friday likely began in Philadelphia in the mid-1960s. Although many people may see the day after Thanksgiving (5) …………., retailers have a very different (6) ………….. It's their best opportunity to (7) ………….earnings for the year. If sales were (8) …………. in other seasons then the store must attract many customers and make many sales (9) …………. Thanksgiving and Christmas. The first and most important day of this season last shopping (10) …………. is Black Friday.",
    "questions": [
      { "text": "Blank (1)", "options": ["A. shopping", "B. discounts", "C. farming", "D. selling"], "correctAnswer": "A", "explanation": "busiest shopping days (những ngày mua sắm bận rộn nhất)." },
      { "text": "Blank (2)", "options": ["A. sales", "B. discounts", "C. goods", "D. receipts"], "correctAnswer": "B", "explanation": "have discounts (có giảm giá)." },
      { "text": "Blank (3)", "options": ["A. peaceful", "B. quiet", "C. slow", "D. crowded"], "correctAnswer": "D", "explanation": "parking lots are crowded (bãi đỗ xe đông đúc)." },
      { "text": "Blank (4)", "options": ["A. customers", "B. workers", "C. engineers", "D. passengers"], "correctAnswer": "A", "explanation": "overflowing with customers (tràn ngập khách hàng)." },
      { "text": "Blank (5)", "options": ["A. positively", "B. negatively", "C. slowly", "D. quickly"], "correctAnswer": "B", "explanation": "see the day after Thanksgiving negatively (nhìn ngày này một cách tiêu cực - do tắc đường, đông đúc)." },
      { "text": "Blank (6)", "options": ["A. idea", "B. chance", "C. opinion", "D. discount"], "correctAnswer": "C", "explanation": "a very different opinion (một quan điểm rất khác)." },
      { "text": "Blank (7)", "options": ["A. improve", "B. develop", "C. decrease", "D. get down"], "correctAnswer": "A", "explanation": "improve earnings (cải thiện thu nhập)." },
      { "text": "Blank (8)", "options": ["A. good", "B. fast", "C. slow", "D. reasonable"], "correctAnswer": "C", "explanation": "If sales were slow (Nếu doanh số bán hàng chậm)." },
      { "text": "Blank (9)", "options": ["A. between", "B. from", "C. for", "D. to"], "correctAnswer": "A", "explanation": "between Thanksgiving and Christmas (giữa Lễ Tạ ơn và Giáng sinh)." },
      { "text": "Blank (10)", "options": ["A. solution", "B. activity", "C. problem", "D. chance"], "correctAnswer": "D", "explanation": "last shopping chance (cơ hội mua sắm cuối cùng)." }
    ]
  }
];

const combined = [...existingData, ...newData];
fs.writeFileSync('src/data/reading.json', JSON.stringify(combined, null, 2));
console.log('Updated reading.json');
