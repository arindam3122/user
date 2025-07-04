// Add this helper function somewhere in your dashboardJS.js file, for example, near other helper functions.
/**
 * Converts seconds into a formatted string "MM min : SS sec".
 * @param {number} totalSeconds - The total number of seconds.
 * @returns {string} Formatted time string (e.g., "01 min : 30 sec" for 90 seconds).
 */
function formatTime(totalSeconds) {
    if (totalSeconds === undefined || totalSeconds === null || isNaN(totalSeconds)) {
        return 'N/A';
    }
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = totalSeconds % 60;
    const formattedMinutes = String(minutes).padStart(2, 0);
    const formattedSeconds = String(seconds).padStart(2, 0);
    return `${formattedMinutes} min : ${formattedSeconds} sec`;
}

const quizInfoBox = document.getElementById('quizInfoBox');
const quizContainer = document.getElementById('quizContainer');
const finalScoreContainer = document.getElementById('finalScoreContainer');
const quizResultsDetails = document.getElementById('quizResultsDetails');
const previousQuizzesContainer = document.getElementById('previousQuizzesContainer');
const quizSelectionContainer = document.getElementById('quizSelectionContainer');
const quizList = document.getElementById('quizList');

const quizTitle = document.getElementById('quizTitle');
const questionText = document.getElementById('questionText');
const questionImage = document.getElementById('questionImage');
const optionsContainer = document.getElementById('optionsContainer');
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
const totalQuizzesCompleted = document.getElementById('totalQuizzesCompleted');

// Add these new const declarations for the summary elements
const summaryCorrect = document.getElementById('summaryCorrect');
const summaryWrong = document.getElementById('summaryWrong');
const summarySkipped = document.getElementById('summarySkipped');
const summaryTimeUp = document.getElementById('summaryTimeUp'); // New element
const summaryTotalQuestions = document.getElementById('summaryTotalQuestions');
const ADMIN_USERS = ['Arindam Mitra', ]; // Add usernames for delete button activation

// Hamburger menu elements
const hamburgerMenu = document.getElementById('hamburgerMenu');
const sidebar = document.getElementById('sidebar');
const sidebarOverlay = document.getElementById('sidebarOverlay');


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
let initialTimeLimit = 0; // Store the initial time limit for the current question

// --- New variables for time tracking per question ---
let questionStartTime; // Stores the Date.now() when a question is loaded
let questionTimesTaken = []; // Array to store time taken for each question in seconds

// Anti-cheating variables
let quizActive = false; // Flag to indicate if a quiz is currently active
let tabSwitchCount = 0; // Tracks how many times the user switched tabs
const MAX_TAB_SWITCHES = 3; // Maximum allowed tab switches before quiz auto-submits

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

    // Optionally disable OK button for critical warnings, or make it auto-hide
    // For this anti-cheat, we want them to acknowledge.
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


// --- Anti-cheating Logic: Tab Switching Detection ---

document.addEventListener('visibilitychange', () => {
    if (quizActive) {
        if (document.hidden) {
            // User switched tab or minimized window
            // No clearInterval here, timer continues
            tabSwitchCount++;
            if (tabSwitchCount <= MAX_TAB_SWITCHES) {
                showInfoModal(`Warning: You switched tabs! This is considered cheating. ${MAX_TAB_SWITCHES - tabSwitchCount} warnings remaining before quiz auto-submits.`);
            } else {
                showInfoModal("Too many tab switches detected! Your quiz will now be submitted automatically.");
                handleSubmitButtonClick(); // Auto-submit quiz
            }
        } else {
            // User switched back to the quiz tab
            hideInfoModal(); // Hide any cheating warning
            // No startTimer here, timer never stopped
        }
    }
});

// Also listen for window blur/focus events for broader detection (e.g., clicking outside the browser)
window.addEventListener('blur', () => {
    if (quizActive && !document.hidden) { // Only trigger if not already handled by visibilitychange (e.g., minimizing)
        // No clearInterval here, timer continues
        tabSwitchCount++;
        if (tabSwitchCount <= MAX_TAB_SWITCHES) {
            showInfoModal(`Warning: You left the quiz window! This is considered cheating. ${MAX_TAB_SWITCHES - tabSwitchCount} warnings remaining before quiz auto-submits.`);
        } else {
            showInfoModal("Too many unauthorized window changes detected! Your quiz will now be submitted automatically.");
            handleSubmitButtonClick(); // Auto-submit quiz
        }
    }
});

