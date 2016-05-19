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

//create JSON data for test
var AllJSONdata =
'{"Allquestions":['+
    '{"name":"name1","age":17},'+
    '{"name":"name2","age":20},'+
    '{"name":"name3","age":21}]}';

var AllJSONobj = JSON.parse(AllJSONdata);
console.log("JSON data is "+AllJSONobj.Allquestions[0].name);


//using ajax to get JSON data
/*
$.ajax({
       url: "js/qa.json",
           //force to handle it as text
       dataType: "text",
            success: function (dataTest) {

                //data downloaded so we call parseJSON function
                //and pass downloaded data
                var json = $.parseJSON(dataTest);
                //now json variable contains data in json format
                //let's display a few items
                $.each(json, function (i, jsonObjectList) {
                for (var index = 0; index < jsonObjectList.listValue_.length;index++) {
                      alert(jsonObjectList.listKey_[index][0] + " -- " + jsonObjectList.listValue_[index].description_);
                      }
                 });


             }
  });
*/

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
function createQuestion(){
  var i;
  var idname;
  //reset the proceed
//  $('#proceed').html("");
  //document.getElementById("questionTitles").innerHTML = questionObj.questionText;
  $('#questionTitles').html((questionNumber+1)+". "+AllquestionObjs[questionNumber].questionText);
  for(i = 1; i<=4; i++){
    idname = "selection"+ i;
    document.getElementById(idname).innerHTML =
    i+". "+AllquestionObjs[questionNumber].selectiontexts[i-1];
    //"<div id=selection"+ i +" class=selectionClass> ("+i+") "+ AllquestionObjs[questionNumber].selectiontexts[i-1] +"</div>";
  }

  //reset hinttext & gotonext item
  $('#hinttext').html("incorrect, hint:("+AllquestionObjs[questionNumber].answer+")");
  $('#hinttext').hide();

  $('#gotonext').off();
  $('#gotonext').hide();

  //add eventhandler
  $('.selectionClass').on('click', checkAnswer);

  $('.selectionClass').on('mouseover',function(){
    $('#'+event.target.id).css('background-color','#aaf');
  });
  $('.selectionClass').on('mouseout',function(){
    $('#'+event.target.id).css('background-color','#fff');
  });
}

function questionPageAnimation(){
  if(questionNumber == -1){
    $('#start').off();
    $('#start').hide();
  }

  $('#questionPage').hide();

  questionNumber++;
  createQuestion();
  $('.selections').css('background-color','#fff');
  $('#questionPage').show();
}

//show result when user click any selection
function checkAnswer(){
  $('.selectionClass').css('background-color','#fff');
  $('#'+event.target.id).css('background-color','#aaa'); //set selected color.
  //console.log(event.target.id);
  if(event.target.id == ("selection"+AllquestionObjs[questionNumber].answer)){
    //hide hint
    $('#hinttext').hide();

    //$('#proceed').html("<button id=correct>correct, next to...</button>");
    //remove eventhandler
    $('.selectionClass').off();
    if(questionNumber==AllquestionObjs.length-1){
      console.log("id:"+event.target.id);
      //$('#proceed').html("<div id=next class=\"fade-in blue\">Correct! All questions are completed.</div>");
      $('#gotonext').html("Correct! All questions are completed.");
      $('#gotonext').show();
    }
    else{
      //$('#proceed').html("<button id=next class=fade-in>correct, go to next.</button>");
      $('#gotonext').html("correct, go to question:"+(questionNumber+2));
      $('#gotonext').show();
      $('#gotonext').on('click', questionPageAnimation);
    }
  }
  else{
    //$('#proceed').html("<div class=fade-in style=color:red;>incorrect, hint:("+AllquestionObjs[questionNumber].answer+")</div>");
    $('#hinttext').show();
    $('#gotonext').hide();
  }
}

//process
//AJAX_get_json();
$('#start').on('click', questionPageAnimation);
