const express = require('express');
const http = require('http');
const { Server } = require('socket.io');
const path = require('path');
const { questions, profiles } = require('./data/questions');

const app = express();
const server = http.createServer(app);
const io = new Server(server);

const PORT = process.env.PORT || 3000;

app.use(express.static(path.join(__dirname, 'public')));

// Game State
let gameState = {
    status: 'LOBBY', // LOBBY, QUESTION, RESULTS, FINAL
    currentQuestionIndex: -1,
    participants: {}, // socketId: { name: '', answers: [] }
};

io.on('connection', (socket) => {
    console.log('A user connected:', socket.id);

    // Join lobby
    socket.on('join', (name) => {
        gameState.participants[socket.id] = {
            name: name,
            answers: []
        };
        io.emit('update_participants', Object.values(gameState.participants).map(p => p.name));
        socket.emit('joined', { name, status: gameState.status });
    });

    // Host starts game
    socket.on('start_game', () => {
        gameState.status = 'QUESTION';
        gameState.currentQuestionIndex = 0;
        io.emit('next_question', {
            index: gameState.currentQuestionIndex,
            question: questions[gameState.currentQuestionIndex].question,
            options: questions[gameState.currentQuestionIndex].options.map(o => o.text)
        });
    });

    // Participant submits answer
    socket.on('submit_answer', (answerIndex) => {
        const participant = gameState.participants[socket.id];
        if (participant && gameState.status === 'QUESTION') {
            const question = questions[gameState.currentQuestionIndex];
            const type = question.options[answerIndex].type;
            participant.answers.push(type);
            
            // Notify host about progress
            const totalAnswers = Object.values(gameState.participants).filter(p => p.answers.length > gameState.currentQuestionIndex).length;
            io.emit('answer_received', {
                total: totalAnswers,
                count: Object.keys(gameState.participants).length
            });
        }
    });

    // Host moves to results of current question
    socket.on('show_results', () => {
        gameState.status = 'RESULTS';
        const stats = calculateStats(gameState.currentQuestionIndex);
        io.emit('results', stats);
    });

    // Host moves to next question or final
    socket.on('next_step', () => {
        gameState.currentQuestionIndex++;
        if (gameState.currentQuestionIndex < questions.length) {
            gameState.status = 'QUESTION';
            io.emit('next_question', {
                index: gameState.currentQuestionIndex,
                question: questions[gameState.currentQuestionIndex].question,
                options: questions[gameState.currentQuestionIndex].options.map(o => o.text)
            });
        } else {
            gameState.status = 'FINAL';
            const finalResults = calculateFinalResults();
            io.emit('final_results', finalResults);
        }
    });

    socket.on('disconnect', () => {
        delete gameState.participants[socket.id];
        io.emit('update_participants', Object.values(gameState.participants).map(p => p.name));
        console.log('User disconnected:', socket.id);
    });
});

function calculateStats(questionIndex) {
    const stats = {
        Cohabitation: [],
        Contribution: [],
        Coordination: [],
        Coopération: [],
        'Co-élaboration': []
    };

    Object.values(gameState.participants).forEach(p => {
        if (p.answers[questionIndex]) {
            stats[p.answers[questionIndex]].push(p.name);
        }
    });

    return stats;
}

function calculateFinalResults() {
    const results = [];
    Object.values(gameState.participants).forEach(p => {
        const counts = {
            Cohabitation: 0,
            Contribution: 0,
            Coordination: 0,
            Coopération: 0,
            'Co-élaboration': 0
        };

        p.answers.forEach(type => counts[type]++);

        let dominant = 'Cohabitation';
        let max = -1;
        for (const [type, count] of Object.entries(counts)) {
            if (count > max) {
                max = count;
                dominant = type;
            }
        }

        results.push({
            name: p.name,
            dominant: dominant,
            description: profiles[dominant],
            counts: counts
        });
    });
    return results;
}

server.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
