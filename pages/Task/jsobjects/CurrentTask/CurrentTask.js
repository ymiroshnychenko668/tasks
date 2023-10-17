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
	updateTaskProperty(params){
		updateTicketProperty.run((task)=>{
			this.Task = task;
			console.log(task)
		},(err)=>{
			"Error updating "+params.name
		},params);
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
	deleteTimelog(item){
		
	},
	
	deleteAudio(item){
		deleteAudio.run(()=>{},(err)=>{showAlert('Error audio deleting. Please try again later')},{filename:item.filename})
	}
	
	
	
		
	
	
	
}