export default {
	success: undefined,
	error: undefined,
	logToTask: undefined,
	async logWorkDialog (logToTask,success,error) {
			this.logToTask = logToTask;
			this.success=success;
			this.error=error
			showModal('LogTime');
	},
	
	logWork(){
		LogWork.run((resp)=>{
			showAlert(HoursToLog.text+' hours was logged');
			closeModal('LogTime');
			if(!_.isUndefined(this.success)){
				this.success(resp);
			}
		},(resp)=>{
			showAlert('Error logging hours. Please, try again later');
			closeModal('LogTime');
			if(!_.isUndefined(this.error)){
				this.error(resp);	
			}
		});
	}
}