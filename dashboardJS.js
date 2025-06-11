const quizInfoBox = document.getElementById('quizInfoBox');
const quizContainer = document.getElementById('quizContainer');
const finalScoreContainer = document.getElementById('finalScoreContainer');
const quizResultsDetails = document.getElementById('quizResultsDetails'); // Detailed results container
const previousQuizzesContainer = document.getElementById('previousQuizzesContainer'); // Previous quizzes list

const startQuizButton = document.getElementById('startQuizButton');
const quizTitle = document.getElementById('quizTitle');
const questionText = document.getElementById('questionText');
const questionImage = document.getElementById('questionImage');
const optionsContainer = document.getElementById('optionsContainer');
const prevButton = document.getElementById('prevButton');
const skipButton = document.getElementById('skipButton');
// FIX: Corrected document.all to document.getElementById
const nextButton = document.getElementById('nextButton');
const submitButton = document.getElementById('submitButton');
const progressBar = document.getElementById('progressBar');
const timerDisplay = document.getElementById('timerDisplay'); // Timer display element

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
const welcomeMessageDiv = document.querySelector('.welcome-message'); // For initial login message
const totalQuizzesCompleted = document.getElementById('totalQuizzesCompleted'); // NEW ELEMENT

let currentQuiz = null;
let currentQuestionIndex = 0;
let userAnswers = [];
let correctAnswersTotal = 0;
let wrongAnswersTotal = 0;
let skippedQuestionsTotal = 0;
let quizDetailsForDisplay = []; // To store question, user answer, correct answer, and correctness

// Timer variables
let timeLeft = 0; // Initialize to 0, will be set when loading a question
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
    modal.style.display = 'flex'; // Make modal visible
    modal.classList.add('active'); // Add active class for CSS transitions

    okButton.onclick = () => {
        hideInfoModal();
    };
}

/**
 * Hides the custom information/alert modal.
 */
function hideInfoModal() {
    const modal = document.getElementById('infoModal');
    modal.classList.remove('active'); // Remove active class for CSS transitions
    setTimeout(() => {
        modal.style.display = 'none';
    }, 200); // This duration should match the CSS transition duration
}


// --- Authentication and Initial Load ---
document.addEventListener('DOMContentLoaded', (event) => {
    const loggedInUser = localStorage.getItem('loggedInUser');
    if (!loggedInUser) {
        window.location.href = "index.html"; // Redirect to login if not logged in
    } else {
        usernameDisplay.textContent = loggedInUser;
        welcomeHeading.textContent = `Welcome, ${loggedInUser}!`;

        // Show login success message only once per login session
        const hasShownLoginMessage = localStorage.getItem('hasShownLoginMessage');
        if (hasShownLoginMessage === 'false') {
            loginSuccessMessage.classList.add('show');
            localStorage.setItem('hasShownLoginMessage', 'true');
            setTimeout(() => {
                loginSuccessMessage.classList.remove('show');
            }, 3000);
        }
        goToDashboard(); // Show dashboard by default
    }
});

logoutLink.addEventListener('click', logout);
headerLogoutButton.addEventListener('click', logout);

