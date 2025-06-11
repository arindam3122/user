document.addEventListener('DOMContentLoaded', (event) => {
            const adminLoggedIn = localStorage.getItem('loggedInUser');
            if (adminLoggedIn !== 'admin') {
                window.location.href = "index.html";
            } else {
                loadQuizResults();
            }
        });

        let currentQuizResults = []; // Store current quiz results for sorting

        // Global variable to store the callback for the custom confirmation modal
        let currentConfirmCallback = null;

        /**
         * Displays a custom confirmation modal.
         * @param {string} message - The message to display in the modal.
         * @param {function(boolean): void} onConfirmCallback - Callback function executed with true if confirmed, false if cancelled.
         */
        function showCustomConfirm(message, onConfirmCallback) {
            const modal = document.getElementById('customConfirmModal');
            const msgElem = document.getElementById('confirmMessage');
            const confirmYes = document.getElementById('confirmYes');
            const confirmNo = document.getElementById('confirmNo');

            msgElem.textContent = message;
            modal.style.display = 'flex';
            modal.classList.add('active');

            currentConfirmCallback = onConfirmCallback;

            confirmYes.onclick = null;
            confirmNo.onclick = null;

            confirmYes.onclick = () => {
                hideCustomConfirm();
                if (currentConfirmCallback) {
                    currentConfirmCallback(true);
                }
            };

            confirmNo.onclick = () => {
                hideCustomConfirm();
                if (currentConfirmCallback) {
                    currentConfirmCallback(false);
                }
            };
        }

        /**
         * Hides the custom confirmation modal.
         */
        function hideCustomConfirm() {
            const modal = document.getElementById('customConfirmModal');
            modal.classList.remove('active');
            setTimeout(() => {
                modal.style.display = 'none';
                currentConfirmCallback = null;
            }, 200);
        }

        function loadQuizResults() {
            const quizDataTable = document.getElementById('quizDataTable');
            const quizDetailedResultsAdmin = document.getElementById('quizDetailedResultsAdmin');
            quizDataTable.style.display = 'block';
            quizDetailedResultsAdmin.style.display = 'none';

            currentQuizResults = JSON.parse(localStorage.getItem('quizResults')) || [];

            // Default sort by timestamp in descending order (latest first)
            currentQuizResults.sort((a, b) => {
                const dateA = new Date(a.timestamp);
                const dateB = new Date(b.timestamp);
                return dateB - dateA; // Descending order
            });
            
            renderQuizResultsTable(currentQuizResults);
        }

        function renderQuizResultsTable(results) {
            const quizResultsBody = document.getElementById('quizResultsBody');
            const noDataMessage = document.getElementById('noDataMessage');
            quizResultsBody.innerHTML = '';

            if (results.length === 0) {
                noDataMessage.style.display = 'block';
                return;
            } else {
                noDataMessage.style.display = 'none';
            }

            results.forEach((result, index) => {
                const row = quizResultsBody.insertRow();
                row.insertCell(0).textContent = index + 1;
                row.insertCell(1).textContent = result.quizName || 'N/A';
                row.insertCell(2).textContent = result.user;
                row.insertCell(3).textContent = result.score;
                row.insertCell(4).textContent = result.wrongAnswers !== undefined ? result.wrongAnswers : 'N/A';
                row.insertCell(5).textContent = result.skippedQuestionsCount !== undefined ? result.skippedQuestionsCount : 'N/A';

                let percentage = 'N/A';
                if (result.numericScore !== undefined && result.totalQuestions !== undefined && result.totalQuestions > 0) {
                    percentage = ((result.numericScore / result.totalQuestions) * 100).toFixed(2) + '%';
                }
                row.insertCell(6).textContent = percentage;

                let displayDateTime = 'N/A';
                if (result.timestamp) {
                    const date = new Date(result.timestamp);
                    if (!isNaN(date.getTime())) {
                        const day = String(date.getDate()).padStart(2, '0');
                        const month = String(date.getMonth() + 1).padStart(2, '0');
                        const year = date.getFullYear();
                        const hours = String(date.getHours()).padStart(2, '0');
                        const minutes = String(date.getMinutes()).padStart(2, '0');
                        const seconds = String(date.getSeconds()).padStart(2, '0');
                        displayDateTime = `${day}/${month}/${year}, ${hours}:${minutes}:${seconds}`;
                    } else {
                        console.warn("Could not parse timestamp:", result.timestamp);
                        displayDateTime = result.timestamp;
                    }
                }
                row.insertCell(7).textContent = displayDateTime;

                const actionsCell = row.insertCell(8);
                actionsCell.style.whiteSpace = 'nowrap';
                
                const viewButton = document.createElement('button');
                viewButton.textContent = 'View Response';
                viewButton.className = 'view-btn';
                // Pass the original index (from currentQuizResults array) to view detailed results
                viewButton.onclick = function() {
                    showDetailedAdminResults(currentQuizResults.indexOf(result)); 
                };
                actionsCell.appendChild(viewButton);

                const deleteButton = document.createElement('button');
                deleteButton.textContent = 'Delete';
                deleteButton.className = 'delete-btn';
                // Pass the original index (from currentQuizResults array) to delete
                deleteButton.onclick = function() {
                    deleteQuizResult(currentQuizResults.indexOf(result));
                };
                actionsCell.appendChild(deleteButton);
            });
        }

        function sortQuizResultsByPercentage(order) {
            let quizResults = JSON.parse(localStorage.getItem('quizResults')) || [];

            if (order === 'default') {
                quizResults.sort((a, b) => {
                    const dateA = new Date(a.timestamp);
                    const dateB = new Date(b.timestamp);
                    return dateB - dateA; // Default: latest first
                });
            } else {
                quizResults.sort((a, b) => {
                    const percentageA = (a.numericScore / a.totalQuestions) || 0;
                    const percentageB = (b.numericScore / b.totalQuestions) || 0;

                    if (order === 'asc') {
                        return percentageA - percentageB; // Lowest to Highest
                    } else { // 'desc'
                        return percentageB - percentageA; // Highest to Lowest
                    }
                });
            }
            currentQuizResults = quizResults; // Update the global array
            renderQuizResultsTable(currentQuizResults);
        }


        function showDetailedAdminResults(originalIndex) {
            const quizResults = JSON.parse(localStorage.getItem('quizResults')) || [];
            
            const quizDataTable = document.getElementById('quizDataTable');
            const quizDetailedResultsAdmin = document.getElementById('quizDetailedResultsAdmin');
            
            if (originalIndex >= 0 && originalIndex < quizResults.length) {
                const selectedQuiz = quizResults[originalIndex];
                renderAdminQuizDetails(selectedQuiz.quizDetails);

                quizDataTable.style.display = 'none';
                quizDetailedResultsAdmin.style.display = 'block';
            } else {
                console.error("Invalid quiz index for detailed results.");
            }
        }

        function renderAdminQuizDetails(dataToRender) {
            const quizDetailedResultsAdmin = document.getElementById('quizDetailedResultsAdmin');
            const existingH3 = quizDetailedResultsAdmin.querySelector('h3');
            const existingBackButton = quizDetailedResultsAdmin.querySelector('.back-btn');
            quizDetailedResultsAdmin.innerHTML = '';
            quizDetailedResultsAdmin.appendChild(existingH3);
            
            if (!dataToRender || dataToRender.length === 0) {
                const noDetailsP = document.createElement('p');
                noDetailsP.textContent = 'No detailed results available for this submission.';
                quizDetailedResultsAdmin.appendChild(noDetailsP);
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
                    yourAnswerP.textContent = `Your Answer: ${q.userAnswer}`;
                    if (q.isCorrect === true) {
                        yourAnswerP.classList.add('your-answer', 'correct');
                        yourAnswerP.innerHTML += '<span class="correct-icon">&#x2713;</span>';
                    } else if (q.userAnswer === "Skipped") {
                        yourAnswerP.classList.add('your-answer', 'skipped');
                    } else {
                        yourAnswerP.classList.add('your-answer');
                        yourAnswerP.innerHTML += '<span class="wrong-icon">&#x2717;</span>';
                    }
                    resultItem.appendChild(yourAnswerP);

                    if (q.isCorrect === false || q.userAnswer === "Skipped") {
                        const correctAnswerP = document.createElement('p');
                        correctAnswerP.classList.add('correct-answer');
                        correctAnswerP.textContent = `Correct Answer: ${q.answer}`;
                        correctAnswerP.innerHTML += '<span class="correct-icon">&#x2713;</span>';
                        resultItem.appendChild(correctAnswerP);
                    }

                    quizDetailedResultsAdmin.appendChild(resultItem);
                });
            }
            quizDetailedResultsAdmin.appendChild(existingBackButton);
        }

        function backToAdminDashboard() {
            const quizDataTable = document.getElementById('quizDataTable');
            const quizDetailedResultsAdmin = document.getElementById('quizDetailedResultsAdmin');

            quizDataTable.style.display = 'block';
            quizDetailedResultsAdmin.style.display = 'none';
        }

        /**
         * Deletes a quiz result after confirmation via custom modal.
         * @param {number} originalIndex - The original index of the quiz result to delete from localStorage.
         */
        function deleteQuizResult(originalIndex) {
            showCustomConfirm("Are you sure you want to delete this quiz result?", (confirmed) => {
                if (confirmed) {
                    let quizResults = JSON.parse(localStorage.getItem('quizResults')) || [];
                    if (originalIndex >= 0 && originalIndex < quizResults.length) {
                        quizResults.splice(originalIndex, 1);
                        localStorage.setItem('quizResults', JSON.stringify(quizResults));
                        loadQuizResults(); // Reload the table to reflect the deletion
                    } else {
                        console.error("Attempted to delete with invalid original index:", originalIndex);
                    }
                }
            });
        }

        /**
         * Clears all quiz data from localStorage after confirmation via custom modal.
         */
        function clearAllQuizData() {
            showCustomConfirm("Are you sure you want to clear all quiz data? This action cannot be undone.", (confirmed) => {
                if (confirmed) {
                    localStorage.removeItem('quizResults'); // Clear all quiz data
                    loadQuizResults(); // Reload the table to show it's empty
                }
            });
        }

        function logout() {
            localStorage.removeItem('loggedInUser'); // Clear admin login status
            window.location.href = "index.html"; // Redirect to login page
        }