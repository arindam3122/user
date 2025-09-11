// dashboardJS.js

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
const createQuizLink = document.getElementById('createQuizLink');
const createQuizContainer = document.getElementById('createQuizContainer');
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
const quizCompletedMessage = document.getElementById('quizCompletedMessage');
const quizInfoHeading = document.getElementById('quizInfoHeading');
const lastQuizScoreDisplay = document.getElementById('lastQuizScoreDisplay');
const totalQuizzesCompleted = document.getElementById('totalQuizzesCompleted');
const viewRecentQuizDetailsButton = document.getElementById('viewRecentQuizDetailsButton');
const performanceTrendsLink = document.getElementById('performanceTrendsLink');
const performanceTrendsContainer = document.getElementById('performanceTrendsContainer');
const archivedQuizzesLink = document.getElementById('archivedQuizzesLink');
const archivedQuizzesContainer = document.getElementById('archivedQuizzesContainer');

// Add these new const declarations for the summary elements
const summaryCorrect = document.getElementById('summaryCorrect');
const summaryWrong = document.getElementById('summaryWrong');
const summarySkipped = document.getElementById('summarySkipped');
const summaryTimeUp = document.getElementById('summaryTimeUp'); // New element
const summaryTotalQuestions = document.getElementById('summaryTotalQuestions');
const ADMIN_USERS = ['Arindam Mitra','Sourav Gangopadhyay (admin)','Shreaya Dey', ]; // Add usernames for delete button activation

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
let quizStartTime; // Declare quizStartTime globally

let timeLeft = 0;
let timerInterval;
let timeUpMessageTimeout; // Added for the temporary time-up message
let initialTimeLimit = 0; // Store the initial time limit for the current question

// --- New variables for time tracking per question ---
let questionStartTime; // Stores the Date.now() when a question is loaded
let questionTimesTaken = []; // Array to store time taken for each question in seconds
let questionStatuses = []; // NEW: Array to store status of each question (answered, skipped, time_up, unanswered, auto_submitted)

// Anti-cheating variables
let quizActive = false; // Flag to indicate if a quiz is currently active
let tabSwitchCount = 0; // Tracks how many times the user switched tabs
const MAX_TAB_SWITCHES = 1; // Maximum allowed tab switches before quiz auto-submits
let autoSubmitTriggered = false; // NEW: Flag to indicate if auto-submission was triggered by anti-cheat

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

createQuizLink.addEventListener('click', (e) => {
    e.preventDefault();
    setActiveLink(createQuizLink);
    showCreateQuizSection();
    closeSidebar();
});

function showCreateQuizSection() {
    hideAllSections();
    if (!ADMIN_USERS.includes(localStorage.getItem('loggedInUser'))) {
        showInfoModal("Only admins can create quizzes.");
        return;
    }
    createQuizContainer.style.display = 'block';
}
document.addEventListener('DOMContentLoaded', () => {
    const loggedInUser = localStorage.getItem('loggedInUser');
    if (!loggedInUser) {
        window.location.href = "index.html";
    } else {
        usernameDisplay.textContent = loggedInUser;
        welcomeHeading.textContent = `Welcome, ${loggedInUser}!`;

        // Show/hide nav depending on role
        if (ADMIN_USERS.includes(loggedInUser)) {
            // Replace Start Quiz nav label
            startQuizLink.innerHTML = '<i class="fas fa-list"></i> All Quizzes';
            startQuizLink.onclick = (e) => {
                e.preventDefault();
                setActiveLink(startQuizLink);
                showAllQuizzesSection();
                closeSidebar();
            };
        } else {
            // Normal user - keep Start Quiz
            startQuizLink.onclick = (e) => {
                e.preventDefault();
                setActiveLink(startQuizLink);
                showQuizSelection();
                closeSidebar();
            };
        }

        // Hide create quiz tab for non-admins
        if (!ADMIN_USERS.includes(loggedInUser)) {
            if (createQuizLink) createQuizLink.style.display = "none";
            if (archivedQuizzesLink) archivedQuizzesLink.style.display = "none";
        }

        goToDashboard();
    }
});
function showAllQuizzesSection() {
    hideAllSections();
    document.getElementById('allQuizzesContainer').style.display = 'block';
    renderAllQuizzes();
}

function renderAllQuizzes() {
    const container = document.getElementById('allQuizzesList');
    const filterValue = document.getElementById('quizStatusFilter').value;
    container.innerHTML = '';

    // Filter quizzes based on dropdown
    let filteredQuizzes = quizzes.filter((quiz) => {
        if (filterValue === 'active') return quiz.enabled === true;
        if (filterValue === 'inactive') return quiz.enabled === false;
        return true; // "all"
    });

    // Render cards
    filteredQuizzes.forEach((quiz) => {
        const quizCard = document.createElement('div');
        quizCard.classList.add('quiz-card');

        quizCard.innerHTML = `
            <h3>${quiz.name}</h3>
            <p>${quiz.description || ''}</p>
            <p>
              <b>Status:</b> 
              <span class="status-badge ${quiz.enabled ? 'active' : 'inactive'}">
                ${quiz.enabled ? '🟢 Active' : '🔴 Inactive'}
              </span>
            </p>
            <button class="view-details-btn">View Details</button>
        `;

        quizCard.querySelector('.view-details-btn').onclick = () => {
            showQuizDetailsForAdmin(quiz);
        };

        container.appendChild(quizCard);
    });

    // Handle case when no quizzes match filter
    if (filteredQuizzes.length === 0) {
        container.innerHTML = `<p style="color:#777; font-style:italic;">No quizzes found.</p>`;
    }
}




