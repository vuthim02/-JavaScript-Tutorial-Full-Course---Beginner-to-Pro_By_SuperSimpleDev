const LEVELS = [
    {
        name: 'Easy',
        desc: 'Basic arithmetic & string coercion',
        unlockThreshold: 0,
        questions: [
            {
                expr: '"5" + 2',
                choices: ['7', '"52"', '52', 'Error'],
                answer: 1,
                hints: ['Which operator is used?', 'The + operator', 'Addition or concatenation?'],
                explanation:
                    'The + operator triggers string concatenation when either operand is a string. "5" + 2 \u2192 "5" + "2" \u2192 "52".',
            },
            {
                expr: '5 * 2',
                choices: ['10', '"10"', '52', 'Error'],
                answer: 0,
                hints: [
                    'What type of operator is *?',
                    '* is for multiplication',
                    'Both operands are numbers',
                ],
                explanation:
                    'The * operator always performs numeric multiplication. 5 * 2 \u2192 10.',
            },
            {
                expr: 'true + 1',
                choices: ['2', 'true1', '1', 'NaN'],
                answer: 0,
                hints: ['What does true become as a number?', 'true converts to 1', '1 + 1 = 2'],
                explanation:
                    'The + operator coerces true to 1 (number). true + 1 \u2192 1 + 1 \u2192 2.',
            },
            {
                expr: 'false + 10',
                choices: ['false10', '10', '0', 'NaN'],
                answer: 1,
                hints: [
                    'What does false become as a number?',
                    'false converts to 0',
                    '0 + 10 = 10',
                ],
                explanation:
                    'The + operator coerces false to 0 (number). false + 10 \u2192 0 + 10 \u2192 10.',
            },
            {
                expr: '"5" - 1',
                choices: ['"51"', '4', '"4"', 'NaN'],
                answer: 1,
                hints: [
                    'Does - do string concatenation?',
                    'Only + does concatenation',
                    'The - operator coerces strings to numbers',
                ],
                explanation:
                    'The - operator only works with numbers. "5" is coerced to 5. "5" - 1 \u2192 5 - 1 \u2192 4.',
            },
            {
                expr: '+"42"',
                choices: ['"42"', '42', 'NaN', 'Error'],
                answer: 1,
                hints: ['What does unary + do?', 'Unary + converts to number', 'Number("42") = 42'],
                explanation:
                    'Unary + converts its operand to a number. +"42" \u2192 Number("42") \u2192 42.',
            },
            {
                expr: '!!"hello"',
                choices: ['true', 'false', '"hello"', 'Error'],
                answer: 0,
                hints: ['What does ! do?', '! negates the truthiness', '!! is double negation'],
                explanation:
                    '! converts to boolean and negates. !"hello" \u2192 false (truthy negated). !!"hello" \u2192 true.',
            },
            {
                expr: 'null + 1',
                choices: ['null1', '1', 'NaN', '0'],
                answer: 1,
                hints: ['What does null become as a number?', 'Number(null) = 0', '0 + 1 = 1'],
                explanation:
                    'null is coerced to 0 for numeric operations. null + 1 \u2192 0 + 1 \u2192 1.',
            },
            {
                expr: '"10" > 5',
                choices: ['true', 'false', '"false"', 'NaN'],
                answer: 0,
                hints: [
                    'Can > compare strings and numbers?',
                    'Strings are coerced to numbers',
                    'Number("10") = 10, 10 > 5',
                ],
                explanation:
                    'The > operator coerces strings to numbers. "10" \u2192 10, so 10 > 5 \u2192 true.',
            },
            {
                expr: '5 + +"5"',
                choices: ['55', '"55"', '10', 'NaN'],
                answer: 2,
                hints: ['What does +"5" do?', 'Unary + converts "5" to 5', '5 + 5 = 10'],
                explanation: 'The unary + before "5" converts it to 5. Then 5 + 5 = 10.',
            },
        ],
    },
    {
        name: 'Intermediate',
        desc: 'Abstract equality (==)',
        unlockThreshold: 7,
        questions: [
            {
                expr: 'null == undefined',
                choices: ['true', 'false', 'Error', 'NaN'],
                answer: 0,
                hints: [
                    'Check the ECMAScript spec for ==',
                    'null and undefined are special',
                    'null == undefined is always true',
                ],
                explanation:
                    'By the spec, null and undefined are equal with ==. They are only equal to each other and themselves.',
            },
            {
                expr: '0 == false',
                choices: ['true', 'false', 'Error', 'undefined'],
                answer: 0,
                hints: [
                    'What type is false?',
                    'Boolean is coerced to number',
                    'Number(false) = 0, so 0 == 0',
                ],
                explanation:
                    'With ==, a boolean is coerced to a number. false \u2192 0, so 0 == 0 \u2192 true.',
            },
            {
                expr: '"" == 0',
                choices: ['true', 'false', 'Error', 'undefined'],
                answer: 0,
                hints: [
                    'What type is ""?',
                    'String is coerced to number',
                    'Number("") = 0, so 0 == 0',
                ],
                explanation:
                    'With ==, a string is coerced to a number. Number("") \u2192 0, so 0 == 0 \u2192 true.',
            },
            {
                expr: '[] == 0',
                choices: ['true', 'false', 'Error', 'undefined'],
                answer: 0,
                hints: [
                    'What does [] become?',
                    'Object is coerced to primitive',
                    '[].toString() \u2192 "" \u2192 Number("") = 0',
                ],
                explanation:
                    '[] is an object, so ToPrimitive is called. [].toString() \u2192 "", Number("") \u2192 0. So [] == 0 \u2192 true.',
            },
            {
                expr: '" " == 0',
                choices: ['true', 'false', 'Error', '"0"'],
                answer: 0,
                hints: [
                    'What does whitespace become?',
                    'Number(" ") = 0',
                    '" " == 0 \u2192 0 == 0',
                ],
                explanation:
                    'A whitespace string is coerced to 0. Number(" ") \u2192 0, so 0 == 0 \u2192 true.',
            },
            {
                expr: '"false" == true',
                choices: ['true', 'false', 'Error', 'NaN'],
                answer: 1,
                hints: [
                    'What happens to boolean true?',
                    'true is coerced to 1',
                    'Number("false") = NaN, NaN != 1',
                ],
                explanation:
                    'true is coerced to 1. "false" is coerced to NaN. NaN != 1 \u2192 false.',
            },
            {
                expr: '"" == false',
                choices: ['true', 'false', 'Error', '"false"'],
                answer: 0,
                hints: [
                    'Follow the coercion chain',
                    '"" \u2192 0, false \u2192 0',
                    '0 == 0 \u2192 true',
                ],
                explanation:
                    'Both sides are coerced to numbers. Number("") \u2192 0, Number(false) \u2192 0. So 0 == 0 \u2192 true.',
            },
            {
                expr: '"1" == true',
                choices: ['true', 'false', 'Error', '"true"'],
                answer: 0,
                hints: ['Coerce both sides', 'true \u2192 1, "1" \u2192 1', '1 == 1 \u2192 true'],
                explanation: 'true is coerced to 1. "1" is coerced to 1. So 1 == 1 \u2192 true.',
            },
            {
                expr: '"0" == false',
                choices: ['true', 'false', 'Error', '"false"'],
                answer: 0,
                hints: ['Coerce both sides', 'false \u2192 0, "0" \u2192 0', '0 == 0 \u2192 true'],
                explanation: 'false \u2192 0, Number("0") \u2192 0. So 0 == 0 \u2192 true.',
            },
            {
                expr: '[] == false',
                choices: ['true', 'false', 'Error', 'undefined'],
                answer: 0,
                hints: [
                    'Two conversions happen',
                    'false \u2192 0, [] \u2192 "" \u2192 0',
                    '0 == 0 \u2192 true',
                ],
                explanation:
                    'false \u2192 0. [] \u2192 ToPrimitive: [].toString() \u2192 "", Number("") \u2192 0. 0 == 0 \u2192 true.',
            },
        ],
    },
    {
        name: 'Hard',
        desc: 'Objects, references & edge cases',
        unlockThreshold: 7,
        questions: [
            {
                expr: '[] == ![]',
                choices: ['true', 'false', 'Error', 'undefined'],
                answer: 0,
                hints: [
                    'What is ![]?',
                    '![] \u2192 false (arrays are truthy)',
                    '[] == false \u2192 true',
                ],
                explanation:
                    '![] \u2192 false (any object is truthy). Then [] == false \u2192 [] \u2192 "" \u2192 0, false \u2192 0. 0 == 0 \u2192 true.',
            },
            {
                expr: '[1] == 1',
                choices: ['true', 'false', '"1"', 'Error'],
                answer: 0,
                hints: [
                    'What does [1] become?',
                    '[1].toString() \u2192 "1"',
                    'Number("1") = 1, so 1 == 1',
                ],
                explanation:
                    '[1] is coerced via ToPrimitive. [1].toString() \u2192 "1", Number("1") \u2192 1. So [1] == 1 \u2192 true.',
            },
            {
                expr: '[1,2] == "1,2"',
                choices: ['true', 'false', 'NaN', 'Error'],
                answer: 0,
                hints: [
                    'What is [1,2].toString()?',
                    'Array toString joins with commas',
                    '"1,2" == "1,2" \u2192 true',
                ],
                explanation:
                    'Object vs string: [1,2].toString() \u2192 "1,2". Then "1,2" == "1,2" \u2192 true.',
            },
            {
                expr: '{} == {}',
                choices: ['true', 'false', 'Error', '"{}"'],
                answer: 1,
                hints: [
                    'Are these the same object?',
                    'Each {} creates a new object',
                    'Different references \u2192 not equal',
                ],
                explanation:
                    'Each object literal {} creates a new object in memory. Different references \u2192 false.',
            },
            {
                expr: '[] == []',
                choices: ['true', 'false', 'Error', '""'],
                answer: 1,
                hints: [
                    'Are these the same array?',
                    'Each [] creates a new array',
                    'Different references \u2192 not equal',
                ],
                explanation: 'Each [] creates a new array. Different references \u2192 false.',
            },
            {
                expr: '[] + {}',
                choices: ['"[object Object]"', '0', '"[]{}"', 'NaN'],
                answer: 0,
                hints: [
                    'What happens when an array is added?',
                    'Array.toString() \u2192 ""',
                    'Object.toString() \u2192 "[object Object]"',
                ],
                explanation:
                    'Both become strings. [].toString() \u2192 "", {}.toString() \u2192 "[object Object]". "" + "[object Object]" \u2192 "[object Object]".',
            },
            {
                expr: '{} + []',
                choices: ['0', '"[object Object]"', '"{}[]"', 'NaN'],
                answer: 0,
                hints: [
                    'In console, {} is treated as a block',
                    '+[] is the actual expression',
                    'Unary + on empty array \u2192 0',
                ],
                explanation:
                    'In the console, {} is parsed as an empty block, then +[] is evaluated. +[].toString() \u2192 +"" \u2192 0.',
            },
            {
                expr: 'Number([])',
                choices: ['0', 'NaN', '"0"', 'Error'],
                answer: 0,
                hints: [
                    'What is [] converted to?',
                    'ToPrimitive([]) for number',
                    '[].toString() \u2192 "", Number("") \u2192 0',
                ],
                explanation:
                    'Number([]) \u2192 ToPrimitive with hint "number". [].valueOf() \u2192 [] (object), [].toString() \u2192 "". Number("") \u2192 0.',
            },
            {
                expr: 'Number([1])',
                choices: ['NaN', '1', '"1"', 'Error'],
                answer: 1,
                hints: ['What is [1].toString()?', '"1"', 'Number("1") \u2192 1'],
                explanation: '[1].toString() \u2192 "1". Number("1") \u2192 1.',
            },
            {
                expr: 'Number([1,2])',
                choices: ['12', 'NaN', '3', '"1,2"'],
                answer: 1,
                hints: ['What is [1,2].toString()?', '"1,2"', 'Number("1,2") = NaN'],
                explanation:
                    '[1,2].toString() \u2192 "1,2". Number("1,2") cant parse the comma \u2192 NaN.',
            },
        ],
    },
    {
        name: 'Expert',
        desc: 'Built-in functions & edge cases',
        unlockThreshold: 7,
        questions: [
            {
                expr: 'Number(undefined)',
                choices: ['NaN', '0', '"undefined"', 'Error'],
                answer: 0,
                hints: [
                    'Can undefined be a number?',
                    'Number(undefined) is not 0',
                    'undefined cannot be converted to a number',
                ],
                explanation:
                    'Number(undefined) \u2192 NaN. Unlike null, undefined does not convert to 0.',
            },
            {
                expr: 'Boolean([])',
                choices: ['true', 'false', 'Error', '"true"'],
                answer: 0,
                hints: [
                    'Is an empty array truthy?',
                    'Empty arrays are still objects',
                    'All objects are truthy',
                ],
                explanation:
                    'Boolean([]) \u2192 true. An empty array is still an object, and all objects are truthy.',
            },
            {
                expr: 'parseInt("42px")',
                choices: ['42', 'NaN', '"42"', 'Error'],
                answer: 0,
                hints: [
                    'What does parseInt do?',
                    'It parses from start until invalid',
                    '"42px" \u2192 42, stops at p',
                ],
                explanation:
                    'parseInt reads digits from the start. "42px" \u2192 42 (stops at the non-numeric "p").',
            },
            {
                expr: '+""',
                choices: ['0', 'NaN', '""', '"0"'],
                answer: 0,
                hints: ['Unary + converts to number', 'Number("")', 'Number("") = 0'],
                explanation: 'Unary + converts to number. Number("") \u2192 0. So +"" \u2192 0.',
            },
            {
                expr: '!!"hello"',
                choices: ['true', 'false', '"hello"', 'Error'],
                answer: 0,
                hints: ['What does !! do?', 'Converts to boolean', '"hello" is truthy, so true'],
                explanation:
                    '!"hello" \u2192 false (negates truthy). !!"hello" \u2192 true (negates false).',
            },
            {
                expr: 'Number.isNaN("hello")',
                choices: ['false', 'true', 'Error', '"true"'],
                answer: 0,
                hints: [
                    'Does Number.isNaN coerce?',
                    'Unlike isNaN(), Number.isNaN does NOT coerce',
                    '"hello" is not NaN, its a string',
                ],
                explanation:
                    'Number.isNaN does NOT coerce. "hello" is not the value NaN, so false. (isNaN("hello") \u2192 true would coerce.)',
            },
            {
                expr: 'parseInt("")',
                choices: ['NaN', '0', '"0"', 'Error'],
                answer: 0,
                hints: [
                    'What number is an empty string?',
                    'parseInt needs at least one digit',
                    'No digits \u2192 NaN',
                ],
                explanation:
                    'parseInt("") \u2192 NaN. parseInt requires at least one valid digit character.',
            },
            {
                expr: 'parseFloat("3.14abc")',
                choices: ['3.14', 'NaN', '"3.14"', 'Error'],
                answer: 0,
                hints: ['parseFloat reads decimal numbers', '"3.14" is valid, stops at a', '3.14'],
                explanation: 'parseFloat reads "3.14" and stops at "a". Result: 3.14.',
            },
            {
                expr: 'typeof NaN',
                choices: ['"number"', '"NaN"', '"undefined"', '"object"'],
                answer: 0,
                hints: [
                    'What type is NaN?',
                    'NaN stands for Not-a-Number but...',
                    'typeof NaN \u2192 "number"',
                ],
                explanation:
                    'typeof NaN \u2192 "number". Despite meaning "Not-a-Number", NaN is of type number.',
            },
            {
                expr: 'Boolean("false")',
                choices: ['true', 'false', 'Error', '"false"'],
                answer: 0,
                hints: [
                    'Is a non-empty string truthy?',
                    '"" is empty, but "false" is not empty',
                    'Any non-empty string is truthy',
                ],
                explanation:
                    'Boolean("false") \u2192 true. The string "false" is non-empty, so it is truthy. Only "" is falsy among strings.',
            },
        ],
    },
];

