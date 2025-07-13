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
        id: "Test",
        name: " English Test",
        description: "Test on A Bottle of Dew, The Raven and the Fox and Rama to the Rescue",
        enabled: true,
        questions: [
            {
                question: "Why did Rama Natha want to know about the Magic Potion? (1 MARK)", // A bottle of dew
                type: "mcq", 
                options: ["He wanted to change any object into diamond", "He wanted to change any object into gold", "He wanted to drink elixir of life", "He wanted to run away from responsibilities"],
                answer: "He wanted to change any object into gold",  
                timeLimit: 15
            },
            {
                question: "Who said this to whom? “There is no magic potion that can turn things into gold. (1 MARK)”",
                type: "mcq", 
                options: ["Madhumati said this to Rama Natha", "The sage said this to Madhumati", "The sage Mahipati said to Rama Natha", "Rama Natha said this to the sage"],
                answer: "The sage Mahipati said to Rama Natha",  
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
                options: ["Rama Natha’s health", "Their children’s education", "Rama Natha’s reckless spending", "Their upcoming vacation plan"],
                answer: "Rama Natha’s reckless spending",  
                timeLimit: 15
            },
            {
                question: "How long did it take Rama Natha to collect the five liters of dew? (1 MARK)",
                type: "mcq", 
                options: ["Six months", "Six days", "Six years", "Six hours"],
                answer: "Six years",  
                timeLimit: 15
            },
            {
                question: "The purpose behind respectably addressing the Raven was : (1 MARK)", //the raven and the fox
                type: "mcq", 
                options: ["to flatter him", "to snatch the morsel", "to show that he was his friend", "to show love and respect"],
                answer: "to snatch the morsel",  
                timeLimit: 15
            },
            {
                question: "How did the Fox describe the Raven to flatter him? (1 MARK)",
                type: "mcq", 
                options: ["By commenting on his large wings", "By admiring his feathers and suggesting he should sing", "By praising his sharp beak", "By noting his impressive size"],
                answer: "By admiring his feathers and suggesting he should sing",  
                timeLimit: 15
            },
            {
                question: "What was the Raven’s reaction to the Fox’s flattery? (1 MARK)",
                type: "mcq", 
                options: ["He ignored the Fox and ate the morsel", "He became proud and tried to sing", "He immediately dropped the morsel", "He scolded the Fox for lying"],
                answer: "He became proud and tried to sing",  
                timeLimit: 15
            },
            {
                question: "What lesson does the Fox impart to the Raven at the end of the poem? (1 MARK)",
                type: "mcq", 
                options: ["To always be careful when eating", "To ignore flattering words and avoid pride", "To trust others completely", "To practice singing regularly"],
                answer: "To ignore flattering words and avoid pride",  
                timeLimit: 15
            },
            {
                question: "What literary device is used when the Fox praises the Raven’s singing ability? (1 MARK)",
                type: "mcq", 
                options: ["Hyperbole", "Metaphor", "Simile", "Irony"],
                answer: "Irony",  
                timeLimit: 15
            },
            {
                question: "Who was Rama in the village? (1 MARK)", // rama to the rescue
                type: "mcq", 
                options: ["A thief", "A kotwal", "A farmer", "A merchant"],
                answer: "A kotwal",  
                timeLimit: 15
            },
            {
                question: "What was the man doing when he sighed? (1 MARK)",
                type: "mcq", 
                options: ["Running", "eating", "Yawning", "Sleeping"],
                answer: "Yawning",  
                timeLimit: 15
            },
            {
                question: "What did the couple pretend to discuss to the trick the thief? (1 MARK)",
                type: "mcq", 
                options: ["Their child’s name", "Their money", "Their dinner", "Their vacations plan"],
                answer: "Their child’s name",  
                timeLimit: 15
            },
            {
                question: "How did the thief react to the couple calling ‘Rama’? (1 MARK)",
                type: "mcq", 
                options: ["He went from there", "He laughed", "He panicked", "He stayed still"],
                answer: "He panicked",  
                timeLimit: 15
            },
            {
                question: "What did the wife suggest when she heard noise outside? (1 MARK)",
                type: "mcq", 
                options: ["To catch thief", "To run away", "To call Rama", "To scream"],
                answer: "To call Rama",  
                timeLimit: 15
            },
            {
                question: "One day, a famous ______ called Mahapati came to their town. (1 MARK)", // A BOTTLE OF DEW
                type: "input",
                answer: "sage",
                timeLimit: 15
            },
            {
                question: "When you have _______ liters of dew, bring it to me. (1 MARK)",
                type: "input",
                answer: "five",
                timeLimit: 15
            },
            {
                question: "A drop of the potion will change any object into __________. (1 MARK)",
                type: "input",
                answer: "gold",
                timeLimit: 15
            },
            {
                question: "It was your hard work that created this wealth, not __________. (1 MARK)",
                type: "input",
                answer: "magic",
                timeLimit: 15
            },
            {
                question: "You can plant as many __________ plants as you want. (1 MARK)",
                type: "input",
                answer: "banana",
                timeLimit: 15
            },
            {
                question: "Mr Raven had __________ in his beak. (1 MARK)", /// THE RAVEN AND THE FOX
                type: "input",
                answer: "a piece of food",
                timeLimit: 15
            },
            {
                question: "The Fox calls the Raven a __________ bird. (1 MARK)",
                type: "input",
                answer: "good looking",
                timeLimit: 15
            },
            {
                question: "The Fox asks the Raven to __________. (1 MARK)",
                type: "input",
                answer: "sign",
                timeLimit: 15
            },
            {
                question: "The Raven and the Fox live in the __________. (1 MARK)",
                type: "input",
                answer: "woods",
                timeLimit: 15
            },
            {
                question: "The Raven ___________ that he croaked. (1 MARK)",
                type: "input",
                answer: "forgot",
                timeLimit: 15
            },
            {
                question: "The couple heard strange noise coming from _________ their house. (1 MARK)", ///RAMA TO THE RESCUE
                type: "input",
                answer: "outside",
                timeLimit: 15
            },
            {
                question: "_________ was the village kotwal. (1 MARK)",
                type: "input",
                answer: "Rama",
                timeLimit: 15
            },
            {
                question: "The thief wondered where they keep their _________. (1 MARK)",
                type: "input",
                answer: "money",
                timeLimit: 15
            },
            {
                question: "The man sighed as he yawned and _________. (1 MARK)",
                type: "input",
                answer: "stretched",
                timeLimit: 15
            },
            {
                question: "The couple’s plan was to scare out the thief by calling Rama. [TRUE/FALSE] (1 MARK)",
                type: "input",
                answer: "TRUE",
                timeLimit: 15
            },
            {
                question: "What troubled Rama Natha’s wife about her husband? (2 MARKS)", 
                type: "input",
                answer: "Madhumati, Rama Natha’s wife, suffered much because of her husband’s funny idea. Her husband spent a lot of money on this idea. She felt that if her husband went on spending money, they would be left with no money.",
                timeLimit: 20
            },
            {
                question: "What did the sage tell Rama Natha and his wife? (2 MARKS)", 
                type: "input",
                answer: "The sage told Rama Natha that no potion could turn things into gold. Rama Natha and his wife worked very hard in their fields. Madhumati also worked hard to sell bananas in the market. Thus they worked hard which earned them a lot of money.",
                timeLimit: 20
            },
            {
                question: "What made the Raven open his mouth? (2 MARKS)", 
                type: "input",
                answer: "Precisely, the Raven fell into Fox’s net of cheating. Reynard said that he had beautiful feathers. He had a sweet voice. If he sang a song, all the birds and animals would call him ‘King’.",
                timeLimit: 20
            },
            {
                question: "How did the Fox snatch a morsel of food? (2 MARKS)", 
                type: "input",
                answer: "The Fox started admiring the Raven with sweet words. He called him with praise of his personality. He said that the Raven looked great with beautiful feathers",
                timeLimit: 20
            },
            {
                question: "How did the thief know that the owners of the house were awake? (2 MARKS)", 
                type: "input",
                answer: "The thief heard the voices of the owners of the house talking.",
                timeLimit: 20
            },
            {
                question: "Who came up with a plan to deal with the situation and what was the plan? (2 MARKS)", 
                type: "input",
                answer: "The husband came up with the plan. The plan was to call out “Rama” in different situations to alert the village Kotwal.",
                timeLimit: 20
            },
            {
                question: "How did the miser get the lump of gold?", /// Do not use
                type: "input",
                answer: "By selling all he had",
                imageUrl: "1.png",
                timeLimit: 75
            },
            
        ]
    },
];