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
var selectionobj1 = ["3","8","6","11"];
var questionObj1 = {questionText:"How many legs do 3 chicken have?",selectiontexts:selectionobj1,answer:3};
var selectionobj2 = ["12","16","8","10"];
var questionObj2 = {questionText:"How many legs do 4 pigs have?",selectiontexts:selectionobj2,answer:2};
var selectionobj3 = ["0","9","3","2"];
var questionObj3 = {questionText:"How many legs do 2 snakes have?",selectiontexts:selectionobj3,answer:1};
var selectionobj4 = ["2","5","6","0"];
var questionObj4 = {questionText:"How many tails do 3 person have?",selectiontexts:selectionobj4,answer:4};
var AllquestionObjs = [questionObj1,questionObj2,questionObj3,questionObj4];

//create JSON data
/*
function AJAX_get_json(){
  var hr = new XMLHttpRequest();
  hr.open("GET","qa.json",true);
  hr.sendRequestHeader("Content-type","application/json", true);
  hr.onreadystatechange = function(){
    if(hr.readyState == 4 && hr.status == 200){
      var data = JSON.parse(hr.responseText);
      $('#jsonready').html(data.question1.questionText);
    }
  }
  hr.send();
  $('#jsonready').html("requesting...");
}
*/


//show questions
function creatQuestion(){
  var i;
  var idname;
  //reset the proceed
  $('#proceed').html("");
  //document.getElementById("questionTitles").innerHTML = questionObj.questionText;
  $('#questionTitles').html(AllquestionObjs[questionNumber].questionText);
  for(i = 1; i<=4; i++){
    idname = "selection"+ i;
    document.getElementById(idname).innerHTML =
    "<div id=selection"+ i +" class=selectionClass> ("+i+") "+ AllquestionObjs[questionNumber].selectiontexts[i-1] +"</div>";
  }
  $('#selection1').on('click', checkAnswer);
  $('#selection2').on('click', checkAnswer);
  $('#selection3').on('click', checkAnswer);
  $('#selection4').on('click', checkAnswer);

  $('.selections').on('mouseover',function(){
    $('#'+event.target.id).css('background-color','#aaf');
  })
  $('.selections').on('mouseout',function(){
    $('#'+event.target.id).css('background-color','#fff');
  })
}

function questionPageAnimation(){
  $('#questionPage').hide();
  questionNumber++;
  creatQuestion();
  $('.selections').css('background-color','#fff');
  $('#questionPage').show();
}

//show result when user click any selection
function checkAnswer(){
  $('.selections').css('background-color','#fff');
  $('#'+event.target.id).css('background-color','#aaa'); //set selected color.
  //console.log(event.target.id);
  if(event.target.id == ("selection"+AllquestionObjs[questionNumber].answer)){
    //$('#proceed').html("<button id=correct>correct, next to...</button>");
    //remove eventhandler
    $('.selections').off();
    if(questionNumber==AllquestionObjs.length-1){
      $('#proceed').html("<div class=\"fade-in blue\">Correct! All questions are completed.</div>");
    }
    else{
      $('#proceed').html("<button id=next class=fade-in>correct, go to next.</button>");
      $('#next').on('click', questionPageAnimation);
    }
  }
  else{
    //$('#proceed').html("hint, answer is "+questionObj.answer+".");
    $('#proceed').html("<div class=fade-in style=color:red;>incorrect, hint:("+AllquestionObjs[questionNumber].answer+")</div>");
  }
  //document.getElementById("proceed").innerHTML = obj.id;
}

//process
//AJAX_get_json();
questionPageAnimation();