function logout() {
    localStorage.removeItem('loggedInUser');
    localStorage.removeItem('hasShownLoginMessage'); // Clear this on logout
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
    showStartQuizSection();
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
        name: "NEET MCQ on BOTANY/ZOOLOGY",
        questions: [
            {
                question: "  In angiosperm, the haploid, diploid and triploid structures of a fertilized embryo sac sequentially are:",
                options: [
                "Synergids, Primary endosperm nucleus and zygote",
                "Antipodals, synergids, and primary endosperm nucleus",
                "Synergids, Zygote and Primary endosperm nucleus",
                "Synergids, antipodals and Polar nuclei"    ],
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
                "Active Transport"    ],
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
                "Wind pollinated plants"    ],
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
                "More than two genes affecting a single character"    ],
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
                "2, 4-D"    ],
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
                "Сo-extinctions"    ],
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
                "Bright orange colour"    ],
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
                "Copper"    ],
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
                "China rose, Petunia and Lemon"    ],
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
                "Diakinesis"    ],
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
                "780 nm"    ],
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
                "Wilkins and Franklin"    ],
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
                "G2 phase"    ],
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
                "Senescence"    ],
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
                "It breaks down when iodine reacts with it"    ],
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
                "Abscisic Acid"    ],
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
                "Statement I is incorrect but Statement II is correct"    ],
                answer: "Both Statement I and Statement II are correct",
                imageUrl: "1.png", // No image for this question
                timeLimit: 60 // Added time limit for this question
            },
            {
                question: "Identify the correct statements:",
                options: [
                "A, B, C only",
                "B, C, D only",
                "C, D, E only",
                "D, E, A only"    ],
                answer: "A, B, C only",
                imageUrl: "2.png", // No image for this question
                timeLimit: 60 // Added time limit for this question
            },
            {
                question: "The thickness of ozone in a column of air in the atmosphere is measured in terms of :",
                options: [
                "Dobson units",
                "Decameter",
                "Decibels",
                "Kilobase"    ],
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
                "A is false but R is true"    ],
                answer: "Both A and R are true and R is the correct explanation of A",
                imageUrl: "3.png", // No image for this question
                timeLimit: 60 // Added time limit for this question
            },
            {
                question: "Which of the following stages of meiosis involves division of centromere?",
                options: [
                "Metaphase I",
                "Anaphase II",
                "Metaphase II",
                "Telophase"    ],
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
                "18 ATP and 16 NADPH2"    ],
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
                "Statement I is incorrect but Statement II is true"    ],
                answer: "Statement I is incorrect but Statement II is true",
                imageUrl: "4.png", // No image for this question
                timeLimit: 60 // Added time limit for this question
            },
            {
                question: "In the light of the above statements, choose the correct answer from the options given below:",
                options: [
                "Both A and R are true and R is the correct explanation of A.",
                "Both A and R are true but R is NOT the correct explanation of A.",
                "A is true but R is false.",
                "A is false but R is true."    ],
                answer: "Both A and R are true and R is the correct explanation of A.",
                imageUrl: "5.png", // No image for this question
                timeLimit: 60 // Added time limit for this question
            },
            {
                question: "Choose the correct answer from the options given below:",
                options: [
                "A and B only",
                "C and D only",
                "B and E only",
                "A and E only"    ],
                answer: "B and E only",
                imageUrl: "6.png", // No image for this question
                timeLimit: 60 // Added time limit for this question
            },


        ]
    },
];

// --- Quiz Flow Functions ---
startQuizButton.addEventListener('click', startRandomQuiz);

function startRandomQuiz() {
    if (quizzes.length === 0) {
        showInfoModal("No quizzes available to start!"); // Replaced alert()
        return;
    }
    const randomIndex = Math.floor(Math.random() * quizzes.length);
    currentQuiz = quizzes[randomIndex];
    currentQuestionIndex = 0;
    userAnswers = Array(currentQuiz.questions.length).fill(null); // Initialize user answers with null
    correctAnswersTotal = 0;
    wrongAnswersTotal = 0;
    skippedQuestionsTotal = 0;
    quizDetailsForDisplay = []; // Clear previous quiz details

    quizInfoBox.style.display = 'none';
    finalScoreContainer.style.display = 'none';
    quizResultsDetails.style.display = 'none';
    previousQuizzesContainer.style.display = 'none';
    quizContainer.style.display = 'block';

    quizTitle.textContent = currentQuiz.name;
    loadQuestion();
    updateProgressBar();
}

function formatTime(totalSeconds) {
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = totalSeconds % 60;
    const formattedMinutes = String(minutes).padStart(2, '0');
    const formattedSeconds = String(seconds).padStart(2, '0');
    return `${formattedMinutes}m ${formattedSeconds}s`;
}