const state = {
    level: 0,
    question: 0,
    total: 0,
    correct: 0,
    wrong: 0,
    challenge: false,
    timerId: null,
    timeLeft: 10,
    answered: false,
    hintLevel: 0,
    unlocked: [true, false, false, false],
    bestScores: [0, 0, 0, 0],
    selectedChoice: -1,
};

function loadProgress() {
    try {
        const d = JSON.parse(localStorage.getItem('jsTypeDetective'));
        if (d) {
            state.unlocked = d.unlocked || [true, false, false, false];
            state.bestScores = d.bestScores || [0, 0, 0, 0];
        }
    } catch {}
}

function saveProgress() {
    localStorage.setItem(
        'jsTypeDetective',
        JSON.stringify({
            unlocked: state.unlocked,
            bestScores: state.bestScores,
        })
    );
}

const $ = (s) => document.querySelector(s);
const $$ = (s) => document.querySelectorAll(s);

function showView(id) {
    $$('.main > div').forEach((el) => el.classList.add('hidden'));
    $(id).classList.remove('hidden');
}

function getScore(lv) {
    const info = state.bestScores[lv] || 0;
    return { total: 10, correct: info };
}

function renderMenu() {
    const grid = $('#levelGrid');
    grid.innerHTML = LEVELS.map((lv, i) => {
        const locked = !state.unlocked[i];
        const best = state.bestScores[i] || 0;
        return `<div class="level-card ${locked ? 'locked' : ''} ${state.level === i ? 'active' : ''}" data-level="${i}">
      <div class="lv-num">${locked ? '&#128274;' : 'Lv.' + (i + 1)}</div>
      <div class="lv-label">${lv.name}</div>
      ${!locked && best > 0 ? `<div class="lv-best">&#11088; ${best}/10</div>` : ''}
      <div style="font-size:0.68rem;color:var(--text-muted);margin-top:2px;">${lv.desc}</div>
    </div>`;
    }).join('');

    document.querySelectorAll('.level-card:not(.locked)').forEach((el) => {
        el.addEventListener('click', () => {
            state.level = parseInt(el.dataset.level);
            renderMenu();
        });
    });

    const hs = $('#highScoreDisplay');
    const rows = LEVELS.map((lv, i) => {
        const best = state.bestScores[i] || 0;
        const unlocked = state.unlocked[i];
        const pct = best > 0 ? Math.round((best / 10) * 100) : 0;
        const bar =
            best > 0 ? '\u2588'.repeat(best) + '\u2591'.repeat(10 - best) : '\u2591'.repeat(10);
        if (!unlocked) return `${lv.name}: \uD83D\uDD12`;
        return `${lv.name}: ${best}/10 \u2014 ${pct}%`;
    }).join('<br>');
    hs.innerHTML = rows ? 'High Scores<br>' + rows : 'Complete levels to track your high scores!';
}

function startGame() {
    state.question = 0;
    state.answered = false;
    state.hintLevel = 0;
    state.selectedChoice = -1;
    if (state.total === 0) {
        state.total = 0;
        state.correct = 0;
        state.wrong = 0;
    }
    showView('#gameView');
    renderQuestion();
    updateScoreBar();
    $('#menuBtn').classList.remove('hidden');
}

function renderQuestion() {
    const lv = LEVELS[state.level];
    const q = lv.questions[state.question];
    state.answered = false;
    state.hintLevel = 0;
    state.selectedChoice = -1;

    $('#levelLabel').textContent = 'Level ' + (state.level + 1) + ' \u2014 ' + lv.name;
    $('#qCounter').textContent = 'Question ' + (state.question + 1) + ' of ' + lv.questions.length;
    $('#progressFill').style.width = (state.question / lv.questions.length) * 100 + '%';
    $('#exprBox').innerHTML = q.expr;
    $('#exprBox').className = 'expr-box fade-in';
    $('#hintBox').textContent = '';
    $('#feedbackContainer').innerHTML = '';
    $('#submitBtn').disabled = true;
    $('#submitBtn').classList.remove('hidden');
    $('#nextBtn').classList.add('hidden');
    $('#hintBtn').disabled = false;

    const letters = ['A', 'B', 'C', 'D'];
    $('#choicesContainer').innerHTML = q.choices
        .map(
            (c, i) =>
                `<div class="choice" data-index="${i}">
      <span class="letter">${letters[i]}</span>
      <span>${c}</span>
    </div>`
        )
        .join('');

    document.querySelectorAll('.choice').forEach((el) => {
        el.addEventListener('click', () => selectChoice(parseInt(el.dataset.index)));
    });

    if (state.challenge) {
        startTimer();
    } else {
        $('#timerWrap').classList.add('hidden');
        stopTimer();
    }

    updateScoreBar();
}

function selectChoice(idx) {
    if (state.answered) return;
    state.selectedChoice = idx;
    document.querySelectorAll('.choice').forEach((el) => el.classList.remove('selected'));
    document.querySelectorAll('.choice')[idx].classList.add('selected');
    $('#submitBtn').disabled = false;
}

function submitAnswer() {
    if (state.answered || state.selectedChoice < 0) return;
    state.answered = true;
    stopTimer();

    const lv = LEVELS[state.level];
    const q = lv.questions[state.question];
    const correct = state.selectedChoice === q.answer;
    const choices = document.querySelectorAll('.choice');

    choices.forEach((el, i) => {
        el.classList.add('disabled');
        if (i === q.answer) el.classList.add('correct');
        if (i === state.selectedChoice && i !== q.answer) el.classList.add('wrong');
    });

    if (correct) {
        state.correct++;
    } else {
        state.wrong++;
    }
    state.total++;

    const letters = ['A', 'B', 'C', 'D'];
    const userAns = q.choices[state.selectedChoice];
    const correctAns = q.choices[q.answer];

    const fb = $('#feedbackContainer');
    fb.innerHTML = `<div class="feedback ${correct ? 'correct' : 'wrong'} fade-in">
    <div class="fb-title">${correct ? '\u2705 Correct!' : '\u274C Wrong!'}</div>
    <div class="fb-detail">${correct ? '' : 'Your answer: <strong>' + userAns + '</strong><br>'}Correct: <strong>${correctAns}</strong></div>
    <div class="fb-explain">${q.explanation}</div>
  </div>`;

    $('#submitBtn').classList.add('hidden');
    $('#nextBtn').classList.remove('hidden');
    updateScoreBar();
}

function nextQuestion() {
    const lv = LEVELS[state.level];
    state.question++;
    if (state.question >= lv.questions.length) {
        showLevelComplete();
    } else {
        renderQuestion();
    }
}

function showLevelComplete() {
    stopTimer();
    const lv = LEVELS[state.level];
    const correct = state.correct;
    const total = state.total;
    const wrong = state.wrong;
    const pct = Math.round((correct / lv.questions.length) * 100);
    const passed = correct >= lv.unlockThreshold;

    if (correct > (state.bestScores[state.level] || 0)) {
        state.bestScores[state.level] = correct;
        saveProgress();
    }

    if (passed && state.level + 1 < LEVELS.length) {
        state.unlocked[state.level + 1] = true;
        saveProgress();
    }

    let bigNumClass = 'good';
    if (pct < 50) bigNumClass = 'bad';
    else if (pct < 70) bigNumClass = 'ok';

    $('#levelLabel').textContent = 'Level ' + (state.level + 1) + ' \u2014 Complete!';
    $('#qCounter').textContent = '';
    $('#progressFill').style.width = '100%';
    $('#exprBox').innerHTML = `<div class="summary">
    <div class="big-num ${bigNumClass}">${correct}/${lv.questions.length}</div>
    <div class="summary-label">${pct >= 70 ? '\uD83C\uDF1F Level passed!' : pct >= 50 ? '\uD83D\uDCAA Almost there!' : '\uD83D\uDCD6 Keep studying!'}</div>
    <div class="summary-stats">
      <div><div class="stat-num" style="color:var(--green)">${correct}</div><div class="stat-label">Correct</div></div>
      <div><div class="stat-num" style="color:var(--red)">${wrong}</div><div class="stat-label">Wrong</div></div>
      <div><div class="stat-num" style="color:var(--accent)">${pct}%</div><div class="stat-label">Accuracy</div></div>
    </div>
  </div>`;

    $('#hintContainer').innerHTML = '';
    $('#choicesContainer').innerHTML = '';
    $('#feedbackContainer').innerHTML = '';
    $('#submitBtn').classList.add('hidden');
    $('#nextBtn').classList.add('hidden');
    $('#hintBtn').classList.add('hidden');

    const actionRow = $('#actionRow');
    const navHtml = `<button class="btn btn-outline btn-sm" id="retryBtn">\u21A9 Retry Level</button>
    ${passed && state.level + 1 < LEVELS.length ? `<button class="btn btn-success btn-sm" id="nextLevelBtn">Next Level \u2192</button>` : ''}
    <button class="btn btn-outline btn-sm" id="menuFromCompleteBtn">\u25C0 Menu</button>`;
    actionRow.insertAdjacentHTML('beforeend', navHtml);

    $('#retryBtn').addEventListener('click', () => {
        cleanupCompleteNav();
        startGame();
    });
    const nlBtn = $('#nextLevelBtn');
    if (nlBtn)
        nlBtn.addEventListener('click', () => {
            cleanupCompleteNav();
            state.level++;
            startGame();
        });
    $('#menuFromCompleteBtn').addEventListener('click', () => {
        cleanupCompleteNav();
        goToMenu();
    });

    updateScoreBar();
}

function cleanupCompleteNav() {
    const toRemove = ['#retryBtn', '#nextLevelBtn', '#menuFromCompleteBtn'];
    toRemove.forEach((s) => {
        const el = $(s);
        if (el) el.remove();
    });
    $('#hintBtn').classList.remove('hidden');
}

function goToMenu() {
    stopTimer();
    cleanupCompleteNav();
    showView('#menuView');
    renderMenu();
    $('#menuBtn').classList.add('hidden');
    $('#hintBtn').classList.remove('hidden');
    updateScoreBar();
}

function showHint() {
    const lv = LEVELS[state.level];
    const q = lv.questions[state.question];
    if (state.hintLevel < q.hints.length) {
        const h = $('#hintBox');
        const hintText = q.hints
            .slice(0, state.hintLevel + 1)
            .map((t) => t)
            .join('<br><span class="hint-arrow">\u2193</span><br>');
        h.innerHTML = hintText;
        state.hintLevel++;
        if (state.hintLevel >= q.hints.length) {
            $('#hintBtn').disabled = true;
        }
    }
}

function startTimer() {
    state.timeLeft = 10;
    $('#timerWrap').classList.remove('hidden');
    updateTimer();
    state.timerId = setInterval(() => {
        state.timeLeft--;
        updateTimer();
        if (state.timeLeft <= 0) {
            clearInterval(state.timerId);
            state.timerId = null;
            if (!state.answered) {
                selectChoice(-1);
                state.selectedChoice = -1;
                document.querySelectorAll('.choice').forEach((el, i) => {
                    el.classList.add('disabled');
                    const q = LEVELS[state.level].questions[state.question];
                    if (i === q.answer) el.classList.add('correct');
                });
                state.answered = true;
                state.wrong++;
                state.total++;
                const q = LEVELS[state.level].questions[state.question];
                const fb = $('#feedbackContainer');
                fb.innerHTML = `<div class="feedback wrong fade-in">
          <div class="fb-title">&#9200; Time\'s up!</div>
          <div class="fb-detail">Correct: <strong>${q.choices[q.answer]}</strong></div>
          <div class="fb-explain">${q.explanation}</div>
        </div>`;
                $('#submitBtn').classList.add('hidden');
                $('#nextBtn').classList.remove('hidden');
                updateScoreBar();
            }
        }
    }, 1000);
}

function stopTimer() {
    if (state.timerId) {
        clearInterval(state.timerId);
        state.timerId = null;
    }
}

function updateTimer() {
    const pct = (state.timeLeft / 10) * 100;
    const fill = $('#timerFill');
    fill.style.width = pct + '%';
    fill.className =
        'timer-fill' + (state.timeLeft <= 3 ? ' danger' : state.timeLeft <= 5 ? ' warning' : '');
    $('#timerText').textContent = state.timeLeft;
}

function updateScoreBar() {
    const t = state.total,
        c = state.correct,
        w = state.wrong;
    $('#totalQ').textContent = t;
    $('#correctQ').textContent = c;
    $('#wrongQ').textContent = w;
    $('#accPct').textContent = t > 0 ? Math.round((c / t) * 100) + '%' : '\u2014';
}

loadProgress();
renderMenu();
$('#menuBtn').classList.add('hidden');

$('#startBtn').addEventListener('click', startGame);
$('#challengeToggle').addEventListener('click', () => {
    state.challenge = !state.challenge;
    $('#challengeToggle').classList.toggle('on', state.challenge);
});
$('#submitBtn').addEventListener('click', submitAnswer);
$('#nextBtn').addEventListener('click', nextQuestion);
$('#hintBtn').addEventListener('click', showHint);
$('#menuBtn').addEventListener('click', goToMenu);
