const quizInfoBox = document.getElementById('quizInfoBox');
const quizContainer = document.getElementById('quizContainer');
const finalScoreContainer = document.getElementById('finalScoreContainer');
const quizResultsDetails = document.getElementById('quizResultsDetails');
const previousQuizzesContainer = document.getElementById('previousQuizzesContainer');
const quizSelectionContainer = document.getElementById('quizSelectionContainer');
const quizList = document.getElementById('quizList');

// Corrected this variable name as it was removed from HTML previously
// const startQuizButton = document.getElementById('startQuizButton'); // This button from original quizInfoBox is now conceptually replaced by individual quiz buttons

const quizTitle = document.getElementById('quizTitle');
const questionText = document.getElementById('questionText');
const questionImage = document.getElementById('questionImage');
const optionsContainer = document.getElementById('optionsContainer');
const prevButton = document.getElementById('prevButton');
const skipButton = document.getElementById('skipButton');
const nextButton = document.getElementById('nextButton');
const submitButton = document.getElementById('submitButton');
const progressBar = document.getElementById('progressBar');
const timerDisplay = document.getElementById('timerDisplay');

const scoreDisplay = document.getElementById('scoreDisplay');
const correctAnswersCount = document.getElementById('correctAnswersCount');
const wrongAnswersCount = document.getElementById('wrongAnswersCount');
const skippedQuestionsCount = document.getElementById('skippedQuestionsCount');
const percentageScore = document.getElementById('percentageScore');
const viewResultsButton = document.getElementById('viewResultsButton');
const returnToDashboardButton = document.getElementById('returnToDashboardButton');

const dashboardLink = document.getElementById('dashboardLink');
const startQuizLink = document.getElementById('startQuizLink');
const previousQuizzesLink = document.getElementById('previousQuizzesLink');
const logoutLink = document.getElementById('logoutLink');
const headerLogoutButton = document.getElementById('headerLogoutButton');

const welcomeHeading = document.getElementById('welcomeHeading');
const usernameDisplay = document.getElementById('usernameDisplay');
const loginSuccessMessage = document.getElementById('loginSuccessMessage');
const quizCompletedMessage = document.getElementById('quizCompletedMessage');
const quizInfoHeading = document.getElementById('quizInfoHeading');
const lastQuizScoreDisplay = document.getElementById('lastQuizScoreDisplay');
// const welcomeMessageDiv = document.querySelector('.welcome-message'); // This was causing an issue by selecting both messages
const totalQuizzesCompleted = document.getElementById('totalQuizzesCompleted');

// Add these new const declarations for the summary elements
const summaryCorrect = document.getElementById('summaryCorrect');
const summaryWrong = document.getElementById('summaryWrong');
const summarySkipped = document.getElementById('summarySkipped');
const summaryTimeUp = document.getElementById('summaryTimeUp'); // New element
const summaryTotalQuestions = document.getElementById('summaryTotalQuestions');


let currentQuiz = null;
let currentQuestionIndex = 0;
let userAnswers = [];
let correctAnswersTotal = 0;
let wrongAnswersTotal = 0;
let skippedQuestionsTotal = 0;
let quizDetailsForDisplay = [];

let timeLeft = 0;
let timerInterval;
let timeUpMessageTimeout; // Added for the temporary time-up message

/**
 * Displays a custom information/alert modal.
 * @param {string} message - The message to display in the modal.
 */
function showInfoModal(message) {
    const modal = document.getElementById('infoModal');
    const msgElem = document.getElementById('infoMessage');
    const okButton = document.getElementById('infoOkButton');

    msgElem.textContent = message;
    modal.style.display = 'flex';
    modal.classList.add('active');

    okButton.onclick = () => {
        hideInfoModal();
    };
}

/**
 * Hides the custom information/alert modal.
 */
function hideInfoModal() {
    const modal = document.getElementById('infoModal');
    modal.classList.remove('active');
    setTimeout(() => {
        modal.style.display = 'none';
    }, 200);
}

/**
 * Displays a temporary "Time's Up" message.
 */
function showTimeUpMessage() {
    let timeUpMessageElement = document.getElementById('timeUpMessage');
    if (!timeUpMessageElement) {
        timeUpMessageElement = document.createElement('div');
        timeUpMessageElement.id = 'timeUpMessage';
        timeUpMessageElement.className = 'time-up-message';
        // Append to main-content or body, depending on desired overlay behavior
        document.querySelector('.main-content').appendChild(timeUpMessageElement); 
    }

    timeUpMessageElement.textContent = "Time's up! Moving to the next question.";
    timeUpMessageElement.classList.add('show');

    if (timeUpMessageTimeout) {
        clearTimeout(timeUpMessageTimeout);
    }

    timeUpMessageTimeout = setTimeout(() => {
        timeUpMessageElement.classList.remove('show');
    }, 3000); // Message visible for 3 seconds
}


// --- Authentication and Initial Load ---
document.addEventListener('DOMContentLoaded', (event) => {
    const loggedInUser = localStorage.getItem('loggedInUser');
    if (!loggedInUser) {
        window.location.href = "index.html"; // Redirect to login if not logged in
    } else {
        usernameDisplay.textContent = loggedInUser;
        welcomeHeading.textContent = `Welcome, ${loggedInUser}!`;

        const hasShownLoginMessage = localStorage.getItem('hasShownLoginMessage');
        if (hasShownLoginMessage === 'false') {
            loginSuccessMessage.classList.add('show');
            localStorage.setItem('hasShownLoginMessage', 'true');
            setTimeout(() => {
                loginSuccessMessage.classList.remove('show');
            }, 3000);
        }
        goToDashboard();
    }
});

logoutLink.addEventListener('click', logout);
headerLogoutButton.addEventListener('click', logout);

function logout() {
    localStorage.removeItem('loggedInUser');
    localStorage.removeItem('hasShownLoginMessage');
    window.location.href = "index.html";
}

// --- Navigation ---
dashboardLink.addEventListener('click', (e) => {
    e.preventDefault();
    setActiveLink(dashboardLink);
    goToDashboard();
});

startQuizLink.addEventListener('click', (e) => {
    e.preventDefault();
    setActiveLink(startQuizLink);
    showQuizSelection();
});

previousQuizzesLink.addEventListener('click', (e) => {
    e.preventDefault();
    setActiveLink(previousQuizzesLink);
    showPreviousQuizzesSection();
});

function setActiveLink(activeLink) {
    document.querySelectorAll('nav ul li a').forEach(link => {
        link.classList.remove('active');
    });
    activeLink.classList.add('active');
}

