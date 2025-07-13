// quizData.js

const quizzes = [
    {
        id: "cls-6",
        name: "Logical Reasoning (PART-1)",
        description: "Easy wordproblems",
        enabled: false,
        questions: [
            {
                question: "Which of the following is a prime number?",
                type: "mcq", // New type for MCQ
                options: ["4", "6", "7", "9"], // Array of options
                answer: "7", // Correct answer
                imageUrl: "", // Existing image for the question itself
                explanationImageUrl: "", // New: Image for explanation
                timeLimit: 40
            },
            {
                question: "Rita has 348 apples. She sells 125 apples. How many apples are left with her? (ANSWER THE NUMBER ONLY)",
                type: "input",
                answer: "223",
                imageUrl: "",
                explanationImageUrl: "", // New: Image for explanation
                timeLimit: 40
            },
        ]
    },
    {
        id: "12",
        name: "WORD PROBLEMS",
        description: "",
        enabled: false,
        questions: [
            {
                question: "A train 120 m long is moving at a speed of 72 km/h. Another train 150 m long is moving in the opposite direction at 54 km/h. How long will it take for the two trains to completely cross each other? (ANSWER UPTO 2 DECIMALS)",
                type: "input",
                answer: "7.71",
                imageUrl: "",
                explanationImageUrl: "", // New: Image for explanation
                timeLimit: 60
            },
            {
                question: "A can complete a job in 12 days, B in 16 days. If they work together, how long will they take? (UPTO 2 DECIMAL)",
                type: "input",
                answer: "6.86",
                imageUrl: "",
                explanationImageUrl: "", // New: Image for explanation
                timeLimit: 60
            },
            {
                question: "A car travels 60 km at 30 km/h and then another 60 km at 60 km/h. Find its average speed for the entire journey. (NO UNITS)",
                type: "input",
                answer: "40",
                imageUrl: "",
                explanationImageUrl: "", // New: Image for explanation
                timeLimit: 60
            },
            {
                question: "The product of two consecutive positive integers is 156. Find the integers. (ANSWER IN a,b)",
                type: "input",
                answer: "12,13",
                imageUrl: "",
                explanationImageUrl: "", // New: Image for explanation
                timeLimit: 60
            },
            {
                question: "What is the value of 5<sup>2</sup> + 3 if the total amount is in Indian Rupees (&#8377;)?",
                type: "input",
                answer: "28", // Assuming the answer is 28 Rupees
                imageUrl: "",
                explanationImageUrl: "",
                timeLimit: 60
            },
        ]
    },
    {
        id: "test on the raven and the fox",
        name: "The Raven and the Fox Test (40MARKS)",
        description: "",
        enabled: false,
        questions: [
            {
                question: "Where did Mr. Raven sit?",
                type: "mcq", 
                options: ["", "", "", ""], 
                answer: "", 
                imageUrl: "", 
                explanationImageUrl: "", 
                timeLimit: 40
            },
            {
                question: "",
                type: "input",
                answer: "",
                imageUrl: "",
                explanationImageUrl: "", 
                timeLimit: 40
            },
        ]
    },
    {
        id: "",
        name: "",
        description: "",
        enabled: false,
        questions: [
            {
                question: "",
                type: "mcq", 
                options: ["", "", "", ""], 
                answer: "", 
                imageUrl: "", 
                explanationImageUrl: "", 
                timeLimit: 40
            },
            {
                question: "",
                type: "input",
                answer: "",
                imageUrl: "",
                explanationImageUrl: "", 
                timeLimit: 40
            },
        ]
    },
    {
        id: "test on A Bottle of Dew",
        name: "Test on A Bottle of Dew (40MARKS)",
        description: "Before Starting the test please turn on desktop mode on and then zoom in for giving the test. auto-submission feature is enabled.",
        enabled: false,
        questions: [
            {
                question: "Why did Rama Natha want to know about the Magic Potion? (1 MARK)",
                type: "mcq", 
                options: ["He wanted to change any object into diamond", "He wanted to change any object into gold", "He wanted to drink elixir of life", "He wanted to run away from responsibilities"], // Array of options
                answer: "He wanted to change any object into gold",  
                timeLimit: 15
            },
            {
                question: "Why did Rama Natha neglect his inherited lands? (1 MARK)",
                type: "mcq", 
                options: ["He believed in a magic potion that could turn objects into gold", "He had no interest in agriculture", "He was busy travelling", "He wanted to become a sage"], 
                answer: "He believed in a magic potion that could turn objects into gold", 
                timeLimit: 15
            },
            {
                question: "What was Rama Natha’s wife, Madhumati, worried about? (1 MARK)",
                type: "mcq", 
                options: ["Rama Natha’s health", "Their children’s education", "Rama Natha’s reckless spending", "Their upcoming vacation plAnswer:"], 
                answer: "Rama Natha’s reckless spending", 
                timeLimit: 15
            },
            {
                question: "Who did Rama Natha become a follower of in the story? (1 MARK)",
                type: "mcq", 
                options: ["A magician", "A sage named Mahipati", "His father’s friend", "A merchant"], 
                answer: "A sage named Mahipati",  
                timeLimit: 15
            },
            {
                question: "What did sage Mahipati instruct Rama Natha to do to obtain the magic potion? (1 MARK)",
                type: "mcq", 
                options: ["Plant banana plants and collect dew", "Find a hidden treasure", "Travel to the Himalayas", "Buy expénsive equipment"], 
                answer: "Plant banana plants and collect dew", 
                timeLimit: 15
            },
            {
                question: "One day, a famous ______ called Mahapati came to their town. (1 MARK)",
                type: "input",
                answer: "sage",
                timeLimit: 20
            },
            {
                question: "You can plant as many __________ plants as you want. (1 MARK)",
                type: "input",
                answer: "banana",
                timeLimit: 20
            },
            {
                question: "When you have _______ liters of dew, bring it to me. (1 MARK)",
                type: "input",
                answer: "five",
                timeLimit: 20
            },
            {
                question: "A drop of the potion will change any object into __________. (1 MARK)",
                type: "input",
                answer: "gold",
                timeLimit: 20
            },
            {
                question: "It was your hard work that created this wealth, not __________. (1 MARK)",
                type: "input",
                answer: "magic", 
                timeLimit: 20
            },
            {
                question: "Rama Natha never believed in any kind of magic potion. [TRUE/FALSE] answer in full <strong>CAPITAL</strong> (1 MARK)",
                type: "input",
                answer: "FALSE", 
                timeLimit: 20
            },
            {
                question: "Madhumati was never tired of his husband’s behavior. [TRUE/FALSE] answer in full <strong>CAPITAL</strong> (1 MARK)",
                type: "input",
                answer: "FALSE",
                timeLimit: 20
            },
            {
                question: "The sage Mahipati told Rama Natha to gather dew. [TRUE/FALSE] answer in full <strong>CAPITAL</strong> (1 MARK)",
                type: "input",
                answer: "TRUE",
                timeLimit: 20
            },
            {
                question: "The sage Mahipati gave Rama Natha an easy recipe for the magic potion. [TRUE/FALSE] answer in full <strong>CAPITAL</strong> (1 MARK)",
                type: "input",
                answer: "FALSE",
                timeLimit: 20
            },
            {
                question: "How did the sage help Rama Natha? (1 MARK)",
                type: "input",
                answer: "The sage helped Rama Natha by informing him that there existed such a magic potion. He could make such a potion.", 
                timeLimit: 45
            },
            {
                question: "Do you think Rama Natha will be able to collect the dew? Give a reason. (1 MARK)",
                type: "input",
                answer: "", 
                timeLimit: 45
            },
            {
                question: "Why was Rama Natha angry? (2 MARKS)",
                type: "input",
                answer: "Rama Natha was angry because nothing happened to the copper vessel. He thought that the copper vessel would change to gold after sprinkling the magic potion.", 
                timeLimit: 60
            },
            {
                question: "How did Rama Natha and Madhumati create wealth? (2 MARKS)",
                type: "input",
                answer: "Rama Natha and Madhumati created wealth by planting and caring for banana plants. Madhumati sold the bananas in the market, and over time, their hard work and dedication led to significant earnings.", 
                timeLimit: 60
            },
            {
                question: "How did Rama Natha collect five liters of dew? (2 MARKS)",
                type: "input",
                answer: "Rama Natha started growing bananas on his land. During winter the banana leaves had dew on them. Then Rama Natha collected dew. He grew these bananas every year to call the dew.", 
                timeLimit: 60
            },
            {
                question: "What happened when Rama Natha was given the potion by the sage? Why did the sage call for his wife? (2 MARKS)",
                type: "input",
                answer: "When Rama Natha did what the sage told him to do, nothing happened. The sage asked Madhumati to open the box. It had stacks of gold inside.",
                timeLimit: 60
            },
            {
                question: "What did the sage tell Rama Natha and his wife? (2 MARKS)",
                type: "input",
                answer: "The sage told Rama Natha that no potion could turn things into gold. Rama Natha and his wife worked very hard in their fields. Madhumati also worked hard to sell bananas in the market. Thus they worked hard which earned them a lot of money.",
                timeLimit: 60
            },
            {
                question: "What did the sage say about the magic potion? ( 2 MARKS)",
                type: "input",
                answer: "The sage told Rama Natha that he should collect dew and store it in a bottle. When he had five litres of dew he should come to him. The sage would chant some magic words. Then the magic potion would convert the thing into gold.",
                timeLimit: 60
            },
            {
                question: "What troubled Rama Natha’s wife about her husband? ( 2 MARKS)",
                type: "input",
                answer: "Madhumati, Rama Natha’s wife, suffered much because of her husband’s funny idea. Her husband spent a lot of money on this idea. She felt that if her husband went on spending money, they would be left with no money.", 
                timeLimit: 60
            },
            {
                question: "What had made Rama Natha surprised? (1 MARK)",
                type: "mcq", 
                options: ["not getting gold", "nothing happening", "not seeing the effect of magic on the vessel", "All of the above"], // Array of options
                answer: "All of the above", 
                imageUrl: "1.png", 
                timeLimit: 70
            },
            {
                question: "Who was behind the story of teaching Rama Natha the truth of life? (1 MARK)",
                type: "mcq", 
                options: ["The sage", "Madhumati", "Rama Natha’s father", "All of the above"], // Array of options
                answer: "The sage", 
                imageUrl: "2.png", 
                timeLimit: 70
            },
            {
                question: "The moral of the story is (1 MARK)",
                type: "mcq", 
                options: ["only hard work could earn you good money", "hard work makes you more responsible and mature", "hard work helps you earn resources to fulfill your dreams", "All of the above"], // Array of options
                answer: "All of the above", 
                imageUrl: "2.png",  
                timeLimit: 70
            },
            {
                question: "What was Rama searching for? (1 MARK)",
                type: "mcq", 
                options: ["Gold coins", "Banana crop", "Magic potion", "Morning dew"], // Array of options
                answer: "Magic potion", 
                timeLimit: 15
            },
            
            {
                question: "What does Madhumati bring with her in the end? (1 MARK)",
                type: "mcq", 
                options: ["Lunch for Mahipati", "The box of gold coins", "Bottle of morning dew", "Money"], // Array of options
                answer: "The box of gold coins", 
                timeLimit: 15
            },
            {
                question: "Who was Rama Natha? (1 MARK)",
                type: "mcq", 
                options: ["Son of a lawyer", "Son of rich landlord", "Son of a worker", "Son of a poor landlord"], // Array of options
                answer: "Son of a rich landlord", 
                timeLimit: 15
            },
            {
                question: "What was Madhumati worried about? (1 MARK)",
                type: "mcq", 
                options: ["Work of plantation", "Rama’s health", "They would soon be penniless", "Magic potion"], // Array of options
                answer: "They would soon be penniless",  
                timeLimit: 15
            },
            {
                question: "Why didn’t Rama give up after being cheated by the fraud sages? (1 MARK)",
                type: "mcq", 
                options: ["He wasn’t able to work", "He was determined to find it", "He doesn’t want to work", "He needed money"], // Array of options
                answer: "He was determined to find it",  
                timeLimit: 15
            },
            {
                question: "What was the reason behind Rama’s wealth? (1 MARK)",
                type: "mcq", 
                options: ["Gold coins", "Collected morning dew", "Hard work and willpower", "Inheritance"], // Array of options
                answer: "Hard work and willpower", 
                timeLimit: 15
            },
        ]
    },
];