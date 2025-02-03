# News Bias Analyzer

A Chrome extension that automatically detects and highlights potential bias in news articles using Google's Gemini AI.

## Setup

1. Clone the repository
```bash
git clone https://github.com/your-username/news-bias-analyzer.git
cd news-bias-analyzer
```

2. Install dependencies
```bash
npm install
```

3. Set up your environment variables
```bash
cp .env.example .env
```
Then edit `.env` and add your Gemini API key. You can get one from the [Google AI Studio](https://makersuite.google.com/app/apikey).

4. Build the extension
```bash
npm run build
```

5. Load the extension in Chrome
- Open Chrome and go to `chrome://extensions/`
- Enable "Developer mode"
- Click "Load unpacked"
- Select the extension directory

## Security Note

Never commit your `.env` file or expose your API key. If you accidentally expose your API key:
1. Immediately revoke it from the Google Cloud Console
2. Generate a new key
3. Update your `.env` file with the new key

## Usage

The extension will automatically:
1. Detect when you're on a news article
2. Analyze the content for potential bias
3. Highlight biased phrases with explanations on hover

No configuration needed - just browse news sites as normal and the extension will work automatically. 