// --- Quiz Data (Example Quizzes) ---
const quizzes = [

    {
        id: "DBMS-quiz",
        name: "Database Management System (DBMS)",
        description: "Test on DBMS from ADCA",
        enabled: false, // to enable put as true or false
        questions: [
            {
                question: "What is DBMS?",
                options: [
                    "A tool for analyzing data",
                    "A collection of data organized in a systematic way",
                    "A system for managing hardware resources",
                    "A collection of software to manipulate databases"
                ],
                answer: "A collection of software to manipulate databases",
                imageUrl: "",
                timeLimit: 60
            },
            {
                question: "Which of the following is the main purpose of DBMS?",
                options: [
                    "To store data permanently",
                    "To manage hardware resources",
                    "To provide a mechanism for data retrieval and storage",
                    "To perform arithmetic operations"
                ],
                answer: "To provide a mechanism for data retrieval and storage",
                imageUrl: "",
                timeLimit: 60
            },
            {
                question: "Which of the following is not a type of DBMS?",
                options: [
                    "Hierarchical DBMS",
                    "Relational DBMS",
                    "Object-oriented DBMS",
                    "Text-based DBMS"
                ],
                answer: "Text-based DBMS",
                imageUrl: "",
                timeLimit: 60
            },
            {
                question: "What are the main objectives of a DBMS?",
                options: [
                    "Data integrity, data security, and data redundancy",
                    "Data manipulation and data analysis",
                    "Data consistency, data retrieval, and data storage",
                    "Data input and data output"
                ],
                answer: "Data consistency, data retrieval, and data storage",
                imageUrl: "",
                timeLimit: 60
            },
            {
                question: "Which of the following is part of a DBMS architecture?",
                options: [
                    "User Interface",
                    "Query Processor",
                    "Data Storage Management",
                    "All of the above"
                ],
                answer: "All of the above",
                imageUrl: "",
                timeLimit: 60
            },
            {
                question: "The three levels of DBMS architecture are:",
                options: [
                    "External, Conceptual, Internal",
                    "Physical, Logical, Conceptual",
                    "Logical, Physical, Conceptual",
                    "Internal, Conceptual, Logical"
                ],
                answer: "External, Conceptual, Internal",
                imageUrl: "",
                timeLimit: 60
            },
            {
                question: "The Data Dictionary in DBMS is used to store:",
                options: [
                    "Data in a tabular format",
                    "Metadata about the database",
                    "Application programs",
                    "Backup data"
                ],
                answer: "Metadata about the database",
                imageUrl: "",
                timeLimit: 60
            },
            {
                question: "Which DBMS component is responsible for handling queries?",
                options: [
                    "Query Processor",
                    "Transaction Manager",
                    "Database Engine",
                    "Storage Manager"
                ],
                answer: "Query Processor",
                imageUrl: "",
                timeLimit: 60
            },
            {
                question: "Which of the following is a feature of RDBMS?",
                options: [
                    "Uses tables for storing data",
                    "Supports SQL for querying",
                    "Allows multiple users to access data",
                    "All of the above"
                ],
                answer: "All of the above",
                imageUrl: "",
                timeLimit: 60
            },
            {
                question: "In a relational database, what is a relation?",
                options: [
                    "A table with rows and columns",
                    "A database with multiple tables",
                    "A set of related files",
                    "None of the above"
                ],
                answer: "A table with rows and columns",
                imageUrl: "",
                timeLimit: 60
            },
            {
                question: "Which of the following is a primary key constraint in RDBMS?",
                options: [
                    "It uniquely identifies each record in a table.",
                    "It allows duplicate values.",
                    "It can be null.",
                    "It refers to another table’s primary key"
                ],
                answer: " It uniquely identifies each record in a table.",
                imageUrl: "",
                timeLimit: 60
            },
            {
                question: "What does SQL stand for?",
                options: [
                    "Structured Query Logic",
                    "Structured Query Language",
                    "Simple Query Language",
                    "Sequential Query Language"
                ],
                answer: "Structured Query Language",
                imageUrl: "",
                timeLimit: 60
            },
            {
                question: "Which SQL statement is used to retrieve data from a database?",
                options: [
                    "SELECT",
                    "INSERT",
                    "UPDATE",
                    "DELETE"
                ],
                answer: "SELECT",
                imageUrl: "",
                timeLimit: 60
            },
            {
                question: "What SQL command is used to remove a table from a database?",
                options: [
                    "DELETE",
                    "DROP",
                    "REMOVE",
                    "TRUNCATE"
                ],
                answer: "DROP",
                imageUrl: "",
                timeLimit: 60
            },
            {
                question: "Which SQL keyword is used to filter records in a SELECT query?",
                options: [
                    "FILTER",
                    "WHERE",
                    "HAVING",
                    "ORDER BY"
                ],
                answer: "WHERE",
                imageUrl: "",
                timeLimit: 60
            },

        ]
    },
    {
        id: "FCOS",
        name: "Fundamentals of Computers & Operating Systems",
        description: "Test on Fundamentals of Computers & Operating Systems (ADCA)",
        enabled: false, // to enable put as true or false
        questions: [
            {
                question: "Who is considered the father of computers?",
                options: [
                    "Charles Babbage",
                    "Alan Turing",
                    "John von Neumann",
                    "Blaise Pascal"
                ],
                answer: "Charles Babbage",
                imageUrl: "",
                timeLimit: 60
            },
            {
                question: "Which was the first general-purpose electronic digital computer?",
                options: [
                    "UNIVAC",
                    "ENIAC",
                    "EDVAC",
                    "Mark I"
                ],
                answer: "ENIAC",
                imageUrl: "",
                timeLimit: 60
            },
            {
                question: "The first generation of computers used:",
                options: [
                    "Transistors",
                    "Vacuum tubes",
                    "Integrated Circuits",
                    "Microprocessors"
                ],
                answer: "Vacuum tubes",
                imageUrl: "",
                timeLimit: 60
            },
            {
                question: "Which generation of computers introduced microprocessors?",
                options: [
                    "First",
                    "Second",
                    "Third",
                    "Fourth"
                ],
                answer: "Fourth",
                imageUrl: "",
                timeLimit: 60
            },
            {
                question: "Supercomputers are mainly used for:",
                options: [
                    "Scientific calculations",
                    "Personal computing",
                    "Word processing",
                    "Gaming"
                ],
                answer: "Scientific calculations",
                imageUrl: "",
                timeLimit: 60
            },
            {
                question: "Which of the following is NOT an example of hardware?",
                options: [
                    "Monitor",
                    "Operating system",
                    "Keyboard",
                    "Hard disk"
                ],
                answer: "Operating system",
                imageUrl: "",
                timeLimit: 60
            },
            {
                question: "Which of the following is a type of system software?",
                options: [
                    "Word Processor",
                    "Antivirus",
                    "Compiler",
                    "Spreadsheet"
                ],
                answer: "Compiler",
                imageUrl: "",
                timeLimit: 60
            },
            {
                question: "ROM stands for:",
                options: [
                    "Read On Memory",
                    "Read Only Memory",
                    "Random Output Memory",
                    "Random Only Memory"
                ],
                answer: "Read Only Memory",
                imageUrl: "",
                timeLimit: 60
            },
            {
                question: "Which of the following is an example of secondary memory?",
                options: [
                    "RAM",
                    "Cache",
                    "Hard Drive",
                    "Register"
                ],
                answer: "Hard Drive",
                imageUrl: "",
                timeLimit: 60
            },
            {
                question: "A touchpad is commonly used in:",
                options: [
                    "Desktop computers",
                    "Laptops",
                    "Servers",
                    "Mainframes"
                ],
                answer: "Laptops",
                imageUrl: "",
                timeLimit: 60
            },
            {
                question: "The smallest unit of data in a computer is:",
                options: [
                    "Byte",
                    "Bit",
                    "Nibble",
                    "Word"
                ],
                answer: "Bit",
                imageUrl: "",
                timeLimit: 60
            },
            {
                question: "Which of the following is NOT an operating system?",
                options: [
                    "Windows",
                    "Linux",
                    "MS Office",
                    "macOS"
                ],
                answer: "MS Office",
                imageUrl: "",
                timeLimit: 60
            },
            {
                question: "What does the Recycle Bin store?",
                options: [
                    "Temporary files",
                    "Deleted files",
                    "System files",
                    "Program files"
                ],
                answer: "Deleted files",
                imageUrl: "",
                timeLimit: 60
            },
            {
                question: "The speed of a processor is measured in:",
                options: [
                    "Hertz (Hz)",
                    "Bits",
                    "Bytes",
                    "Joules"
                ],
                answer: "Hertz (Hz)",
                imageUrl: "",
                timeLimit: 60
            },
            {
                question: "What is the full form of DPI in printers?",
                options: [
                    "Dots Per Inch",
                    "Data Processing Interface",
                    "Digital Processing Index",
                    "Dual Process Integration"
                ],
                answer: "Dots Per Inch",
                imageUrl: "",
                timeLimit: 60
            },

        ]
    },
    {
        id: "MS Office & productivity tools",
        name: "Microsoft Office & Productivity Tools",
        description: "Test on MS Office & Productivity Tools (ADCA)",
        enabled: false, // to enable put as true or false
        questions: [
            {
                question: "What is the default font in Microsoft Word?",
                options: [
                    "Arial",
                    "Times New Roman",
                    "Calibri",
                    "Courier New"
                ],
                answer: "Courier New",
                imageUrl: "",
                timeLimit: 60
            },
            {
                question: "Which of the following is NOT a page layout option in MS Word?",
                options: [
                    "Portrait",
                    "Landscape",
                    "Square",
                    "Normal"
                ],
                answer: "Square",
                imageUrl: "",
                timeLimit: 60
            },
            {
                question: "How can you apply a template to a new document in Word?",
                options: [
                    "Click on File > New > Template",
                    "Click on Home > Template",
                    "Click on Insert > Template",
                    "Templates cannot be used in Word"
                ],
                answer: "Click on File > New > Template",
                imageUrl: "",
                timeLimit: 60
            },
            {
                question: "Which keyboard shortcut is used to save a document in MS Word?",
                options: [
                    "Ctrl + S",
                    "Ctrl + P",
                    "Ctrl + A",
                    "Ctrl + D"
                ],
                answer: "Ctrl + S",
                imageUrl: "",
                timeLimit: 60
            },
            {
                question: "How can you check the spelling and grammar of a document in MS Word?",
                options: [
                    "Tools > Spelling and Grammar",
                    "Review > Spelling & Grammar",
                    "Home > Proofing",
                    "File > Check"
                ],
                answer: "Review > Spelling & Grammar",
                imageUrl: "",
                timeLimit: 60
            },
            {
                question: "Which option allows you to insert a new slide in PowerPoint?",
                options: [
                    "Ctrl + N",
                    "Home > New Slide",
                    "Insert > New Slide",
                    "File > Insert Slide"
                ],
                answer: "Home > New Slide",
                imageUrl: "",
                timeLimit: 60
            },
            {
                question: "How do you add a header in MS Excel?",
                options: [
                    "Insert > Header",
                    "View > Header",
                    "Layout > Header",
                    "Insert > Text > Header & Footer"
                ],
                answer: "Insert > Text > Header & Footer",
                imageUrl: "",
                timeLimit: 60
            },
            {
                question: "What is a Query in MS Access?",
                options: [
                    "A type of table",
                    "A question asked to a database",
                    "A form",
                    "A report"
                ],
                answer: "A question asked to a database",
                imageUrl: "",
                timeLimit: 60
            },
            {
                question: "Which of the following is an example of conditional formatting in Excel?",
                options: [
                    "Changing text color based on cell value",
                    "Adding a chart to a sheet",
                    "Creating a pivot table",
                    "Formatting cells with borders"
                ],
                answer: "Changing text color based on cell value",
                imageUrl: "",
                timeLimit: 60
            },
            {
                question: "Which of the following features is NOT available in MS PowerPoint?",
                options: [
                    "Slide sorter view",
                    "Slide transitions",
                    "Pivot tables",
                    "Pivot tables" // Changed duplicate option
                ],
                answer: "Pivot tables",
                imageUrl: "",
                timeLimit: 60
            },
            {
                question: "Which of the following can be created in MS Word?",
                options: [
                    "Table of Contents",
                    "Charts",
                    "Index",
                    "All of the above"
                ],
                answer: "All of the above",
                imageUrl: "",
                timeLimit: 60
            },
            {
                question: "What feature is used to protect a document in MS Word?",
                options: [
                    "Password",
                    "Read-Only",
                    "Both a and b",
                    "Encryption"
                ],
                answer: "Both a and b",
                imageUrl: "",
                timeLimit: 60
            },
            {
                question: "Which Office program is best for creating a presentation?",
                options: [
                    "MS Word",
                    "MS Excel",
                    "MS PowerPoint",
                    "MS Access"
                ],
                answer: "MS PowerPoint",
                imageUrl: "",
                timeLimit: 60
            },
            {
                question: "Which of the following is used to create a hyperlink in MS Word?",
                options: [
                    "Right-click > Hyperlink",
                    "Insert > Link",
                    "Ctrl + K",
                    "All of the above"
                ],
                answer: "All of the above",
                imageUrl: "",
                timeLimit: 60
            },
            {
                question: "Which of the following is a valid way to enter data into an Access database?",
                options: [
                    "Enter data directly in the datasheet view",
                    "Enter data through a form",
                    "Import data from an external file",
                    "All of the above"
                ],
                answer: "All of the above",
                imageUrl: "",
                timeLimit: 60
            },
        ]
        },
        {
        id: "Internet & Web Technology:",
        name: "Internet & Web Technology:",
        description: "Test on Internet & Web Technology (ADCA)",
        enabled: false, // to enable put as true or false
        questions: [
            {
                question: "What is the main function of a web browser?",
                options: [
                    "Send emails",
                    "Access web pages",
                    "Store files",
                    "Connect to Wi-Fi"
                ],
                answer: "Access web pages",
                imageUrl: "",
                timeLimit: 60
            },
            {
                question: "Which of the following is not a web browser?",
                options: [
                    "Google Chrome",
                    "Microsoft Edge",
                    "Mozilla Firefox",
                    "Microsoft Office"
                ],
                answer: "Microsoft Office",
                imageUrl: "",
                timeLimit: 60
            },
            {
                question: "What does the HTTP protocol stand for?",
                options: [
                    "HyperText Transfer Protocol",
                    "HyperTerminal Transfer Protocol",
                    "HyperText Terminal Protocol",
                    "Hyper Transfer Protocol"
                ],
                answer: "HyperText Transfer Protocol",
                imageUrl: "",
                timeLimit: 60
            },
            {
                question: "What does the URL “www.example.com” represent?",
                options: [
                    "The protocol",
                    "The domain name",
                    "The file location",
                    "The IP address"
                ],
                answer: "The domain name",
                imageUrl: "",
                timeLimit: 60
            },
            {
                question: "Which search engine is the most popular globally?",
                options: [
                    "Bing",
                    "Yahoo",
                    "Google",
                    "DuckDuckGo"
                ],
                answer: "Google",
                imageUrl: "",
                timeLimit: 60
            },
            {
                question: "What is SEO in the context of web search?",
                options: [
                    "Search Engine Optimization",
                    "Simple Entry Options",
                    "Secure Encryption Online",
                    "Search Evaluation Operation"
                ],
                answer: "Search Engine Optimization",
                imageUrl: "",
                timeLimit: 60
            },
            {
                question: "Which of the following is NOT a search engine?",
                options: [
                    "Google",
                    "Bing",
                    "Amazon",
                    "Yahoo"
                ],
                answer: "Amazon",
                imageUrl: "",
                timeLimit: 60
            },
            {
                question: "Which of the following is a widely used email service?",
                options: [
                    "Gmail",
                    "Skype",
                    "Facebook Messenger",
                    "WhatsApp"
                ],
                answer: "Gmail",
                imageUrl: "",
                timeLimit: 60
            },
            {
                question: "What is the primary purpose of cloud storage?",
                options: [
                    "Store software",
                    "Store files online for remote access",
                    "Send emails",
                    "Generate random passwords"
                ],
                answer: "Store files online for remote access",
                imageUrl: "",
                timeLimit: 60
            },
            {
                question: "What social media platform is primarily for professional networking?",
                options: [
                    "Instagram",
                    "LinkedIn",
                    "Snapchat",
                    "Twitter"
                ],
                answer: "LinkedIn",
                imageUrl: "",
                timeLimit: 60
            },
            {
                question: "What is the primary function of social media platforms?",
                options: [
                    "File storage",
                    "User interaction and content sharing",
                    "Secure communication",
                    "Software downloads"
                ],
                answer: "User interaction and content sharing",
                imageUrl: "",
                timeLimit: 60
            },
            {
                question: "What does the acronym “DM” stand for in social media?",
                options: [
                    "Digital Media",
                    "Direct Message",
                    "Download Manager",
                    "Data Management"
                ],
                answer: "Direct Message",
                imageUrl: "",
                timeLimit: 60
            },
            {
                question: "What is the purpose of using a strong password?",
                options: [
                    "To make passwords easier to remember",
                    "To prevent unauthorized access to accounts",
                    "To store sensitive data",
                    "To manage multiple accounts"
                ],
                answer: "To prevent unauthorized access to accounts",
                imageUrl: "",
                timeLimit: 60
            },
            {
                question: "Which of the following is an example of two-factor authentication (2FA)?",
                options: [
                    "A password and a CAPTCHA",
                    "A password and a fingerprint scan",
                    "A password and a phone call",
                    "A password and a username"
                ],
                answer: "A password and a fingerprint scan",
                imageUrl: "",
                timeLimit: 60
            },
            {
                question: "What is a VPN (Virtual Private Network) primarily used for?",
                options: [
                    "To boost the speed of the internet",
                    "To hide the user's IP address and encrypt their connection",
                    "To enhance social media usage",
                    "To store data securely"
                ],
                answer: "To hide the user's IP address and encrypt their connection",
                imageUrl: "",
                timeLimit: 60
            },
        ]
        },
        {
           id: "mixed-demo-quiz",
           name: "Diversity in Living World (CHAPTER-1)",
           description: "Test for class 6 SCIENCE",
           enabled: true,
           questions: [
            {
               question: "Difference between Herbs, Sherbs and Trees?",
               type: "input", // required for input-type
               answer: "Herbs are small, non-woody plants with soft, green stems. Shrubs are medium-sized plants with multiple woody stems branching from the base. Trees are large, woody plants with a single, thick, and hard stem called a trunk. ",
               imageUrl: "",
               timeLimit: 30
            },
            {
               question: "What are climbers and creepers?",
               type: "input", // required for input-type
               answer: "Climbers and creepers are types of plants with weak stems that cannot stand upright on their own. Creepers grow along the ground, while climbers need support to grow upwards. ",
               imageUrl: "",
               timeLimit: 30
            },
            {
               question: "What are different types of venation found in leaves?",
               type: "input", // required for input-type
               answer: "The two main types of venation found in leaves are reticulate venation and parallel venation. Reticulate venation features a network-like pattern of veins, while parallel venation has veins running parallel to each other. ",
               imageUrl: "",
               timeLimit: 30
            },
            {
                question: "Choose the correct option seeing the diagram?",
                type: "MCQ",
                options: [
                    "Taproot & Fibrous root",
                    "Fibrous root & Taproot",
                    "Taproot & Taproot",
                    "None of these"
                ],
                answer: "Taproot & Fibrous root",
                imageUrl: "1.png",
                timeLimit: 30
            },
            {
               question: "What are dicot and monocot. Explain their features",
               type: "input", // required for input-type
               answer: "Monocots and dicots are the two main groups of flowering plants (angiosperms), distinguished primarily by the number of cotyledons (seed leaves) in their seeds. Monocots have one cotyledon, while dicots have two. This fundamental difference in seed structure is associated with other distinct characteristics in their roots, stems, leaves, and flowers.",
               imageUrl: "",
               timeLimit: 30
            },
            {
               question: "Describe the features of camels found in Rajasthan and Ladakh",
               type: "input", // required for input-type
               answer: "Camels in Rajasthan and Ladakh exhibit distinct features adapted to their respective environments. Rajasthan's camels, primarily the dromedary (one-humped) type, are built for arid, hot deserts, while Ladakh's camels, the Bactrian (two-humped), are adapted to the cold, mountainous terrain",
               imageUrl: "",
               timeLimit: 30
            },
            {
               question: "Describe the two types of Rhododendrons found in different places in planes and mountains:",
               type: "input", // required for input-type
               answer: "",
               imageUrl: "",
               timeLimit: 30
            },
            {
               question: "What do you mean by Adaptation and what do you mean by Habitat?",
               type: "input", // required for input-type
               answer: "Habitat is the natural environment or place where an organism lives, providing the resources necessary for its survival. Adaptation refers to the process by which organisms develop traits or characteristics that enable them to thrive in their specific habitat. Essentially, adaptations are the features that help organisms survive and reproduce in their particular habitat. ",
               imageUrl: "",
               timeLimit: 30
            },
            {
               question: "What do you mean by Terrestrial Aquatic and Amphibians animals?",
               type: "input", // required for input-type
               answer: "Terrestrial animals live primarily or exclusively on land, aquatic animals live primarily or exclusively in water, and amphibians are a group of animals that can live both on land and in water.",
               imageUrl: "",
               timeLimit: 30
            },
                      ]
               },
               {
                id: "test",
                name: "Mindful eating a path to a healthy body (CHAPTER-2)",
                description: "",
                enabled: true,
                questions: [
                    {
                        question: "What are the locally grown crops found in Panjab?",
                        type: "input",
                        answer: "In Punjab, the major locally grown crops include wheat and rice, which are staples and form the foundation of the state's agricultural output. Other significant crops include sugarcane, maize, pulses, and oilseeds. Additionally, Punjab also produces various fruits and vegetables, such as kinnow (a type of mandarin orange), guava, mango, potatoes, onions, and tomatoes.",
                        imageUrl: "",
                        timeLimit: 30
                    },
                    {
                        question: "Traditional food items eaten in karnataka",
                        type: "input",
                        answer: "Karnataka cuisine boasts a wide array of delicious and unique traditional dishes. Some of the most famous include Bisi Bele Bath, a wholesome rice and lentil dish, and Mysore Pak.",
                        imageUrl: "",
                        timeLimit: 30
                    },
                    {
                        question: "What do you mean by cultivation?",
                        type: "input",
                        answer: "The word contivation is not a standard English word. It appears to be a misspelling or a non-standard variation of cultivation. Cultivation refers to the act of preparing land and growing crops, or the process of developing or improving something through care and attention. ",
                        imageUrl: "",
                        timeLimit: 30
                    },
                    {
                        question: "What do you understand by the term culinary practices. Differentiate between Traditional cooking and modern cooking",
                        type: "input",
                        answer: "",
                        imageUrl: "",
                        timeLimit: 30
                    },
                    {
                        question: "Carbohydrate and fats are also known as?",
                        type: "input",
                        answer: "macronutrients. They are essential nutrients that the body needs in large quantities to provide energy and maintain bodily functions.",
                        imageUrl: "",
                        timeLimit: 30
                    },
                    {
                        question: "What is carbohydrate and fat? What is its primary source with examples?",
                        type: "input",
                        answer: "Carbohydrates and fats are both essential macronutrients that provide the body with energy. Carbohydrates are the body's primary source of quick energy, while fats are a more concentrated source of energy and also play roles in hormone production and cell structure.",
                        imageUrl: "",
                        timeLimit: 30
                    },
                    {
                        question: "What is Protein? Another name for Protein?",
                        type: "input",
                        answer: "",
                        imageUrl: "",
                        timeLimit: 30
                    },
                ]
               },


                {
                id: "Logical Reasoning",
                name: "Logical reasoning",
                description: "",
                enabled: true,
                questions: [
                    {
                        question: "A number when divided by 5 leaves a remainder of 3, and when divided by 7 leaves a remainder of 4. What is the smallest such number?",
                        type: "input",
                        answer: "31",
                        imageUrl: "",
                        timeLimit: 300
                    },
                    {
                        question: "A train travels 60 km in the first hour, 90 km in the second hour, and 120 km in the third hour. If the pattern continues, how far will the train travel in the fifth hour? (Write the answer without any units)",
                        type: "input",
                        answer: "180",
                        imageUrl: "",
                        timeLimit: 300
                    },
                    {
                        question: "If ▲ + ▲ = 8, ▲ + ■ = 10, and ■ + ● = 14, what is the value of ▲ + ■ + ●?",
                        type: "input",
                        answer: "18",
                        imageUrl: "",
                        timeLimit: 300
                    },
                    {
                        question: "What comes next in the series:- 2, 6, 12, 20, 30, ?",
                        type: "input",
                        answer: "42",
                        imageUrl: "",
                        timeLimit: 300
                    },
                    {
                        question: "If MANGO = 50, and PEAR = 40, what is the value of APPLE?",
                        type: "input",
                        answer: "54",
                        imageUrl: "",
                        timeLimit: 300
                    },
                    {
                        question: "A boy walks 3 km north, then turns right and walks 4 km, then turns right again and walks 3 km. Which direction is he facing? (WRITE YOUR ANSWER IN CAPITAL LETTERS ONLY)",
                        type: "input",
                        answer: "EAST",
                        imageUrl: "",
                        timeLimit: 300
                    },
                    {
                        question: "A train travels 360 km at a uniform speed. If the speed had been 5 km/h more, it would have taken 48 minutes less. Find the speed. (WRITE WITHOUT UNITS)",
                        type: "input",
                        answer: "45",
                        imageUrl: "",
                        timeLimit: 300
                    },
                    {
                        question: "The sum of the first 10 terms of an AP is 250. If the first term is 10, find the common difference.(WRITE ONLY THE ANSWER IN FORMAT a/b)",
                        type: "input",
                        answer: "10/9",
                        imageUrl: "",
                        timeLimit: 300
                    },
                ]
               },
          ]


