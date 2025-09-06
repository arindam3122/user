// quizData.js

const quizzes = [
    
    {
        id: "12",
        name: "WORD PROBLEMS",
        description: "",
        enabled: false,
        questions: [
            {
               question: "Why did Rama Natha want to know about the Magic Potion? (1 MARK)", 
               type: "mcq",
               options: [
                           "He wanted to change any object into diamond",
                           "He wanted to change any object into gold",
                           "He wanted to drink elixir of life",
                           "He wanted to run away from responsibilities"
                        ],
                answer: "He wanted to change any object into gold",
                timeLimit: 15
            },

            {
                question: "A can complete a job in 12 days, B in 16 days. If they work together, how long will they take? (UPTO 2 DECIMAL)",
                type: "input",
                answer: "6.86",
                imageUrl: "",
                explanationImageUrl: "", 
                timeLimit: 60
            },
        ]
    },
    {
        id: "General Math",
        name: "General Math (2QS)",
        description: "Math questions based on Algebra, Percentage, Time & work, Geometry and Probability",
        enabled: true,
        questions: [
            {
                question: "A train travels 480 km at a constant speed. If the speed was 8 km/hr less, it would have taken 3 hours longer. Find the original speed. (WRITE WITHOUT UNITS)",
                type: "input",
                answer: "40",
                imageUrl: "",
                explanationImageUrl: "1.png", 
                timeLimit: 60
            },
            {
                question: "A father's age is three times his son's age. If after 10 years, the father's age will be twice his son's age, what are their present ages?(WRITE IN FORMAT a,b WHERE a is the small number and b is the big number)",
                type: "input",
                answer: "10,30",
                imageUrl: "",
                explanationImageUrl: "2.png", 
                timeLimit: 60
            },
        ]
    },
    {
        id: "Basic math",
        name: "Basic math",
        description: "",
        enabled: true,
        questions: [
            {
                question: "What is 2+2?",
                type: "input",
                answer: "4",
                imageUrl: "",
                explanationImageUrl: "", 
                timeLimit: 60
            },
        ]
    },
    {
        id: "Gk",
        name: "General Knowledge",
        description: "Test on General Knowledge",
        enabled: false,
        questions: [
            {
                "question": "What is the capital of France?",
                "type": "input",
                "options": [],
                "answer": "Paris",
                "timeLimit": 60,
                "imageUrl": "",
                "explanationImageUrl": ""
            },
            {
                "question": "In which year did India gain independence?",
                "type": "input",
                "options": [],
                "answer": "1947",
                "timeLimit": 60,
                "imageUrl": "",
                "explanationImageUrl": ""
            }
        ]
    }
    
];