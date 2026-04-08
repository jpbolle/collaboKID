const socket = io();

const views = {
    join: document.getElementById('view-join'),
    ready: document.getElementById('view-ready'),
    question: document.getElementById('view-question'),
    wait: document.getElementById('view-wait'),
    result: document.getElementById('view-result')
};

const inputName = document.getElementById('input-name');
const btnJoin = document.getElementById('btn-join');
const displayName = document.getElementById('display-name');
const questionText = document.getElementById('question-text');
const optionsContainer = document.getElementById('options-container');
const finalProfile = document.getElementById('final-profile');
const finalDescription = document.getElementById('final-description');

function showView(viewName) {
    Object.values(views).forEach(v => v.classList.add('hidden'));
    views[viewName].classList.remove('hidden');
}

// Join
btnJoin.addEventListener('click', () => {
    const name = inputName.value.trim();
    if (name) {
        socket.emit('join', name);
    }
});

socket.on('joined', (data) => {
    displayName.textContent = data.name;
    if (data.status === 'LOBBY') {
        showView('ready');
    }
});

// Question received
socket.on('next_question', (data) => {
    questionText.textContent = data.question;
    optionsContainer.innerHTML = '';
    
    data.options.forEach((opt, index) => {
        const btn = document.createElement('button');
        btn.className = 'option-btn';
        btn.textContent = opt;
        btn.addEventListener('click', () => {
            socket.emit('submit_answer', index);
            showView('wait');
        });
        optionsContainer.appendChild(btn);
    });
    
    showView('question');
});

// Final results
socket.on('final_results', (allResults) => {
    // Find my own result
    const myName = displayName.textContent;
    const myResult = allResults.find(r => r.name === myName);
    
    if (myResult) {
        finalProfile.textContent = myResult.dominant;
        finalDescription.textContent = myResult.description;
        showView('result');
    }
});

// Handle mid-game joins (simplified)
socket.on('connect', () => {
    // If we were already joined, we might need to reconcile
});
