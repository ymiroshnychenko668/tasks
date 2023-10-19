export default {
	myVar1: [],
	myVar2: {},
	myFun1 () {
		//	write code here
		//	this.myVar1 = [1,2,3]
	},
	async refreshTabs () {
		if(Root.selectedTab=='Today'){
			Today.run();
		}else if(Root.selectedTab=='Backlog'){
			Backlog.run();
		}else if(Root.selectedTab=='Current'){
			InProgress.run();
		}
		storeValue('appSmithUrl',"https://service.crowcustom.com");
		storeValue('appSmithUrl',"http://localhost");
		
		
		//	use async-await or promises
		//	await storeValue('varName', 'hello world')
	},
	logout(){
		
	}
}