// --- Helper Functions to Show/Hide Sections ---
function hideAllSections() {
    quizInfoBox.style.display = 'none';
    quizContainer.style.display = 'none';
    finalScoreContainer.style.display = 'none';
    quizResultsDetails.style.display = 'none';
    previousQuizzesContainer.style.display = 'none';
    quizSelectionContainer.style.display = 'none';
    loginSuccessMessage.classList.remove('show'); // Ensure login message is hidden when navigating
    quizCompletedMessage.classList.remove('show');
}

function goToDashboard() {
    hideAllSections();
    quizInfoBox.style.display = 'block';
    updateDashboardInfo(); // Update information on the dashboard
    setActiveLink(dashboardLink);
    // Clear the timer when navigating to the dashboard
    clearInterval(timerInterval);
}

function showQuizSelection() {
    hideAllSections();
    quizSelectionContainer.style.display = 'block';
    renderQuizList();
}

function showQuizSection() {
    hideAllSections();
    quizContainer.style.display = 'block';
}

function showFinalScoreSection() {
    hideAllSections();
    finalScoreContainer.style.display = 'block';
}

function showQuizResultsDetailsSection() {
    hideAllSections();
    quizResultsDetails.style.display = 'block';
}

function showPreviousQuizzesSection() {
    hideAllSections();
    previousQuizzesContainer.style.display = 'block';
    loadPreviousQuizzes();
}


