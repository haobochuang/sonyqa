//import JSON data
//var allQuestions = $parseJSON();

/*
$(function(){
    $.getJSON("qa.json",function(data){
        allQuestions = data.sonyqa;
        //console.log('json loaded successfully');
    }).error(function(){
        //console.log('error: json not loaded');
    });
});
*/
//document.getElementById("questionTitles").innerHTML = allQuestions[0].questionTitle;

//which question it is now
var questionNumber = -1;

//question data
var selectionobj1 = ["1.1st selection","1.2nd selection","1.3rd selection","1.4th selection"];
var questionObj1 = {questionText:"the first quesiton is...",selectiontexts:selectionobj1,answer:3};
var selectionobj2 = ["2.1st selection","2.2nd selection","2.3rd selection","2.4th selection"];
var questionObj2 = {questionText:"the 2nd quesiton is...",selectiontexts:selectionobj2,answer:2};
var selectionobj3 = ["3.1st selection","3.2nd selection","3.3rd selection","3.4th selection"];
var questionObj3 = {questionText:"the 3rd quesiton is...",selectiontexts:selectionobj3,answer:1};
var selectionobj4 = ["4.1st selection","4.2nd selection","4.3rd selection","4.4th selection"];
var questionObj4 = {questionText:"the 4th quesiton is...",selectiontexts:selectionobj4,answer:4};


var AllquestionObjs = [questionObj1,questionObj2,questionObj3,questionObj4];

//show questions
function creatQuestion(){
  var i;
  var idname;
  questionNumber++;
  //reset the proceed
  $('#proceed').html("");
  //document.getElementById("questionTitles").innerHTML = questionObj.questionText;
  $('#questionTitles').html(AllquestionObjs[questionNumber].questionText);
  for(i = 1; i<=4; i++){
    idname = "selection"+ i;
    document.getElementById(idname).innerHTML =
    "<div id=selection"+ i +" class=selectionClass> "+ AllquestionObjs[questionNumber].selectiontexts[i-1] +"</div>";
  }
}

//show result when user click any selection
function checkAnswer(){
  if(event.target.id == ("selection"+AllquestionObjs[questionNumber].answer)){
    //$('#proceed').html("<button id=correct>correct, next to...</button>");
    if(questionNumber==AllquestionObjs.length-1){
      $('#proceed').html("Correct! All questions are completed.");
    }
    else{
      $('#proceed').html("<button id=next>correct, go to next.</button>");
    $('#next').on('click', creatQuestion);
    }
  }
  else{
    //$('#proceed').html("hint, answer is "+questionObj.answer+".");
    $('#proceed').html("<div>incorrect, hint:("+AllquestionObjs[questionNumber].answer+")</div>");
  }
  //document.getElementById("proceed").innerHTML = obj.id;
}

//process
creatQuestion(questionNumber);

$('#selection1').on('click', checkAnswer);
$('#selection2').on('click', checkAnswer);
$('#selection3').on('click', checkAnswer);
$('#selection4').on('click', checkAnswer);
