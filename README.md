# Kaia - Chrome Extension  

A Chrome extension that analyzes webpage content for potential bias using **Google's Gemini AI**, providing a **summary, bias assessment, and a bias score** 

<img width="1920" alt="Screenshot 2025-02-03 at 5 15 34 PM" src="https://github.com/user-attachments/assets/a0565bf4-aa38-4313-b30e-73fd9e0a1de6" />

## Features  

- **Automatic Bias Detection**: Summarizes the webpage and highlights potential biases.  
- **Bias Score (1-10)**: Rates how biased a page is (10 being extremely biased).  
- **Lightweight & Fast**: Runs in your browser’s popup window.  

---  

## Installation  

### 1. Clone or Download This Repository  

```sh  
git clone https://github.com/[your-username]/Kaia.git  
cd Kaia 
```

### 2. Add the Extension to Chrome  

1. Open **Google Chrome**.  
2. Navigate to `chrome://extensions/`.  
3. Enable **Developer Mode** (toggle in the top right).  
4. Click **"Load Unpacked"** and select the project folder.  

---  

## API Key Setup  

This extension uses **Google's Gemini AI** for bias detection. To use it, you need to set up an API key:  

1. Go to [Google AI API Console](https://console.cloud.google.com/) and create a new API key.  
2. Open `popup.js` and replace:  

```js  
const API_KEY = "";
```

with your actual API key:  

```js  
const API_KEY = "your-api-key-here";  
```

---  

## How to Use  

1. Open **any webpage** that you want to analyze.  
2. Click on the **extension icon** in the Chrome toolbar.  
3. The extension will automatically:  
   - Fetch the webpage content  
   - Send it to the Gemini API  
   - Display a **summary, bias analysis, and bias score** in a popup.  

---  

## Technologies Used  

- **JavaScript** (Popup & Background Scripts)  
- **Chrome Extensions API** (Tab Content Extraction)  
- **Google Gemini AI** (Bias Detection & Analysis)  
- **HTML & CSS** (Popup UI)  