window.addEventListener('focus', () => {
    if (quizActive && !document.hidden) { // Only trigger if not already handled by visibilitychange
        hideInfoModal(); // Hide any cheating warning
        // No startTimer here, timer never stopped
    }
});


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
    closeSidebar(); // Close sidebar on navigation
});

startQuizLink.addEventListener('click', (e) => {
    e.preventDefault();
    setActiveLink(startQuizLink);
    showQuizSelection();
    closeSidebar(); // Close sidebar on navigation
});

previousQuizzesLink.addEventListener('click', (e) => {
    e.preventDefault();
    setActiveLink(previousQuizzesLink);
    showPreviousQuizzesSection();
    closeSidebar(); // Close sidebar on navigation
});

function setActiveLink(activeLink) {
    document.querySelectorAll('nav ul li a').forEach(link => {
        link.classList.remove('active');
    });
    activeLink.classList.add('active');
}

// --- Hamburger Menu Logic ---
hamburgerMenu.addEventListener('click', () => {
    document.body.classList.toggle('sidebar-active');
});

sidebarOverlay.addEventListener('click', () => {
    closeSidebar();
});

function closeSidebar() {
    document.body.classList.remove('sidebar-active');
}


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
    quizActive = false; // Ensure quiz is marked as inactive when going to dashboard
    tabSwitchCount = 0; // Reset tab switch count
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

    // get user and previous quiz data once
    const loggedInUser = localStorage.getItem('loggedInUser');
    const userKey = `previousQuizzes_${loggedInUser}`;
    const previousQuizzes = JSON.parse(localStorage.getItem(userKey)) || [];

    // Separate enabled and disabled quizzes
    const enabledQuizzes = quizzes.filter(quiz => quiz.enabled);
    const disabledQuizzes = quizzes.filter(quiz => !quiz.enabled);

    const sortedQuizzes = [...enabledQuizzes, ...disabledQuizzes];

    sortedQuizzes.forEach(quiz => {
        const quizCard = document.createElement('div');
        quizCard.classList.add('quiz-card');

        quizCard.innerHTML = `
            <h3>${quiz.name}</h3>
            <p>${quiz.description}</p>
            <button class="start-quiz-card-btn" data-quiz-id="${quiz.id}"></button>
        `;

        const startButton = quizCard.querySelector('.start-quiz-card-btn');

        // check if user has already attempted this quiz
        const alreadyAttempted = previousQuizzes.find(q => q.quizId === quiz.id);

        if (!quiz.enabled) {
            startButton.disabled = true;
            startButton.classList.add('disabled-button');
            startButton.textContent = 'Quiz Disabled';
        } else if (alreadyAttempted) {
            startButton.disabled = true;
            startButton.classList.add('disabled-button');
            startButton.textContent = 'Already Attempted';
        } else {
            startButton.innerHTML = 'Start Quiz <i class="fas fa-arrow-right"></i>';
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

    if (!currentQuiz.enabled) {
        showInfoModal('This quiz is currently disabled and cannot be started.');
        return;
    }

    // ✅ check if user has already attempted this quiz
    const loggedInUser = localStorage.getItem('loggedInUser');
    const userKey = `previousQuizzes_${loggedInUser}`;
    const previousQuizzes = JSON.parse(localStorage.getItem(userKey)) || [];
    const alreadyAttempted = previousQuizzes.find(q => q.quizId === quizId);

    if (alreadyAttempted) {
        showInfoModal('You have already attempted this quiz. Only one attempt is allowed.');
        return;
    }

    // continue with the quiz as normal:
    currentQuestionIndex = 0;
    userAnswers = new Array(currentQuiz.questions.length).fill(null);
    questionTimesTaken = new Array(currentQuiz.questions.length).fill(0); // Initialize time taken array
    correctAnswersTotal = 0;
    wrongAnswersTotal = 0;
    skippedQuestionsTotal = 0;
    quizDetailsForDisplay = [];
    tabSwitchCount = 0;
    quizActive = true;

    showQuizSection();
    loadQuestion();
    // Timer starts inside loadQuestion via resetTimer

    // prevButton.removeEventListener('click', handlePrevButtonClick); // Removed as previous button is removed
    skipButton.removeEventListener('click', handleSkipButtonClick);
    nextButton.removeEventListener('click', handleNextButtonClick);
    submitButton.removeEventListener('click', handleSubmitButtonClick);

    // prevButton.addEventListener('click', handlePrevButtonClick); // Removed as previous button is removed
    skipButton.addEventListener('click', handleSkipButtonClick);
    nextButton.addEventListener('click', handleNextButtonClick);
    submitButton.addEventListener('click', handleSubmitButtonClick);
}


function selectOption(selectedOptionDiv, optionText) {
    // Remove 'selected' class from all options first
    document.querySelectorAll('.option').forEach(opt => {
        opt.classList.remove('selected');
    });
    // Add 'selected' class to the clicked option
    selectedOptionDiv.classList.add('selected');
    userAnswers[currentQuestionIndex] = optionText;
    // Time taken will be recorded when navigating away from the question
}

// Helper function to update time taken for the current question before moving
function updateTimeTakenBeforeMoving() {
    if (currentQuestionIndex >= 0 && currentQuestionIndex < currentQuiz.questions.length) {
        if (questionStartTime) { // Ensure questionStartTime was set
            const timeElapsed = Math.round((new Date().getTime() - questionStartTime) / 1000); // Time in seconds
            questionTimesTaken[currentQuestionIndex] = timeElapsed; // Store time taken
        }
    }
}

/*
// Removed as previous button is removed
function handlePrevButtonClick() {
    if (currentQuestionIndex > 0) {
        updateTimeTakenBeforeMoving(); // Record time for the question just left
        currentQuestionIndex--;
        loadQuestion();
    }
}
*/

function handleSkipButtonClick() {
    // If the user has selected an answer, they cannot skip.
    // If no answer is selected, mark as skipped.
    if (userAnswers[currentQuestionIndex] === null) {
        updateTimeTakenBeforeMoving(); // Record time for this skipped question
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

    updateTimeTakenBeforeMoving(); // Record time for the question just left

    if (currentQuestionIndex < currentQuiz.questions.length - 1) {
        currentQuestionIndex++;
        loadQuestion();
    } else {
        handleSubmitButtonClick();
    }
}

function handleSubmitButtonClick() {
    updateTimeTakenBeforeMoving(); // Ensure time for the last question is recorded

    clearInterval(timerInterval); // Stop the timer when quiz is submitted
    if (timeUpMessageTimeout) { // Clear any pending time-up message timeout
        clearTimeout(timeUpMessageTimeout);
        const timeUpMessageElement = document.getElementById('timeUpMessage');
        if (timeUpMessageElement) {
            timeUpMessageElement.classList.remove('show');
        }
    }
    quizActive = false; // Quiz is no longer active
    tabSwitchCount = 0; // Reset tab switch count
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
    // prevButton.style.display = currentQuestionIndex === 0 ? 'none' : 'inline-flex'; // Removed
    nextButton.style.display = currentQuestionIndex === currentQuiz.questions.length - 1 ? 'none' : 'inline-flex';
    submitButton.style.display = currentQuestionIndex === currentQuiz.questions.length - 1 ? 'inline-flex' : 'none';
    skipButton.style.display = 'inline-flex'; // Always show skip button
}


// --- Timer Logic ---
function startTimer() {
    clearInterval(timerInterval); // Clear any existing timer
    const questionTimeLimit = currentQuiz.questions[currentQuestionIndex].timeLimit;
    timeLeft = questionTimeLimit;
    initialTimeLimit = questionTimeLimit; // Store initial time limit
    updateTimerDisplay(); // Initial display

    timerInterval = setInterval(() => {
        timeLeft--;
        updateTimerDisplay(); // Update display every second
        if (timeLeft <= 0) {
            clearInterval(timerInterval);
            // If time runs out, mark the answer as 'Time_Up_Auto_Answer'
            if (userAnswers[currentQuestionIndex] === null) {
                userAnswers[currentQuestionIndex] = "Time_Up_Auto_Answer"; // Use a unique string to mark 'time up'
                questionTimesTaken[currentQuestionIndex] = questionTimeLimit; // Time taken is the full limit
                showTimeUpMessage(); // Display temporary time-up message
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

        // Remove previous alert classes
        timerDisplay.classList.remove('timer-warning', 'timer-critical');

        // Add new alert classes based on remaining time
        if (timeLeft <= initialTimeLimit * 0.25) { // Last 25% of the time
            timerDisplay.classList.add('timer-critical');
        } else if (timeLeft <= initialTimeLimit * 0.5) { // Last 50% of the time
            timerDisplay.classList.add('timer-warning');
        }
    }
}

function resetTimer(timeLimit) {
    clearInterval(timerInterval); // Clear the current interval before setting a new one
    timeLeft = timeLimit;
    initialTimeLimit = timeLimit; // Store initial time limit
    updateTimerDisplay(); // Initial display after reset
    // The timer should always start when a question is loaded if the quiz is active
    if (quizActive) {
        startTimer();
    }
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
        const timeSpent = questionTimesTaken[index] !== undefined ? questionTimesTaken[index] : 0; // Get time spent

        // Common properties for quizDetailsForDisplay
        const commonDetails = {
            question: question.question,
            correctAnswer: question.answer,
            timeTaken: timeSpent,
            imageUrl: question.imageUrl || null // Add imageUrl here
        };

        if (userAnswer === null) {
            skippedQuestionsTotal++;
            quizDetailsForDisplay.push({
                ...commonDetails,
                userAnswer: "Skipped",
                isCorrect: false,
                skipped: true,
                timeUp: false
            });
        } else if (userAnswer === "Time_Up_Auto_Answer") {
            timeUpQuestionsTotal++;
            quizDetailsForDisplay.push({
                ...commonDetails,
                userAnswer: "Time's Up",
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
                ...commonDetails,
                userAnswer: userAnswer,
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

        let imageHtml = ''; // Initialize imageHtml
        // Check if imageUrl exists and add the image tag
        if (detail.imageUrl) {
            imageHtml = `<img src="${detail.imageUrl}" alt="Question Image" class="question-result-image">`;
        }

        resultItem.innerHTML = `
            <p class="question-text-result">${detail.question}</p>
            ${imageHtml} <p>Your Answer: <span class="${detail.isCorrect ? 'correct-answer' : (detail.skipped ? 'user-answer' : (detail.timeUp ? 'time-up-answer' : 'user-answer'))}">${detail.userAnswer}</span></p>
            <p>Correct Answer: <span class="correct-answer">${detail.correctAnswer}</span></p>
            <p>Time Taken: <span>${formatTime(detail.timeTaken)}</span></p>`; // Use formatTime helper
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

    // Format time as hour:min:sec AM/PM
    let hours = now.getHours();
    const minutes = String(now.getMinutes()).padStart(2, '0');
    const seconds = String(now.getSeconds()).padStart(2, '0');
    const ampm = hours >= 12 ? 'PM' : 'AM';
    hours = hours % 12;
    hours = hours ? hours : 12; // The hour '0' should be '12'
    const formattedHours = String(hours).padStart(2, '0'); // Ensure two digits for hour

    const formattedDate = `${day}/${month}/${year} ${formattedHours}:${minutes}:${seconds} ${ampm}`;

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

    // Check if the current logged-in user is an admin
    const isCurrentUserAdmin = ADMIN_USERS.includes(loggedInUser); //

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

        // Delete button - Only append if the current user is an admin
        if (isCurrentUserAdmin) { //
            const deleteButton = document.createElement('button');
            deleteButton.innerHTML = '<i class="fas fa-trash-alt"></i> Delete';
            deleteButton.classList.add('delete-quiz-btn');
            deleteButton.onclick = () => deleteQuizResult(result.quizId, result.date);
            actionsCell.appendChild(deleteButton);
        }

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
    doc.text("📘 Quiz Response Report", pageWidth / 2, y, {
        align: "center"
    });
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

            // Add image if available
            if (item.imageUrl) {
                try {
                    const img = new Image();
                    img.src = item.imageUrl;
                    // Calculate aspect ratio and fit to max width/height
                    const imgWidth = img.naturalWidth;
                    const imgHeight = img.naturalHeight;
                    const aspectRatio = imgWidth / imgHeight;

                    const maxWidth = maxLineWidth - 10; // Give some padding
                    let scaledWidth = maxWidth;
                    let scaledHeight = scaledWidth / aspectRatio;

                    // If scaled height is too much for remaining page, scale down
                    if (y + scaledHeight + 10 > doc.internal.pageSize.getHeight()) {
                        doc.addPage();
                        y = 20;
                    }

                    // Add the image to the PDF
                    doc.addImage(img.src, 'JPEG', marginLeft + 5, y, scaledWidth, scaledHeight);
                    y += scaledHeight + 5; // Add some space after the image
                } catch (e) {
                    console.error("Error loading or adding image to PDF:", e);
                    doc.setTextColor(200, 0, 0);
                    doc.text(" (Image could not be loaded)", marginLeft + 5, y);
                    y += lineSpacing;
                }
            }


            // User Answer
            doc.setFont("helvetica", "normal");
            doc.setFontSize(11);
            let userAnswerColor;
            if (item.userAnswer === item.correctAnswer) {
                userAnswerColor = [0, 150, 0]; // Green
            } else if (!item.userAnswer || item.userAnswer === "" || item.skipped || item.timeUp) { // Handle skipped/timeup for color
                userAnswerColor = [200, 100, 0]; // Orange for unanswered/skipped/time-up
            } else {
                userAnswerColor = [200, 0, 0]; // Red
            }
            doc.setTextColor(...userAnswerColor);
            doc.text("Your Answer:", marginLeft + 5, y);
            y += lineSpacing;

            const wrappedUserAnswer = doc.splitTextToSize(item.userAnswer || "Skipped", maxLineWidth - 5);
            doc.text(wrappedUserAnswer, marginLeft + 10, y);
            y += lineSpacing * wrappedUserAnswer.length;

            // Correct Answer
            doc.setTextColor(0, 150, 0);
            doc.text("Correct Answer:", marginLeft + 5, y);
            y += lineSpacing;

            const wrappedCorrectAnswer = doc.splitTextToSize(item.correctAnswer || "N/A", maxLineWidth - 5);
            doc.text(wrappedCorrectAnswer, marginLeft + 10, y);
            y += lineSpacing * wrappedCorrectAnswer.length;

            // Time Taken - MODIFIED LINE HERE
            doc.setTextColor(50, 50, 50); // Gray for time taken
            doc.text("Time Taken:", marginLeft + 5, y);
            y += lineSpacing;
            doc.text(`${formatTime(item.timeTaken)}`, marginLeft + 10, y); // Use formatTime helper
            y += lineSpacing;


            // Divider line
            doc.setDrawColor(180);
            doc.line(marginLeft, y, pageWidth - marginLeft, y);
            y += lineSpacing;

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

    // Show a modal after saving
    showInfoModal(`✅ Download completed. Please check your browser's default downloads folder for "${fileName}".`);
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

    if (questionData.type === 'input') {
        const inputField = document.createElement('textarea'); // Changed from 'input' to 'textarea'
        // inputField.type = 'text'; // Remove this line, as textarea doesn't have a type attribute
        inputField.classList.add('input-answer-field');
        inputField.placeholder = 'Type your answer here...';
        inputField.value = userAnswers[currentQuestionIndex] || '';
        inputField.rows = 1; // Set an initial number of rows for visibility
        inputField.spellcheck = true; // Enable spellcheck for longer text

        inputField.addEventListener('input', () => {
            userAnswers[currentQuestionIndex] = inputField.value;
            // Optional: Auto-adjust height based on content
            inputField.style.height = 'auto';
            inputField.style.height = (inputField.scrollHeight) + 'px';
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
    questionStartTime = new Date().getTime(); // Set start time for the current question
    resetTimer(questionData.timeLimit);
}

function showQuizResultsDetails(result) {
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

        let imageHtml = ''; // Initialize imageHtml
        // Check if imageUrl exists and add the image tag
        if (detail.imageUrl) {
            imageHtml = `<img src="${detail.imageUrl}" alt="Question Image" class="question-result-image">`;
        }

        resultItem.innerHTML = `
            <p class="question-text-result">${detail.question}</p>
            ${imageHtml} <p>Your Answer: <span class="${detail.isCorrect ? 'correct-answer' : (detail.skipped ? 'user-answer' : (detail.timeUp ? 'time-up-answer' : 'user-answer'))}">${detail.userAnswer}</span></p>
            <p>Correct Answer: <span class="correct-answer">${detail.correctAnswer}</span></p>
            <p>Time Taken: <span>${formatTime(detail.timeTaken)}</span></p>`; // Use formatTime helper
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