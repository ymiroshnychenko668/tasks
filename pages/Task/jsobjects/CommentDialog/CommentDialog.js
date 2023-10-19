export default {
	taskId: {},
	success: (),
	error :(),
	async showCommentDialog(taskId,success,error) {
			showModal('Leave_comment');
		this.taskId = taskId;
		this.success = success;
		this.error = error;
		this.comment();
	},
	
	comment(){
			
	}
}