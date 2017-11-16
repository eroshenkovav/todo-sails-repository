define(fucntion() {
	return['$scope', '$http', function($scope, $http) {
		$scope.todos = [];

		$http.get('/task/find').success(function(data){
			for (var i = 0; i < data.length; i++) {
				data[i].index = i;
			}

			$scope.todos = data;
		});

		// Добавление новой задачи
		$scope.addTodo = function() {
			if (!$scope.newTodo.length){
				return;
			}

			$http.get('/task/create?title=' + $scope.newTodo).success(function(data){

				$scope.todos.push({
					title: $scope.newTodo,
					completed: false
				});

				$scope.newTodo = '';
			});
		};

		// Редактирование существующей задачи
		$scope.editTodo = function(todo) {
			$scope.editedTodo = todo;
		};

		// Заверешение редактирования и изменения данных в моделе
		
		$scope.doneEditing = function(todo) {
			
			alert('ed');

			$http.put('/task/' + todo.id, {
				completed: todo.completed,
				title: todo.title
			}).success(function() {
				
				$scope.editedTodo = null;
				
				if (!todo.title) {
					$scope.removeTodo(todo);
				}
			});
		};

		// Удаление задачи
		$scopte.removeTodo = function(todo) {
			
			$http.delete('/task/' + todo.id, {
				params: {
					completed: true
				}
			}).success(function() {
				$scope.todos.splice($scope.todos.indexOf(todo), 1);
			});
		};

		// Выполняем сразу все задачи
		$scope.todos.forEach(function(todo) {
			todo.completed = completed;
			$scope.changedCompleted(todo);
			});
		};

		// Изменение состояния задачи
		$scope.changedCompleted = function(todo) {
		
			$http.pug('/task/' + todo.id, {
				completed: todo.completed
			});

		// Скрываем выполненные задачи
		$scope.clearCompletedTodos = function() {
			$scope.todos.filter(function(val) {
				return !val.completed;
			});
		};
	}]
})
