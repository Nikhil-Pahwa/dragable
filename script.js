/* global PrimaryName */
angular.module('ExampleApp', ['ngDraggable','ui.bootstrap']).
      controller('MainCtrl', function ($scope,$sce,$compile) {
        $scope.draggableObjects = [ {name:'questions'}, {name:'checkbox'}, {name:'radiobutton'}, {name:'datetime'}];        
          $scope.status = {
    isFirstOpen: true,
    isFirstDisabled: false
  };
  
  $scope.oneAtATime = false;
        $scope.questionList = [
                {
                        "type": "existing-question",
                        "label": "State of the working area?",
                        "buttonType":"radiobutton",
                        "options": [
                                {
                                        "optionKey": "SUV",
                                        "optionState": false
                                },
                                {
                                        "optionKey": "Sedan",
                                        "optionState": false
                                },
                                {
                                        "optionKey": "hatchback",
                                        "optionState": false
                                }                               
                        ],
                        "isCommentEnable": false,
                        "isImageUpload": false,
                        "isVideoUpload": false,
                        "isDateTime": false
                },
                {
                        "type": "existing-question",
                        "label": "How was the survey?",
                        "buttonType":"checkbox",
                        "options": [
                                {
                                        "optionKey": "Poor",
                                        "optionState": false
                                },
                                {
                                        "optionKey": "Ok",
                                        "optionState": false
                                },
                                {
                                        "optionKey": "Good",
                                        "optionState": false
                                }                               
                        ],
                        "isCommentEnable": false,
                        "isImageUpload": false,
                        "isVideoUpload": false,
                        "isDateTime": false
                }
        ];
        
        $scope.newQuestion = {}; 
        
        $scope.addNewQuestionTemplate = function(){
                
                 var obj =  {
                        "type": "new-question",
                        "label": "",
                        "buttonType":"",
                        "options": [],
                        "isCommentEnable": false,
                        "isImageUpload": false,
                        "isVideoUpload": false,
                };
                
                $scope.questionList.push(obj);        
        }
        
   //     $scope.addNewQuestionTemplate();
        
        $scope.deleteQuestion = function(index,event){
                event.preventDefault()
                $scope.questionList.splice(index, 1);                                
        }
        
        $scope.cancelQuestion = function(index){
                angular.element($('.questionListContainer .dropableArea')).eq(index).find('.editableField').removeAttr('contenteditable');   
        }
        
        $scope.saveNewQuestion = function(){
               $scope.questionList[$scope.questionList.length - 1].type = "existing-question";
               $scope.addNewQuestionTemplate();          
        }
        
        $scope.onDropComplete=function(data,index,isNewQuestion){              
               addHTMLToDragArea(data,index,isNewQuestion);                                    
        }
        
        $scope.addComponent = function(data,index,isNewQuestion){
               addHTMLToDragArea(data,index,isNewQuestion);   
        }
               
        var addHTMLToDragArea = function(data,index,isNewQuestion){
             
             var elem = (isNewQuestion)?   $scope.newQuestion: $scope.questionList[index];
            
             switch(data.name){
                     
                        case "radiobutton":  if(elem.buttonType == "radiobutton" || elem.buttonType == ""){
                                                elem.buttonType = "radiobutton";
                                                elem.options.push({"optionKey":"dummy","optionState":"false"});    
                                             }
                                             break;
                                             
                        case "checkbox":     if(elem.buttonType == "checkbox" || elem.buttonType == ""){
                                                elem.buttonType = "checkbox";
                                                elem.options.push({"optionKey":"dummy","optionState":"false"});
                                             }
                                             break;      
                                                   
                        case "questions":    elem.label = "This is a dummy question?";
                                             break;
                                                         
                        case "datetime":     elem.isDateTime =true;
                                             break;                       
                                                            
                        case "comment":      elem.isCommentEnable =true;
                                             break;   
                                             
                        case "imageupload":  elem.isImageUpload =true;
                                             break;         
                                             
                        case "videoupload":  elem.isVideoUpload =true;
                                             break;   
                                                                                                                                                                                                                                                                                                                                    default:             console.log('Element is not handled');                 
               }
               
                ab = $scope.questionList; 
        }
      });