// --- Dashboard Info Update ---
function updateDashboardInfo() {
    const loggedInUser = localStorage.getItem('loggedInUser');
    if (!loggedInUser) return;

    const userKey = `previousQuizzes_${loggedInUser}`;
    const previousQuizzes = JSON.parse(localStorage.getItem(userKey)) || [];
    const totalQuizzes = previousQuizzes.length;
    totalQuizzesCompleted.textContent = `Total Quizzes Completed: ${totalQuizzes}`;

    if (totalQuizzes > 0) {
        const lastQuiz = previousQuizzes[previousQuizzes.length - 1];
        lastQuizScoreDisplay.textContent = `Your last quiz (${lastQuiz.quizName}) score: ${lastQuiz.score}/${lastQuiz.totalQuestions} (${lastQuiz.percentage}%)`;
        lastQuizScoreDisplay.style.display = 'block';
    } else {
        lastQuizScoreDisplay.style.display = 'none';
    }

    totalQuizzesCompleted.style.display = 'block';
}


// --- Quiz Selection ---
function renderQuizList() {
    quizList.innerHTML = ''; // Clear existing quiz cards

    // Separate enabled and disabled quizzes
    const enabledQuizzes = quizzes.filter(quiz => quiz.enabled);
    const disabledQuizzes = quizzes.filter(quiz => !quiz.enabled);

    // Combine them, with enabled quizzes first
    const sortedQuizzes = [...enabledQuizzes, ...disabledQuizzes];

    sortedQuizzes.forEach(quiz => { // Use the sorted list
        const quizCard = document.createElement('div');
        quizCard.classList.add('quiz-card');
        quizCard.innerHTML = `
            <h3>${quiz.name}</h3>
            <p>${quiz.description}</p>
            <button class="start-quiz-card-btn" data-quiz-id="${quiz.id}"></button>
        `;
        const startButton = quizCard.querySelector('.start-quiz-card-btn');
        if (!quiz.enabled) {
            startButton.disabled = true; // Disable the button
            startButton.classList.add('disabled-button'); // Add a class for styling
            startButton.textContent = 'Quiz Disabled'; // Change button text
        } else {
            // Set innerHTML for enabled button including the icon
            startButton.innerHTML = 'Start Quiz <i class="fas fa-arrow-right"></i>'; // [MODIFICATION: Moved icon after text]
            startButton.addEventListener('click', (e) => {
                const quizId = e.target.dataset.quizId;
                startQuiz(quizId);
            });
        }
        quizList.appendChild(quizCard);
    });
}