function startTimer() {
    clearInterval(timerInterval); // Clear any existing timer

    const question = currentQuiz.questions[currentQuestionIndex];
    timeLeft = question.timeLimit; // Set timeLeft to the current question's timeLimit

    // Initial update of display and class
    timerDisplay.textContent = `Time Left: ${formatTime(timeLeft)}`;
    timerDisplay.classList.remove('warning', 'critical');
    if (timeLeft <= 10 && timeLeft > 5) { // Example: Warning for last 10 seconds
        timerDisplay.classList.add('warning');
    } else if (timeLeft <= 5) { // Example: Critical for last 5 seconds
        timerDisplay.classList.add('critical');
    }


    timerInterval = setInterval(() => {
        timeLeft--;
        timerDisplay.textContent = `Time Left: ${formatTime(timeLeft)}`;

        // Update classes based on time left
        timerDisplay.classList.remove('warning', 'critical'); // Remove previous states
        if (timeLeft <= 10 && timeLeft > 5) { // Example: Warning for last 10 seconds
            timerDisplay.classList.add('warning');
        } else if (timeLeft <= 5) { // Example: Critical for last 5 seconds
            timerDisplay.classList.add('critical');
        }

        if (timeLeft <= 0) {
            clearInterval(timerInterval);
            // Automatically move to the next question or submit if it's the last one
            if (userAnswers[currentQuestionIndex] === null) {
                userAnswers[currentQuestionIndex] = "Time Out"; // Mark as time out
            }
            if (currentQuestionIndex < currentQuiz.questions.length - 1) {
                currentQuestionIndex++;
                loadQuestion();
                updateProgressBar();
            } else {
                submitQuiz();
            }
        }
    }, 1000);
}

function stopTimer() {
    clearInterval(timerInterval);
}


function loadQuestion() {
    stopTimer(); // Stop timer before loading new question
    const question = currentQuiz.questions[currentQuestionIndex];
    questionText.textContent = `${currentQuestionIndex + 1}. ${question.question}`; // MODIFIED LINE
    optionsContainer.innerHTML = ''; // Clear previous options

    if (question.imageUrl) {
        questionImage.src = question.imageUrl;
        questionImage.style.display = 'block';
    } else {
        questionImage.style.display = 'none';
    }

    // Array for option labels (a, b, c, d, ...)
    const optionLabels = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j'];

    question.options.forEach((option, index) => {
        const optionDiv = document.createElement('div');
        optionDiv.classList.add('option');

        // Create a span for the label (a, b, c, d)
        const labelSpan = document.createElement('span');
        labelSpan.classList.add('option-label');
        labelSpan.textContent = `${optionLabels[index]}. `;
        optionDiv.appendChild(labelSpan);

        // Create a span for the option text
        const optionTextSpan = document.createElement('span');
        optionTextSpan.classList.add('option-text');
        optionTextSpan.textContent = option;
        optionDiv.appendChild(optionTextSpan);

        optionDiv.addEventListener('click', () => selectOption(option));
        // If user has already answered this question, show their selection
        if (userAnswers[currentQuestionIndex] === option) {
            optionDiv.classList.add('selected');
        }
        optionsContainer.appendChild(optionDiv);
    });

    updateNavigationButtons();
    startTimer(); // Start timer for the new question
}

function selectOption(selectedOptionText) {
    // Timer should not stop when an option is selected.
    // stopTimer();
    const options = optionsContainer.querySelectorAll('.option');
    options.forEach((optionDiv) => {
        optionDiv.classList.remove('selected');
        // We now retrieve the text from the specific span for comparison
        const optionTextElement = optionDiv.querySelector('.option-text');
        if (optionTextElement && optionTextElement.textContent === selectedOptionText) {
            optionDiv.classList.add('selected');
            userAnswers[currentQuestionIndex] = selectedOptionText;
        }
    });
}

