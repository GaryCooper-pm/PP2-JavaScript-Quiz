/*jshint esversion: 6 */
// Quiz JavaScript

const question = document.querySelector('#question');
const choices = Array.from(document.querySelectorAll('.choice-text'));
const progressText = document.querySelector('#progressText');
const scoreText = document.querySelector('#score');
const progressBarFull = document.querySelector('#progressBarFull');
const SCORE_POINTS = 10;
const MAX_QUESTIONS = 20;

// Questions Script

let currentQuestion = {};
let acceptingAnswers = true;
let score = 0;
let questionCount = 0;
let availableQuestions = [];

let questions = [
    {
        question: 'What number is Sheldon Cooper\'s apartment?',
        choice1: '2A',
        choice2: '3A',
        choice3: '4A',
        answer: 3,
    },
    {
        question: 'Where does Penny work in the first seven series?',
        choice1: 'The Ice-Cream Parlour',
        choice2: 'The Cheesecake Factory',
        choice3: 'Dairy Queen',
        answer: 2,
    },
    {
        question: 'What type of scientists are Sheldon and Leonard?',
        choice1: 'Chemists',
        choice2: 'Aerospace Engineers',
        choice3: 'Physicists',
        answer: 3,
    },
    {
        question: 'What does it say on the yellow tape blocking the lift outside Sheldon and Leonard\'s apartment?',
        choice1: 'Caution',
        choice2: 'Danger',
        choice3: 'Out Of Order',
        answer: 1,
    },
    {
        question: 'What is Penny\'s surname?',
        choice1: 'Nobody knows',
        choice2: 'Farrah Fowler',
        choice3: 'Bloom',
        answer: 1,
    },
    {
        question: 'What is the name of Raj\'s dog?',
        choice1: 'Ginger',
        choice2: 'Cinnamon',
        choice3: 'Nutmeg',
        answer: 2,
    },
    {
        question: 'What British pop song is Penny playing in the pilot when she\'s seen for the first time moving into the apartment block?',
        choice1: 'Unwritten by Natasha Bedingfield',
        choice2: 'Smile by Lily Allen',
        choice3: 'Warwick Avenue by Duffy',
        answer: 2,
    },
    {
        question: 'What is Sheldon\'s catchphrase?',
        choice1: 'How you doin\'?',
        choice2: 'Um Bongo',
        choice3: 'Bazinga',
        answer: 3,
    },
    {
        question: 'When the comic book store suffered a fire in season 8, it was reopened as The Comic Book Store Regeneration. But what was it originally called?',
        choice1: 'The Comic Book Store',
        choice2: 'Pasadena Comic',
        choice3: 'The Comic Center Of Pasadena',
        answer: 3,
    },
    {
        question: 'What colour is Penny\'s sofa?',
        choice1: 'Turquoise',
        choice2: 'Orange',
        choice3: 'Yellow',
        answer: 1,
    },
    {
        question: 'What is Sheldon and Leonard\'s shower curtain decorated with?',
        choice1: 'Orange fish',
        choice2: 'The periodic table',
        choice3: 'Darth Vader helmets',
        answer: 2,
    },
    {
        question: 'Which Star Trek star has had numerous cameos as himself in The Big Bang Theory?',
        choice1: 'Will Wheaton',
        choice2: 'Patrick Stewart',
        choice3: 'Brent Spiner',
        answer: 1,
    },
    {
        question: 'What colour was Penny\'s wedding dress when she married Leonard?',
        choice1: 'White',
        choice2: 'Pink',
        choice3: 'Lilac',
        answer: 2,
    },
    {
        question: 'What was Sheldon\'s favourite Chinese called?',
        choice1: 'Wing Yip',
        choice2: 'Red Dragon',
        choice3: 'Szechuan Palace',
        answer: 3,
    },
    {
        question: 'What song does Sheldon make Penny sing to him whenever he\'s sick?',
        choice1: 'Soft Kitty',
        choice2: 'Warm Kitty',
        choice3: 'Baa Baa Black Sheep',
        answer: 1,
    },
    {
        question: 'Out of Sheldon, Howard and Raj, who is the only one NOT to have ever seen Penny naked?',
        choice1: 'Raj',
        choice2: 'Sheldon',
        choice3: 'Howard',
        answer: 3,
    },
    {
        question: 'What hangs above Howard\'s bed in his mum\'s house?',
        choice1: 'Two lightsaber',
        choice2: 'A pair of blow up boobs',
        choice3: 'A light-up, framed picture of the solar system',
        answer: 1,
    },
    {
        question: 'Which band sing The Big Bang Theory theme song?',
        choice1: 'The Lab Kids',
        choice2: 'The Rembrandts',
        choice3: 'Barenaked Ladies',
        answer: 3,
    },
    {
        question: 'Which character\'s mum is called Debbie?',
        choice1: 'Howard',
        choice2: 'Leonard',
        choice3: 'Sheldon',
        answer: 1,
    },
    {
        question: 'What age was Sheldon when he received his PhD?',
        choice1: '24',
        choice2: '16',
        choice3: '11',
        answer: 2,
    }
];

// Game Script

startGame = () => {
    questionCounter = 0;
    score = 0;
    availableQuestions = [...questions];
    getNewQuestion();
};

getNewQuestion = () => {
    if(availableQuestions.length === 0 || questionCounter > MAX_QUESTIONS) {
        localStorage.setItem('mostRecentScore', score);

        return window.location.assign('endquiz.html');
    }

    questionCounter++;
    progressText.innerText = `Question ${questionCounter} of ${MAX_QUESTIONS}`;
    progressBarFull.style.width = `${(questionCounter/MAX_QUESTIONS) * 100}%`;

    const questionsIndex = Math.floor(Math.random() * availableQuestions.length);
    currentQuestion = availableQuestions[questionsIndex];
    question.innerText = currentQuestion.question;

    choices.forEach(choice => {
        const number = choice.dataset.number;
        choice.innerText = currentQuestion['choice' + number];
    });

    availableQuestions.splice(questionsIndex, 1);

    acceptingAnswers = true;
};

// Event Listener Script

choices.forEach(choice => {
    choice.addEventListener('click', e => {
        if(!acceptingAnswers) return;

        acceptingAnswers = false;
        const selectedChoice = e.target;
        const selectedAnswer = selectedChoice.dataset.number;

        let classToApply = selectedAnswer == currentQuestion.answer ? 'correct' : 'incorrect';

        if(classToApply === 'correct') {
            incrementScore(SCORE_POINTS);
        }

        selectedChoice.parentElement.classList.add(classToApply);

        setTimeout(() => {
            selectedChoice.parentElement.classList.remove(classToApply);
            getNewQuestion();
        }, 1000);
    });
});

// Score Script

incrementScore = num => {
    score +=num;
    scoreText.innerText = score;
};

startGame();