// --- Quiz Logic ---
function startQuiz(quizId) {
    currentQuiz = quizzes.find(q => q.id === quizId);
    if (!currentQuiz) {
        showInfoModal('Quiz not found!');
        return;
    }

    // Ensure quiz is enabled before starting
    if (!currentQuiz.enabled) {
        showInfoModal('This quiz is currently disabled and cannot be started.');
        return;
    }

    currentQuestionIndex = 0;
    userAnswers = new Array(currentQuiz.questions.length).fill(null); // Initialize user answers
    correctAnswersTotal = 0;
    wrongAnswersTotal = 0;
    skippedQuestionsTotal = 0;
    quizDetailsForDisplay = []; // Clear previous detailed results

    showQuizSection();
    loadQuestion();
    startTimer();

    // Attach event listeners for navigation buttons
    prevButton.removeEventListener('click', handlePrevButtonClick); // Remove old listeners to prevent duplicates
    skipButton.removeEventListener('click', handleSkipButtonClick);
    nextButton.removeEventListener('click', handleNextButtonClick);
    submitButton.removeEventListener('click', handleSubmitButtonClick);

    prevButton.addEventListener('click', handlePrevButtonClick);
    skipButton.addEventListener('click', handleSkipButtonClick);
    nextButton.addEventListener('click', handleNextButtonClick);
    submitButton.addEventListener('click', handleSubmitButtonClick);
}

optionsContainer.innerHTML = '';