function updateNavigationButtons() {
    prevButton.disabled = currentQuestionIndex === 0;
    nextButton.style.display = currentQuestionIndex < currentQuiz.questions.length - 1 ? 'inline-block' : 'none';
    skipButton.style.display = currentQuestionIndex < currentQuiz.questions.length - 1 ? 'inline-block' : 'none';
    submitButton.style.display = currentQuestionIndex === currentQuiz.questions.length - 1 ? 'inline-block' : 'none';
}

nextButton.addEventListener('click', () => {
    stopTimer(); // Stop timer when moving to next question
    if (currentQuestionIndex < currentQuiz.questions.length - 1) {
        currentQuestionIndex++;
        loadQuestion();
        updateProgressBar();
    }
});

prevButton.addEventListener('click', () => {
    stopTimer(); // Stop timer when moving to previous question
    if (currentQuestionIndex > 0) {
        currentQuestionIndex--;
        loadQuestion();
        updateProgressBar();
    }
});

skipButton.addEventListener('click', () => {
    stopTimer(); // Stop timer when skipping
    if (userAnswers[currentQuestionIndex] === null) { // Only mark as skipped if not already answered/timed out
        userAnswers[currentQuestionIndex] = "Skipped"; // Mark as skipped
    }

    if (currentQuestionIndex < currentQuiz.questions.length - 1) {
        currentQuestionIndex++;
        loadQuestion();
        updateProgressBar();
    } else {
        // If skipped on the last question, submit
        submitQuiz();
    }
});

submitButton.addEventListener('click', () => {
    stopTimer(); // Stop timer on submit
    submitQuiz();
});

function updateProgressBar() {
    const progress = ((currentQuestionIndex + 1) / currentQuiz.questions.length) * 100;
    progressBar.style.width = `${progress}%`;
    progressBar.textContent = `${Math.round(progress)}%`;
}

function submitQuiz() {
    stopTimer(); // Ensure timer is stopped when quiz is submitted
    correctAnswersTotal = 0;
    wrongAnswersTotal = 0;
    skippedQuestionsTotal = 0;
    quizDetailsForDisplay = []; // Clear for new submission

    currentQuiz.questions.forEach((question, index) => {
        const userAnswer = userAnswers[index];
        const isCorrect = (userAnswer === question.answer);

        if (userAnswer === question.answer) {
            correctAnswersTotal++;
        } else if (userAnswer === "Skipped" || userAnswer === "Time Out") { // Account for "Time Out" as skipped
            skippedQuestionsTotal++;
        } else {
            wrongAnswersTotal++;
        }

        // Store detailed results, including options for robust display
        quizDetailsForDisplay.push({
            question: question.question,
            imageUrl: question.imageUrl,
            userAnswer: userAnswer || "Not Answered", // Handle cases where user might not select and not skip
            answer: question.answer,
            isCorrect: isCorrect,
            options: question.options // IMPORTANT: Store options here
        });
    });

    displayFinalScore();
    saveQuizResult();

    localStorage.setItem('quizJustCompleted', 'true');
    updateQuizInfoBox(); // Update dashboard with latest score
}

function displayFinalScore() {
    quizContainer.style.display = 'none';
    finalScoreContainer.style.display = 'block';
    quizResultsDetails.style.display = 'none';
    previousQuizzesContainer.style.display = 'none';
    quizInfoBox.style.display = 'none'; // Hide info box when showing score

    const totalQuestions = currentQuiz.questions.length;
    scoreDisplay.textContent = `${correctAnswersTotal} / ${totalQuestions}`;
    correctAnswersCount.textContent = correctAnswersTotal;
    wrongAnswersCount.textContent = wrongAnswersTotal;
    skippedQuestionsCount.textContent = skippedQuestionsTotal;

    const percentage = totalQuestions > 0 ? ((correctAnswersTotal / totalQuestions) * 100).toFixed(2) : 0;
    percentageScore.textContent = `${percentage}%`;
}

