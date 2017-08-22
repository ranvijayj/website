function focusOnInput() {
            //alert('test');
            document.getElementById('newInput').focus();
        }
document.getElementById("newInput").addEventListener("click", function (event) {
	//window.event.cancelBubble = true;
	event.stopPropagation();
});

var app = angular.module('Console', [ 'ngSanitize' ]);
		app.controller('consoleController',['$scope','$filter','$http','$sce', function($scope, $filter, $http) {
									$scope.userName = "vinay:~ $ ";
									$scope.history = [];
									$scope.commands = [
											 {'cmd' : 'hostname','description' : 'view a short introduction about me'}
											,{'cmd' : 'contact','description' : 'view my contact info'}
											,{'cmd' : 'resume','description' : 'open my resume in a new tab'}
											,{'cmd' : 'linkedin','description' : 'open my LinkedIn profile in a new tab'}
											,{'cmd' : 'projects','description' : 'display some of my projects with description'}
											,{'cmd' : 'clear','description' : 'clear the screen'}
											//,{'cmd' : 'exit', 'description' : 'closes this terminal window'}
											//,{ 'cmd': 'hire', 'description': 'initiate hiring protocol' }
									];
									//$scope.commands = $filter('orderBy')($scope.commands, 'cmd', false);
									function getCommandList() {
										var result = '<table>';
										angular.forEach($scope.commands,
												function(value, key) {
													result += "<tr><td>"+ value.cmd + "</td><td>: " + value.description + "</td></tr>";
												});
										result += '</table>';
										return result;
									};
									
									$scope.projects = [
											{	
		'title' 		: 'Haptik iOS App'
		,'company'		: 'Haptik Inc'
		,'description' 	: "Haptik is India's first Conversational Commerce platform that is powered by both AI and real humans and we aim to redefine the way people get their everyday jobs done using chat as the underlying interface."
		,'link'			: 'https://itunes.apple.com/in/app/haptik-personal-assistant/id640450339?mt=8'
		,'skills'		: 'Core Data, MQTT, Core Animation, Core Graphics'
		},
		{	
		'title' 		: 'Crime  Analysis  Software '
		,'company'		: 'C.I.D Madhya Pradesh Government'
		,'description' 	: 'Developed  and  deployed  an online system to categorize FIR of various crimes lodged all over the province to generate reports, graphs and statistical data. This project is being used by Madhya Pradesh Police Department. (you can see my name in the source code :D)'
		,'link'			: 'http://cid.mppolice.gov.in/crime_analysis'
		,'skills'		: ''
		}
									];
									function getProjectList(){
										var result = '<table class="projects">';
										angular.forEach($scope.projects,
												function(project, key) {
													var pdescription = project.description;
													if (project.link != '') pdescription = "<a href='"+project.link+"' target='_blank'>"+project.link+"</a><br/>"+project.description;
													result += "<tr><td class='pre'>"+ project.title + "</td><td>" + pdescription + "</td></tr>";
													result += "<tr><td class='pre'> </td><td> </td></tr>";
												});
										result += '</table>';
										return result;
									};
									$scope.submit = function() {
										if ($scope.newInput==null) $scope.newInput = '';
										$scope.newInput = $scope.newInput.trim();
										if (true) {
											var input = $scope.newInput.toLowerCase();
											var result;
											switch (input) {
											case '':
											case null:
												result = '';
												break;
											case 'contact':
												result 	= "mob\t\t: <a href='tell://(+91) 898-317-8287'>(+91) 898-317-8287</a>"
														+ "<br/>mob\t\t: <a href='tell://(+91) 998-124-1341'>(+91) 998-124-1341</a>"
														+ "<br/>email\t: <a href='mailto://vinay.jn7@gmail.com'>mailto://vinay.jn7@gmail.com</a><br/>";
												break;
											case 'hostname':
												result = "Hello there! my name is Vinay Jain. "
														+"<br/>I currently live in Mumbai, working with Haptik."
														+"<br/>My hometown is Indore, the foodie city of Madhya Pradesh."
														+"<br/>I am passionate about programming, cycling and cooking."
														+"<br/>";
												break;
											case 'resume':
												document.getElementById('link_resume').click();
												break;
											case 'linkedin':
												document.getElementById('link_linkedin').click();
												result = "profile opened in new tab"
												break;
											
											case 'help':
												result = getCommandList();
												break;
											case 'projects':
												result = "List of some of my projects and their descriptions:<br/>"
														+getProjectList();
												break;
											case 'exit':
												window.open('','_self').close();
												//window.close();
												break;
											default:
												result = '-bash:\tcommand not found: '
														+ $scope.newInput
														+ '<br/>\t\tuse \'help\' to show list of available commands <br/>';
											}
											$scope.history.push({
												'cmd' : $scope.newInput,
												'result' : result
											});
											if ($scope.newInput == 'clear') {
												$scope.history = [];
											}
											$scope.newInput = '';
										}
									};
									$scope.getHTML = function(x) {
										return x;
									}
		}]);
		
/*		
var intervalId = setInterval(function() {
		document.getElementById('newInput').focus();
	}, 50);
window.addEventListener("focus", function() {
	intervalId = setInterval(function() {
		document.getElementById('newInput').focus();
	}, 50);
});

window.addEventListener("blur", function() {
	clearInterval(intervalId);
});
*/

		