if (questionData.type === 'input') {
    const inputField = document.createElement('input');
    inputField.type = 'text';
    inputField.classList.add('input-answer-field');
    inputField.placeholder = 'Type your answer here...';
    inputField.value = userAnswers[currentQuestionIndex] || '';

    inputField.addEventListener('input', () => {
        userAnswers[currentQuestionIndex] = inputField.value;
    });

    optionsContainer.appendChild(inputField);
} else {
    questionData.options.forEach((option, index) => {
        const optionDiv = document.createElement('div');
        optionDiv.classList.add('option');
        optionDiv.innerHTML = `<span class="option-label">${String.fromCharCode(65 + index)}.</span> <span class="option-text">${option}</span>`;
        optionDiv.dataset.option = option;
        optionDiv.addEventListener('click', () => selectOption(optionDiv, option));
        optionsContainer.appendChild(optionDiv);

        if (userAnswers[currentQuestionIndex] === option) {
            optionDiv.classList.add('selected');
        }
    });
}


function selectOption(selectedOptionDiv, optionText) {
    // Remove 'selected' class from all options first
    document.querySelectorAll('.option').forEach(opt => {
        opt.classList.remove('selected');
    });
    // Add 'selected' class to the clicked option
    selectedOptionDiv.classList.add('selected');
    userAnswers[currentQuestionIndex] = optionText;
}

function handlePrevButtonClick() {
    if (currentQuestionIndex > 0) {
        currentQuestionIndex--;
        loadQuestion();
    }
}

function handleSkipButtonClick() {
    // If the user has selected an answer, they cannot skip.
    // If no answer is selected, mark as skipped.
    if (userAnswers[currentQuestionIndex] === null) {
        // userAnswers[currentQuestionIndex] remains null for skipped questions
        // showInfoModal("Question skipped!"); // REMOVED THIS LINE
    } else {
        showInfoModal("You have already answered this question, cannot skip.");
        return; // Do not advance if already answered
    }

    if (currentQuestionIndex < currentQuiz.questions.length - 1) {
        currentQuestionIndex++;
        loadQuestion();
    } else {
        // If it's the last question and skipped, go to results
        handleSubmitButtonClick();
    }
}


function handleNextButtonClick() {
    const currentQuestion = currentQuiz.questions[currentQuestionIndex];
    const answer = userAnswers[currentQuestionIndex];

    if (currentQuestion.type === 'input') {
        if (!answer || answer.trim() === '') {
            showInfoModal("Please enter an answer or skip the question.");
            return;
        }
    } else if (answer === null) {
        showInfoModal("Please select an option or skip the question.");
        return;
    }

    if (currentQuestionIndex < currentQuiz.questions.length - 1) {
        currentQuestionIndex++;
        loadQuestion();
    } else {
        handleSubmitButtonClick();
    }
}

function handleSubmitButtonClick() {
    clearInterval(timerInterval); // Stop the timer when quiz is submitted
    if (timeUpMessageTimeout) { // Clear any pending time-up message timeout
        clearTimeout(timeUpMessageTimeout);
        const timeUpMessageElement = document.getElementById('timeUpMessage');
        if (timeUpMessageElement) {
            timeUpMessageElement.classList.remove('show');
        }
    }
    calculateResults();
    saveQuizResult();
    showFinalScoreSection();
    quizCompletedMessage.classList.add('show'); // Show quiz completed message
    localStorage.setItem('hasShownLoginMessage', 'false'); // Reset login message flag
    setTimeout(() => {
        quizCompletedMessage.classList.remove('show');
    }, 3000);
}

function updateProgressBar() {
    const progress = ((currentQuestionIndex + 1) / currentQuiz.questions.length) * 100;
    progressBar.style.width = `${progress}%`;
    progressBar.textContent = `${Math.round(progress)}%`;
}

function updateNavigationButtons() {
    prevButton.style.display = currentQuestionIndex === 0 ? 'none' : 'inline-flex';
    nextButton.style.display = currentQuestionIndex === currentQuiz.questions.length - 1 ? 'none' : 'inline-flex';
    submitButton.style.display = currentQuestionIndex === currentQuiz.questions.length - 1 ? 'inline-flex' : 'none';
    skipButton.style.display = 'inline-flex'; // Always show skip button
}


// --- Timer Logic ---
function startTimer() {
    clearInterval(timerInterval); // Clear any existing timer
    const questionTimeLimit = currentQuiz.questions[currentQuestionIndex].timeLimit;
    timeLeft = questionTimeLimit;
    updateTimerDisplay(); // Initial display

    timerInterval = setInterval(() => {
        timeLeft--;
        updateTimerDisplay(); // Update display every second
        if (timeLeft <= 0) {
            clearInterval(timerInterval);
            // If time runs out, mark the answer as 'Time_Up_Auto_Answer'
            if (userAnswers[currentQuestionIndex] === null) {
                userAnswers[currentQuestionIndex] = "Time_Up_Auto_Answer"; // Use a unique string to mark 'time up'
                showTimeUpMessage(); // Display temporary time-up message
            } 
            // else {
            //     // If an answer was already selected but time ran out before clicking next/submit
            //     // No modal needed, as behavior is to simply advance or submit
            // }

            if (currentQuestionIndex < currentQuiz.questions.length - 1) {
                currentQuestionIndex++;
                loadQuestion();
            } else {
                handleSubmitButtonClick(); // Submit if last question
            }
        }
    }, 1000);
}