viewResultsButton.addEventListener('click', () => {
    // Pass false to indicate it's from the final score screen
    renderQuizResultsDetails(quizDetailsForDisplay, false);
    finalScoreContainer.style.display = 'none';
    quizResultsDetails.style.display = 'block';
});

// The redundant backToFinalScore function is removed as its logic is now within renderQuizResultsDetails

returnToDashboardButton.addEventListener('click', goToDashboard);

function saveQuizResult() {
    const loggedInUser = localStorage.getItem('loggedInUser');
    let quizResults = JSON.parse(localStorage.getItem('quizResults')) || [];

    const totalQuestions = currentQuiz.questions.length;
    const newResult = {
        user: loggedInUser,
        quizName: currentQuiz.name,
        score: `${correctAnswersTotal}/${totalQuestions}`,
        numericScore: correctAnswersTotal, // Store numeric score for calculations
        totalQuestions: totalQuestions, // Store total questions for percentage calculation
        wrongAnswers: wrongAnswersTotal,
        skippedQuestionsCount: skippedQuestionsTotal,
        timestamp: new Date().toLocaleString(), // Keep as is for now, will format later in display
        quizDetails: quizDetailsForDisplay // Store detailed answers
    };
    quizResults.push(newResult);
    localStorage.setItem('quizResults', JSON.stringify(quizResults));
}

function updateQuizInfoBox() {
    const loggedInUser = localStorage.getItem('loggedInUser');
    let quizResults = JSON.parse(localStorage.getItem('quizResults')) || [];
    const userQuizResults = quizResults.filter(result => result.user === loggedInUser);

    if (userQuizResults.length > 0) {
        const lastQuiz = userQuizResults[userQuizResults.length - 1];
        quizInfoHeading.textContent = "Your Last Quiz Score:";

        let percentage = 'N/A';
        if (lastQuiz.numericScore !== undefined && lastQuiz.totalQuestions !== undefined && lastQuiz.totalQuestions > 0) {
            percentage = ((lastQuiz.numericScore / lastQuiz.totalQuestions) * 100).toFixed(2) + '%';
        }

        lastQuizScoreDisplay.innerHTML = `<strong>${lastQuiz.quizName}:</strong> ${lastQuiz.score} (${percentage})`;
        lastQuizScoreDisplay.style.display = 'block';

        // NEW: Display total quizzes completed
        totalQuizzesCompleted.textContent = `Total Quizzes Completed: ${userQuizResults.length}`;
        totalQuizzesCompleted.style.display = 'block';
    } else {
        quizInfoHeading.textContent = "Welcome to the Quiz!";
        lastQuizScoreDisplay.style.display = 'none';
        totalQuizzesCompleted.style.display = 'none'; // Hide if no quizzes completed
    }
}

function goToDashboard() {
    stopTimer(); // Ensure timer is stopped when navigating away from quiz
    quizContainer.style.display = 'none';
    finalScoreContainer.style.display = 'none';
    quizResultsDetails.style.display = 'none';
    previousQuizzesContainer.style.display = 'none';

    quizInfoBox.style.display = 'block';
    welcomeMessageDiv.style.display = 'block';

    const quizJustCompleted = localStorage.getItem('quizJustCompleted');
    if (quizJustCompleted === 'true') {
        quizCompletedMessage.classList.add('show');
        localStorage.removeItem('quizJustCompleted');
        setTimeout(() => {
            quizCompletedMessage.classList.remove('show');
        }, 3000);
    }

    updateQuizInfoBox();
}

function showStartQuizSection() {
    stopTimer(); // Ensure timer is stopped when navigating to start quiz section
    quizContainer.style.display = 'none';
    finalScoreContainer.style.display = 'none';
    quizResultsDetails.style.display = 'none';
    previousQuizzesContainer.style.display = 'none';
    quizInfoBox.style.display = 'block'; // Show quiz info box to allow starting
}

