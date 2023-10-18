export default {
	Task:undefined,
	NextStatuses:undefined,
	TaskStatuses:undefined,
	
	getTaskStatuses(){
		if(_.isUndefined(this.TaskStatuses)){
			this.TaskStatuses = TaskStatuses.run();
		}
		return this.TaskStatuses;
	},
	getTask(){
		if(_.isUndefined(this.Task)){
			this.Task = GetTask.data;
		}
		return this.Task;
	},
	
	getAvailableNextStatus(){
		var t = this.getTask();
		if(_.isUndefined(this.NextStatuses)||_.isEmpty(this.NextStatuses)){
			if(_.isUndefined(t.status_id)){
				this.NextStatuses =  AvailableNextStatus.run({id:t?.status.id})	
			}else{
				this.NextStatuses = AllAvailableNextStatuses.data;
			}
		}
		return this.NextStatuses;
	},

	
	
	
	getCurrentStatus(){
		return this.getTaskStatuses().then((statuses)=>{
				return statuses.filter((status)=> status.id == this.getTask().status_id).at(0);
		});
	},
	saveAndGoToPage(){
		CreateTask.run().then(task =>{
			navigateTo('Task', {id:task.id}, 'SAME_WINDOW');
		}).catch(err=>{
			showAlert('Cant create task, please try again later');
		});
		
	},
	
	getParentForSubtask(){
		if(!_.isUndefined(appsmith.URL.queryParams.parentId)){
			return GetTaskById.run({taskId:appsmith.URL.queryParams.parentId}).catch((err)=>{
				showAlert('Error getting parent task. Please, try again later')
				return 'Parent with id '+appsmith.URL.queryParams.parentId+' not found';
			}).then((task)=>{
				return 'Subtask for:'+task.id+'-'+task.name;
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