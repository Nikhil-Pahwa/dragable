/* global PrimaryName */
angular.module('ExampleApp', ['ngDraggable','ui.bootstrap']).
      controller('MainCtrl', function ($scope,$sce,$compile) {
        $scope.centerAnchor = true;
        $scope.toggleCenterAnchor = function () {$scope.centerAnchor = !$scope.centerAnchor}
        $scope.draggableObjects = [{name:'checkbox'},{name:'radiobutton'}, {name:'questions'}, {name:'Date & Time'}, {name:'multiple choice'}, {name:'Text Box'}];
        $scope.droppedObjects1 = [];
        $scope.droppedObjects2= [];
        $scope.isEditableState = false;
        $scope.divHtmlVar = $sce.trustAsHtml('');
        $scope.isPristine = true;
        $scope.questionListOld = [
                {
                        "id": "1",
                        "html": "<p class='editableField'>This is dummy first question</p>\
                                        <div class=''><input type='text' name='fname'></div>"
                },
                {
                        "id": "2",
                        "html": "<p class='editableField'>This is dummy second question</p>\
                                        <input type='date' name='bday'>"
                },
                {
                        "id": "3",
                        "html": ""
                }
        ];
        
        $scope.questionList = [
                {
                        "type": "single-choice",
                        "label": "State of the working area?",
                        "options": [
                                {
                                        "optionKey": "SUV",
                                        "optionState": "false"
                                },
                                {
                                        "optionKey": "Sedan",
                                        "optionState": "true"
                                },
                                {
                                        "optionKey": "hatchback",
                                        "optionState": "false"
                                }                               
                        ],
                        "isCommentEnable": "true",
                        "isImageUpload": "true",
                        "isVideoUpload": "true",
                },
                {
                        "type": "multiple-choice",
                        "label": "How was the survey?",
                        "options": [
                                {
                                        "optionKey": "Poor",
                                        "optionState": "false"
                                },
                                {
                                        "optionKey": "Ok",
                                        "optionState": "true"
                                },
                                {
                                        "optionKey": "Good",
                                        "optionState": "false"
                                }                               
                        ],
                        "isCommentEnable": "false",
                        "isImageUpload": "true",
                        "isVideoUpload": "false",
                }
        ];
        
        $scope.editQuestion = function(index){
                angular.element(document.querySelectorAll('.questionListContainer .question')).eq(index).find('.editableField').prop('contenteditable','true')
        }
        
        $scope.deleteQuestion = function(index){
                $scope.questionList.splice(index, 1);                
        }
        
        $scope.cancelQuestion = function(index){
             //   $scope.questionList.splice(index, 1);    
              angular.element($('.questionListContainer .dropableArea')).eq(index).find('.editableField').removeAttr('contenteditable');   
              //$scope.$apply();       
        }
        
        $scope.saveQuestion = function(index,isNewQuestion){
                var obj = {};
                angular.element($('.questionListContainer .dropableArea')).eq(index).find('.editableField').removeAttr('contenteditable');   
                if(isNewQuestion){
                        obj = {
                                "id": "",
                                "html":angular.element($('.questionListContainer .dropableArea')).eq(index).html()
                        }
                        //$scope.questionList.push(obj);
                        $scope.questionList.splice(index, 0, obj);
                        angular.element('.newQuestion .dropableArea').html("")
                }else{
                        $scope.questionList[index].html = angular.element($('.questionListContainer .dropableArea')).eq(index).html();
                }                                              
        }
        
        $scope.onDropComplete=function(data,index,isNewQuestion){              
               addHTMLToDragArea(data,index,isNewQuestion);                                    
        }
        
        $scope.addComponent = function(data,index,isNewQuestion){
               addHTMLToDragArea(data,index,isNewQuestion);   
        }
        
        $scope.trustAsHtml = $sce.trustAsHtml;
        
        var addHTMLToDragArea = function(data,index,isNewQuestion){
                if(data.name == "radiobutton"){
                        $scope.questionList[index].options.push({"optionKey":"dummy","optionState":"false"});
                }else if(data.name == "checkbox"){
                        $scope.questionList[index].options.push({"optionKey":"dummy","optionState":"false"});
                }
        //        if(isNewQuestion){
        //                angular.element($('.newQuestion')).append( getHTMLTemplate(data.name));  
        //                $scope.isPristine = false;
        //        }else{
        //                angular.element($('.questionListContainer .dropableArea')).eq(index).append( getHTMLTemplate(data.name));
        //        }                           
        }
        
        $scope.onDragSuccess1=function(data,evt){
            console.log("133","$scope","onDragSuccess1", "", evt);
            var index = $scope.droppedObjects1.indexOf(data);
            if (index > -1) {
                $scope.droppedObjects1.splice(index, 1);
            }
        }
        $scope.onDragSuccess2=function(data,evt){
            var index = $scope.droppedObjects2.indexOf(data);
            if (index > -1) {
                $scope.droppedObjects2.splice(index, 1);
            }
        }
        $scope.onDropComplete2=function(data,evt){
            var index = $scope.droppedObjects2.indexOf(data);
            if (index == -1) {
                $scope.droppedObjects2.push(data);
            }
        }
        
        var getHTMLTemplate = function(controlType){
              
              switch (controlType){
                      case 'questions': htmlTemplate = "<div><p class='editableField' contenteditable='true'>this is my question</p></div>";
                                        break;
                      case 'checkbox' : htmlTemplate = "<div class='editableField' contenteditable='true'><input type ='checkbox' name ='bike' value='bike' contenteditable='true'>Bike</div>"
                                        break;
                      case 'radiobutton' : htmlTemplate = "<input type ='radio' name ='state'>Dummy"
                                        break;
                      case 'Date & Time' : htmlTemplate = "<div><input type='date' name='bday'></div>"
                                        break;
                      case 'multiple choice' : htmlTemplate = "<div class='multiSelectQuestions'>\
                                                        <p class='editableField' contenteditable='true'>State of the working area?</p>\
                                                        <input type='radio' name='state' value='poor'> <span class='editableField' contenteditable>poor</span><br> \
                                                        <input type='radio' name='state' value='ok'> <span class='editableField' contenteditable>ok</span> <br> \
                                                        <input type='radio' name='state' value='best'><span class='editableField' contenteditable>Other</span> \
                                                </div>";
                                        break;
                      case 'Text Box' : htmlTemplate = "<div><input type='text' name='lname'></div>";
                                        break;
                                                                                
                      default:   htmlTemplate = "  <div ng-drop='true' ng-drop-success='onDropComplete1($data,$event)' class='newQuestion'>\
                                        <span ng-show='isPristine' style='display: block;text-align: center;margin-top: 14%;'>Drag Question type from left or click on them to add here</span>\
                                        </div>";
              }                       
              
              return htmlTemplate; 
        }
        
        $scope.saveTemplate = function(){ console.log($scope.questionList);
                // var data = {
                //         "type": question.PrimaryName || "",
		// 	"label": query.SecondaryName || "",
		// 	"options": query.PreSchoolBoard || "",
		// 	"comment": query.PrimaryBoard || ""
		// }
                
              
                
        }
        
      });