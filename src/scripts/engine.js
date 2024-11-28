const states = {
    view : {
        squares : document.querySelectorAll('.square'),
        enemy : document.querySelector('.enemy'),
        timeLeft : document.querySelector('#timeLeft'),
        score : document.querySelector('#score'),
        lives : document.querySelector("#lives"),
    },
    values : {
        gameVelocity : 300,
        hitPosition : 0,
        result : 0,
        lives : 3,
        currentTime : 10,
    },
    actions : {
        timeID : setInterval(randonSquare, 1000),
        countDownTimerId : setInterval(countDown, 1000),
    }

};

function countDown() {
    states.values.currentTime--;
    states.view.timeLeft.textContent = states.values.currentTime;
    
    if (states.values.currentTime <= 0) {
        clearInterval(states.actions.countDownTimerId);
        clearInterval(states.actions.timeID);
        alert(`Game Over! Seu resultado foi: ${states.values.result}`)
    }
}

function playSound(audioName) {
    let audio = new Audio(`./src/audios/${audioName}.m4a`);
    audio.volume = .2;
    audio.play();
}

function randonSquare() {
    states.view.squares.forEach((square) => {
        square.classList.remove('enemy')
    });

    let radomMumber = Math.floor(Math.random() * 9);
    let randomSquare = states.view.squares[radomMumber];
    randomSquare.classList.add('enemy');
    states.values.hitPosition = randomSquare.id;        
}

// function moveEnemy() {
//     states.values.timeID = setInterval(randonSquare, states.values.gameVelocity)
// }

function addListenerHitBox() {
    states.view.squares.forEach((square) => {
        square.addEventListener('mousedown', () => {
            if(square.id === states.values.hitPosition) {
                states.values.result++;
                states.view.score.textContent = states.values.result;
                states.values.hitPosition = null;
                playSound('hit');
            } else {
                if((states.values.lives === 0) || (states.values.lives < 0)) {
                    alert("Game Over! Você utilizou todas a suas vidas!");                    
                } else {
                    states.values.lives--;
                    states.view.lives.textContent = `x${states.values.lives}`;
                }                
            };
        });
    });
};

function init() {
    addListenerHitBox();
};

init();