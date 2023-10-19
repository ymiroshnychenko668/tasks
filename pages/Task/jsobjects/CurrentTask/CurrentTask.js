export default {
	Task:undefined,
	NextStatuses:undefined,
	TaskStatuses:undefined,
	prevBack: {},
	
	getTaskStatuses(){
		if(_.isUndefined(this.TaskStatuses)){
			this.TaskStatuses = TaskStatuses.run();
		}
		return this.TaskStatuses;
	},
	getTask(){
		if(_.isUndefined(this.Task)){
			this.Task = GetTask.run((task)=>{
				this.Task = task;
				this.getAudio(task.id);
			},(err)=>{ showAlert('Error loading task. Please try again later.')});
															
		}
		return this.Task;
	},
	getAudio(id){
		return ListOfPrimaryAudio.run(()=>{},(err)=>{showAlert('Error loading task data, please')},{taskId:id})
	},
	
	
	updateTaskProperty(params){
		
		updateTicketProperty.run(params).then((task)=>{
			this.Task = task;
			if(params.alert){
				showAlert(params.name+' updated succesfully');
			}
		}).catch((err)=>{
			showAlert("Error updating "+params.name);
		});
	},
	test(){
		this.updateTaskProperty({key:'status',value:null});
	},
	
	
	
	getCurrentStatus(){
		return this.getTaskStatuses().then((statuses)=>{
				return statuses.filter((status)=> status.id == this.getTask().status_id).at(0);
		});
	},
	
	saveAudio(){
		SaveAudio.run((resp)=>{
			showAlert('Audio saved');
			ListOfPrimaryAudio.run();
		},(resp)=>{
			showAlert('Error saving audio, please try again later');
		}); 
},
	logWork(){
		LogWork.run((resp)=>{
			this.Task = resp;
			showAlert(HoursToLog.text+' hours was logged');
			closeModal('LogTime')
		},(resp)=>{
			showAlert('Error logging hours. Please, try again later');
			closeModal('LogTime')
		});
	},
	deleteTimelog(id){
			updateTicketProperty.run((task)=>{
			this.Task = task;
		},(err)=>{
			return "Error timelog deletion ";
		},{
				taskId:this.Task.id,
				timeLogId:id
			});
	},
	
	deleteAudio(item){
		deleteAudio.run(()=>{},(err)=>{showAlert('Error audio deleting. Please try again later')},{filename:item.filename})
	},
	
	back(){
		
		navigateTo(appsmith.store.backParams.backPage, !_.isUndefined(appsmith.store.backParams.urlParams)?appsmith.store.backParams.urlParams:{}, 'SAME_WINDOW');
	}
	
	
	
		
	
	
	
}