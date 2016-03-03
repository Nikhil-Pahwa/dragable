/* global PrimaryName */
angular.module('ExampleApp', ['ngDraggable','ui.bootstrap']).
      controller('MainCtrl', function ($scope,$sce,$compile,$http) {
        $scope.draggableObjects = [ {name:'questions'}, {name:'checkbox'}, {name:'radiobutton'}, {name:'datetime'}];        
        $scope.status = {
                                isFirstOpen: false,
                                isFirstDisabled: false
                        };
  
        $scope.oneAtATime = false;
         $scope.sortableOptions = {
        handle: ' .handle'
        // items: ' .panel:not(.panel-heading)'
        // axis: 'y'
    }
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
        
        $http.get("http://10.175.173.208:8080/commutingdb/findById?id=11")
           .then(function(response) {
        	$scope.questionList = JSON.parse(response.data.templateJsonB);
        	
        	//$scope.addNewQuestionTemplate();
        	console.log("*** ",$scope.questionList)
        }); 
        
        $scope.newQuestionTemplate = function(){
                
                $scope.newQuestion = {
                        "type": "new-question",
                        "label": "",
                        "buttonType":"",
                        "options": [],
                        "isCommentEnable": false,
                        "isImageUpload": false,
                        "isVideoUpload": false,
                };                                     
        }
        
        $scope.saveNewQuestion = function(isNewQuestion){
               if(isNewQuestion){
                     $scope.newQuestion.type = "existing-question";
                     $scope.questionList.push($scope.newQuestion);  
                     $scope.newQuestionTemplate();  
               }    
               $http.post('saveTemplate',JSON.stringify($scope.questionList)).then(function (response) {
    			 alert(response);
	    	}, function (error) {
	          alert(response);
	       });                    
        }
        
        $scope.newQuestionTemplate();
        
        $scope.deleteQuestion = function(index,event){
                event.preventDefault()
                $scope.questionList.splice(index, 1);                                
        }
        
        $scope.cancelQuestion = function(index){
                angular.element($('.questionListContainer .dropableArea')).eq(index).find('.editableField').removeAttr('contenteditable');   
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
               
                ab = $scope.newQuestion; 
        }
      });