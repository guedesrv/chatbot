from flask import Flask, request, render_template
from chatterbot import ChatBot
from chatterbot.trainers import ListTrainer, ChatterBotCorpusTrainer

app = Flask(__name__)

chatbot = ChatBot("Charlie", storage_adapter="chatterbot.storage.SQLStorageAdapter")
trainer = ChatterBotCorpusTrainer(chatbot)
trainer.train("chatterbot.corpus.portuguese")

'''
chatbot = ChatBot(
    'Charlie', 
    #logic_adapters=['chatterbot.logic.BestMatch'], 
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
'''

@app.route('/')
def index():
    return render_template('base.html')

@app.route('/chatbot', methods=['POST'])
def chatbot():
    msg = str(request.form.get('text'))
    response = chatbot.get_response(msg)
    return str(response)

if __name__ == "__main__":
    app.run()