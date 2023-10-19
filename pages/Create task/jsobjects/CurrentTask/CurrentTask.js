export default {
	Task:undefined,
	NextStatuses:undefined,
	TaskStatuses:undefined,
	

	getTask(){
		if(_.isUndefined(this.Task)){
			this.Task = GetTask.data;
		}
		return this.Task;
	},
	

	saveAndGoToPage(){
		CreateTask.run().then(task =>{
			navigateTo('Task', {id:task.id}, 'SAME_WINDOW');
		}).catch((err)=>{
			console.log(err)
			showAlert("Error task creation, please try agin later");
		});
		
	},
	
	getParentForSubtask(){
		if(!_.isUndefined(appsmith.URL.queryParams.parentId)){
			return GetTaskById.run({taskId:appsmith.URL.queryParams.parentId}).then((t)=>{
				showAlert(t);
				return 'Subtask for: '+t.id+'-'+t.name;
			}).catch((err)=>{
				showAlert(err)
				return 'Parent with id '+appsmith.URL.queryParams.parentId+' not found';
			});
		}else{
		
			let myPromise = new Promise(function(myResolve, myReject) {
			// "Producing Code" (May take some time)
			let data;
  		myResolve(); // when successful
  		myReject();  // when error
			});
			return myPromise.then((obj)=>{
				return "Task creation";
			});
		}
		
		
	}
	
	
	
	
}