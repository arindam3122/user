// mergedQuizData.js
const quizzes = [
    {
        "id": "simple quiz",
        "name": "Trial Quiz",
        "description": "This quiz contains just a demo of how the site works. Feel free to explore the tabs after attempting this module.",
        "enabled": true,
        "questions": [
            {
                "question": "Which planet is known as the Red Planet?",
                "type": "input",
                "options": [],
                "answer": "Mars",
                "timeLimit": 30,
                "imageUrl": "",
                "explanationImageUrl": ""
            },
            {
                "question": "Which vitamin is produced when the skin is exposed to sunlight?",
                "type": "mcq",
                "options": [
                    "Vitamin A",
                    "Vitamin B",
                    "Vitamin C",
                    "Vitamin D"
                ],
                "answer": "Vitamin D",
                "timeLimit": 30,
                "imageUrl": "",
                "explanationImageUrl": ""
            }
        ]
    },
    {
        "id": "math",
        "name": "Simple Math Module",
        "description": "A simple math module consisting math problems.",
        "enabled": true,
        "questions": [
            {
                "question": "If a rectangle has a length of 3x+2 and a width of x−1, what's its perimeter in terms of x?",
                "type": "input",
                "options": [],
                "answer": "8x+2",
                "timeLimit": 30,
                "imageUrl": "",
                "explanationImageUrl": "1.png"
            },
            {
                "question": "A bag contains 4 red marbles, 6 blue marbles, and 2 green marbles. What is the probability of picking a blue marble at random?",
                "type": "input",
                "options": [],
                "answer": "50%",
                "timeLimit": 30,
                "imageUrl": "",
                "explanationImageUrl": "2.png"
            }
        ]
    },
    {
        "id": "Internet & Web Technology",
        "name": "Internet & Web Technology",
        "description": "",
        "enabled": false,
        "questions": [
            {
                "question": "What is the main function of a web browser?",
                "type": "mcq",
                "options": [
                    "Send emails",
                    "Access web pages",
                    "Store files",
                    "Connect to Wi-Fi"
                ],
                "answer": "Access web pages",
                "timeLimit": 30,
                "imageUrl": "",
                "explanationImageUrl": ""
            },
            {
                "question": "Which of the following is not a web browser?",
                "type": "mcq",
                "options": [
                    "Google Chrome",
                    "Microsoft Edge",
                    "Mozilla Firefox",
                    "Microsoft Office"
                ],
                "answer": "Microsoft Office",
                "timeLimit": 30,
                "imageUrl": "",
                "explanationImageUrl": ""
            },
            {
                "question": "What does the HTTP protocol stand for?",
                "type": "mcq",
                "options": [
                    "HyperText Transfer Protocol",
                    "HyperTerminal Transfer Protocol",
                    "HyperText Terminal Protocol",
                    "Hyper Transfer Protocol"
                ],
                "answer": "HyperText Transfer Protocol",
                "timeLimit": 30,
                "imageUrl": "",
                "explanationImageUrl": ""
            },
            {
                "question": "What does the URL “www.example.com” represent?",
                "type": "mcq",
                "options": [
                    "The protocol",
                    "The domain name",
                    "The file location",
                    "The IP address"
                ],
                "answer": "The domain name",
                "timeLimit": 30,
                "imageUrl": "",
                "explanationImageUrl": ""
            },
            {
                "question": "Which search engine is the most popular globally?",
                "type": "mcq",
                "options": [
                    "Bing",
                    "Yahoo",
                    "Google",
                    "DuckDuckGo"
                ],
                "answer": "Google",
                "timeLimit": 30,
                "imageUrl": "",
                "explanationImageUrl": ""
            },
            {
                "question": "What is a keyword in search engines?",
                "type": "mcq",
                "options": [
                    "A special code for websites",
                    "A word used to define a specific page",
                    "A search term used by users to find information",
                    "A browser plugin for faster browsing"
                ],
                "answer": "A search term used by users to find information",
                "timeLimit": 30,
                "imageUrl": "",
                "explanationImageUrl": ""
            },
            {
                "question": "What is SEO in the context of web search?",
                "type": "mcq",
                "options": [
                    "Search Engine Optimization",
                    "Simple Entry Options",
                    "Secure Encryption Online",
                    "Search Evaluation Operation"
                ],
                "answer": "Search Engine Optimization",
                "timeLimit": 30,
                "imageUrl": "",
                "explanationImageUrl": ""
            },
            {
                "question": "Which of the following is NOT a search engine?",
                "type": "mcq",
                "options": [
                    "Google",
                    "Bing",
                    "Amazon",
                    "Yahoo"
                ],
                "answer": "Amazon",
                "timeLimit": 30,
                "imageUrl": "",
                "explanationImageUrl": ""
            },
            {
                "question": "What does “Organic Search Results” refer to?",
                "type": "mcq",
                "options": [
                    "Paid search results",
                    "Results that are based on an algorithm",
                    "Results influenced by user location",
                    "Social media-based results"
                ],
                "answer": "Results that are based on an algorithm",
                "timeLimit": 30,
                "imageUrl": "",
                "explanationImageUrl": ""
            },
            {
                "question": "Which of the following is a widely used email service?",
                "type": "mcq",
                "options": [
                    "Gmail",
                    "Skype",
                    "Facebook Messenger",
                    "WhatsApp"
                ],
                "answer": "Gmail",
                "timeLimit": 30,
                "imageUrl": "",
                "explanationImageUrl": ""
            },
            {
                "question": "What is the primary purpose of cloud storage?",
                "type": "mcq",
                "options": [
                    "Store software",
                    "Store files online for remote access",
                    "Send emails",
                    "Generate random passwords"
                ],
                "answer": "Store files online for remote access",
                "timeLimit": 30,
                "imageUrl": "",
                "explanationImageUrl": ""
            },
            {
                "question": "What is the maximum file size that can be attached to a Gmail email?",
                "type": "mcq",
                "options": [
                    "10 MB",
                    "25 MB",
                    "50 MB",
                    "100 MB"
                ],
                "answer": "25 MB",
                "timeLimit": 30,
                "imageUrl": "",
                "explanationImageUrl": ""
            },
            {
                "question": "Which of the following is not a cloud storage service?",
                "type": "mcq",
                "options": [
                    "Google Drive",
                    "Dropbox",
                    "OneDrive",
                    "Microsoft Excel"
                ],
                "answer": "Microsoft Excel",
                "timeLimit": 30,
                "imageUrl": "",
                "explanationImageUrl": ""
            },
            {
                "question": "What social media platform is primarily for professional networking?",
                "type": "mcq",
                "options": [
                    "Instagram",
                    "LinkedIn",
                    "Snapchat",
                    "Twitter"
                ],
                "answer": "LinkedIn",
                "timeLimit": 30,
                "imageUrl": "",
                "explanationImageUrl": ""
            },
            {
                "question": "Which of the following features allows people to interact with content on Facebook?",
                "type": "mcq",
                "options": [
                    "Tags",
                    "Likes",
                    "Shares",
                    "All of the above"
                ],
                "answer": "All of the above",
                "timeLimit": 30,
                "imageUrl": "",
                "explanationImageUrl": ""
            },
            {
                "question": "Which of the following is a cloud storage service from Google?",
                "type": "mcq",
                "options": [
                    "iCloud",
                    "Google Drive",
                    "OneDrive",
                    "Amazon Cloud"
                ],
                "answer": "Google Drive",
                "timeLimit": 30,
                "imageUrl": "",
                "explanationImageUrl": ""
            },
            {
                "question": "What is the primary function of social media platforms?",
                "type": "mcq",
                "options": [
                    "File storage",
                    "User interaction and content sharing",
                    "Secure communication",
                    "Software downloads"
                ],
                "answer": "User interaction and content sharing",
                "timeLimit": 30,
                "imageUrl": "",
                "explanationImageUrl": ""
            },
            {
                "question": "Which of the following is an example of a digital communication tool?",
                "type": "mcq",
                "options": [
                    "Zoom",
                    "Dropbox",
                    "Google Docs",
                    "VLC Player"
                ],
                "answer": "Zoom",
                "timeLimit": 30,
                "imageUrl": "",
                "explanationImageUrl": ""
            },
            {
                "question": "What does the acronym “DM” stand for in social media?",
                "type": "mcq",
                "options": [
                    "Digital Media",
                    "Direct Message",
                    "Download Manager",
                    "Data Management"
                ],
                "answer": "Direct Message",
                "timeLimit": 30,
                "imageUrl": "",
                "explanationImageUrl": ""
            },
            {
                "question": "What is phishing in cybersecurity?",
                "type": "mcq",
                "options": [
                    "Unauthorized access to data",
                    "A method of stealing sensitive information by impersonating legitimate sources",
                    "Encrypting data for security",
                    "Filtering spam emails"
                ],
                "answer": "A method of stealing sensitive information by impersonating legitimate sources",
                "timeLimit": 30,
                "imageUrl": "",
                "explanationImageUrl": ""
            },
            {
                "question": "What is the purpose of using a strong password?",
                "type": "mcq",
                "options": [
                    "To make passwords easier to remember",
                    "To prevent unauthorized access to accounts",
                    "To store sensitive data",
                    "To manage multiple accounts"
                ],
                "answer": "To prevent unauthorized access to accounts",
                "timeLimit": 30,
                "imageUrl": "",
                "explanationImageUrl": ""
            },
            {
                "question": "Which of the following is an example of two-factor authentication (2FA)?",
                "type": "mcq",
                "options": [
                    "A password and a CAPTCHA",
                    "A password and a fingerprint scan",
                    "A password and a phone call",
                    "A password and a username"
                ],
                "answer": "A password and a fingerprint scan",
                "timeLimit": 30,
                "imageUrl": "",
                "explanationImageUrl": ""
            },
            {
                "question": "Which type of malware is designed to replicate itself and spread to other systems?",
                "type": "mcq",
                "options": [
                    "Virus",
                    "Trojan",
                    "Worm",
                    "Spyware"
                ],
                "answer": "Worm",
                "timeLimit": 30,
                "imageUrl": "",
                "explanationImageUrl": ""
            }
        ]
    },
    {
        "id": "11",
        "name": "Microsoft Office & Productivity Tools MS Word",
        "description": "",
        "enabled": false,
        "questions": [
            {
                "question": "What is the default font in Microsoft Word?",
                "type": "mcq",
                "options": [
                    "Arial",
                    "Times New Roman",
                    "Calibri",
                    "Courier New"
                ],
                "answer": "Calibri",
                "timeLimit": 60,
                "imageUrl": "",
                "explanationImageUrl": ""
            },
            {
                "question": "Which of the following is NOT a page layout option in MS Word?",
                "type": "mcq",
                "options": [
                    "Portrait",
                    "Landscape",
                    "Square",
                    "Normal"
                ],
                "answer": "Square",
                "timeLimit": 60,
                "imageUrl": "",
                "explanationImageUrl": ""
            },
            {
                "question": "How can you apply a template to a new document in Word?",
                "type": "mcq",
                "options": [
                    "Click on File > New > Template",
                    "Click on Home > Template",
                    "Click on Insert > Template",
                    "Templates cannot be used in Word"
                ],
                "answer": "Click on File > New > Template",
                "timeLimit": 60,
                "imageUrl": "",
                "explanationImageUrl": ""
            },
            {
                "question": "Which keyboard shortcut is used to save a document in MS Word?",
                "type": "mcq",
                "options": [
                    "Ctrl + S",
                    "Ctrl + P",
                    "Ctrl + A",
                    "Ctrl + D"
                ],
                "answer": "Ctrl + S",
                "timeLimit": 60,
                "imageUrl": "",
                "explanationImageUrl": ""
            },
            {
                "question": "How can you check the spelling and grammar of a document in MS Word?",
                "type": "mcq",
                "options": [
                    "Tools > Spelling and Grammar",
                    "Review > Spelling & Grammar",
                    "Home > Proofing",
                    "File > Check"
                ],
                "answer": "Review > Spelling & Grammar",
                "timeLimit": 60,
                "imageUrl": "",
                "explanationImageUrl": ""
            },
            {
                "question": "What function is used to sum a range of cells in MS Excel?",
                "type": "mcq",
                "options": [
                    "SUM()",
                    "ADD()",
                    "TOTAL()",
                    "COUNT()"
                ],
                "answer": "SUM()",
                "timeLimit": 60,
                "imageUrl": "",
                "explanationImageUrl": ""
            },
            {
                "question": "What is the default chart type in MS Excel when you select data and click on the 'Insert\nChart' option?",
                "type": "mcq",
                "options": [
                    "Bar Chart",
                    "Pie Chart",
                    "Line Chart",
                    "Column Chart"
                ],
                "answer": "Column Chart",
                "timeLimit": 60,
                "imageUrl": "",
                "explanationImageUrl": ""
            },
            {
                "question": "In Excel, which of the following is NOT a type of cell reference?",
                "type": "mcq",
                "options": [
                    "Absolute",
                    "Relative",
                    "Circular",
                    "Mixed"
                ],
                "answer": "Circular",
                "timeLimit": 60,
                "imageUrl": "",
                "explanationImageUrl": ""
            },
            {
                "question": "What does the VLOOKUP function do?",
                "type": "mcq",
                "options": [
                    "Searches a row for a value",
                    "Searches a column for a value",
                    "Creates a vertical lookup table",
                    "Finds the average of a range"
                ],
                "answer": "Searches a column for a value",
                "timeLimit": 60,
                "imageUrl": "",
                "explanationImageUrl": ""
            },
            {
                "question": "Which of the following is used to create a Pivot Table in MS Excel?",
                "type": "mcq",
                "options": [
                    "Data > Pivot Table",
                    "Insert > Pivot Table",
                    "Home > Pivot Table",
                    "File > New > Pivot Table"
                ],
                "answer": "Insert > Pivot Table",
                "timeLimit": 60,
                "imageUrl": "",
                "explanationImageUrl": ""
            },
            {
                "question": "Which of the following is a valid macro action in Excel?",
                "type": "mcq",
                "options": [
                    "Record",
                    "Create",
                    "Run",
                    "All of the above"
                ],
                "answer": "All of the above",
                "timeLimit": 60,
                "imageUrl": "",
                "explanationImageUrl": ""
            },
            {
                "question": "Which of the following Excel functions can be used to find the largest value in a range?",
                "type": "mcq",
                "options": [
                    "MAX()",
                    "MIN()",
                    "AVERAGE()",
                    "SUM()"
                ],
                "answer": "MAX()",
                "timeLimit": 60,
                "imageUrl": "",
                "explanationImageUrl": ""
            },
            {
                "question": "How do you quickly sum a range of cells in Excel?",
                "type": "mcq",
                "options": [
                    "Right-click > Sum",
                    "Use the SUM function manually",
                    "Press Alt + E + S",
                    "Use the AutoSum button (∑)"
                ],
                "answer": "Use the AutoSum button (∑)",
                "timeLimit": 60,
                "imageUrl": "",
                "explanationImageUrl": ""
            },
            {
                "question": "In Excel, which feature allows you to automate repetitive tasks?",
                "type": "mcq",
                "options": [
                    "Formula",
                    "Macros",
                    "Pivot Tables",
                    "Conditional Formatting"
                ],
                "answer": "Macros",
                "timeLimit": 60,
                "imageUrl": "",
                "explanationImageUrl": ""
            },
            {
                "question": "Which Excel function is used to count the number of cells that contain numbers?",
                "type": "mcq",
                "options": [
                    "COUNTA()",
                    "COUNT()",
                    "COUNTIF()",
                    "COUNTBLANK()"
                ],
                "answer": "COUNT()",
                "timeLimit": 60,
                "imageUrl": "",
                "explanationImageUrl": ""
            },
            {
                "question": "Which feature in PowerPoint is used to transition from one slide to another?",
                "type": "mcq",
                "options": [
                    "Animation",
                    "Slide Layout",
                    "Transition",
                    "SmartArt"
                ],
                "answer": "Transition",
                "timeLimit": 60,
                "imageUrl": "",
                "explanationImageUrl": ""
            },
            {
                "question": "Which option allows you to insert a new slide in PowerPoint?",
                "type": "mcq",
                "options": [
                    "Ctrl + N",
                    "Home > New Slide",
                    "Insert > New Slide",
                    "File > Insert Slide"
                ],
                "answer": "Home > New Slide",
                "timeLimit": 60,
                "imageUrl": "",
                "explanationImageUrl": ""
            },
            {
                "question": "What is the default slide layout in PowerPoint?",
                "type": "mcq",
                "options": [
                    "Title Slide",
                    "Title and Content",
                    "Blank",
                    "Title Only"
                ],
                "answer": "Title and Content",
                "timeLimit": 60,
                "imageUrl": "",
                "explanationImageUrl": ""
            },
            {
                "question": "Which of the following is used to add animation to text or objects in PowerPoint?",
                "type": "mcq",
                "options": [
                    "Insert > Animation",
                    "Home > Animation",
                    "Animation > Add Animation",
                    "Transitions > Animation"
                ],
                "answer": "Animation > Add Animation",
                "timeLimit": 60,
                "imageUrl": "",
                "explanationImageUrl": ""
            },
            {
                "question": "Which of the following is NOT a view option in PowerPoint?",
                "type": "mcq",
                "options": [
                    "Normal",
                    "Slide Sorter",
                    "Reading",
                    "File View"
                ],
                "answer": "File View",
                "timeLimit": 60,
                "imageUrl": "",
                "explanationImageUrl": ""
            },
            {
                "question": "What does the Slide Show option do in PowerPoint?",
                "type": "mcq",
                "options": [
                    "Displays the current slide in editing mode",
                    "Creates a new presentation",
                    "Starts the presentation from the beginning",
                    "Saves the presentation as a video"
                ],
                "answer": "Starts the presentation from the beginning",
                "timeLimit": 60,
                "imageUrl": "",
                "explanationImageUrl": ""
            },
            {
                "question": "In PowerPoint, how do you create a hyperlink?",
                "type": "mcq",
                "options": [
                    "Click on Insert > Hyperlink",
                    "Use Ctrl + K",
                    "Use right-click and select Hyperlink",
                    "All of the above"
                ],
                "answer": "All of the above",
                "timeLimit": 60,
                "imageUrl": "",
                "explanationImageUrl": ""
            },
            {
                "question": "Which is the correct shortcut for starting the slideshow from the beginning in PowerPoint?",
                "type": "mcq",
                "options": [
                    "F5",
                    "F6",
                    "Ctrl + F5",
                    "Ctrl + Shift + S"
                ],
                "answer": "F5",
                "timeLimit": 60,
                "imageUrl": "",
                "explanationImageUrl": ""
            },
            {
                "question": "Which of the following is a transition effect in PowerPoint?",
                "type": "mcq",
                "options": [
                    "Fade",
                    "Zoom",
                    "Slide",
                    "All of the above"
                ],
                "answer": "All of the above",
                "timeLimit": 60,
                "imageUrl": "",
                "explanationImageUrl": ""
            },
            {
                "question": "What is the purpose of Slide Master in PowerPoint?",
                "type": "mcq",
                "options": [
                    "To add animations to slides",
                    "To create and modify slide layouts",
                    "To edit the slide content",
                    "To add background music"
                ],
                "answer": "To create and modify slide layouts",
                "timeLimit": 60,
                "imageUrl": "",
                "explanationImageUrl": ""
            },
            {
                "question": "What is the primary purpose of MS Access?",
                "type": "mcq",
                "options": [
                    "Word processing",
                    "Data analysis",
                    "Database management",
                    "Spreadsheet creation"
                ],
                "answer": "Database management",
                "timeLimit": 60,
                "imageUrl": "",
                "explanationImageUrl": ""
            },
            {
                "question": "Which query type is used to extract specific data from a table?",
                "type": "mcq",
                "options": [
                    "Update Query",
                    "Delete Query",
                    "Select Query",
                    "Append Query"
                ],
                "answer": "Select Query",
                "timeLimit": 60,
                "imageUrl": "",
                "explanationImageUrl": ""
            },
            {
                "question": "How do you create a new database in MS Access?",
                "type": "mcq",
                "options": [
                    "File > New > Database",
                    "Ctrl + N",
                    "File > Save As > New Database",
                    "None of the above"
                ],
                "answer": "File > New > Database",
                "timeLimit": 60,
                "imageUrl": "",
                "explanationImageUrl": ""
            },
            {
                "question": "Which of the following is NOT an MS Office application?",
                "type": "mcq",
                "options": [
                    "Microsoft Word",
                    "Microsoft PowerPoint",
                    "Microsoft Paint",
                    "Microsoft Excel"
                ],
                "answer": "Microsoft Paint",
                "timeLimit": 60,
                "imageUrl": "",
                "explanationImageUrl": ""
            },
            {
                "question": "What feature is used to protect a document in MS Word?",
                "type": "mcq",
                "options": [
                    "Password",
                    "Read-Only",
                    "Both a and b",
                    "Encryption"
                ],
                "answer": "Both a and b",
                "timeLimit": 60,
                "imageUrl": "",
                "explanationImageUrl": ""
            }
        ]
    }
]
