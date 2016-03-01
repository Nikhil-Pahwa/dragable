/* global PrimaryName */
angular.module('ExampleApp', ['ngDraggable','ui.bootstrap']).
      controller('MainCtrl', function ($scope,$sce,$compile) {
        $scope.centerAnchor = true;
        $scope.toggleCenterAnchor = function () {$scope.centerAnchor = !$scope.centerAnchor}
        $scope.draggableObjects = [ {name:'questions'}, {name:'checkbox'}, {name:'radiobutton'}, {name:'datetime'}];        
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
        
        $scope.addNewQuestionTemplate();
        
        $scope.deleteQuestion = function(index){
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
               
        var addHTMLToDragArea = function(data,index){
           
             switch(data.name){
                        case "radiobutton":  if($scope.questionList[index].buttonType == "radiobutton" || $scope.questionList[index].buttonType == ""){
                                                $scope.questionList[index].buttonType = "radiobutton";
                                                $scope.questionList[index].options.push({"optionKey":"dummy","optionState":"false"});    
                                             }
                                             break;
                                             
                        case "checkbox":     if($scope.questionList[index].buttonType == "checkbox" || $scope.questionList[index].buttonType == ""){
                                                $scope.questionList[index].buttonType = "checkbox";
                                                $scope.questionList[index].options.push({"optionKey":"dummy","optionState":"false"});
                                             }
                                             break;      
                                                   
                        case "questions":    $scope.questionList[index].label = "This is a dummy question?";
                                             break;
                                                         
                        case "datetime":     $scope.questionList[index].isDateTime =true;
                                             break;                       
                                                            
                        case "comment":      $scope.questionList[index].isCommentEnable =true;
                                             break;   
                                             
                        case "imageupload":  $scope.questionList[index].isImageUpload =true;
                                             break;         
                                             
                        case "videoupload":  $scope.questionList[index].isVideoUpload =true;
                                             break;   
                                                                                                                                                                                                                                                                                                                                    default:             console.log('Element is not handled');                 
               }
               
                ab = $scope.questionList; 
        }
      });