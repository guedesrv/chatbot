from flask import Flask, request, render_template, jsonify
from chatterbot import ChatBot
from chatterbot.trainers import ListTrainer

app = Flask(__name__)

@app.route('/')
def index():
    return render_template('base.html')

@app.route('/chatbot', methods=['POST'])
def chatbot():
    chatbot = ChatBot(
        'Charlie', 
        logic_adapters=['chatterbot.logic.BestMatch'], 
        database_uri="sqlite:///db.sqlite3"
    )

    trainer = ListTrainer(chatbot)

    trainer.train([
        "Olá",
        "Olá!",
        "Como vai você?",
        "Estou ótimo",
        "Isso é bom de ouvir",
        "Obrigado.",
        "De nada."
    ])

    response = chatbot.get_response(str(request.form.get('text')))
    return str(response)