function showPreviousQuizzesSection() {
    stopTimer(); // Ensure timer is stopped when navigating to previous quizzes
    quizContainer.style.display = 'none';
    finalScoreContainer.style.display = 'none';
    quizResultsDetails.style.display = 'none';
    quizInfoBox.style.display = 'none';
    previousQuizzesContainer.style.display = 'block';

    loadPreviousQuizzesTable();
}

function loadPreviousQuizzesTable() {
    const loggedInUser = localStorage.getItem('loggedInUser');
    let quizResults = JSON.parse(localStorage.getItem('quizResults')) || [];
    const userQuizResults = quizResults.filter(result => result.user === loggedInUser);

    const previousQuizzesTableBody = document.getElementById('previousQuizzesTableBody');
    const noPreviousQuizzesMessage = document.getElementById('noPreviousQuizzesMessage');
    previousQuizzesTableBody.innerHTML = ''; // Clear existing rows

    if (userQuizResults.length === 0) {
        noPreviousQuizzesMessage.style.display = 'block';
        return;
    } else {
        noPreviousQuizzesMessage.style.display = 'none';
    }

    userQuizResults.forEach((result, index) => {
        const row = previousQuizzesTableBody.insertRow();
        row.insertCell(0).textContent = result.quizName || 'N/A';
        row.insertCell(1).textContent = result.score;

        let percentage = 'N/A';
        if (result.numericScore !== undefined && result.totalQuestions !== undefined && result.totalQuestions > 0) {
            percentage = ((result.numericScore / result.totalQuestions) * 100).toFixed(2) + '%';
        }
        row.insertCell(2).textContent = percentage;

        // Format the Date/Time for previous quizzes table
        let displayDateTime = 'N/A';
        if (result.timestamp) {
            const date = new Date(result.timestamp); // Attempt to parse the timestamp string
            if (!isNaN(date.getTime())) { // Check if the parsed date is valid
                const day = String(date.getDate()).padStart(2, '0');
                const month = String(date.getMonth() + 1).padStart(2, '0'); // Month is 0-indexed
                const year = date.getFullYear();
                const hours = String(date.getHours()).padStart(2, '0');
                const minutes = String(date.getMinutes()).padStart(2, '0');
                const seconds = String(date.getSeconds()).padStart(2, '0');
                displayDateTime = `${day}/${month}/${year}, ${hours}:${minutes}:${seconds}`;
            } else {
                console.warn("Could not parse timestamp in previous quizzes table:", result.timestamp);
                displayDateTime = result.timestamp; // Fallback to original string
            }
        }
        row.insertCell(3).textContent = displayDateTime;

        const actionsCell = row.insertCell(4);
        const viewDetailsButton = document.createElement('button');
        viewDetailsButton.textContent = 'View Details';
        viewDetailsButton.className = 'previous-quiz-view-btn'; // Apply new styling
        viewDetailsButton.onclick = function() {
            // Pass true to indicate it's from the previous quizzes screen
            renderQuizResultsDetails(result.quizDetails, true);
            previousQuizzesContainer.style.display = 'none';
            quizResultsDetails.style.display = 'block';
        };
        actionsCell.appendChild(viewDetailsButton);
    });
}

