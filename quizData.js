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
                imageUrl: "",
                timeLimit: 30
            },
            {
                question: "Rita has 348 apples. She sells 125 apples. How many apples are left with her? (ANSWER THE NUMBER ONLY)",
                type: "input",
                answer: "223",
                imageUrl: "",
                timeLimit: 60
            },
            {
                question: "A packet has 24 chocolates. How many chocolates are there in 15 such packets? (NUMBER ONLY)",
                type: "input",
                answer: "360",
                imageUrl: "",
                timeLimit: 60
            },
            {
                question: "There are 480 mangoes packed equally in 12 boxes. How many mangoes are there in each box? (NUMBERS ONLY)",
                type: "input",
                answer: "40",
                imageUrl: "",
                timeLimit: 60
            },
            {
                question: "A movie starts at 3:15 PM and ends at 5:45PM. How long is the movie? (Answer in format a hours b min)",
                type: "input",
                answer: "2 hours 30 min",
                imageUrl: "",
                timeLimit: 60
            },
            {
                question: "Ankit has ₹500. He buys a book for ₹275. How much money is left with him? (Answer without any units)",
                type: "input",
                answer: "225",
                imageUrl: "",
                timeLimit: 60
            },
            {
                question: "The ages of 4 children are 10, 12, 13 and 15 years. Find their average age.",
                type: "input",
                answer: "12.5",
                imageUrl: "",
                timeLimit: 60
            },
        ]
    },
    {
        id: "cls-10",
        name: "Logical Reasoning (PART-2)",
        description: "Medium Wordproblems",
        enabled: true,
        questions: [
            {
                question: "The sum of two numbers is 50. One number is 8 more than the other. Find the numbers. (Format a and b)",
                type: "input",
                answer: "21 and 29",
                imageUrl: "",
                timeLimit: 120
            },
            {
                question: "A rectangular plot has an area of 180m2. Its length is 5m more than its width. Find its dimentions.(Write as a,b where a=width and b=length)",
                type: "input",
                answer: "12,17",
                imageUrl: "",
                timeLimit: 120
            },
            {
                question: "A bag has 4 red and 6 green balls. One is drawn at random. What is the probability that it is green? (Answer in format a/b)",
                type: "input",
                answer: "3/5",
                imageUrl: "",
                timeLimit: 120
            },
            {
                question: "The first term of an AP is 7 and its common difference is 3. What is the 15th term?",
                type: "input",
                answer: "49",
                imageUrl: "",
                timeLimit: 120
            },
            {
                question: "Find the mean of the following data:- 10, 20, 30, 40 and 50",
                type: "input",
                answer: "30",
                imageUrl: "",
                timeLimit: 120
            },
        ]
    },
    {
        id: "img",
        name: "Image based QS",
        description: "QS on images",
        enabled: true,
        questions: [
            {
                question: "Explain the above image",
                type: "input",
                answer: "",
                imageUrl: "1.png",
                timeLimit: 30
            },
            {
                question: "Who is represented as a postman in the given image?",
                type: "input",
                answer: "",
                imageUrl: "2.png",
                timeLimit: 30
            },
        ]
    },
];