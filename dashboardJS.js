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

let currentQuiz = null;
let currentQuestionIndex = 0;
let userAnswers = [];
let correctAnswersTotal = 0;
let wrongAnswersTotal = 0;
let skippedQuestionsTotal = 0;
let quizDetailsForDisplay = [];

let timeLeft = 0;
let timerInterval;

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
        id: "neet-biology",
        name: "NEET Biology MCQ",
        description: "A comprehensive quiz covering Botany, Zoology, and Physics topics for NEET.",
        enabled: true, // New property: set to true to enable the quiz, false to disable
        questions: [
            {
                question: "In angiosperm, the haploid, diploid and triploid structures of a fertilized embryo sac sequentially are:",
                options: [
                "Synergids, Primary endosperm nucleus and zygote",
                "Antipodals, synergids, and primary endosperm nucleus",
                "Synergids, Zygote and Primary endosperm nucleus",
                "Synergids, antipodals and Polar nuclei"
                ],
                answer: "Synergids, Zygote and Primary endosperm nucleus",
                imageUrl: "", // No image for this question
                timeLimit: 60 // Added time limit for this question
            },
            {
                question: "Movement and accumulation of ions across a membrane against their concentration gradient can be explained by",
                options: [
                "Osmosis",
                "Facilitated Diffusion",
                "Passive Transport",
                "Active Transport"
                ],
                answer: "Active Transport",
                imageUrl: "", // No image for this question
                timeLimit: 60 // Added time limit for this question
            },
            {
                question: "Large, colourful, fragrant flowers with nectar are seen in ",
                options: [
                "Insect pollinated plants",
                "Bird pollinated plants",
                "Bat pollinated plants",
                "Wind pollinated plants"
                ],
                answer: "Insect pollinated plants",
                imageUrl: "", // No image for this question
                timeLimit: 60 // Added time limit for this question
            },
            {
                question: "The phenomenon of pleiotropism refers to ",
                options: [
                "Presence of several alleles of a single gene controlling a single crossover",
                "Presence of two alleles, each of the two genes controlling a single trait",
                "A single gene affecting multiple phenotypic expression",
                "More than two genes affecting a single character"
                ],
                answer: "A single gene affecting multiple phenotypic expression",
                imageUrl: "", // No image for this question
                timeLimit: 60 // Added time limit for this question
            },
            {
                question: "Which hormone promotes internode/petiole elongation in deep water rice?",
                options: [
                "GA3",
                "Kinetin",
                "Ethylene",
                "2, 4-D"
                ],
                answer: "Ethylene",
                imageUrl: "", // No image for this question
                timeLimit: 60 // Added time limit for this question
            },
            {
                question: "Among 'The Evil Quartet', which one is considered the most important cause driving extinction of species?",
                options: [
                "Habitat loss and fragmentation",
                "Over exploitation for economic gain",
                "Alien species invasions",
                "Сo-extinctions"
                ],
                answer: "Habitat loss and fragmentation",
                imageUrl: "", // No image for this question
                timeLimit: 60 // Added time limit for this question
            },
            {
                question: "Upon exposure to UV radiation, DNA stained with ethidium bromide will show",
                options: [
                "Bright red colour",
                "Bright blue colour",
                "Bright yellow colour",
                "Bright orange colour"
                ],
                answer: "Bright orange colour",
                imageUrl: "", // No image for this question
                timeLimit: 60 // Added time limit for this question
            },
            {
                question: "Which micronutrient is required for splitting of water molecule during photosynthesis?",
                options: [
                "Manganese",
                "Molybdenum",
                "Magnesium",
                "Copper"
                ],
                answer: "Manganese",
                imageUrl: "", // No image for this question
                timeLimit: 60 // Added time limit for this question
            },
            {
                question: "Axile placentation is observed in",
                options: [
                "Mustard, Cucumber and Primrose",
                "China rose, Beans and Lupin",
                "Tomato, Dianthus and Pea",
                "China rose, Petunia and Lemon"
                ],
                answer: "China rose, Petunia and Lemon",
                imageUrl: "", // No image for this question
                timeLimit: 60 // Added time limit for this question
            },
            {
                question: " The process of appearance of recombination nodules occurs at which sub stage of prophase I in meiosis?",
                options: [
                "Zygotene",
                "Pachytene",
                "Diplotene",
                "Diakinesis"
                ],
                answer: "Pachytene",
                imageUrl: "", // No image for this question
                timeLimit: 60 // Added time limit for this question
            },
            {
                question: "The reaction centre in PS II has an absorption maxima at",
                options: [
                "680 nm",
                "700 nm",
                "660 nm",
                "780 nm"
                ],
                answer: "680 nm",
                imageUrl: "", // No image for this question
                timeLimit: 60 // Added time limit for this question
            },
            {
                question: "Unequivocal proof that DNA is the genetic material was first proposed by",
                options: [
                "Frederick Griffith",
                "Alfred Hershey and Martha Chase",
                "Avery, Macleoid and McCarthy",
                "Wilkins and Franklin"
                ],
                answer: "Alfred Hershey and Martha Chase",
                imageUrl: "", // No image for this question
                timeLimit: 60 // Added time limit for this question
            },
            {
                question: "Among eukaryotes, replication of DNA takes place in:",
                options: [
                "M phase",
                "S phase",
                "G1 phase",
                "G2 phase"
                ],
                answer: "S phase",
                imageUrl: "", // No image for this question
                timeLimit: 60 // Added time limit for this question
            },
            {
                question: "In tissue culture experiments, leaf mesophyll cells are put in a culture medium to form callus. This phenomenon may be called as",
                options: [
                "Differentiation",
                "Dedifferentiation",
                "Development",
                "Senescence"
                ],
                answer: "Dedifferentiation",
                imageUrl: "", // No image for this question
                timeLimit: 60 // Added time limit for this question
            },
            {
                question: "Cellulose does not form blue colour with lodine because",
                options: [
                "It is a disaccharide",
                "It is a helical molecule",
                "It does not contain complex helices and hence cannot hold iodine molecules",
                "It breaks down when iodine reacts with it"
                ],
                answer: "It does not contain complex helices and hence cannot hold iodine molecules",
                imageUrl: "", // No image for this question
                timeLimit: 60 // Added time limit for this question
            },
            {
                question: "Spraying of which of the following phytohormone on juvenile conifers helps hastening the maturity period,that leads early seed production?",
                options: [
                "Indole-3-butyric Acid",
                "Gibberellic Acid",
                "Zeatin",
                "Abscisic Acid"
                ],
                answer: "Gibberellic Acid",
                imageUrl: "", // No image for this question
                timeLimit: 60 // Added time limit for this question
            },
            {
                question: "In the light of the above statements, choose the most appropriate answer from the options given below:",
                options: [
                "Both Statement I and Statement II are correct",
                "Both Statement I and Statement II are incorrect",
                "Statement I is correct but Statement II is incorrect",
                "Statement I is incorrect but Statement II is correct"
                ],
                answer: "Both Statement I and Statement II are correct",
                imageUrl: "1.png", // No image for this question
                timeLimit: 90 // Added time limit for this question
            },
            {
                question: "Identify the correct statements:",
                options: [
                "A, B, C only",
                "B, C, D only",
                "C, D, E only",
                "D, E, A only"
                ],
                answer: "A, B, C only",
                imageUrl: "2.png", // No image for this question
                timeLimit: 90 // Added time limit for this question
            },
            {
                question: "The thickness of ozone in a column of air in the atmosphere is measured in terms of :",
                options: [
                "Dobson units",
                "Decameter",
                "Decibels",
                "Kilobase"
                ],
                answer: "Dobson units",
                imageUrl: "", // No image for this question
                timeLimit: 60 // Added time limit for this question
            },
            {
                question: "In the light of the above statements, choose the correct answer from the options given below:",
                options: [
                "Both A and R are true and R is the correct explanation of A",
                "Both A and R are true but R is NOT the correct explanation of A",
                "A is true but R is false",
                "A is false but R is true"
                ],
                answer: "Both A and R are true and R is the correct explanation of A",
                imageUrl: "3.png", // No image for this question
                timeLimit: 90 // Added time limit for this question
            },
            {
                question: "Which of the following stages of meiosis involves division of centromere?",
                options: [
                "Metaphase I",
                "Anaphase II",
                "Metaphase II",
                "Telophase"
                ],
                answer: "Anaphase II",
                imageUrl: "", // No image for this question
                timeLimit: 60 // Added time limit for this question
            },
            {
                question: "How many ATP and NADPH2 are required for the synthesis of one molecule of Glucose during Calvin cycle?",
                options: [
                "12 ATP and 12 NADPH2",
                "18 ATP and 12 NADPH2",
                "12 ATP and 16 NADPH2",
                "18 ATP and 16 NADPH2"
                ],
                answer: "18 ATP and 12 NADPH2",
                imageUrl: "", // No image for this question
                timeLimit: 60 // Added time limit for this question
            },
            {
                question: "In the light of the above statements, choose the correct answer from the options given below:",
                options: [
                "Both Statement I and Statement II are true",
                "Both Statement I and Statement II are false",
                "Statement I is correct but Statement II is false",
                "Statement I is incorrect but Statement II is true"
                ],
                answer: "Statement I is incorrect but Statement II is true",
                imageUrl: "4.png", // No image for this question
                timeLimit: 90 // Added time limit for this question
            },
            {
                question: "In the light of the above statements, choose the correct answer from the options given below:",
                options: [
                "Both A and R are true and R is the correct explanation of A.",
                "Both A and R are true but R is NOT the correct explanation of A.",
                "A is true but R is false.",
                "A is false but R is true."
                ],
                answer: "Both A and R are true and R is the correct explanation of A.",
                imageUrl: "5.png", // No image for this question
                timeLimit: 90 // Added time limit for this question
            },
            {
                question: "Choose the correct answer from the options given below:",
                options: [
                "A and B only",
                "C and D only",
                "B and E only",
                "A and E only"
                ],
                answer: "B and E only",
                imageUrl: "6.png", // No image for this question
                timeLimit: 90 // Added time limit for this question
            },
            {
                question: "Choose the correct answer from the options given below:",
                options: [
                "A-III, B-I, C-IV, D-II",
                "A-III, B-IV, C-II, D-I",
                "A-II, B-III, C-I, D-IV",
                "A-IV, B-2, C-I, D-III"
                ],
                answer: "A-III, B-IV, C-II, D-I",
                imageUrl: "7.png", // No image for this question
                timeLimit: 90 // Added time limit for this question
            },
            {
                question: "In the light of the above statements, choose the correct answer from the options given below:",
                options: [
                "Both Statement I and Statement II are true.",
                "Both Statement I and Statement II are false.",
                "Statement I is correct but Statement II is false.",
                "Statement I is incorrect but Statement II is true."
                ],
                answer: "Both Statement I and Statement II are true.",
                imageUrl: "8.png", // No image for this question
                timeLimit: 90 // Added time limit for this question
            },
            {
                question: "Which of the following statements is correct?",
                options: [
                "Eutrophication refers to increase in domestic sewage and waste water in lakes.",
                "Biomagnification refers to increase in concentration of the toxicant at successive trophic levels.",
                "Presence of large amount of nutrients in water restricts 'Algal Bloom'",
                "Algal Bloom decreases fish mortality"
                ],
                answer: "Biomagnification refers to increase in concentration of the toxicant at successive trophic levels.",
                imageUrl: "", // No image for this question
                timeLimit: 60 // Added time limit for this question
            },
            {
                question: "Which one of the following common sexually transmitted diseases is completely curable when detected early and treated properly?",
                options: [
                "Genital herpes",
                "Gonorrhoea",
                "Hepatitis-B",
                "HIV Infection"
                ],
                answer: "Gonorrhoea",
                imageUrl: "", // No image for this question
                timeLimit: 60 // Added time limit for this question
            },
            {
                question: "Choose the correct answer from the options given below:",
                options: [
                "A-II, B-I, C-IV, D-III",
                "A-I, B-II, C-III, D-IV",
                "A-IV, B-III, C-II, D-I",
                "A-III, B-IV, C-I, D-II"
                ],
                answer: "A-II, B-I, C-IV, D-III",
                imageUrl: "9.png", // No image for this question
                timeLimit: 90 // Added time limit for this question
            },
            {
                question: "In the light of the above statements, choose the correct answer from the options given below:",
                options: [
                "Both A and R are true and R is the correct explanation of A.",
                "Both A and R are true but R is NOT the correct explanation of A.",
                "A is true but R is false.",
                "A is false but R is true."
                ],
                answer: "Both A and R are true and R is the correct explanation of A.",
                imageUrl: "10.png", // No image for this question
                timeLimit: 90 // Added time limit for this question
            },
            {
                question: "Choose the most appropriate answer from the options given below.",
                options: [
                "A and D only",
                "A and B only",
                "A, B and C only",
                "A, C and D only"
                ],
                answer: "A, C and D only",
                imageUrl: "11.png", // No image for this question
                timeLimit: 90 // Added time limit for this question
            },
            {
                question: "In which blood corpuscles, the HIV undergoes replication and produces progeny viruses?",
                options: [
                "TH cells",
                "Basophils",
                "Eosinophils",
                "B-lymphocytes"
                ],
                answer: "TH cells",
                imageUrl: "", // No image for this question
                timeLimit: 60 // Added time limit for this question
            },
            {
                question: "Which of the following is not a cloning vector?",
                options: [
                "BAC",
                "pBR322",
                "YAC",
                "Probe"
                ],
                answer: "Probe",
                imageUrl: "", // No image for this question
                timeLimit: 60 // Added time limit for this question
            },
            {
                question: "The unique mammalian characteristics are:",
                options: [
                "hairs, tympanic membrane and mammary glands",
                "hairs, pinna and mammary glands",
                "hairs, pinna and indirect development",
                "pinna, monocondylic skull and mammary glands"
                ],
                answer: "hairs, pinna and mammary glands",
                imageUrl: "", // No image for this question
                timeLimit: 60 // Added time limit for this question
            },
            {
                question: "The parts of human brain that helps in regulation of sexual behaviour, expression of excitement, pleasure, rage, fear etc. are:",
                options: [
                "Limbic system and hypothalamus",
                "Corpora quadrigemina and hippocampus",
                "Brain stem and epithalamus",
                "Corpus callosum and thalamus"
                ],
                answer: "Limbic system and hypothalamus",
                imageUrl: "", // No image for this question
                timeLimit: 60 // Added time limit for this question
            },
            {
                question: "Which of the following is characteristic feature of cockroach regarding sexual dimorphism?",
                options: [
                "Dark brown body colour and anal cerci",
                "Presence of anal styles",
                "Presence of sclerites",
                "Presence of anal cerci"
                ],
                answer: "Presence of anal styles",
                imageUrl: "", // No image for this question
                timeLimit: 60 // Added time limit for this question
            },
            {
                question: "Which one of the following is NOT an advantage of inbreeding?",
                options: [
                "It decreases homozygosity.",
                "It exposes harmful recessive genes but are eliminated by selection.",
                "Elimination of less desirable genes and accumulation of superior genes takes place due to it.",
                "It decreases the productivity of inbred population, after continuous inbreeding."
                ],
                answer: "It decreases the productivity of inbred population, after continuous inbreeding.",
                imageUrl: "", // No image for this question
                timeLimit: 60 // Added time limit for this question
            },
            {
                question: "If the galvanometer G does not show any deflection in the circuit shown, the value of R is given by",
                options: [
                "200 Ω",
                "100 Ω",
                "50 Ω",
                "400 Ω"
                ],
                answer: "100 Ω",
                imageUrl: "12.png", // No image for this question
                timeLimit: 180 // Added time limit for this question
            },
            {
                question: "A 12 V, 60 W lamp is connected to the secondary of a step-down transformer, whose primary is connected to ac mains of 220 V. Assuming the transformer to be ideal, what is the current in the primary winding?",
                options: [
                "0.27 A",
                "3.7 A",
                "2.7 A",
                "0.37 A"
                ],
                answer: "0.27 A",
                imageUrl: "", // No image for this question
                timeLimit: 180 // Added time limit for this question
            },
            {
                question: "The angular acceleration of a body, moving along the circumference of a circle, is",
                options: [
                "Along the radius, away from centre",
                "Along the tangent to its position",
                "Along the radius towards the centre",
                "Along the axis of rotation"
                ],
                answer: "Along the axis of rotation",
                imageUrl: "", // No image for this question
                timeLimit: 90 // Added time limit for this question
            },
            {
                question: "A vehicle travels half the distance with speed v and the remaining distance with speed 2v. Its average speed is",
                options: [
                "v/3",
                "4v/3",
                "2v/3",
                "3v/4"
                ],
                answer: "4v/3",
                imageUrl: "", // No image for this question
                timeLimit: 90 // Added time limit for this question
            },
            {
                question: "The net magnetic flux through any closed surface is",
                options: [
                "Zero",
                "Infinity",
                "Positive",
                "Negative"
                ],
                answer: "Zero",
                imageUrl: "", // No image for this question
                timeLimit: 60 // Added time limit for this question
            },
        ]
    },
    {
        id: "DBMS-quiz",
        name: "Database Management System (DBMS)",
        description: "Test on DBMS from ADCA",
        enabled: true, // to enable put as true or false
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
        enabled: true, // to enable put as true or false
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
        enabled: true, // to enable put as true or false
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
                    "Slide layouts"
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
        enabled: true, // to enable put as true or false
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
        id: "",
        name: "",
        description: "",
        enabled: false, // to enable put as true or false
        questions: [
            {
                question: "",
                options: [
                    "",
                    "",
                    "",
                    ""
                ],
                answer: "",
                imageUrl: "",
                timeLimit: 60
            },
        ]
        },
        {
        id: "",
        name: "",
        description: "",
        enabled: false, // to enable put as true or false
        questions: [
            {
                question: "",
                options: [
                    "",
                    "",
                    "",
                    ""
                ],
                answer: "",
                imageUrl: "",
                timeLimit: 60
            },
        ]
        },
];


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
    const previousQuizzes = JSON.parse(localStorage.getItem('previousQuizzes')) || [];
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
    quizzes.forEach(quiz => {
        const quizCard = document.createElement('div');
        quizCard.classList.add('quiz-card');
        quizCard.innerHTML = `
            <h3>${quiz.name}</h3>
            <p>${quiz.description}</p>
            <button class="start-quiz-card-btn" data-quiz-id="${quiz.id}">${quiz.enabled ? 'Start Quiz' : 'Disabled'}</button>
        `;
        const startButton = quizCard.querySelector('.start-quiz-card-btn');
        if (!quiz.enabled) {
            startButton.disabled = true; // Disable the button
            startButton.classList.add('disabled-button'); // Add a class for styling
            startButton.textContent = 'Quiz Disabled'; // Change button text
        } else {
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
    questionData.options.forEach((option, index) => {
        const optionDiv = document.createElement('div');
        optionDiv.classList.add('option');
        optionDiv.innerHTML = `<span class="option-label">${String.fromCharCode(65 + index)}.</span> <span class="option-text">${option}</span>`;
        optionDiv.dataset.option = option; // Store the option text
        optionDiv.addEventListener('click', () => selectOption(optionDiv, option));
        optionsContainer.appendChild(optionDiv);

        // Highlight selected option if already answered
        if (userAnswers[currentQuestionIndex] === option) {
            optionDiv.classList.add('selected');
        }
    });

    updateProgressBar();
    updateNavigationButtons();
    resetTimer(questionData.timeLimit);
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
        showInfoModal("Question skipped!");
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
    // Check if an option is selected for the current question
    if (userAnswers[currentQuestionIndex] === null) {
        showInfoModal("Please select an option or skip the question.");
        return; // Prevent advancing if no option is selected
    }

    if (currentQuestionIndex < currentQuiz.questions.length - 1) {
        currentQuestionIndex++;
        loadQuestion();
    } else {
        // If it's the last question, submit the quiz
        handleSubmitButtonClick();
    }
}

function handleSubmitButtonClick() {
    clearInterval(timerInterval); // Stop the timer when quiz is submitted
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
            // Automatically skip if time runs out and no answer is selected
            if (userAnswers[currentQuestionIndex] === null) {
                showInfoModal("Time's up! Question skipped.");
            } else {
                showInfoModal("Time's up!");
            }

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
    quizDetailsForDisplay = [];

    currentQuiz.questions.forEach((question, index) => {
        const userAnswer = userAnswers[index];
        const isCorrect = userAnswer === question.answer;

        if (userAnswer === null) {
            skippedQuestionsTotal++;
            quizDetailsForDisplay.push({
                question: question.question,
                userAnswer: "Skipped",
                correctAnswer: question.answer,
                isCorrect: false, // For display purposes, skipped is not correct
                skipped: true
            });
        } else if (isCorrect) {
            correctAnswersTotal++;
            quizDetailsForDisplay.push({
                question: question.question,
                userAnswer: userAnswer,
                correctAnswer: question.answer,
                isCorrect: true,
                skipped: false
            });
        } else {
            wrongAnswersTotal++;
            quizDetailsForDisplay.push({
                question: question.question,
                userAnswer: userAnswer,
                correctAnswer: question.answer,
                isCorrect: false,
                skipped: false
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

    // Add event listeners for final score buttons
    viewResultsButton.onclick = displayDetailedResults;
    returnToDashboardButton.onclick = goToDashboard;
}

function displayDetailedResults() {
    showQuizResultsDetailsSection();
    const resultsContainer = document.getElementById('quizResultsDetailsContainer');
    resultsContainer.innerHTML = ''; // Clear previous results

    quizDetailsForDisplay.forEach(detail => {
        const resultItem = document.createElement('div');
        resultItem.classList.add('result-item');
        if (detail.isCorrect) {
            resultItem.classList.add('correct');
        } else if (detail.skipped) {
            resultItem.classList.add('skipped');
        } else {
            resultItem.classList.add('wrong');
        }

        resultItem.innerHTML = `
            <p class="question-text-result">${detail.question}</p>
            <p>Your Answer: <span class="${detail.isCorrect ? 'correct-answer' : (detail.skipped ? 'user-answer' : 'user-answer')}">${detail.userAnswer}</span></p>
            <p>Correct Answer: <span class="correct-answer">${detail.correctAnswer}</span></p>
        `;
        resultsContainer.appendChild(resultItem);
    });

    document.getElementById('quizResultsBackButton').onclick = showFinalScoreSection;
}

// --- Local Storage for Previous Quizzes ---
function saveQuizResult() {
    const previousQuizzes = JSON.parse(localStorage.getItem('previousQuizzes')) || [];
    const now = new Date();
    const formattedDate = now.toLocaleString(); // e.g., "M/D/YYYY, H:MM:SS AM/PM"

    const result = {
        quizId: currentQuiz.id,
        quizName: currentQuiz.name,
        score: correctAnswersTotal,
        totalQuestions: currentQuiz.questions.length,
        percentage: ((correctAnswersTotal / currentQuiz.questions.length) * 100).toFixed(2),
        date: formattedDate,
        details: quizDetailsForDisplay
    };
    previousQuizzes.push(result);
    localStorage.setItem('previousQuizzes', JSON.stringify(previousQuizzes));
}

function loadPreviousQuizzes() {
    const previousQuizzes = JSON.parse(localStorage.getItem('previousQuizzes')) || [];
    const tableBody = document.getElementById('previousQuizzesTableBody');
    tableBody.innerHTML = ''; // Clear existing rows
    const noQuizzesMessage = document.getElementById('noPreviousQuizzesMessage');

    if (previousQuizzes.length === 0) {
        noQuizzesMessage.style.display = 'block';
        return;
    } else {
        noQuizzesMessage.style.display = 'none';
    }

    // Sort quizzes by date in descending order (most recent first)
    previousQuizzes.sort((a, b) => new Date(b.date) - new Date(a.date));

    previousQuizzes.forEach((result) => { // Removed 'index' as it's not used directly here
        const row = tableBody.insertRow();
        // Ensure properties exist before trying to access them
        row.insertCell(0).textContent = result.quizName || 'N/A'; // Quiz Name
        row.insertCell(1).textContent = `${result.score !== undefined ? result.score : 'N/A'}/${result.totalQuestions !== undefined ? result.totalQuestions : 'N/A'}`; // Score
        
        let displayPercentage = 'N/A';
        if (result.percentage !== undefined && result.percentage !== null && !isNaN(parseFloat(result.percentage))) {
            displayPercentage = `${parseFloat(result.percentage).toFixed(2)}%`;
        }
        row.insertCell(2).textContent = displayPercentage; // Percentage
        
        row.insertCell(3).textContent = result.date || 'N/A'; // Date/Time

        const actionsCell = row.insertCell(4);
        const viewButton = document.createElement('button');
        viewButton.textContent = 'View Details';
        viewButton.classList.add('view-details-btn');
        // Pass the entire result object to showQuizResultsDetails
        viewButton.onclick = () => showQuizResultsDetails(result); // Removed 'index' from here too as it's not needed by showQuizResultsDetails
        actionsCell.appendChild(viewButton);

        // --- Start of New Code for Delete Button ---
        const deleteButton = document.createElement('button');
        deleteButton.textContent = 'Delete';
        deleteButton.classList.add('delete-quiz-btn'); // Add a class for styling if needed
        deleteButton.onclick = () => deleteQuizResult(result.quizId, result.date);
        actionsCell.appendChild(deleteButton);
        // --- End of New Code for Delete Button ---
    });
}

// --- New function to delete a quiz result ---
function deleteQuizResult(quizIdToDelete, dateToDelete) {
    let previousQuizzes = JSON.parse(localStorage.getItem('previousQuizzes')) || [];
    
    // Filter out the quiz that matches both quizId and date
    const updatedQuizzes = previousQuizzes.filter(quiz => 
        !(quiz.quizId === quizIdToDelete && quiz.date === dateToDelete)
    );
    
    localStorage.setItem('previousQuizzes', JSON.stringify(updatedQuizzes));
    showInfoModal('Quiz result deleted successfully!');
    loadPreviousQuizzes(); // Reload the table to reflect the deletion
    updateDashboardInfo(); // Update dashboard info as total quizzes completed might change
}


function showQuizResultsDetails(result) { // Removed 'index' from parameters as it was unused
    showQuizResultsDetailsSection();
    const resultsContainer = document.getElementById('quizResultsDetailsContainer');
    resultsContainer.innerHTML = ''; // Clear previous results

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
        } else {
            resultItem.classList.add('wrong');
        }

        resultItem.innerHTML = `
            <p class="question-text-result">${detail.question}</p>
            <p>Your Answer: <span class="${detail.isCorrect ? 'correct-answer' : (detail.skipped ? 'user-answer' : 'user-answer')}">${detail.userAnswer}</span></p>
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
            <button class="start-quiz-card-btn" data-quiz-id="${quiz.id}">${quiz.enabled ? 'Start Quiz' : 'Disabled'}</button>
        `;
        const startButton = quizCard.querySelector('.start-quiz-card-btn');
        if (!quiz.enabled) {
            startButton.disabled = true; // Disable the button
            startButton.classList.add('disabled-button'); // Add a class for styling
            startButton.textContent = 'Quiz Disabled'; // Change button text
        } else {
            startButton.addEventListener('click', (e) => {
                const quizId = e.target.dataset.quizId;
                startQuiz(quizId);
            });
        }
        quizList.appendChild(quizCard);
    });
}