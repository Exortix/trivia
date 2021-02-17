var myArray = []
var count = 0;
var correct = 0;
var paused = false;


fetchQuestions();

function fetchQuestions() {
    $.ajax({
        method:'GET',
        url:'https://opentdb.com/api.php?amount=10',
        success:function (response) {
            myArray = response.results
        },
        complete: () => {
            buildQuestion(myArray)
            document.querySelector('#title').textContent = 'Trivia'
        }
    });
}

function buildQuestion(){
    document.querySelector('.question').innerHTML = '';
    document.querySelector('.answer-box').querySelector('.row').innerHTML = '';
    switch(myArray[count].type) {
        case "multiple":
            var question = `${myArray[count].question}`;
            var answer = `${myArray[count].correct_answer}`;
            document.querySelector('.question').innerHTML += question;
            
            var answers = [
                `<div class="col-6">
                    <button class="btn btn-primary container-fluid" id="answer">
                    ${myArray[count].correct_answer}
                    </button>
                </div>`
                ,
                `<div class="col-6">
                    <button class="btn btn-primary container-fluid">
                    ${myArray[count].incorrect_answers[0]}
                    </button>
                </div>`
                ,
                `<div class="col-6">
                <button class="btn btn-primary container-fluid">
                ${myArray[count].incorrect_answers[1]}
                </button>
                </div>`
                ,
                `<div class="col-6">
                <button class="btn btn-primary container-fluid">
                ${myArray[count].incorrect_answers[2]}
                </button>
                </div>`    
            ]

            shuffle(answers);
            answers.forEach(a => {
                document.querySelector('.answer-box').querySelector('.row').innerHTML += a;
            });
            break;

        case "boolean":
            var question = `${myArray[count].question}`;
            var answer = `${myArray[count].correct_answer}`;
            document.querySelector('.question').innerHTML += question;
            
            var answers = [
                `<div class="col-6">
                    <button class="btn btn-primary container-fluid answer">
                    True
                    </button>
                </div>`
                ,
                `<div class="col-6">
                    <button class="btn btn-primary container-fluid">
                    False
                    </button>
                </div>`   
            ]

            answers.forEach(a => {
                document.querySelector('.answer-box').querySelector('.row').innerHTML += a;
            });
            break;
    }

    function changeButtons() {
        if (this.id == 'answer' || this.textContent.trim() == answer) {
            correct++;
        }
        document.querySelectorAll('.btn.container-fluid').forEach(a => {
            if (a.id == 'answer' || a.textContent.trim() == answer) {
                a.style.transition
                a.style.backgroundColor = "#089404";
            } else {
                a.style.backgroundColor = "red";
            }
            a.classList+=' done';
            
            document.querySelector("#nextButton").style.display = 'block';
            a.removeEventListener("click", changeButtons);
        });
    }

    document.querySelectorAll('.btn.container-fluid').forEach(b => {
        b.addEventListener("click", changeButtons);
    });
}

function next() {
    count++;
    document.querySelector("#title").textContent = `${correct}/${count}`;
    try {
        buildQuestion(myArray);
    } catch (error) {
        alert(`You got ${correct}/${count}`)
        count = 0;
        correct = 0;
        fetchQuestions();
    }
    document.querySelector("#nextButton").style.display = 'none';
}


function shuffle(array) {
    var currentIndex = array.length, temporaryValue, randomIndex;
  
    // While there remain elements to shuffle...
    while (0 !== currentIndex) {
  
      // Pick a remaining element...
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex -= 1;
  
      // And swap it with the current element.
      temporaryValue = array[currentIndex];
      array[currentIndex] = array[randomIndex];
      array[randomIndex] = temporaryValue;
    }
  
    return array;
  }