// Function to render detailed quiz results (used by both final score and previous quizzes)
function renderQuizResultsDetails(dataToRender, fromPreviousQuizzes = false) { // Added a flag
    const quizResultsDetailsContainer = document.getElementById('quizResultsDetails');
    // Clear previous content, but keep the H3 and Back button
    const existingH3 = quizResultsDetailsContainer.querySelector('h3');
    const existingBackButton = quizResultsDetailsContainer.querySelector('.back-to-score-btn');

    // Remove existing event listeners to prevent multiple bindings
    existingBackButton.onclick = null; // Clear existing handler

    quizResultsDetailsContainer.innerHTML = ''; // Clear all content
    quizResultsDetailsContainer.appendChild(existingH3); // Re-add H3

    // Array for option labels (a, b, c, d, ...) for detailed results
    const optionLabels = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j'];

    if (!dataToRender || dataToRender.length === 0) {
        const noDetailsP = document.createElement('p');
        noDetailsP.textContent = 'No detailed results available for this submission.';
        quizResultsDetailsContainer.appendChild(noDetailsP);
    } else {
        dataToRender.forEach((q, index) => {
            const resultItem = document.createElement('div');
            resultItem.classList.add('result-item');

            const questionP = document.createElement('p');
            questionP.classList.add('question');
            questionP.textContent = `${index + 1}. ${q.question}`;
            resultItem.appendChild(questionP);

            if (q.imageUrl) {
                const questionImage = document.createElement('img');
                questionImage.src = q.imageUrl;
                questionImage.alt = "Question Image";
                questionImage.classList.add('question-image');
                resultItem.appendChild(questionImage);
            }

            const yourAnswerP = document.createElement('p');
            // Use q.options to get the label if available
            let userAnswerWithLabel = q.userAnswer;
            if (q.options && q.userAnswer !== "Skipped" && q.userAnswer !== "Time Out" && q.userAnswer !== "Not Answered") {
                const userAnswerIndex = q.options.indexOf(q.userAnswer);
                if (userAnswerIndex !== -1) {
                    userAnswerWithLabel = `${optionLabels[userAnswerIndex]}. ${q.userAnswer}`;
                }
            }
            yourAnswerP.textContent = `Your Answer: ${userAnswerWithLabel}`;
            if (q.isCorrect === true) {
                yourAnswerP.classList.add('your-answer', 'correct');
            } else if (q.userAnswer === "Skipped" || q.userAnswer === "Time Out") {
                yourAnswerP.classList.add('your-answer', 'skipped');
            } else {
                yourAnswerP.classList.add('your-answer');
            }
            resultItem.appendChild(yourAnswerP);

            if (q.isCorrect === false || q.userAnswer === "Skipped" || q.userAnswer === "Time Out") {
                const correctAnswerP = document.createElement('p');
                correctAnswerP.classList.add('correct-answer');

                // Find the index of the correct answer in the stored options to get its label
                let correctAnswerWithLabel = q.answer;
                if (q.options) {
                    const correctAnswerIndex = q.options.indexOf(q.answer);
                    if (correctAnswerIndex !== -1) {
                        correctAnswerWithLabel = `${optionLabels[correctAnswerIndex]}. ${q.answer}`;
                    }
                }
                correctAnswerP.textContent = `Correct Answer: ${correctAnswerWithLabel}`;
                resultItem.appendChild(correctAnswerP);
            }

            quizResultsDetailsContainer.appendChild(resultItem);
        });
    }

    quizResultsDetailsContainer.appendChild(existingBackButton); // Re-add Back button at the end

    // Set the correct onclick handler based on where it came from
    if (fromPreviousQuizzes) {
        existingBackButton.textContent = 'Back to Previous Quizzes';
        existingBackButton.onclick = function() {
            quizResultsDetails.style.display = 'none';
            previousQuizzesContainer.style.display = 'block';
        };
    } else {
        existingBackButton.textContent = 'Back to Score';
        existingBackButton.onclick = function() {
            quizResultsDetails.style.display = 'none';
            finalScoreContainer.style.display = 'block';
        };
    }
}

// Initial setup: Hide specific quiz sections on load
quizContainer.style.display = 'none';
finalScoreContainer.style.display = 'none';
quizResultsDetails.style.display = 'none';
previousQuizzesContainer.style.display = 'none';
quizInfoBox.style.display = 'block';
updateProgressBar();
updateQuizInfoBox();