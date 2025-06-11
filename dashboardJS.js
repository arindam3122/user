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
        name: "Class 12 Biomolecules MCQs",
        questions: [
            {
                question: "A disaccharide is formed when two monosaccharides are bonded together by a bond.",
                options: [
                "glycosidic",
                "peptide",
                "ionic",
                "phosphodiester"    ],
                answer: "glycosidic",
                imageUrl: "", // No image for this question
                timeLimit: 90 // Added time limit for this question
            },
            {
                question: "Sucrose is a _____ chemical, and the hydrolysis product combination is ______in nature.",
                options: [
                "dextrorotatory; dextrorotatory",
                "laevorotatory; laevorotatory",
                "laevorotatory; dextrorotatory",
                "dextrorotatory; laevorotatory"    ],
                answer: "dextrorotatory; laevorotatory",
                imageUrl: "", // No image for this question
                timeLimit: 90 // Added time limit for this question
            },
            {
                question: "Which of the following statements about maltose is incorrect?",
                options: [
                "It consists of two glucopyranose units",
                "It is a disaccharide",
                "Glycosidic bond between C1 of one unit and C4 of the other unit",
                "It is a non-reducing sugar"    ],
                answer: "It is a non-reducing sugar",
                imageUrl: "", // No image for this question
                timeLimit: 90 // Added time limit for this question
            },
            {
                question: "Which of the following statements about starch is incorrect?",
                options: [
                "It gives blue colour with iodine",
                "It is a polymer of α-D-glucose",
                "It is a reducing carbohydrate",
                "It consists of branched chains"    ],
                answer: "It is a reducing carbohydrate",
                imageUrl: "", // No image for this question
                timeLimit: 90 // Added time limit for this question
            },
            {
                question: "RNA lacks the nitrogen base of _______",
                options: [
                "Thymine",
                "Cytosine",
                "Uracil",
                "Adenine"    ],
                answer: "Thymine",
                imageUrl: "", // No image for this question
                timeLimit: 90 // Added time limit for this question
            },
            {
                question: "Lysine is an example of a polar but uncharged amino acid,",
                options: [
                "Serine",
                "Aspartate",
                "Lysine",
                "Arginine"    ],
                answer: "Serine",
                imageUrl: "", // No image for this question
                timeLimit: 90 // Added time limit for this question
            },
            {
                question: "Which of the following chemical classes does not belong to the vast group of carbohydrates?",
                options: [
                "Polyhydroxy ketones",
                "Polyhalo aldehydes",
                "Polyamino aldehydes",
                " Polyhydroxy carboxylic acids"    ],
                answer: "Polyhydroxy ketones",
                imageUrl: "", // No image for this question
                timeLimit: 90 // Added time limit for this question
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