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
            {
                question: "A packet has 24 chocolates. How many chocolates are there in 15 such packets? (NUMBER ONLY)",
                type: "input",
                answer: "360",
                imageUrl: "",
                explanationImageUrl: "", // New: Image for explanation
                timeLimit: 40
            },
            {
                question: "There are 480 mangoes packed equally in 12 boxes. How many mangoes are there in each box? (NUMBERS ONLY)",
                type: "input",
                answer: "40",
                imageUrl: "",
                explanationImageUrl: "", // New: Image for explanation
                timeLimit: 40
            },
            {
                question: "A movie starts at 3:15 PM and ends at 5:45PM. How long is the movie? (Answer in format a hours b min)",
                type: "input",
                answer: "2 hours 30 min",
                imageUrl: "",
                explanationImageUrl: "", // New: Image for explanation
                timeLimit: 30
            },
            {
                question: "Ankit has ₹500. He buys a book for ₹275. How much money is left with him? (Answer without any units)",
                type: "input",
                answer: "225",
                imageUrl: "",
                explanationImageUrl: "", // New: Image for explanation
                timeLimit: 60
            },
            {
                question: "The ages of 4 children are 10, 12, 13 and 15 years. Find their average age.",
                type: "input",
                answer: "12.5",
                imageUrl: "",
                explanationImageUrl: "", // New: Image for explanation
                timeLimit: 60
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
        id: "test on A Bottle of Dew",
        name: "Test on A Bottle of Dew (40MARKS)",
        description: "This test has a auto submission feature. So once started please do not click on any other tab or the test will get auto submitted.",
        enabled: false,
        questions: [
            {
                question: "Why did Rama Natha want to know about the Magic Potion? (1 MARK)",
                type: "mcq", 
                options: ["He wanted to change any object into diamond", "He wanted to change any object into gold", "He wanted to drink elixir of life", "He wanted to run away from responsibilities"], // Array of options
                answer: "He wanted to change any object into gold", 
                imageUrl: "", 
                explanationImageUrl: "", 
                timeLimit: 30
            },
            {
                question: "Why did Rama Natha neglect his inherited lands? (1 MARK)",
                type: "mcq", 
                options: ["He believed in a magic potion that could turn objects into gold", "He had no interest in agriculture", "He was busy travelling", "He wanted to become a sage"], 
                answer: "He believed in a magic potion that could turn objects into gold", 
                imageUrl: "", 
                explanationImageUrl: "", 
                timeLimit: 30
            },
            {
                question: "What was Rama Natha’s wife, Madhumati, worried about? (1 MARK)",
                type: "mcq", 
                options: ["Rama Natha’s health", "Their children’s education", "Rama Natha’s reckless spending", "Their upcoming vacation plAnswer:"], 
                answer: "Rama Natha’s reckless spending", 
                imageUrl: "", 
                explanationImageUrl: "", 
                timeLimit: 30
            },
            {
                question: "Who did Rama Natha become a follower of in the story? (1 MARK)",
                type: "mcq", 
                options: ["A magician", "A sage named Mahipati", "His father’s friend", "A merchant"], 
                answer: "A sage named Mahipati", 
                imageUrl: "", 
                explanationImageUrl: "", 
                timeLimit: 30
            },
            {
                question: "What did sage Mahipati instruct Rama Natha to do to obtain the magic potion? (1 MARK)",
                type: "mcq", 
                options: ["Plant banana plants and collect dew", "Find a hidden treasure", "Travel to the Himalayas", "Buy expénsive equipment"], 
                answer: "Plant banana plants and collect dew", 
                imageUrl: "", 
                explanationImageUrl: "", 
                timeLimit: 30
            },
            {
                question: "One day, a famous ______ called Mahapati came to their town. (1 MARK)",
                type: "input",
                answer: "sage",
                imageUrl: "",
                explanationImageUrl: "",
                timeLimit: 60
            },
            {
                question: "You can plant as many __________ plants as you want. (1 MARK)",
                type: "input",
                answer: "banana",
                imageUrl: "",
                explanationImageUrl: "",
                timeLimit: 60
            },
            {
                question: "When you have _______ liters of dew, bring it to me. (1 MARK)",
                type: "input",
                answer: "five",
                imageUrl: "",
                explanationImageUrl: "",
                timeLimit: 60
            },
            {
                question: "A drop of the potion will change any object into __________. (1 MARK)",
                type: "input",
                answer: "gold",
                imageUrl: "",
                explanationImageUrl: "", 
                timeLimit: 60
            },
            {
                question: "It was your hard work that created this wealth, not __________. (1 MARK)",
                type: "input",
                answer: "magic",
                imageUrl: "",
                explanationImageUrl: "", 
                timeLimit: 60
            },
            {
                question: "Rama Natha never believed in any kind of magic potion. (1 MARK)",
                type: "input",
                answer: "",
                imageUrl: "",
                explanationImageUrl: "", 
                timeLimit: 60
            },
            {
                question: "Rama Natha never believed in any kind of magic potion. [TRUE/FALSE] answer in full <strong>CAPITAL</strong> (1 MARK)",
                type: "input",
                answer: "FALSE",
                imageUrl: "",
                explanationImageUrl: "", 
                timeLimit: 60
            },
            {
                question: "Madhumati was never tired of his husband’s behavior. [TRUE/FALSE] answer in full <strong>CAPITAL</strong> (1 MARK)",
                type: "input",
                answer: "FALSE",
                imageUrl: "",
                explanationImageUrl: "", 
                timeLimit: 60
            },
            {
                question: "The sage Mahipati told Rama Natha to gather dew. [TRUE/FALSE] answer in full <strong>CAPITAL</strong> (1 MARK)",
                type: "input",
                answer: "TRUE",
                imageUrl: "",
                explanationImageUrl: "", 
                timeLimit: 60
            },
            {
                question: "The sage Mahipati gave Rama Natha an easy recipe for the magic potion. [TRUE/FALSE] answer in full <strong>CAPITAL</strong> (1 MARK)",
                type: "input",
                answer: "FALSE",
                imageUrl: "",
                explanationImageUrl: "", 
                timeLimit: 60
            },
        ]
    },
];