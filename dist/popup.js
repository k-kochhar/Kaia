/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "./popup.js":
/*!******************!*\
  !*** ./popup.js ***!
  \******************/
/***/ (() => {

eval("// popup.js\nconsole.log(\"Popup script loaded!\");\n\n// If you want to do something when the popup loads:\ndocument.addEventListener(\"DOMContentLoaded\", () => {\n  console.log(\"Popup DOM loaded!\");\n});\n\n// Get DOM elements\nconst analyzeButton = document.getElementById('analyzeButton');\nconst loadingIndicator = document.getElementById('loading');\nconst noArticleMessage = document.getElementById('noArticle');\nconst analysisResults = document.getElementById('analysisResults');\nconst errorMessage = document.getElementById('errorMessage');\n\n// Get API key from environment\nconst API_KEY = \"AIzaSyCWRM7ux3kg8_nTEmeCf9DmOlcOJVqevBM\";\nconst API_URL = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${API_KEY}`;\n\n// Analysis prompt template\nconst ANALYSIS_PROMPT = `Analyze the following article for:\n1. Political bias and perspective\n2. Emotional tone and language\n3. Key arguments and claims\n4. Potential manipulation techniques\n5. Overall objectivity score (1-10)\n\nArticle Title: {title}\n\nContent:\n{content}\n\nProvide a structured analysis with clear sections.`;\n\n// Function to display the analysis results\nfunction displayAnalysis(analysis) {\n    noArticleMessage.style.display = 'none';\n    analysisResults.innerHTML = analysis\n        .split('\\n')\n        .map(line => {\n            if (line.startsWith('#')) {\n                return `<h2>${line.replace('#', '').trim()}</h2>`;\n            } else if (line.trim() === '') {\n                return '<br>';\n            } else {\n                return `<p>${line}</p>`;\n            }\n        })\n        .join('');\n}\n\n// Function to show error\nfunction showError(message) {\n    errorMessage.textContent = message;\n    errorMessage.style.display = 'block';\n    setTimeout(() => {\n        errorMessage.style.display = 'none';\n    }, 5000);\n}\n\n// Function to analyze article\nasync function analyzeArticle() {\n    try {\n        // Get the active tab\n        const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });\n        \n        // Show loading state\n        analyzeButton.disabled = true;\n        loadingIndicator.style.display = 'block';\n        analysisResults.innerHTML = '';\n        errorMessage.style.display = 'none';\n\n        // Get article content from the content script\n        const articleData = await chrome.tabs.sendMessage(tab.id, { action: 'getArticleContent' });\n        \n        if (!articleData.content) {\n            throw new Error('No article content found on this page');\n        }\n\n        // Prepare the prompt\n        const prompt = ANALYSIS_PROMPT\n            .replace('{title}', articleData.title)\n            .replace('{content}', articleData.content);\n\n        // Call Gemini API\n        const response = await fetch(API_URL, {\n            method: 'POST',\n            headers: {\n                'Content-Type': 'application/json',\n            },\n            body: JSON.stringify({\n                contents: [{\n                    parts: [{\n                        text: prompt\n                    }]\n                }]\n            })\n        });\n\n        const data = await response.json();\n        \n        if (data.candidates && data.candidates[0]?.content?.parts?.[0]?.text) {\n            const analysis = data.candidates[0].content.parts[0].text;\n            displayAnalysis(analysis);\n        } else {\n            throw new Error('Failed to get analysis from Gemini');\n        }\n    } catch (error) {\n        console.error('Error:', error);\n        showError(error.message || 'Failed to analyze article');\n    } finally {\n        // Reset UI state\n        analyzeButton.disabled = false;\n        loadingIndicator.style.display = 'none';\n    }\n}\n\n// Event listeners\nanalyzeButton.addEventListener('click', analyzeArticle);\n\n// Check if we're on a valid page when popup opens\nchrome.tabs.query({ active: true, currentWindow: true }, async (tabs) => {\n    const tab = tabs[0];\n    if (!tab.url || tab.url.startsWith('chrome://')) {\n        analyzeButton.disabled = true;\n        noArticleMessage.textContent = 'Cannot analyze chrome:// pages';\n    }\n});\n\n\n//# sourceURL=webpack://article-bias-analyzer/./popup.js?");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = {};
/******/ 	__webpack_modules__["./popup.js"]();
/******/ 	
/******/ })()
;