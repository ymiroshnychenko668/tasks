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
			console.log(err);
			showAlert("Error task creation, please try agin later");
		});
		
	},
	
	discardAndBack(){
		let back = appsmith.store.backParams;
		let backParams = _.isUndefined(appsmith.store.backParams.prevBack)?appsmith.store.backParams:appsmith.store.backParams.prevBack;
		storeValue('backParams',backParams);
		navigateTo(back.backPage, back.urlParams, 'SAME_WINDOW');
	},
	
	getParentForSubtask(){
		if(!_.isUndefined(appsmith.URL.queryParams.parentId)){
			return GetParent.run().then((t)=>{
				showAlert(t);
				return 'Subtask for: '+t.id+'-'+t.name;
			}).catch((err)=>{
				showAlert('Parent with id '+appsmith.URL.queryParams.parentId+' not found')
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