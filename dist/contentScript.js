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

/***/ "./contentScript.js":
/*!**************************!*\
  !*** ./contentScript.js ***!
  \**************************/
/***/ (() => {

eval("// Function to extract main content from the page\nfunction extractArticleContent() {\n    // Try to find the main article content using common selectors\n    const selectors = [\n        'article',\n        '[role=\"article\"]',\n        '.article-content',\n        '.post-content',\n        'main',\n        '.main-content'\n    ];\n\n    let content = '';\n    let element = null;\n\n    // Try each selector until we find content\n    for (const selector of selectors) {\n        element = document.querySelector(selector);\n        if (element) {\n            content = element.textContent.trim();\n            break;\n        }\n    }\n\n    // If no content found through selectors, get the longest text block\n    if (!content) {\n        const paragraphs = Array.from(document.getElementsByTagName('p'));\n        if (paragraphs.length > 0) {\n            const mainContent = paragraphs\n                .map(p => p.textContent.trim())\n                .filter(text => text.length > 100) // Filter out short paragraphs\n                .join('\\n\\n');\n            \n            if (mainContent) {\n                content = mainContent;\n            }\n        }\n    }\n\n    // Get the title\n    const title = document.title || '';\n    const h1 = document.querySelector('h1');\n    const articleTitle = h1 ? h1.textContent.trim() : '';\n\n    return {\n        title: articleTitle || title,\n        content: content\n    };\n}\n\n// Listen for messages from the popup\nchrome.runtime.onMessage.addListener((request, sender, sendResponse) => {\n    if (request.action === 'getArticleContent') {\n        const articleData = extractArticleContent();\n        sendResponse(articleData);\n    }\n});\n\n\n//# sourceURL=webpack://article-bias-analyzer/./contentScript.js?");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = {};
/******/ 	__webpack_modules__["./contentScript.js"]();
/******/ 	
/******/ })()
;