const start_btn = document.querySelector(".start-btn button");
const info_box = document.querySelector(".info-box");
const exit_btn = info_box.querySelector(".buttons .quit");
const continue_btn = info_box.querySelector(".buttons .restart");
const quiz_box = document.querySelector(".quiz-box");
const option_list = document.querySelector(".option-list");
const timeCount = quiz_box.querySelector(".timer .timer-sec");
const timeLine = quiz_box.querySelector("header .time-line");
const result_box = document.querySelector(".result-box");
const restart_quiz = result_box.querySelector(".buttons .restart");
const quit_quiz = result_box.querySelector(".buttons .quit");

start_btn.onclick = ()=>{
    info_box.classList.add("activeInfo");
}

exit_btn.onclick = ()=>{
    info_box.classList.remove("activeInfo");
}

continue_btn.onclick = () => {
  info_box.classList.remove("activeInfo");
  quiz_box.classList.add("activeQuiz");
  showQuestions(0);
  questionCounter(1);
  startTimer(15);
  startTimeLine(0);
};

let question_count = 0;
let question_num = 1;
let counter;
let timeValue = 15;
let widthValue = 0;
let userScore = 0;

function showQuestions(index){
    const question_text = document.querySelector(".q-text");
    let question_tag = '<span>' + questions[index].num +". " + questions[index].question + '</span>';
    let option_tag = '<div class="option">' + questions[index].options[0] + '<span></span></div>'
                    + '<div class="option">' + questions[index].options[1] + '<span></span></div>'
                    + '<div class="option">' + questions[index].options[2] + '<span></span></div>'
                    + '<div class="option">' + questions[index].options[3] + '<span></span></div>';
    question_text.innerHTML = question_tag;
    option_list.innerHTML = option_tag;
    const option = option_list.querySelectorAll(".option");
    for(let i=0; i<option.length; i++) {
        option[i].setAttribute("onclick", "optionSelected(this)");
    }
}

let tickIcon = '<div class="icon tick"><i class="fas fa-check"></i></div>';
let crossIcon = '<div class="icon cross"><i class="fas fa-times"></i></div>';

function optionSelected(answer){
    clearInterval(counter);
    clearInterval(counterLine);
    let userAns = answer.textContent;
    let correctAns = questions[question_count].answer;
    let allOptions = option_list.children.length;
    if(userAns == correctAns) {
        userScore += 1;
        answer.classList.add("correct");
        answer.insertAdjacentHTML("beforeend",tickIcon);
    } else {
        answer.classList.add("incorrect");
        answer.insertAdjacentHTML("beforeend", crossIcon);

        for(let i=0; i< allOptions; i++) {
            if(option_list.children[i].textContent == correctAns){
                option_list.children[i].setAttribute("class", "option correct");
                option_list.children[i].insertAdjacentHTML("beforeend", tickIcon);
            }
        }
    }

    // disable all options once answer is selected
    for (let i=0; i < allOptions; i++) {
        option_list.children[i].classList.add("disabled");
    }

    next_btn.style.display = "block";
}

const next_btn = quiz_box.querySelector(".next-btn");

next_btn.onclick = ()=>{
    if(question_count < questions.length-1){
        question_count++;
        question_num++;
        showQuestions(question_count);
        questionCounter(question_num);
        clearInterval(counter);
        startTimer(timeValue);
        clearInterval(counterLine);
        startTimeLine(widthValue);
        next_btn.style.display = "none";
    } else {
        // all questions have been answered
        showResultBox();
    }
}

function questionCounter(index){
    const bottom_q_counter = quiz_box.querySelector(".total-q");
    let totalQCountTag = '<span><p>'+ index + ' </p>of<p> ' + questions.length + '</p>Questions</span>';
    bottom_q_counter.innerHTML = totalQCountTag;
}

function startTimer(time){
    counter = setInterval(timer, 1000);
    function timer(){
        timeCount.textContent = time;
        time--;
        if(time < 9){
            let addZero = timeCount.textContent;
            timeCount.textContent = "0" + addZero;
        }
        if(time < 0){
            clearInterval(counter);
            timeCount.textContent = "00";
        }
    }
}

function startTimeLine(time){
    counterLine = setInterval(timer, 29);
    function timer(){
        time += 1;
        timeLine.style.width = time + "px";
        if(time>549){
            clearInterval(counterLine);
        }
    }
}

function showResultBox(){
    info_box.classList.remove("activeInfo");
    quiz_box.classList.remove("activeQuiz");
    result_box.classList.add("activeResult");
    const scoreText = result_box.querySelector(".score-text");
    let scoreTag = '<span>You got <p>' + userScore + '</p> out of <p>' + questions.length + '</p> right.</span>';
    scoreText.innerHTML = scoreTag;
}