function updateTimerDisplay() {
    if (timerDisplay) {
        const minutes = Math.floor(timeLeft / 60); // Calculate minutes
        const seconds = timeLeft % 60; // Calculate remaining seconds
        // Pad with leading zero if seconds is less than 10
        timerDisplay.textContent = `Time Left: ${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
    }
}

function resetTimer(timeLimit) {
    clearInterval(timerInterval);
    timeLeft = timeLimit;
    updateTimerDisplay(); // Initial display after reset
    startTimer();
}


// --- Result Calculation and Display ---
function calculateResults() {
    correctAnswersTotal = 0;
    wrongAnswersTotal = 0;
    skippedQuestionsTotal = 0;
    let timeUpQuestionsTotal = 0;
    quizDetailsForDisplay = [];

    currentQuiz.questions.forEach((question, index) => {
        const userAnswer = userAnswers[index];
        let isCorrect = false;

        if (userAnswer === null) {
            skippedQuestionsTotal++;
            quizDetailsForDisplay.push({
                question: question.question,
                userAnswer: "Skipped",
                correctAnswer: question.answer,
                isCorrect: false,
                skipped: true,
                timeUp: false
            });
        } else if (userAnswer === "Time_Up_Auto_Answer") {
            timeUpQuestionsTotal++;
            quizDetailsForDisplay.push({
                question: question.question,
                userAnswer: "Time's Up",
                correctAnswer: question.answer,
                isCorrect: false,
                skipped: false,
                timeUp: true
            });
        } else {
            if (question.type === 'input') {
                isCorrect = userAnswer.trim().toLowerCase() === question.answer.trim().toLowerCase();
            } else {
                isCorrect = userAnswer === question.answer;
            }

            if (isCorrect) {
                correctAnswersTotal++;
            } else {
                wrongAnswersTotal++;
            }

            quizDetailsForDisplay.push({
                question: question.question,
                userAnswer: userAnswer,
                correctAnswer: question.answer,
                isCorrect,
                skipped: false,
                timeUp: false
            });
        }
    });

    const totalQuestions = currentQuiz.questions.length;
    const percentage = (correctAnswersTotal / totalQuestions) * 100;

    scoreDisplay.textContent = `${correctAnswersTotal}/${totalQuestions}`;
    correctAnswersCount.textContent = correctAnswersTotal;
    wrongAnswersCount.textContent = wrongAnswersTotal;
    skippedQuestionsCount.textContent = skippedQuestionsTotal;
    percentageScore.textContent = `${percentage.toFixed(2)}%`;

    viewResultsButton.onclick = displayDetailedResults;
    returnToDashboardButton.onclick = goToDashboard;

    quizSummaryData = {
        correct: correctAnswersTotal,
        wrong: wrongAnswersTotal,
        skipped: skippedQuestionsTotal,
        timeUp: timeUpQuestionsTotal,
        total: totalQuestions
    };
}

function displayDetailedResults() {
    showQuizResultsDetailsSection();
    const resultsContainer = document.getElementById('quizResultsDetailsContainer');
    resultsContainer.innerHTML = ''; // Clear previous results

    // Update the summary section
    if (this.quizSummaryData) { // Check if summary data exists
        summaryCorrect.textContent = this.quizSummaryData.correct;
        summaryWrong.textContent = this.quizSummaryData.wrong;
        summarySkipped.textContent = this.quizSummaryData.skipped;
        summaryTimeUp.textContent = this.quizSummaryData.timeUp; // Set the new time-up count
        summaryTotalQuestions.textContent = this.quizSummaryData.total;
    } else {
        // Fallback if summary data isn't set (shouldn't happen with current flow)
        summaryCorrect.textContent = correctAnswersTotal;
        summaryWrong.textContent = wrongAnswersTotal;
        summarySkipped.textContent = skippedQuestionsTotal;
        // For time-up, you'd need to re-calculate or pass it here if not stored
        summaryTimeUp.textContent = quizDetailsForDisplay.filter(d => d.timeUp).length;
        summaryTotalQuestions.textContent = currentQuiz.questions.length;
    }


    if (!quizDetailsForDisplay || quizDetailsForDisplay.length === 0) {
        resultsContainer.innerHTML = '<p style="text-align: center; color: #777;">No detailed results available for this quiz.</p>';
        document.getElementById('quizResultsBackButton').onclick = showPreviousQuizzesSection;
        return;
    }

    quizDetailsForDisplay.forEach(detail => {
        const resultItem = document.createElement('div');
        resultItem.classList.add('result-item');
        if (detail.isCorrect) {
            resultItem.classList.add('correct');
        } else if (detail.skipped) {
            resultItem.classList.add('skipped');
        } else if (detail.timeUp) {
            resultItem.classList.add('time-up');
        } else {
            resultItem.classList.add('wrong');
        }

        resultItem.innerHTML = `
            <p class="question-text-result">${detail.question}</p>
            <p>Your Answer: <span class="${detail.isCorrect ? 'correct-answer' : (detail.skipped ? 'user-answer' : (detail.timeUp ? 'time-up-answer' : 'user-answer'))}">${detail.userAnswer}</span></p>
            <p>Correct Answer: <span class="correct-answer">${detail.correctAnswer}</span></p>
        `;
        resultsContainer.appendChild(resultItem);
    });

    document.getElementById('quizResultsBackButton').onclick = showFinalScoreSection;
}

// --- Local Storage for Previous Quizzes ---
function saveQuizResult() {
    const loggedInUser = localStorage.getItem('loggedInUser');
    if (!loggedInUser) return;

    const userKey = `previousQuizzes_${loggedInUser}`;
    const previousQuizzes = JSON.parse(localStorage.getItem(userKey)) || [];

    const now = new Date();
    // Format date as dd/mm/yyyy
    const day = String(now.getDate()).padStart(2, '0');
    const month = String(now.getMonth() + 1).padStart(2, '0'); // Months are 0-indexed
    const year = now.getFullYear();

    // Format time as hour:min:sec
    const hours = String(now.getHours()).padStart(2, '0');
    const minutes = String(now.getMinutes()).padStart(2, '0');
    const seconds = String(now.getSeconds()).padStart(2, '0');

    const formattedDate = `${day}/${month}/${year} ${hours}:${minutes}:${seconds}`;

    const result = {
        quizId: currentQuiz.id,
        quizName: currentQuiz.name,
        score: correctAnswersTotal,
        totalQuestions: currentQuiz.questions.length,
        percentage: ((correctAnswersTotal / currentQuiz.questions.length) * 100).toFixed(2),
        date: formattedDate, // Now includes date and time
        details: quizDetailsForDisplay
    };

    previousQuizzes.push(result);
    localStorage.setItem(userKey, JSON.stringify(previousQuizzes));
}


function loadPreviousQuizzes() {
    const loggedInUser = localStorage.getItem('loggedInUser');
    if (!loggedInUser) return;

    const userKey = `previousQuizzes_${loggedInUser}`;
    const previousQuizzes = JSON.parse(localStorage.getItem(userKey)) || [];

    const tableBody = document.getElementById('previousQuizzesTableBody');
    tableBody.innerHTML = '';
    const noQuizzesMessage = document.getElementById('noPreviousQuizzesMessage');

    if (previousQuizzes.length === 0) {
        noQuizzesMessage.style.display = 'block';
        return;
    } else {
        noQuizzesMessage.style.display = 'none';
    }

    previousQuizzes.sort((a, b) => new Date(b.date) - new Date(a.date));

    previousQuizzes.forEach((result, index) => {
        const row = tableBody.insertRow();
        row.insertCell(0).textContent = result.quizName || 'N/A';
        row.insertCell(1).textContent = `${result.score}/${result.totalQuestions}`;
        row.insertCell(2).textContent = `${parseFloat(result.percentage).toFixed(2)}%`;
        row.insertCell(3).textContent = result.date;

        const actionsCell = row.insertCell(4);

        // View button
        const viewButton = document.createElement('button');
        viewButton.innerHTML = '<i class="fas fa-eye"></i> View Details';
        viewButton.classList.add('view-details-btn');
        viewButton.onclick = () => showQuizResultsDetails(result);
        actionsCell.appendChild(viewButton);

        // Delete button
        const deleteButton = document.createElement('button');
        deleteButton.innerHTML = '<i class="fas fa-trash-alt"></i> Delete';
        deleteButton.classList.add('delete-quiz-btn');
        deleteButton.onclick = () => deleteQuizResult(result.quizId, result.date);
        actionsCell.appendChild(deleteButton);

        // Download button
        const downloadButton = document.createElement('button');
        downloadButton.innerHTML = '<i class="fas fa-download"></i> Download';
        downloadButton.classList.add('download-response-btn');
        downloadButton.onclick = () => downloadQuizResponse(result);
        actionsCell.appendChild(downloadButton);
    });
}


// --- New function to delete a quiz result ---
function deleteQuizResult(quizIdToDelete, dateToDelete) {
    const loggedInUser = localStorage.getItem('loggedInUser');
    if (!loggedInUser) return;

    const userKey = `previousQuizzes_${loggedInUser}`;
    let previousQuizzes = JSON.parse(localStorage.getItem(userKey)) || [];

    const updatedQuizzes = previousQuizzes.filter(quiz =>
        !(quiz.quizId === quizIdToDelete && quiz.date === dateToDelete)
    );

    localStorage.setItem(userKey, JSON.stringify(updatedQuizzes));
    loadPreviousQuizzes();
}
function downloadQuizResponse(quiz) {
    const doc = new jsPDF();
    const pageWidth = doc.internal.pageSize.getWidth();
    const marginLeft = 15;
    const maxLineWidth = pageWidth - 2 * marginLeft;
    const lineSpacing = 6;
    let y = 20;

    // Get logged-in user's name from localStorage
    const loggedInUser = localStorage.getItem('loggedInUser') || 'Unknown User';

    // Header Title
    doc.setFontSize(18);
    doc.setFont("helvetica", "bold");
    doc.text("📘 Quiz Response Report", pageWidth / 2, y, { align: "center" });
    y += 10;

    // User Name
    doc.setFontSize(12);
    doc.setFont("helvetica", "normal");
    doc.setTextColor(50, 50, 50);
    doc.text(`User: ${loggedInUser}`, marginLeft, y);
    y += 8;

    // Quiz Info Box
    doc.setDrawColor(0);
    doc.setFillColor(240, 240, 255);
    doc.rect(marginLeft, y, maxLineWidth, 25, "F");

    y += 8;
    doc.text(`Quiz Name: ${quiz.quizName}`, marginLeft + 5, y);
    y += lineSpacing;
    doc.text(`Date Taken: ${quiz.date}`, marginLeft + 5, y);
    y += lineSpacing;
    doc.text(`Score: ${quiz.score} / ${quiz.totalQuestions} (${quiz.percentage}%)`, marginLeft + 5, y);
    y += 15;

    // Loop through all question responses
    if (quiz.details && Array.isArray(quiz.details)) {
        quiz.details.forEach((item, i) => {
            // Question
            doc.setFont("helvetica", "bold");
            doc.setFontSize(12);
            doc.setTextColor(0, 0, 128);
            const wrappedQuestion = doc.splitTextToSize(`Q${i + 1}: ${item.question}`, maxLineWidth);
            doc.text(wrappedQuestion, marginLeft, y);
            y += lineSpacing * wrappedQuestion.length;

            // User Answer
            doc.setFont("helvetica", "normal");
            doc.setFontSize(11);
            let userAnswerColor;
            if (item.userAnswer === item.correctAnswer) {
                userAnswerColor = [0, 150, 0]; // Green
            } else if (!item.userAnswer || item.userAnswer === "") {
                userAnswerColor = [200, 100, 0]; // Orange
            } else {
                userAnswerColor = [200, 0, 0]; // Red
            }
            doc.setTextColor(...userAnswerColor);
            doc.text("Your Answer:", marginLeft + 5, y);
            y += lineSpacing;

            const wrappedUserAnswer = doc.splitTextToSize(item.userAnswer || "Skipped", maxLineWidth - 5);
            doc.text(wrappedUserAnswer, marginLeft + 10, y);
            y += lineSpacing * wrappedUserAnswer.length;

            // Correct Answer (always green)
            doc.setTextColor(0, 150, 0);
            doc.text("Correct Answer:", marginLeft + 5, y);
            y += lineSpacing;

            const wrappedCorrectAnswer = doc.splitTextToSize(item.correctAnswer || "N/A", maxLineWidth - 5);
            doc.text(wrappedCorrectAnswer, marginLeft + 10, y);
            y += lineSpacing * wrappedCorrectAnswer.length;

            // Divider line
            doc.setDrawColor(180);
            doc.line(marginLeft, y, pageWidth - marginLeft, y);
            y += lineSpacing;

            // Add page if needed
            if (y > 270) {
                doc.addPage();
                y = 20;
            }
        });
    } else {
        doc.setTextColor(200, 0, 0);
        doc.text("No answer details available.", marginLeft, y);
    }

    const fileName = `${quiz.quizName.replace(/\s+/g, '_')}_Response.pdf`;
    doc.save(fileName);
}
s




function loadQuestion() {
    if (!currentQuiz || currentQuestionIndex >= currentQuiz.questions.length) {
        return;
    }

    const questionData = currentQuiz.questions[currentQuestionIndex];
    quizTitle.textContent = currentQuiz.name;
    questionText.textContent = `${currentQuestionIndex + 1}. ${questionData.question}`;

    if (questionData.imageUrl) {
        questionImage.src = questionData.imageUrl;
        questionImage.style.display = 'block';
    } else {
        questionImage.style.display = 'none';
        questionImage.src = ''; // Clear the src if no image
    }

    optionsContainer.innerHTML = '';

    if (questionData.type === 'input') {
        const inputField = document.createElement('input');
        inputField.type = 'text';
        inputField.classList.add('input-answer-field');
        inputField.placeholder = 'Type your answer here...';
        inputField.value = userAnswers[currentQuestionIndex] || '';

        inputField.addEventListener('input', () => {
            userAnswers[currentQuestionIndex] = inputField.value;
        });

        optionsContainer.appendChild(inputField);
    } else {
        questionData.options.forEach((option, index) => {
            const optionDiv = document.createElement('div');
            optionDiv.classList.add('option');
            optionDiv.innerHTML = `<span class="option-label">${String.fromCharCode(65 + index)}.</span> <span class="option-text">${option}</span>`;
            optionDiv.dataset.option = option;
            optionDiv.addEventListener('click', () => selectOption(optionDiv, option));
            optionsContainer.appendChild(optionDiv);

            if (userAnswers[currentQuestionIndex] === option) {
                optionDiv.classList.add('selected');
            }
        });
    }

    updateProgressBar();
    updateNavigationButtons();
    resetTimer(questionData.timeLimit);
}

function showQuizResultsDetails(result) { // Removed 'index' from parameters as it was unused
    showQuizResultsDetailsSection();
    const resultsContainer = document.getElementById('quizResultsDetailsContainer');
    resultsContainer.innerHTML = ''; // Clear previous results

    // Update the summary section for historical results
    if (result && result.details) {
        const correctCount = result.details.filter(d => d.isCorrect).length;
        const wrongCount = result.details.filter(d => !d.isCorrect && !d.skipped && !d.timeUp).length;
        const skippedCount = result.details.filter(d => d.skipped).length;
        const timeUpCount = result.details.filter(d => d.timeUp).length;
        const totalCount = result.details.length;

        summaryCorrect.textContent = correctCount;
        summaryWrong.textContent = wrongCount;
        summarySkipped.textContent = skippedCount;
        summaryTimeUp.textContent = timeUpCount;
        summaryTotalQuestions.textContent = totalCount;
    } else {
        // Fallback or clear if no details are present
        summaryCorrect.textContent = 0;
        summaryWrong.textContent = 0;
        summarySkipped.textContent = 0;
        summaryTimeUp.textContent = 0;
        summaryTotalQuestions.textContent = 0;
    }


    if (!result || !result.details || result.details.length === 0) {
        resultsContainer.innerHTML = '<p style="text-align: center; color: #777;">No detailed results available for this quiz.</p>';
        document.getElementById('quizResultsBackButton').onclick = showPreviousQuizzesSection;
        return;
    }

    result.details.forEach(detail => {
        const resultItem = document.createElement('div');
        resultItem.classList.add('result-item');
        if (detail.isCorrect) {
            resultItem.classList.add('correct');
        } else if (detail.skipped) {
            resultItem.classList.add('skipped');
        } else if (detail.timeUp) { // New condition for time up
            resultItem.classList.add('time-up'); // Add a specific class for styling
        } else {
            resultItem.classList.add('wrong');
        }

        resultItem.innerHTML = `
            <p class="question-text-result">${detail.question}</p>
            <p>Your Answer: <span class="${detail.isCorrect ? 'correct-answer' : (detail.skipped ? 'user-answer' : (detail.timeUp ? 'time-up-answer' : 'user-answer'))}">${detail.userAnswer}</span></p>
            <p>Correct Answer: <span class="correct-answer">${detail.correctAnswer}</span></p>
        `;
        resultsContainer.appendChild(resultItem);
    });

    document.getElementById('quizResultsBackButton').onclick = showPreviousQuizzesSection;
}


// Initial setup: Hide specific quiz sections on load
// Ensure quizSelectionContainer is hidden here as well
quizContainer.style.display = 'none';
finalScoreContainer.style.display = 'none';
quizResultsDetails.style.display = 'none';
previousQuizzesContainer.style.display = 'none';
quizSelectionContainer.style.display = 'none'; // Added this line for initial hide
quizInfoBox.style.display = 'none'; // Initially hide info box, show dashboard after login check

// Adjustments to initial load flow
document.addEventListener('DOMContentLoaded', () => {
    // This block already handles initial redirection/display, but ensure goToDashboard is called last
    // The previous DOMContentLoaded listener handles auth, then calls goToDashboard
});