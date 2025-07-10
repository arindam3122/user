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
            {
                question: "What is the value of 5<sup>4</sup> + 3 if the total amount is in Indian Rupees (&#8377;)?",
                type: "input",
                answer: "28", // Assuming the answer is 28 Rupees
                imageUrl: "",
                explanationImageUrl: "",
                timeLimit: 60
            },
        ]
    },
    {
        id: "Class 6",
        name: "Test on Class 6 Science",
        description: "",
        enabled: false,
        questions: [
            {
                question: "What is the main function of carbohydrates in our body?",
                type: "mcq", // New type for MCQ
                options: ["Build muscles", "Provide energy", "Protect from disease", "Help digestion"], // Array of options
                answer: "Provide energy", // Correct answer
                imageUrl: "", // Existing image for the question itself
                explanationImageUrl: "", // New: Image for explanation
                timeLimit: 30
            },
            {
                question: "Which of the following is a fibrous root plant?",
                type: "mcq", // New type for MCQ
                options: ["Neem", "Mustard", "Wheat", "Mango"], // Array of options
                answer: "Wheat", // Correct answer
                imageUrl: "", // Existing image for the question itself
                explanationImageUrl: "", // New: Image for explanation
                timeLimit: 30
            },
            {
                question: "Which part of the plant is responsible for reproduction?",
                type: "mcq", // New type for MCQ
                options: ["Root", "Stem", "Leaf", "Flower"], // Array of options
                answer: "Flower", // Correct answer
                imageUrl: "", // Existing image for the question itself
                explanationImageUrl: "", // New: Image for explanation
                timeLimit: 30
            },
            {
                question: "Which of the following is a climber?",
                type: "mcq", // New type for MCQ
                options: ["Mango", "Money Plant", "Coconut", "Carrot"], // Array of options
                answer: "Money Plant", // Correct answer
                imageUrl: "", // Existing image for the question itself
                explanationImageUrl: "", // New: Image for explanation
                timeLimit: 30
            },
            {
                question: "Which group does Rose belong to?",
                type: "mcq", // New type for MCQ
                options: ["Tree", "Herb", "Shrub", "Grass"], // Array of options
                answer: "Shrub", // Correct answer
                imageUrl: "", // Existing image for the question itself
                explanationImageUrl: "", // New: Image for explanation
                timeLimit: 30
            },
            {
                question: "A monocot leaf shows:",
                type: "mcq", // New type for MCQ
                options: ["Reticulate venation", "Parallel venation", "No venation", "Circular venation"], // Array of options
                answer: "Parallel venation", // Correct answer
                imageUrl: "", // Existing image for the question itself
                explanationImageUrl: "", // New: Image for explanation
                timeLimit: 30
            },
            {
                question: "The main classification system of living organisms is called:",
                type: "mcq", // New type for MCQ
                options: ["Binary System", "3 Kingdom System", "5 Kingdom Classification", "Linnaeus Chain"], // Array of options
                answer: "5 Kingdom Classification", // Correct answer
                imageUrl: "", // Existing image for the question itself
                explanationImageUrl: "", // New: Image for explanation
                timeLimit: 30
            },
            {
                question: "Which of the following is a tap root plant?",
                type: "mcq", // New type for MCQ
                options: ["Wheat", "Rice", "Mustard", "Grass"], // Array of options
                answer: "Mustard", // Correct answer
                imageUrl: "", // Existing image for the question itself
                explanationImageUrl: "", // New: Image for explanation
                timeLimit: 30
            },
            {
                question: "Rhododendron is mostly found in:",
                type: "mcq", // New type for MCQ
                options: ["Deserts", "Plains", "Mountains", "Coastal Areas"], // Array of options
                answer: "Mountains", // Correct answer
                imageUrl: "", // Existing image for the question itself
                explanationImageUrl: "", // New: Image for explanation
                timeLimit: 30
            },
            
        ]
    },
];