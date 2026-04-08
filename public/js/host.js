const socket = io();

const views = {
    lobby: document.getElementById('view-lobby'),
    question: document.getElementById('view-question'),
    results: document.getElementById('view-results'),
    final: document.getElementById('view-final')
};

const participantList = document.getElementById('participant-list');
const btnStart = document.getElementById('btn-start');
const btnShowResults = document.getElementById('btn-show-results');
const btnNext = document.getElementById('btn-next');

const hostQuestionText = document.getElementById('host-question-text');
const answeredCount = document.getElementById('answered-count');
const totalCount = document.getElementById('total-count');
const statsContainer = document.getElementById('stats-container');

function showView(viewName) {
    Object.values(views).forEach(v => v.classList.add('hidden'));
    views[viewName].classList.remove('hidden');
}

// Update participant list in lobby
socket.on('update_participants', (names) => {
    participantList.innerHTML = '';
    names.forEach(name => {
        const chip = document.createElement('div');
        chip.className = 'participant-chip';
        chip.textContent = name;
        participantList.appendChild(chip);
    });
    totalCount.textContent = names.length;
});

// Start Game
btnStart.addEventListener('click', () => {
    socket.emit('start_game');
});

// Receive Question
socket.on('next_question', (data) => {
    hostQuestionText.textContent = `${data.index + 1}. ${data.question}`;
    answeredCount.textContent = '0';
    showView('question');
});

// Progress
socket.on('answer_received', (data) => {
    answeredCount.textContent = data.total;
    totalCount.textContent = data.count;
});

// Show Results of specific question
btnShowResults.addEventListener('click', () => {
    socket.emit('show_results');
});

socket.on('results', (stats) => {
    statsContainer.innerHTML = '';
    
    const anonymousLabels = {
        'Cohabitation': 'Groupe 🟦',
        'Contribution': 'Groupe 🟧',
        'Coordination': 'Groupe 🟩',
        'Coopération': 'Groupe 🟨',
        'Co-élaboration': 'Groupe 💎'
    };

    // Total participants to compute percentage if needed
    const totalParticipants = Object.values(stats).reduce((acc, names) => acc + names.length, 0);
    
    Object.entries(stats).forEach(([profile, names]) => {
        const count = names.length;
        const percentage = totalParticipants > 0 ? (count / totalParticipants) * 100 : 0;
        const label = anonymousLabels[profile] || profile;
        
        const item = document.createElement('div');
        item.className = 'stat-item';
        item.innerHTML = `
            <div class="stat-label">
                <span>${label}</span>
                <span>${count} participants</span>
            </div>
            <div class="stat-bar-bg">
                <div class="stat-bar-fill" style="width: ${percentage}%"></div>
            </div>
            <div class="profile-names" style="margin-top: 0.5rem; font-size: 0.85rem; color: #94a3b8;">
                ${names.join(', ') || 'Personne'}
            </div>
        `;
        statsContainer.appendChild(item);
    });
    showView('results');
});

// Next question or Final
btnNext.addEventListener('click', () => {
    socket.emit('next_step');
});

// Final Dashboard
socket.on('final_results', (results) => {
    // Clear previous names
    ['Cohabitation', 'Contribution', 'Coordination', 'Coopération', 'Co-élaboration'].forEach(p => {
        document.getElementById(`names-${p}`).textContent = '';
    });

    // Populate
    results.forEach(res => {
        const container = document.getElementById(`names-${res.dominant}`);
        if (container) {
            const current = container.textContent;
            container.textContent = current ? `${current}, ${res.name}` : res.name;
        }
    });

    showView('final');
});
