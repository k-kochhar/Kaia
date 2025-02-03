

// Use your own Gemini API key here
const API_KEY = "";

const API_URL = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.0-pro:generateContent?key=${API_KEY}`;
const contentContainer = document.getElementById("contentContainer");
const loadingIndicator = document.getElementById("loading");

// Markdown support
function showResult(text) {
	const resultDiv = document.createElement("div");
	resultDiv.className = "analysis-result";

	let formattedText = text
		.replace(/```([\s\S]*?)```/g, "<pre><code>$1</code></pre>")
		.replace(/`([^`]+)`/g, "<code>$1</code>")
		.replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>")
		.replace(/\*(.*?)\*/g, "<em>$1</em>")
		.replace(/\n/g, "<br>");

	resultDiv.innerHTML = formattedText;
	contentContainer.innerHTML = "";
	contentContainer.appendChild(resultDiv);
}

async function analyzePage() {
	loadingIndicator.style.display = "block";
	contentContainer.innerHTML = "";

	try {
		const [tab] = await chrome.tabs.query({
			active: true,
			currentWindow: true,
		});

		const pageContent = await chrome.tabs.sendMessage(tab.id, {
			action: "getContent",
		});

		const response = await fetch(API_URL, {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({
				contents: [
					{
						parts: [
							{
								text: `You are Kaia, a bias detection AI. Analyze this webpage content and provide:
                        1. A brief summary (2 sentences)
                        2. Any potential bias found (1-2 sentences)
                        3. Bias score (1-10, where 10 is extremely biased. You should be able to determine this score based on the bias found. There should always be a bias score.
                        
                        The format should be:
                        Summary
                        <summary>

                        Bias
                        <bias>

                        Bias Score
                        <bias score> / 10

                        Format your response using markdown:
                        - Use **bold** for important points
                        - Use *italics* for emphasis
                        - Use \`code\` for quotes from the text

                        Content:
                        ${pageContent.title}
                        ${pageContent.url}
                        ${pageContent.content}`,
							},
						],
					},
				],
			}),
		});

		const data = await response.json();

		if (data.candidates && data.candidates[0]?.content?.parts?.[0]?.text) {
			showResult(data.candidates[0].content.parts[0].text);
		} else {
			showResult(
				"I couldn't analyze this page. Please try again on a different page."
			);
		}
	} catch (error) {
		console.error("Error:", error);
		showResult(
			"I couldn't analyze this page. Please make sure you're on a webpage and try again."
		);
	} finally {
		loadingIndicator.style.display = "none";
	}
}

// Start analysis when popup opens
document.addEventListener("DOMContentLoaded", analyzePage);
