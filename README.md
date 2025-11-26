# PlanA Birth Control Connect

A comprehensive web platform for birth control information, community support, and health tracking.

## Features

- **Home**: Welcome page with mission and features overview
- **Drug Breakdown**: Detailed information about birth control medications
- **Community**: Connect with others and share experiences
- **Symptom Tracker**: Track symptoms and cycle patterns
- **AI Chatbot**: Get answers to questions about birth control and reproductive health

## Setup Instructions

### 1. Install Python Dependencies

```bash
pip install -r requirements.txt
```

### 2. Run the Application

```bash
python app.py
```

The application will be available at `http://localhost:5000`

## Project Structure

```
PlanA/
├── app.py                 # Flask backend with LangChain chatbot
├── index.html            # Home page
├── drug-breakdown.html   # Drug breakdown page
├── community.html        # Community page
├── symptom-tracker.html  # Symptom tracker page
├── chatbot.html          # Chatbot interface
├── style.css             # Stylesheet
├── script.js             # JavaScript for navigation
├── requirements.txt      # Python dependencies
└── .env.example          # Environment variables template
```

## Chatbot

The chatbot uses LangChain for AI-powered responses. Currently configured with:
- Rule-based responses for common questions (works without API key)
- Can be upgraded to use OpenAI GPT models with API key
- Provides general information about birth control and reproductive health
- Always reminds users to consult healthcare providers for medical advice

## Development

- Frontend: HTML, CSS, JavaScript
- Backend: Flask (Python)
- AI: LangChain (with optional OpenAI integration)

## Important Notes
- The chatbot provides general information only and does not constitute medical advice
- Always consult with qualified healthcare providers for personalized medical guidance
- For production deployment, ensure proper security measures and API key protection


