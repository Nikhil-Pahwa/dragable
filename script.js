/* global PrimaryName */
angular.module('ExampleApp', ['ngDraggable','ui.bootstrap']).
      controller('MainCtrl', function ($scope,$sce,$compile) {
        $scope.centerAnchor = true;
        $scope.toggleCenterAnchor = function () {$scope.centerAnchor = !$scope.centerAnchor}
        $scope.draggableObjects = [ {name:'questions'}, {name:'checkbox'}, {name:'radiobutton'}, {name:'Date & Time'}];
        $scope.droppedObjects1 = [];
        $scope.droppedObjects2= [];
        $scope.isEditableState = false;
        $scope.divHtmlVar = $sce.trustAsHtml('');
        $scope.isPristine = true;
        $scope.questionList = [
                {
                        "type": "existing-question",
                        "label": "State of the working area?",
                        "buttonType":"radiobutton",
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
                        "isCommentEnable": "false",
                        "isImageUpload": "false",
                        "isVideoUpload": "false",
                },
                {
                        "type": "existing-question",
                        "label": "How was the survey?",
                        "buttonType":"checkbox",
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
                        "isCommentEnable": "true",
                        "isImageUpload": "false",
                        "isVideoUpload": "false",
                },
                {
                        "type": "new-question",
                        "label": "",
                        "buttonType":"checkbox",
                        "options": [],
                        "isCommentEnable": "false",
                        "isImageUpload": "false",
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
                angular.element($('.questionListContainer .dropableArea')).eq(index).find('.editableField').removeAttr('contenteditable');   
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
        
        $scope.saveNewQuestion = function(){
                
                $scope.questionList[$scope.questionList.length - 1].type = "existing-question";
                
                var obj =  {
                        "type": "new-question",
                        "label": "",
                        "buttonType":"checkbox",
                        "options": [],
                        "isCommentEnable": "false",
                        "isImageUpload": "false",
                        "isVideoUpload": "false",
                };
                
                $scope.questionList.push(obj);
                ab = $scope.questionList;
        }
        
        $scope.onDropComplete=function(data,index,isNewQuestion){              
               addHTMLToDragArea(data,index,isNewQuestion);                                    
        }
        
        $scope.addComponent = function(data,index,isNewQuestion){
               addHTMLToDragArea(data,index,isNewQuestion);   
        }
               
        var addHTMLToDragArea = function(data,index){
                if(data.name == "radiobutton"){
                        $scope.questionList[index].options.push({"optionKey":"dummy","optionState":"false"});
                }else if(data.name == "checkbox"){
                        $scope.questionList[index].options.push({"optionKey":"dummy","optionState":"false"});
                }else if(data.name == "questions"){
                        $scope.questionList[index].label = "This is a dummy question?";
                }             
                ab = $scope.questionList;
        }
        
     
      });