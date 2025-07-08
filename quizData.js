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
        enabled: true,
        questions: [
            {
                question: "A train 120 m long is moving at a speed of 72 km/h. Another train 150 m long is moving in the opposite direction at 54 km/h. How long will it take for the two trains to completely cross each other? (ANSWER UPTO 2 DECIMALS)",
                type: "input",
                answer: "7.71",
                imageUrl: "",
                explanationImageUrl: "train.png", // New: Image for explanation
                timeLimit: 120
            },
            {
                question: "A can complete a job in 12 days, B in 16 days. If they work together, how long will they take? (UPTO 2 DECIMAL)",
                type: "input",
                answer: "6.86",
                imageUrl: "",
                explanationImageUrl: "car.png", // New: Image for explanation
                timeLimit: 120
            },
            {
                question: "A car travels 60 km at 30 km/h and then another 60 km at 60 km/h. Find its average speed for the entire journey. (NO UNITS)",
                type: "input",
                answer: "40",
                imageUrl: "",
                explanationImageUrl: "1.png", // New: Image for explanation
                timeLimit: 120
            },
            {
                question: "The product of two consecutive positive integers is 156. Find the integers. (ANSWER IN a,b)",
                type: "input",
                answer: "12,13",
                imageUrl: "",
                explanationImageUrl: "2.png", // New: Image for explanation
                timeLimit: 180
            },
        ]
    },
];