function showQuizDetailsForAdmin(quiz) {
    hideAllSections();

    // Hide the All Quizzes list
    document.getElementById('allQuizzesContainer').style.display = 'none';

    // Show only the quiz details section
    quizResultsDetails.style.display = 'block';

    // Change heading for admin
    const heading = quizResultsDetails.querySelector('h2.heading5');
    heading.textContent = `Quiz Details: ${quiz.name}`;

    // Hide summary box explicitly
    document.querySelector('.results-summary-box').style.display = 'none';

    const resultsContainer = document.getElementById('quizResultsDetailsContainer');
    resultsContainer.innerHTML = '';

    quiz.questions.forEach((q, i) => {
        const div = document.createElement('div');
        div.classList.add('question-card');

        // Options HTML with correct option highlighted
        let optionsHtml = '';
        if (q.options && q.options.length > 0) {
            optionsHtml = '<ul class="options-list">' + 
                q.options.map(opt => {
                    const isCorrect = (opt === q.answer);
                    return `<li class="${isCorrect ? 'correct-option' : ''}">${opt}</li>`;
                }).join('') + 
            '</ul>';
        }

        div.innerHTML = `
            <p class="question-text-result"><b>${i + 1}. ${q.question}</b></p>
            ${q.imageUrl ? `<img src="${q.imageUrl}" class="question-result-image">` : ''}
            ${optionsHtml}
            <p><b>Answer:</b> <span class="correct-answer">${q.answer}</span></p>
            <p class="time-limit">⏱ ${q.timeLimit ? q.timeLimit + ' sec' : 'N/A'}</p>
        `;

        resultsContainer.appendChild(div);
    });

    // Back button returns to the All Quizzes list
    document.getElementById('quizResultsBackButton').onclick = () => {
        quizResultsDetails.style.display = 'none';
        showAllQuizzesSection();

        // Restore original heading when going back
        heading.textContent = 'Detailed Quiz Results';
        document.querySelector('.results-summary-box').style.display = 'block';
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
document.addEventListener('DOMContentLoaded', () => {
    const loggedInUser = localStorage.getItem('loggedInUser');
    if (!loggedInUser) {
        window.location.href = "index.html";
    } else {
        usernameDisplay.textContent = loggedInUser;
        welcomeHeading.textContent = `Welcome, ${loggedInUser}!`;

        if (ADMIN_USERS.includes(loggedInUser)) {
            startQuizLink.innerHTML = '<i class="fas fa-list"></i> All Quizzes';
            startQuizLink.onclick = (e) => {
                e.preventDefault();
                setActiveLink(startQuizLink);
                showAllQuizzesSection();
                closeSidebar();
            };
        } else {
            startQuizLink.onclick = (e) => {
                e.preventDefault();
                setActiveLink(startQuizLink);
                showQuizSelection();
                closeSidebar();
            };
        }

        if (!ADMIN_USERS.includes(loggedInUser)) {
            if (createQuizLink) createQuizLink.style.display = "none";
            if (archivedQuizzesLink) archivedQuizzesLink.style.display = "none";
        }

        goToDashboard();
    }

    // ✅ Add filter listener here
    const filter = document.getElementById('quizStatusFilter');
    if (filter) {
        filter.addEventListener('change', () => {
            renderAllQuizzes();
        });
    }
});

archivedQuizzesLink.addEventListener('click', (e) => {
    e.preventDefault();
    setActiveLink(archivedQuizzesLink);
    showArchivedQuizzesSection();
    closeSidebar();
});
function showArchivedQuizzesSection() {
    hideAllSections();
    archivedQuizzesContainer.style.display = 'block';
    loadArchivedQuizzes();
}

function loadArchivedQuizzes() {
    const allQuizzes = JSON.parse(localStorage.getItem("allQuizzesArchive")) || [];
    const tableBody = document.getElementById('archivedQuizzesTableBody');
    const noDataMsg = document.getElementById('noArchivedQuizzesMessage');

    tableBody.innerHTML = "";

    if (allQuizzes.length === 0) {
        noDataMsg.style.display = 'block';
        return;
    } else {
        noDataMsg.style.display = 'none';
    }

    allQuizzes.forEach((quiz, index) => {
        const row = tableBody.insertRow();
        row.insertCell(0).textContent = quiz.name || "N/A";
        row.insertCell(1).textContent = quiz.questions ? quiz.questions.length : 0;

        const actionsCell = row.insertCell(2);

        // View details button
        const viewBtn = document.createElement("button");
        viewBtn.innerHTML = '<i class="fas fa-eye"></i> View Details';
        viewBtn.classList.add("view-details-btn");
        viewBtn.onclick = () => showArchivedQuizDetails(quiz);
        actionsCell.appendChild(viewBtn);

        // Delete button
        const deleteBtn = document.createElement("button");
        deleteBtn.innerHTML = '<i class="fas fa-trash-alt"></i> Delete';
        deleteBtn.classList.add("delete-quiz-btn");
        deleteBtn.onclick = () => deleteArchivedQuiz(quiz.id);
        actionsCell.appendChild(deleteBtn);

        // ✅ NEW: Download button (Admins only)
        if (ADMIN_USERS.includes(localStorage.getItem('loggedInUser'))) {
            const downloadBtn = document.createElement("button");
            downloadBtn.innerHTML = '<i class="fas fa-download"></i> Download';
            downloadBtn.classList.add("download-quiz-btn");
            downloadBtn.onclick = () => downloadArchivedQuiz(quiz);
            actionsCell.appendChild(downloadBtn);
        }
    });
}


// ✅ FIXED FUNCTION: Download archived quiz as PDF (better margins, safe text wrapping, smaller readable images)
async function downloadArchivedQuiz(quiz) {
    const { jsPDF } = window.jspdf;
    const doc = new jsPDF();
    const pageWidth = doc.internal.pageSize.getWidth();
    const pageHeight = doc.internal.pageSize.getHeight();

    const margin = 20;
    const maxLineWidth = pageWidth - margin * 2;
    const maxImgWidth = (pageWidth - margin * 2) * 0.65; // about 65% of text width
    const maxImgHeight = 80; // smaller height for readability
    const lineSpacing = 8;
    let y = margin;

    function checkPageBreak(extraHeight = 0) {
        if (y + extraHeight > pageHeight - margin) {
            doc.addPage();
            y = margin;
        }
    }

    async function addImage(imgUrl) {
        try {
            const img = new Image();
            img.src = imgUrl;
            await new Promise(resolve => { img.onload = resolve; });

            let imgWidth = img.width;
            let imgHeight = img.height;

            if (imgWidth > maxImgWidth) {
                imgHeight *= maxImgWidth / imgWidth;
                imgWidth = maxImgWidth;
            }
            if (imgHeight > maxImgHeight) {
                imgWidth *= maxImgHeight / imgHeight;
                imgHeight = maxImgHeight;
            }

            checkPageBreak(imgHeight + 10);
            doc.addImage(img, "JPEG", margin, y, imgWidth, imgHeight);
            y += imgHeight + 5;
        } catch {
            doc.text("(Image failed to load)", margin, y);
            y += lineSpacing;
        }
    }

    // Title
    doc.setFontSize(16);
    doc.setFont("helvetica", "bold");
    doc.text(`📘 Quiz: ${quiz.name}`, pageWidth / 2, y, { align: "center" });
    y += lineSpacing * 2;

    doc.setFontSize(12);
    doc.setFont("helvetica", "normal");
    doc.text(`Total Questions: ${quiz.questions.length}`, margin, y);
    y += lineSpacing * 1.5;

    // Questions
    for (let i = 0; i < quiz.questions.length; i++) {
        const q = quiz.questions[i];
        checkPageBreak(lineSpacing * 4);

        // Question text
        doc.setFont("helvetica", "bold");
        const wrappedQ = doc.splitTextToSize(`${i + 1}. ${q.question}`, maxLineWidth);
        wrappedQ.forEach(line => {
            checkPageBreak(lineSpacing);
            doc.text(line, margin, y);
            y += lineSpacing;
        });

        if (q.imageUrl) await addImage(q.imageUrl);

        doc.setFont("helvetica", "normal");
        if (q.type === "mcq" && q.options) {
            q.options.forEach((opt, idx) => {
                const wrappedOpt = doc.splitTextToSize(`${String.fromCharCode(65 + idx)}. ${opt}`, maxLineWidth - 10);
                wrappedOpt.forEach(line => {
                    checkPageBreak(lineSpacing);
                    doc.text(line, margin + 5, y);
                    y += lineSpacing;
                });
            });
        }

        doc.setTextColor(0, 150, 0);
        const wrappedAns = doc.splitTextToSize(`Answer: ${q.answer}`, maxLineWidth);
        wrappedAns.forEach(line => {
            checkPageBreak(lineSpacing);
            doc.text(line, margin, y);
            y += lineSpacing;
        });
        doc.setTextColor(0, 0, 0);

        if (q.timeLimit) {
            checkPageBreak(lineSpacing);
            doc.text(`Time Limit: ${q.timeLimit} sec`, margin, y);
            y += lineSpacing;
        }

        if (q.explanationImageUrl) await addImage(q.explanationImageUrl);

        checkPageBreak(lineSpacing);
        doc.setDrawColor(180);
        doc.line(margin, y, pageWidth - margin, y);
        y += lineSpacing;
    }

    const fileName = `${quiz.name.replace(/\s+/g, "_")}_Archived.pdf`;
    doc.save(fileName);

    showInfoModal(`✅ PDF generated for "${quiz.name}".`);
}





function showArchivedQuizDetails(quiz) {
    // Hide all sections, including the archived quizzes table
    hideAllSections(); 
    archivedQuizzesContainer.style.display = 'none'; // force hide the table
    quizResultsDetails.style.display = 'block';      // show only details

    const resultsContainer = document.getElementById('quizResultsDetailsContainer');
    resultsContainer.innerHTML = ''; // Clear old content

    if (!quiz.questions || quiz.questions.length === 0) {
        resultsContainer.innerHTML = '<p style="text-align:center;color:#777;">No questions available in this quiz.</p>';
        document.getElementById('quizResultsBackButton').onclick = showArchivedQuizzesSection;
        return;
    }

    quiz.questions.forEach((q, i) => {
        const resultItem = document.createElement('div');
        resultItem.classList.add('result-item');

        let imageHtml = q.imageUrl ? `<img src="${q.imageUrl}" class="question-result-image">` : '';
        let explanationImageHtml = q.explanationImageUrl ? `<img src="${q.explanationImageUrl}" class="explanation-image">` : '';

        resultItem.innerHTML = `
            <p class="question-text-result">${i + 1}. ${q.question}</p>
            ${imageHtml}
            <p><b>Answer:</b> <span class="correct-answer">${q.answer}</span></p>
            ${explanationImageHtml}
        `;
        resultsContainer.appendChild(resultItem);
    });

    // Back button should bring you back to the archived quiz list
    document.getElementById('quizResultsBackButton').onclick = () => {
        quizResultsDetails.style.display = 'none'; 
        showArchivedQuizzesSection(); // show the table again
    };
}
function deleteArchivedQuiz(quizId) {
    let allQuizzes = JSON.parse(localStorage.getItem("allQuizzesArchive")) || [];
    allQuizzes = allQuizzes.filter(q => q.id !== quizId);
    localStorage.setItem("allQuizzesArchive", JSON.stringify(allQuizzes));
    loadArchivedQuizzes();
}
function archiveAllQuizzes() {
    const existingArchive = JSON.parse(localStorage.getItem("allQuizzesArchive")) || [];
    const newOnes = quizzes.filter(q => !existingArchive.find(a => a.id === q.id));
    const updatedArchive = [...existingArchive, ...newOnes];
    localStorage.setItem("allQuizzesArchive", JSON.stringify(updatedArchive));
}

// Call this once after quizzes are defined
archiveAllQuizzes();


/**
 * Clears and hides the time-up message if it's currently displayed.
 */
function clearTimeUpMessage() {
    if (timeUpMessageTimeout) {
        clearTimeout(timeUpMessageTimeout);
        timeUpMessageTimeout = null;
    }
    const timeUpMessageElement = document.getElementById('timeUpMessage');
    if (timeUpMessageElement) {
        timeUpMessageElement.classList.remove('show');
    }
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
                autoSubmitTriggered = true; // Set flag before submitting
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
            autoSubmitTriggered = true; // Set flag before submitting
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
function renderPerformanceCharts() {
    const loggedInUser = localStorage.getItem('loggedInUser');
    if (!loggedInUser) return;

    const userKey = `previousQuizzes_${loggedInUser}`;
    const previousQuizzes = JSON.parse(localStorage.getItem(userKey)) || [];

    const chartsContainer = document.getElementById('performanceTrendsContainer');
    const noDataMsg = document.getElementById('noPerformanceDataMessage');

    if (previousQuizzes.length === 0) {
        noDataMsg.style.display = 'block';
        return;
    } else {
        noDataMsg.style.display = 'none';
    }

    // ✅ Sort by endTime for chronological trend
    previousQuizzes.sort((a, b) => new Date(a.endTime) - new Date(b.endTime));

    const labels = previousQuizzes.map(q => q.quizName);
    const percentages = previousQuizzes.map(q => parseFloat(q.percentage));
    const scores = previousQuizzes.map(q => q.score);
    const totals = previousQuizzes.map(q => q.totalQuestions);

    // Destroy old charts if they exist (avoid overlay)
if (window.scoreTrendChartInstance) window.scoreTrendChartInstance.destroy();

const ctx1 = document.getElementById('scoreTrendChart');
if (!ctx1) {
    console.error("❌ Line Chart canvas not found in HTML!");
    return;
}

window.scoreTrendChartInstance = new Chart(ctx1, {
    type: 'line',
    data: {
        labels,
        datasets: [{
            label: 'Percentage Score (%)',
            data: percentages,
            borderColor: 'blue',
            backgroundColor: 'rgba(0,0,255,0.2)',
            tension: 0.3,
            fill: true
        }]
    },
    options: {
        responsive: true,
        scales: { y: { beginAtZero: true, max: 100 } }
    }
});


    window.scoreBarChartInstance = new Chart(ctx2, {
        type: 'bar',
        data: {
            labels,
            datasets: [
                { label: 'Score', data: scores, backgroundColor: 'green' },
                { label: 'Total Questions', data: totals, backgroundColor: 'gray' }
            ]
        },
        options: {
            responsive: true,
            scales: { y: { beginAtZero: true } }
        }
    });
}


// --- Helper Functions to Show/Hide Sections ---
function hideAllSections() {
    quizInfoBox.style.display = 'none';
    quizContainer.style.display = 'none';
    finalScoreContainer.style.display = 'none';
    createQuizContainer.style.display = 'none';
    quizResultsDetails.style.display = 'none';
    previousQuizzesContainer.style.display = 'none';
    quizSelectionContainer.style.display = 'none';
    performanceTrendsContainer.style.display = 'none';
    archivedQuizzesContainer.style.display = 'none';
    document.getElementById('allQuizzesContainer').style.display = 'none'; // ✅ Added
    quizCompletedMessage.classList.remove('show');
}


performanceTrendsLink.addEventListener('click', (e) => {
    e.preventDefault();
    setActiveLink(performanceTrendsLink);
    showPerformanceTrendsSection();
    closeSidebar();
});
function showPerformanceTrendsSection() {
    hideAllSections();
    performanceTrendsContainer.style.display = 'block';
    renderPerformanceCharts();
}

function goToDashboard() {
    hideAllSections();
    quizInfoBox.style.display = 'block';
    updateDashboardInfo(); // Update information on the dashboard
    setActiveLink(dashboardLink);
    // Clear the timer when navigating to the dashboard
    clearInterval(timerInterval);
    clearTimeUpMessage(); // Clear and hide the time-up message
    quizActive = false; // Ensure quiz is marked as inactive when going to dashboard
    tabSwitchCount = 0; // Reset tab switch count
    autoSubmitTriggered = false; // Reset auto-submit flag
}

function showQuizSelection() {
    hideAllSections();
    quizSelectionContainer.style.display = 'block';
    // Clear timer and time-up message when going to quiz selection
    clearInterval(timerInterval);
    clearTimeUpMessage(); // Clear and hide the time-up message
    quizActive = false; // Ensure quiz is marked as inactive
    tabSwitchCount = 0; // Reset tab switch count
    autoSubmitTriggered = false; // Reset auto-submit flag
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
    renderPerformanceCharts();
    clearInterval(timerInterval); // Add this line to stop the timer
    clearTimeUpMessage(); // Clear and hide the time-up message
    quizActive = false; // Add this line to mark quiz as inactive
    tabSwitchCount = 0; // Reset tab switch count
    autoSubmitTriggered = false; // Reset auto-submit flag
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
        // Sort to get the most recent quiz
        // Use endTime for sorting as it's the completion time
        const sortedQuizzes = [...previousQuizzes].sort((a, b) => {
            const dateA = new Date(a.endTime || a.date); // Use endTime or fallback to old 'date'
            const dateB = new Date(b.endTime || b.date); // Use endTime or fallback to old 'date'
            return dateB.getTime() - dateA.getTime();
        });
        const lastQuiz = sortedQuizzes[0]; // Get the most recent one
        // MODIFIED: Explicitly show "Your Recent Quiz Name"
        lastQuizScoreDisplay.textContent = `Your Recent Quiz: ${lastQuiz.quizName} - Score: ${lastQuiz.score}/${lastQuiz.totalQuestions} (${lastQuiz.percentage}%)`;
        lastQuizScoreDisplay.style.display = 'block';

        // REMOVED: Lines to show and set click handler for viewRecentQuizDetailsButton
        // viewRecentQuizDetailsButton.style.display = 'block';
        // viewRecentQuizDetailsButton.onclick = () => showQuizResultsDetails(lastQuiz); // Pass the entire lastQuiz object
    } else {
        lastQuizScoreDisplay.style.display = 'none';
        viewRecentQuizDetailsButton.style.display = 'none'; // Ensure button is hidden if no quizzes
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
    startButton.innerHTML = '<i class="fas fa-lock"></i> Quiz Locked';
        } else if (alreadyAttempted) {
            startButton.disabled = true;
            startButton.classList.add('disabled-button');
            startButton.innerHTML = ' <i class="fas fa-check"></i>Already Attempted!';
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

    // Shuffle the questions array when the quiz starts - REMOVED TO STOP SHUFFLING
    // currentQuiz.questions = shuffleArray(currentQuiz.questions); 

    // Set quiz start time
    quizStartTime = new Date(); // Capture the exact start time of the quiz

    // continue with the quiz as normal:
    currentQuestionIndex = 0;
    userAnswers = new Array(currentQuiz.questions.length).fill(null);
    questionTimesTaken = new Array(currentQuiz.questions.length).fill(0); // Initialize time taken array
    questionStatuses = new Array(currentQuiz.questions.length).fill('unanswered'); // NEW: Initialize question statuses
    correctAnswersTotal = 0;
    wrongAnswersTotal = 0;
    skippedQuestionsTotal = 0;
    quizDetailsForDisplay = [];
    tabSwitchCount = 0;
    quizActive = true;
    autoSubmitTriggered = false; // Ensure it's false at quiz start

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
    questionStatuses[currentQuestionIndex] = 'answered'; // NEW: Mark as answered
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

function handleSkipButtonClick() {
    // If the user has selected an answer, they cannot skip.
    // If no answer is selected, mark as skipped.
    if (userAnswers[currentQuestionIndex] === null) {
        updateTimeTakenBeforeMoving(); // Record time for this skipped question
        questionStatuses[currentQuestionIndex] = 'skipped'; // NEW: Mark as skipped
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
        // For input type, if user input is empty, require an answer or skip
        if (!answer || answer.trim() === '') {
            showInfoModal("Please enter an answer or skip the question.");
            return;
        }
    } else if (answer === null) { // For multiple choice, check if an option was selected
        showInfoModal("Please select an option or skip the question.");
        return;
    }

    // If an answer was provided, mark it as 'answered' (even if it was partial input for text type)
    if (questionStatuses[currentQuestionIndex] === 'unanswered') {
        questionStatuses[currentQuestionIndex] = 'answered';
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
    // If auto-submit was triggered due to anti-cheat, update unanswered questions
    if (autoSubmitTriggered) {
        for (let i = 0; i < currentQuiz.questions.length; i++) {
            // Only update questions that were genuinely unanswered (not already skipped or time_up)
            if (questionStatuses[i] === 'unanswered' || questionStatuses[i] === 'null') {
                questionStatuses[i] = 'auto_submitted';
                // If a question is auto_submitted, and no answer was provided, ensure userAnswers is null or empty string
                if (userAnswers[i] === null) {
                    const questionType = currentQuiz.questions[i].type;
                    if (questionType === 'input') {
                        userAnswers[i] = "Auto-Submitted - No Input"; // Set a specific message for input type
                    } else {
                        userAnswers[i] = "Auto-Submitted - No Selection"; // Set a specific message for MCQs
                    }
                }
            }
        }
    }

    updateTimeTakenBeforeMoving(); // Ensure time for the last question is recorded

    clearInterval(timerInterval); // Stop the timer when quiz is submitted
    clearTimeUpMessage(); // Clear and hide the time-up message
    quizActive = false; // Quiz is no longer active
    tabSwitchCount = 0; // Reset tab switch count
    autoSubmitTriggered = false; // Reset auto-submit flag after submission

    calculateResults();
    saveQuizResult(); // Save the quiz result, which now includes start and end times
    showFinalScoreSection();
    quizCompletedMessage.classList.add('show'); // Show quiz completed message
    localStorage.setItem('hasShownLoginMessage', 'false'); // Reset login message flag
    setTimeout(() => {
        quizCompletedMessage.classList.remove('show');
    }, 3000);
}
// ✅ Handle quiz download (clean JSON, no extra inverted quotes)
const downloadQuizBtn = document.getElementById("downloadQuizBtn");

if (downloadQuizBtn) {
  downloadQuizBtn.addEventListener("click", () => {
    const quizId = document.getElementById("quizId").value.trim();
    const quizName = document.getElementById("quizName").value.trim();
    const quizDescription = document.getElementById("quizDescription").value.trim();
    const quizEnabled = document.getElementById("quizEnabled").checked;

    if (!quizId || !quizName) {
      showInfoModal("⚠️ Quiz ID and Name are required!");
      return;
    }

    // Example: normally you'd also loop through #questionsContainer here
    const newQuiz = {
      id: quizId,
      name: quizName,
      description: quizDescription,
      enabled: quizEnabled,
      questions: [
        {
          question: "Sample Q",
          type: "input",
          options: [],
          answer: "Sample Answer",
          timeLimit: 30,
          imageUrl: "",
          explanationImageUrl: ""
        }
      ]
    };

    // ✅ Build JavaScript file content (unquoted keys)
    const jsContent = 
`const quizzes = [
  {
    id: "${newQuiz.id}",
    name: "${newQuiz.name}",
    description: "${newQuiz.description}",
    enabled: ${newQuiz.enabled},
    questions: [
      {
        question: "${newQuiz.questions[0].question}",
        type: "${newQuiz.questions[0].type}",
        options: [],
        answer: "${newQuiz.questions[0].answer}",
        timeLimit: ${newQuiz.questions[0].timeLimit},
        imageUrl: "${newQuiz.questions[0].imageUrl}",
        explanationImageUrl: "${newQuiz.questions[0].explanationImageUrl}"
      }
    ]
  }
];`;

    // Save as .js file
    const blob = new Blob([jsContent], { type: "application/javascript" });
    const url = URL.createObjectURL(blob);

    const a = document.createElement("a");
    a.href = url;
    a.download = `${quizName.replace(/\s+/g, "_")}.js`;
    a.click();
    URL.revokeObjectURL(url);
  });
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
    if (quizActive) { // Only start timer if quiz is active
        timerInterval = setInterval(() => {
            timeLeft--;
            updateTimerDisplay(); // Update display every second
            if (timeLeft <= 0) {
                clearInterval(timerInterval);
                clearTimeUpMessage(); // Ensure previous message is cleared

                // NEW LOGIC FOR TIME UP: Capture partial input and mark status
                if (questionStatuses[currentQuestionIndex] === 'unanswered') { // Only process if not already answered/skipped
                    questionStatuses[currentQuestionIndex] = 'time_up'; // Mark as time up

                    const currentQuestionData = currentQuiz.questions[currentQuestionIndex];
                    if (currentQuestionData.type === 'input') {
                        // Capture the current value from the textarea if it exists
                        const inputField = optionsContainer.querySelector('.input-answer-field');
                        if (inputField) {
                            userAnswers[currentQuestionIndex] = inputField.value; // Store the actual input
                        } else {
                            userAnswers[currentQuestionIndex] = ''; // If input field not found for some reason, default to empty
                        }
                    } else {
                        // For multiple choice, if no option was selected, userAnswers[currentQuestionIndex] is already null
                    }
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
    let timeUpQuestionsTotal = 0; // Initialize timeUpQuestionsTotal
    let autoSubmittedQuestionsTotal = 0; // NEW: Initialize autoSubmittedQuestionsTotal
    quizDetailsForDisplay = [];

    currentQuiz.questions.forEach((question, index) => {
        const userAnswer = userAnswers[index];
        const status = questionStatuses[index]; // Use the new status array
        let isCorrect = false;
        const timeSpent = questionTimesTaken[index] !== undefined ? questionTimesTaken[index] : 0;

        // Common properties for quizDetailsForDisplay
        const commonDetails = {
            question: question.question,
            correctAnswer: question.answer,
            timeTaken: timeSpent,
            imageUrl: question.imageUrl || null, // Add imageUrl here
            explanationImageUrl: question.explanationImageUrl || null // New: Image for explanation
        };

        if (status === 'skipped') {
            skippedQuestionsTotal++;
            quizDetailsForDisplay.push({
                ...commonDetails,
                userAnswer: "Skipped", // Display "Skipped" for manually skipped questions
                isCorrect: false,
                skipped: true,
                timeUp: false,
                autoSubmitted: false // Explicitly false
            });
        } else if (status === 'time_up') {
            timeUpQuestionsTotal++; // Increment time-up count
            let displayedUserAnswer = userAnswer;

            if (question.type === 'input') {
                if (userAnswer === null || userAnswer === '') {
                    displayedUserAnswer = "Time's Up - No Input";
                } else {
                    // This is the case where user typed something, and time ran out
                    displayedUserAnswer = `[Auto Collected] ${userAnswer}`;
                }
            } else { // For multiple choice questions
                if (userAnswer === null) {
                    displayedUserAnswer = "Time's Up - No Selection";
                }
                // If userAnswer is not null for MCQ and status is time_up, it means they selected something just before timeout, and `displayedUserAnswer` would already be the `userAnswer` (the selected option). No prefix needed for MCQs.
            }

            isCorrect = false; // Time-up answers are always considered incorrect for scoring

            quizDetailsForDisplay.push({
                ...commonDetails,
                userAnswer: displayedUserAnswer, // Display stored answer or generic time-up message
                isCorrect: isCorrect,
                skipped: false,
                timeUp: true,
                autoSubmitted: false // Explicitly false
            });
        } else if (status === 'auto_submitted') { // NEW: Handle 'auto_submitted' status
            autoSubmittedQuestionsTotal++;
            wrongAnswersTotal++; // Auto-submitted questions are considered wrong for scoring
            let displayedUserAnswer = userAnswer;

            if (userAnswer === null || userAnswer === '') {
                 displayedUserAnswer = "Auto-Submitted - No Input"; // More specific for inputs
            }

            quizDetailsForDisplay.push({
                ...commonDetails,
                userAnswer: displayedUserAnswer, // Will be "Auto-Submitted - No Input/Selection" or partial input
                isCorrect: false,
                skipped: false,
                timeUp: false,
                autoSubmitted: true
            });
        } else { // 'answered' status (which covers both correct and wrong answers explicitly provided by user)
            if (question.type === 'input') {
                isCorrect = userAnswer && userAnswer.trim().toLowerCase() === question.answer.trim().toLowerCase();
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
                timeUp: false,
                autoSubmitted: false // Explicitly false
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
        autoSubmitted: autoSubmittedQuestionsTotal, // NEW: Include in summary data
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
        summaryTimeUp.textContent = this.quizSummaryData.timeUp;
        // Check if summaryAutoSubmitted element exists before trying to set its textContent
        const summaryAutoSubmittedElement = document.getElementById('summaryAutoSubmitted'); // Assuming such an element exists in HTML
        if (summaryAutoSubmittedElement) {
             summaryAutoSubmittedElement.textContent = this.quizSummaryData.autoSubmitted; // NEW: Set auto-submitted count
        }
        summaryTotalQuestions.textContent = this.quizSummaryData.total;
    } else {
        // Fallback if summary data isn't set (shouldn't happen with current flow)
        summaryCorrect.textContent = correctAnswersTotal;
        summaryWrong.textContent = wrongAnswersTotal;
        summarySkipped.textContent = skippedQuestionsTotal;
        // For time-up, you'd need to re-calculate or pass it here if not stored
        summaryTimeUp.textContent = quizDetailsForDisplay.filter(d => d.timeUp).length;
        const summaryAutoSubmittedElement = document.getElementById('summaryAutoSubmitted');
        if (summaryAutoSubmittedElement) {
            summaryAutoSubmittedElement.textContent = quizDetailsForDisplay.filter(d => d.autoSubmitted).length; // NEW: Fallback for auto-submitted
        }
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
        } else if (detail.autoSubmitted) { // NEW: Add class for auto-submitted
            resultItem.classList.add('auto-submitted');
        }
        else {
            resultItem.classList.add('wrong');
        }

        let imageHtml = '';
        if (detail.imageUrl) {
            imageHtml = `<img src="${detail.imageUrl}" alt="Question Image" class="question-result-image">`;
        }
        let explanationImageHtml = '';
        if (detail.explanationImageUrl) {
            explanationImageHtml = `<img src="${detail.explanationImageUrl}" alt="Explanation Image" class="explanation-image">`;
        }


        resultItem.innerHTML = `
            <p class="question-text-result">${detail.question}</p>
            ${imageHtml}
            <p>Your Answer: <span class="${detail.isCorrect ? 'correct-answer' : (detail.skipped ? 'user-answer' : (detail.timeUp ? 'time-up-answer' : (detail.autoSubmitted ? 'auto-submitted-answer' : 'user-answer')))}">${detail.userAnswer}</span></p>
            <p>Correct Answer: <span class="correct-answer">${detail.correctAnswer}</span></p>
            <p>Time Taken: <span>${formatTime(detail.timeTaken)}</span></p>
            ${explanationImageHtml} `;
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
    const day = String(now.getDate()).padStart(2, '0');
    const month = String(now.getMonth() + 1).padStart(2, '0');
    const year = now.getFullYear();

    let hours = now.getHours();
    const minutes = String(now.getMinutes()).padStart(2, '0');
    const seconds = String(now.getSeconds()).padStart(2, '0');
    const ampm = hours >= 12 ? 'PM' : 'AM';
    hours = hours % 12;
    hours = hours ? hours : 12;
    const formattedHours = String(hours).padStart(2, '0');

    const formattedStartTime = quizStartTime ?
        `${String(quizStartTime.getDate()).padStart(2, '0')}/${String(quizStartTime.getMonth() + 1).padStart(2, '0')}/${quizStartTime.getFullYear()} ${String(quizStartTime.getHours() % 12 || 12).padStart(2, '0')}:${String(quizStartTime.getMinutes()).padStart(2, '0')}:${String(quizStartTime.getSeconds()).padStart(2, '0')} ${quizStartTime.getHours() >= 12 ? 'PM' : 'AM'}` :
        'N/A';

    const formattedEndTime = `${day}/${month}/${year} ${formattedHours}:${minutes}:${seconds} ${ampm}`;

    const result = {
        quizId: currentQuiz.id,
        quizName: currentQuiz.name,
        score: correctAnswersTotal,
        totalQuestions: currentQuiz.questions.length,
        percentage: ((correctAnswersTotal / currentQuiz.questions.length) * 100).toFixed(2),
        startTime: formattedStartTime,
        endTime: formattedEndTime,
        details: quizDetailsForDisplay
    };

    previousQuizzes.push(result);
    localStorage.setItem(userKey, JSON.stringify(previousQuizzes));
}


function loadPreviousQuizzes() {
    const loggedInUser = localStorage.getItem('loggedInUser');
    if (!loggedInUser) return;

    const userKey = `previousQuizzes_${loggedInUser}`;
    let previousQuizzes = JSON.parse(localStorage.getItem(userKey)) || [];

    const tableBody = document.getElementById('previousQuizzesTableBody');
    tableBody.innerHTML = '';
    const noQuizzesMessage = document.getElementById('noPreviousQuizzesMessage');

    if (previousQuizzes.length === 0) {
        noQuizzesMessage.style.display = 'block';
        return;
    } else {
        noQuizzesMessage.style.display = 'none';
    }

    previousQuizzes.sort((a, b) => {
        const dateA = new Date(a.endTime || a.date);
        const dateB = new Date(b.endTime || b.date);
        return dateB.getTime() - dateA.getTime();
    });

    const isCurrentUserAdmin = ADMIN_USERS.includes(loggedInUser);

    previousQuizzes.forEach((result, index) => {
        const row = tableBody.insertRow();
        row.insertCell(0).textContent = result.quizName || 'N/A';
        row.insertCell(1).textContent = `${result.score}/${result.totalQuestions}`;
        row.insertCell(2).textContent = `${parseFloat(result.percentage).toFixed(2)}%`;
        row.insertCell(3).textContent = result.startTime || 'N/A';
        row.insertCell(4).textContent = result.endTime || result.date || 'N/A';


        const actionsCell = row.insertCell(5);

        const viewButton = document.createElement('button');
        viewButton.innerHTML = '<i class="fas fa-eye"></i> View Details';
        viewButton.classList.add('view-details-btn');
        viewButton.onclick = () => showQuizResultsDetails(result);
        actionsCell.appendChild(viewButton);

        if (isCurrentUserAdmin) {
            const deleteButton = document.createElement('button');
            deleteButton.innerHTML = '<i class="fas fa-trash-alt"></i> Delete';
            deleteButton.classList.add('delete-quiz-btn');
            deleteButton.onclick = () => deleteQuizResult(result.quizId, result.endTime || result.date);
            actionsCell.appendChild(deleteButton);
        }

        const downloadButton = document.createElement('button');
        downloadButton.innerHTML = '<i class="fas fa-download"></i> Download';
        downloadButton.classList.add('download-response-btn');
        downloadButton.onclick = () => downloadQuizResponse(result);
        actionsCell.appendChild(downloadButton);
    });
}


function deleteQuizResult(quizIdToDelete, timeToDelete) {
    const loggedInUser = localStorage.getItem('loggedInUser');
    if (!loggedInUser) return;

    const userKey = `previousQuizzes_${loggedInUser}`;
    let previousQuizzes = JSON.parse(localStorage.getItem(userKey)) || [];

    const updatedQuizzes = previousQuizzes.filter(quiz =>
        !(quiz.quizId === quizIdToDelete && (quiz.endTime === timeToDelete || quiz.date === timeToDelete))
    );

    localStorage.setItem(userKey, JSON.stringify(updatedQuizzes));
    loadPreviousQuizzes();

    // ✅ Refresh Performance Trends if the tab is open
    if (document.getElementById('performanceTrendsContainer').style.display === 'block') {
        renderPerformanceCharts();
    }
}


async function downloadQuizResponse(quiz) {
    const { jsPDF } = window.jspdf;
    const doc = new jsPDF();
    const pageWidth = doc.internal.pageSize.getWidth();
    const pageHeight = doc.internal.pageSize.getHeight();

    // Margins
    const topMargin = 30;
    const bottomMargin = 30;
    const leftMargin = 20;
    const rightMargin = 20;
    const maxLineWidth = pageWidth - leftMargin - rightMargin;
    const lineSpacing = 6;
    let y = topMargin;

    const loggedInUser = localStorage.getItem('loggedInUser') || 'Unknown User';

    // ✅ Text sanitizer
    function sanitizeText(text) {
        if (!text) return "";
        return text
            .replace(/[•·]/g, "-")
            .replace(/[“”]/g, '"')
            .replace(/[‘’]/g, "'")
            .replace(/[–—]/g, "-")
            .replace(/[ØÜÊ]/g, "")
            .replace(/[^\x00-\x7F]/g, ""); // strip unsupported Unicode
    }

    // Helper: add new page if near bottom
    function checkPageBreak(extraHeight = 0) {
        if (y + extraHeight > pageHeight - bottomMargin) {
            doc.addPage();
            y = topMargin;
        }
    }

    // ===== Title =====
    doc.setFontSize(18);
    doc.setFont("helvetica", "bold");
    doc.text("📘 Quiz Response Report", pageWidth / 2, y, { align: "center" });
    y += 14;

    doc.setFontSize(12);
    doc.setFont("helvetica", "normal");
    doc.setTextColor(50, 50, 50);
    doc.text(`User: ${sanitizeText(loggedInUser)}`, leftMargin, y);
    y += 10;

    // ===== Charts Side by Side =====
    const userKey = `previousQuizzes_${loggedInUser}`;
    const previousQuizzes = JSON.parse(localStorage.getItem(userKey)) || [];

    if (previousQuizzes.length > 0 && quiz.details && quiz.details.length > 0) {
        previousQuizzes.sort((a, b) => new Date(a.endTime) - new Date(b.endTime));

        // Chart 1: Overall Trend
        const chartCanvas1 = document.createElement("canvas");
        chartCanvas1.width = 400;
        chartCanvas1.height = 200;
        const ctx1 = chartCanvas1.getContext("2d");

        new Chart(ctx1, {
            type: "line",
            data: {
                labels: previousQuizzes.map((q, i) => `${i + 1}. ${sanitizeText(q.quizName)}`),
                datasets: [{
                    label: "Percentage Score (%)",
                    data: previousQuizzes.map(q => parseFloat(q.percentage)),
                    borderColor: "blue",
                    backgroundColor: "rgba(0,0,255,0.1)",
                    tension: 0.3,
                    fill: true
                }]
            },
            options: {
                responsive: false,
                plugins: { legend: { display: false } },
                scales: { x: { ticks: { maxRotation: 45 } }, y: { beginAtZero: true, max: 100 } }
            }
        });

        // Chart 2: Per-Question Performance
        const chartCanvas2 = document.createElement("canvas");
        chartCanvas2.width = 400;
        chartCanvas2.height = 200;
        const ctx2 = chartCanvas2.getContext("2d");

        new Chart(ctx2, {
            type: "line",
            data: {
                labels: quiz.details.map((_, i) => `Q${i + 1}`),
                datasets: [{
                    label: "Correctness",
                    data: quiz.details.map(d => d.isCorrect ? 1 : 0),
                    borderColor: "green",
                    backgroundColor: "rgba(0,255,0,0.1)",
                    tension: 0.3,
                    fill: true
                }]
            },
            options: {
                responsive: false,
                plugins: { legend: { display: false } },
                scales: { y: { beginAtZero: true, max: 1, ticks: { stepSize: 1 } } }
            }
        });

        await new Promise(resolve => setTimeout(resolve, 500));
        const chartImg1 = chartCanvas1.toDataURL("image/png", 1.0);
        const chartImg2 = chartCanvas2.toDataURL("image/png", 1.0);

        checkPageBreak(120);

        // Titles above each chart
        doc.setFont("helvetica", "bold");
        doc.setFontSize(12);
        doc.setTextColor(0, 0, 180);
        doc.text("📊 Overall Trend", leftMargin + ((pageWidth - leftMargin - rightMargin) / 4), y, { align: "center" });

        doc.setTextColor(0, 150, 0);
        doc.text("📝 Per-Question Performance", pageWidth / 2 + ((pageWidth - leftMargin - rightMargin) / 4), y, { align: "center" });

        y += 6; // move down before adding charts

        // Place charts side by side
        doc.addImage(chartImg1, "PNG", leftMargin, y, (pageWidth - leftMargin - rightMargin) / 2 - 5, 60);
        doc.addImage(chartImg2, "PNG", pageWidth / 2 + 5, y, (pageWidth - leftMargin - rightMargin) / 2 - 5, 60);
        y += 70;
    }

    // ===== Quiz Summary Box =====
    checkPageBreak(50);
    doc.setDrawColor(0);
    doc.setFillColor(240, 240, 255);
    doc.rect(leftMargin, y, maxLineWidth, 35, "F");

    y += 12;
    doc.setTextColor(0, 0, 0);
    doc.text(`Quiz Name: ${sanitizeText(quiz.quizName)}`, leftMargin + 5, y);
    y += lineSpacing;
    doc.text(`Start Time: ${sanitizeText(quiz.startTime || 'N/A')}`, leftMargin + 5, y);
    y += lineSpacing;
    doc.text(`End Time: ${sanitizeText(quiz.endTime || quiz.date || 'N/A')}`, leftMargin + 5, y);
    y += lineSpacing;
    doc.text(`Score: ${quiz.score} / ${quiz.totalQuestions} (${quiz.percentage}%)`, leftMargin + 5, y);
    y += 15;

    // ===== Detailed Responses =====
    if (quiz.details && Array.isArray(quiz.details)) {
        for (const [i, item] of quiz.details.entries()) {
            checkPageBreak(60);

            doc.setFont("helvetica", "bold");
            doc.setFontSize(12);
            doc.setTextColor(0, 0, 128);
            const wrappedQuestion = doc.splitTextToSize(`Q${i + 1}: ${sanitizeText(item.question)}`, maxLineWidth);
            doc.text(wrappedQuestion, leftMargin, y);
            y += lineSpacing * wrappedQuestion.length;

            // --- User Answer ---
            doc.setFont("helvetica", "normal");
            doc.setFontSize(11);

            let userAnswerColor;
            if (item.isCorrect) userAnswerColor = [0, 150, 0];
            else if (item.skipped || item.timeUp) userAnswerColor = [200, 100, 0];
            else if (item.autoSubmitted) userAnswerColor = [150, 0, 150];
            else userAnswerColor = [200, 0, 0];

            doc.setTextColor(...userAnswerColor);
            doc.text("Your Answer:", leftMargin + 5, y);
            y += lineSpacing;

            const wrappedUserAnswer = doc.splitTextToSize(sanitizeText(item.userAnswer || "Skipped"), maxLineWidth - 5);
            wrappedUserAnswer.forEach(line => {
                checkPageBreak(lineSpacing);
                doc.text(line, leftMargin + 10, y);
                y += lineSpacing;
            });

            // --- Correct Answer ---
            doc.setTextColor(0, 150, 0);
            doc.text("Correct Answer:", leftMargin + 5, y);
            y += lineSpacing;

            const wrappedCorrectAnswer = doc.splitTextToSize(sanitizeText(item.correctAnswer || "N/A"), maxLineWidth - 5);
            wrappedCorrectAnswer.forEach(line => {
                checkPageBreak(lineSpacing);
                doc.text(line, leftMargin + 10, y);
                y += lineSpacing;
            });

            // --- Time Taken ---
            doc.setTextColor(50, 50, 50);
            doc.text("Time Taken:", leftMargin + 5, y);
            y += lineSpacing;
            doc.text(sanitizeText(`${formatTime(item.timeTaken)}`), leftMargin + 10, y);
            y += lineSpacing;

            // --- Explanation Image ---
            if (item.explanationImageUrl) {
                try {
                    const explanationImg = new Image();
                    await new Promise((resolve, reject) => {
                        explanationImg.onload = () => resolve();
                        explanationImg.onerror = (e) => reject(e);
                        explanationImg.src = item.explanationImageUrl;
                    });

                    const maxImgWidth = maxLineWidth - 10;
                    const maxImgHeight = 100;
                    let scaledWidth = explanationImg.naturalWidth;
                    let scaledHeight = explanationImg.naturalHeight;

                    if (scaledWidth > maxImgWidth) {
                        scaledHeight = (maxImgWidth / scaledWidth) * scaledHeight;
                        scaledWidth = maxImgWidth;
                    }
                    if (scaledHeight > maxImgHeight) {
                        scaledWidth = (maxImgHeight / scaledHeight) * scaledWidth;
                        scaledHeight = maxImgHeight;
                    }

                    checkPageBreak(scaledHeight + 20);
                    doc.setTextColor(0, 0, 0);
                    doc.setFont("helvetica", "bold");
                    doc.text("Explanation:", leftMargin + 5, y);
                    y += lineSpacing;
                    doc.addImage(explanationImg.src, 'JPEG', leftMargin + 5, y, scaledWidth, scaledHeight);
                    y += scaledHeight + 5;
                } catch (e) {
                    doc.setTextColor(200, 0, 0);
                    doc.text(" (Explanation image could not be loaded)", leftMargin + 5, y);
                    y += lineSpacing;
                }
            }

            // Divider line
            checkPageBreak(lineSpacing);
            doc.setDrawColor(180);
            doc.line(leftMargin, y, pageWidth - rightMargin, y);
            y += lineSpacing;
        }
    } else {
        checkPageBreak(lineSpacing * 2);
        doc.setTextColor(200, 0, 0);
        doc.text("No answer details available.", leftMargin, y);
    }

    // ===== Save PDF =====
    const fileName = `${sanitizeText(quiz.quizName).replace(/\s+/g, '_')}_Response.pdf`;
    doc.save(fileName);

    showInfoModal(`✅ Download completed. Please check your browser's default downloads folder for "${fileName}".`);
}





function loadQuestion() {
    if (!currentQuiz || currentQuestionIndex >= currentQuiz.questions.length) {
        return;
    }

    const questionData = currentQuiz.questions[currentQuestionIndex];
    quizTitle.textContent = currentQuiz.name;

    // Clear previous image and text content to prevent flicker or old content
    questionImage.src = '';
    questionImage.style.display = 'none';
    questionText.innerHTML = '';
    optionsContainer.innerHTML = '';

    // First, display the image if it exists
    if (questionData.imageUrl) {
        questionImage.src = questionData.imageUrl;
        questionImage.style.display = 'block';
    } else {
        questionImage.style.display = 'none';
        questionImage.src = ''; // Ensure src is cleared if no image
    }

    // Then, display the question text below the image
    questionText.innerHTML = `${currentQuestionIndex + 1}. ${questionData.question}`;


    if (questionData.type === 'input') {
        const inputField = document.createElement('textarea');
        inputField.classList.add('input-answer-field');
        inputField.placeholder = 'Type your answer here...';
        inputField.value = userAnswers[currentQuestionIndex] || '';
        inputField.rows = 1;
        inputField.spellcheck = true;

        inputField.addEventListener('input', () => {
            userAnswers[currentQuestionIndex] = inputField.value;
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
    questionStartTime = new Date().getTime();
    resetTimer(questionData.timeLimit);
}

function showQuizResultsDetails(result) {
    showQuizResultsDetailsSection();
    const resultsContainer = document.getElementById('quizResultsDetailsContainer');
    resultsContainer.innerHTML = '';

    if (result && result.details) {
        const correctCount = result.details.filter(d => d.isCorrect).length;
        const wrongCount = result.details.filter(d => !d.isCorrect && !d.skipped && !d.timeUp && !d.autoSubmitted).length; // Exclude autoSubmitted from wrong here
        const skippedCount = result.details.filter(d => d.skipped).length;
        const timeUpCount = result.details.filter(d => d.timeUp).length;
        const autoSubmittedCount = result.details.filter(d => d.autoSubmitted).length; // NEW: Count auto-submitted
        const totalCount = result.details.length;

        summaryCorrect.textContent = correctCount;
        summaryWrong.textContent = wrongCount;
        summarySkipped.textContent = skippedCount;
        summaryTimeUp.textContent = timeUpCount;
        // Check if summaryAutoSubmitted element exists before trying to set its textContent
        const summaryAutoSubmittedElement = document.getElementById('summaryAutoSubmitted');
        if (summaryAutoSubmittedElement) {
            summaryAutoSubmittedElement.textContent = autoSubmittedCount; // NEW: Set auto-submitted count
        }
        summaryTotalQuestions.textContent = totalCount;
    } else {
        summaryCorrect.textContent = 0;
        summaryWrong.textContent = 0;
        summarySkipped.textContent = 0;
        summaryTimeUp.textContent = 0;
        const summaryAutoSubmittedElement = document.getElementById('summaryAutoSubmitted');
        if (summaryAutoSubmittedElement) {
            summaryAutoSubmittedElement.textContent = 0; // NEW: Fallback for auto-submitted
        }
        summaryTotalQuestions.textContent = 0;
    }


    if (!result || !result.details || result.details.length === 0) {
        resultsContainer.innerHTML = '<p style="text-align: center; color: #777;">No detailed results available for this quiz.</p>';
        document.getElementById('quizResultsBackButton').onclick = showPreviousQuizzesSection;
        return;
    }

    result.details.forEach((detail, index) => { // Added 'index' to the forEach arguments
        const resultItem = document.createElement('div');
        resultItem.classList.add('result-item');
        if (detail.isCorrect) {
            resultItem.classList.add('correct');
        } else if (detail.skipped) {
            resultItem.classList.add('skipped');
        } else if (detail.timeUp) {
            resultItem.classList.add('time-up');
        } else if (detail.autoSubmitted) { // NEW: Add class for auto-submitted
            resultItem.classList.add('auto-submitted');
        }
        else {
            resultItem.classList.add('wrong');
        }

        let imageHtml = '';
        if (detail.imageUrl) {
            imageHtml = `<img src="${detail.imageUrl}" alt="Question Image" class="question-result-image">`;
        }
        let explanationImageHtml = '';
        if (detail.explanationImageUrl) {
            explanationImageHtml = `<img src="${detail.explanationImageUrl}" alt="Explanation Image" class="explanation-image">`;
        }


        resultItem.innerHTML = `
            <p class="question-text-result">${index + 1}. ${detail.question}</p>
            ${imageHtml}
            <p>Your Answer: <span class="${detail.isCorrect ? 'correct-answer' : (detail.skipped ? 'user-answer' : (detail.timeUp ? 'time-up-answer' : (detail.autoSubmitted ? 'auto-submitted-answer' : 'user-answer')))}">${detail.userAnswer}</span></p>
            <p>Correct Answer: <span class="correct-answer">${detail.correctAnswer}</span></p>
            <p>Time Taken: <span>${formatTime(detail.timeTaken)}</span></p>
            ${explanationImageHtml} `;
        resultsContainer.appendChild(resultItem);
    });

    document.getElementById('quizResultsBackButton').onclick = showPreviousQuizzesSection;
}
document.getElementById('addQuestionBtn').addEventListener('click', () => {
    const questionsContainer = document.getElementById('questionsContainer');
    const questionCount = questionsContainer.querySelectorAll('.question-block').length + 1;

    const qBlock = document.createElement('div');
    qBlock.classList.add('question-block');

    qBlock.innerHTML = `
      <div class="question-header">
        <span class="question-title">Q${questionCount}: 📝 New Question</span>
        <div>
          <button type="button" class="toggleQuestionBtn">▼</button>
          <button type="button" class="removeQuestionBtn">❌</button>
        </div>
      </div>

      <div class="question-body">
        <label>Question:</label>
        <textarea class="questionText"></textarea><br><br>

        <label>Type:</label>
        <select class="questionType">
          <option value="input">Input</option>
          <option value="mcq">MCQ</option>
        </select><br><br>

        <div class="mcqOptions" style="display:none;">
          <label>Options:</label><br>
          <input type="text" class="optionField" placeholder="Option 1"><br>
          <input type="text" class="optionField" placeholder="Option 2"><br>
          <input type="text" class="optionField" placeholder="Option 3"><br>
          <input type="text" class="optionField" placeholder="Option 4"><br><br>
        </div>

        <label>Answer:</label>
        <input type="text" class="questionAnswer"><br><br>

        <label>Time Limit (sec):</label>
        <input type="number" class="questionTime" value="30"><br><br>

        <label>Question Image URL:</label>
        <input type="text" class="questionImage"><br><br>

        <label>Explanation Image URL:</label>
        <input type="text" class="explanationImage"><br><br>
      </div>
    `;

    // Toggle MCQ fields
    qBlock.querySelector('.questionType').addEventListener('change', (e) => {
        qBlock.querySelector('.mcqOptions').style.display = e.target.value === 'mcq' ? 'block' : 'none';
    });

    // Collapse/Expand
    const toggleBtn = qBlock.querySelector('.toggleQuestionBtn');
    const body = qBlock.querySelector('.question-body');
    toggleBtn.addEventListener('click', () => {
        body.style.display = body.style.display === 'none' ? 'block' : 'none';
        toggleBtn.textContent = body.style.display === 'none' ? '▶' : '▼';
    });

    // Remove + reindex all questions
    qBlock.querySelector('.removeQuestionBtn').addEventListener('click', () => {
        qBlock.remove();
        reindexQuestions();
    });

    // Auto-update header title live
    const titleSpan = qBlock.querySelector('.question-title');
    const questionField = qBlock.querySelector('.questionText');
    questionField.addEventListener('input', () => {
        const text = questionField.value.trim();
        const questionNumber = [...document.querySelectorAll('.question-block')].indexOf(qBlock) + 1;
        titleSpan.textContent = text 
            ? `Q${questionNumber}: 📝 ${text.substring(0, 40)}${text.length > 40 ? '...' : ''}` 
            : `Q${questionNumber}: 📝 New Question`;
    });

    questionsContainer.appendChild(qBlock);
});
function reindexQuestions() {
    const blocks = document.querySelectorAll('.question-block');
    blocks.forEach((block, i) => {
        const titleSpan = block.querySelector('.question-title');
        const text = block.querySelector('.questionText').value.trim();
        titleSpan.textContent = text 
            ? `Q${i+1}: 📝 ${text.substring(0, 40)}${text.length > 40 ? '...' : ''}` 
            : `Q${i+1}: 📝 New Question`;
    });
}


document.getElementById('downloadQuizBtn').addEventListener('click', () => {
    const quiz = {
        id: document.getElementById('quizId').value.trim(),
        name: document.getElementById('quizName').value.trim(),
        description: document.getElementById('quizDescription').value.trim(),
        enabled: document.getElementById('quizEnabled').checked,
        questions: []
    };

    document.querySelectorAll('.question-block').forEach(q => {
        const type = q.querySelector('.questionType').value;
        const options = type === 'mcq' ? Array.from(q.querySelectorAll('.optionField')).map(o => o.value.trim()) : [];
        
        quiz.questions.push({
            question: q.querySelector('.questionText').value.trim(),
            type,
            options,
            answer: q.querySelector('.questionAnswer').value.trim(),
            timeLimit: parseInt(q.querySelector('.questionTime').value) || 30,
            imageUrl: q.querySelector('.questionImage').value.trim(),
            explanationImageUrl: q.querySelector('.explanationImage').value.trim()
        });
    });

    const blob = new Blob([JSON.stringify([quiz], null, 4)], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${quiz.name.replace(/\s+/g, '_')}.json`;
    a.click();
    URL.revokeObjectURL(url);
});
quizContainer.style.display = 'none';
finalScoreContainer.style.display = 'none';
quizResultsDetails.style.display = 'none';
previousQuizzesContainer.style.display = 'none';
quizSelectionContainer.style.display = 'none';