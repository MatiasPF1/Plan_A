from flask import Flask, render_template, request, jsonify, send_from_directory, Response
from flask_cors import CORS
from langchain.llms import OpenAI
from langchain.chat_models import ChatOpenAI
from langchain.prompts import PromptTemplate
from langchain.chains import LLMChain
from langchain.memory import ConversationBufferMemory
import os
from dotenv import load_dotenv

# Load environment variables
load_dotenv()

app = Flask(__name__, static_folder='.', static_url_path='')
CORS(app)

# Initialize LangChain components
# Note: You'll need to set OPENAI_API_KEY in your environment or .env file
# For now, using a simple template-based approach that can work without API key
# In production, you'd use: llm = ChatOpenAI(temperature=0.7, model_name="gpt-3.5-turbo")

# Create a prompt template for birth control information
prompt_template = PromptTemplate(
    input_variables=["chat_history", "human_input"],
    template="""You are a helpful and compassionate AI assistant for PlanA, a birth control information platform. 
Your role is to provide accurate, non-judgmental information about birth control options, reproductive health, 
and related topics. Always remind users to consult with healthcare providers for medical advice.

Previous conversation:
{chat_history}

Human: {human_input}
Assistant:"""
)

# Initialize memory for conversation history
memory = ConversationBufferMemory(memory_key="chat_history", input_key="human_input")

# For development: Simple rule-based responses (replace with actual LLM in production)
def get_chatbot_response(user_message, conversation_history=""):
    """
    Simple rule-based chatbot for birth control information.
    In production, replace this with actual LangChain LLM chain.
    """
    user_message_lower = user_message.lower()
    
    # Simple keyword-based responses
    if any(word in user_message_lower for word in ["hello", "hi", "hey", "greetings"]):
        return "Hello! I'm here to help you with questions about birth control and reproductive health. What would you like to know?"
    
    elif any(word in user_message_lower for word in ["birth control", "contraception", "contraceptive"]):
        return "Birth control comes in many forms including pills, patches, IUDs, implants, and more. Each has different effectiveness rates and side effects. Would you like to know more about a specific type? Remember, I can provide general information, but always consult with a healthcare provider for personalized advice."
    
    elif any(word in user_message_lower for word in ["side effect", "side effects", "symptoms"]):
        return "Common side effects of birth control can include nausea, headaches, mood changes, and changes in menstrual bleeding. These often improve after a few months. If you're experiencing severe side effects, please consult with your healthcare provider immediately."
    
    elif any(word in user_message_lower for word in ["pill", "pills", "oral contraceptive"]):
        return "Birth control pills are taken daily and contain hormones (estrogen and/or progestin) that prevent pregnancy. There are combination pills and progestin-only pills. Effectiveness is about 91-99% with typical use. Would you like to know more about how they work?"
    
    elif any(word in user_message_lower for word in ["iud", "intrauterine device"]):
        return "IUDs are small, T-shaped devices inserted into the uterus. They can be hormonal or copper-based and are over 99% effective. They can last 3-10 years depending on the type. Would you like more details?"
    
    elif any(word in user_message_lower for word in ["effectiveness", "effective", "protection"]):
        return "Birth control effectiveness varies by method. IUDs and implants are over 99% effective. Pills, patches, and rings are 91-99% effective with typical use. Condoms are about 85% effective. The most effective method for you depends on your lifestyle and health needs."
    
    elif any(word in user_message_lower for word in ["period", "menstrual", "cycle", "bleeding"]):
        return "Birth control can affect your menstrual cycle. Some methods may make periods lighter, more regular, or stop them entirely. Irregular bleeding is common when starting a new method. If you have concerns about your cycle, consult with your healthcare provider."
    
    elif any(word in user_message_lower for word in ["thank", "thanks"]):
        return "You're welcome! I'm here anytime you have questions about birth control or reproductive health. Remember to consult with healthcare providers for personalized medical advice."
    
    elif any(word in user_message_lower for word in ["help", "what can you do"]):
        return "I can help you with general information about birth control methods, effectiveness, side effects, and reproductive health topics. However, I cannot provide medical advice or diagnose conditions. Always consult with a qualified healthcare provider for personalized guidance."
    
    else:
        return "I understand you're asking about: " + user_message + ". While I can provide general information about birth control and reproductive health, I recommend consulting with a healthcare provider for personalized medical advice. Is there a specific aspect of birth control you'd like to learn more about?"

@app.route('/')
def index():
    try:
        with open('index.html', 'r', encoding='utf-8') as f:
            return f.read()
    except Exception as e:
        return f"Error loading index.html: {str(e)}", 500

@app.route('/chatbot')
@app.route('/chatbot.html')
def chatbot():
    try:
        with open('chatbot.html', 'r', encoding='utf-8') as f:
            return f.read()
    except Exception as e:
        return f"Error loading chatbot.html: {str(e)}", 500

@app.route('/drug-breakdown.html')
def drug_breakdown():
    try:
        with open('drug-breakdown.html', 'r', encoding='utf-8') as f:
            return f.read()
    except Exception as e:
        return f"Error loading drug-breakdown.html: {str(e)}", 500

@app.route('/community.html')
def community():
    try:
        with open('community.html', 'r', encoding='utf-8') as f:
            return f.read()
    except Exception as e:
        return f"Error loading community.html: {str(e)}", 500

@app.route('/symptom-tracker.html')
def symptom_tracker():
    try:
        with open('symptom-tracker.html', 'r', encoding='utf-8') as f:
            return f.read()
    except Exception as e:
        return f"Error loading symptom-tracker.html: {str(e)}", 500

@app.route('/test')
def test():
    return "Flask is working! Routes are active."

@app.route('/api/chat', methods=['POST'])
def chat():
    try:
        data = request.json
        user_message = data.get('message', '')
        conversation_history = data.get('history', '')
        
        if not user_message:
            return jsonify({'error': 'No message provided'}), 400
        
        # Get chatbot response
        # In production with API key: response = llm_chain.run(human_input=user_message)
        response = get_chatbot_response(user_message, conversation_history)
        
        return jsonify({
            'response': response,
            'status': 'success'
        })
    
    except Exception as e:
        return jsonify({'error': str(e)}), 500

# Serve static files (CSS, JS, etc.)
@app.route('/style.css')
def style_css():
    try:
        with open('style.css', 'r', encoding='utf-8') as f:
            return Response(f.read(), mimetype='text/css')
    except:
        return "style.css not found", 404

@app.route('/script.js')
def script_js():
    try:
        with open('script.js', 'r', encoding='utf-8') as f:
            return Response(f.read(), mimetype='application/javascript')
    except:
        return "script.js not found", 404

if __name__ == '__main__':
    app.run(debug=True, port=5000)




