import React from 'react';
import simpleGit from 'simple-git';
import chalk from 'chalk';


let Git = simpleGit();

export default class extends React.Component {
	constructor(props){
		super(props)
		this.state = {
			displayBranchList:false,
		}
		this.handleBranchCheckout = this.handleBranchCheckout.bind(this);
		this.getBranchList = this.getBranchList.bind(this);
	}

	componentDidMount(){
		this.getBranchList();
	}

	getBranchList(){
		Git.branchLocal(
			(error, branchSummary) => {
				this.props.updateBranchList(branchSummary);
				if (error) {
					this.props.handleError(error);	
				}
			}
		);
	}

	getCurrentBranch(){

	}


	handleBranchCheckout(e){
		e.preventDefault();
		const branchInput = document.getElementById('branchInput')
		Git.checkoutLocalBranch(
			this.props.branchQuery, 
			(error, newBranch) => {
				if(error){
					this.props.handleError(error);
					branchInput.style.cssText = "color:red;"
					console.log(branchInput.style)
				} else {
					this.props.handleSuccess('checked out branch: ' + this.props.branchQuery)
					branchInput.value = ''
				}
			}
		)
		this.props.toggleDisplayBranches()
	}

	render(){

		return (
			<div>
				{this.props.currentBranch && 'working on branch: ' + this.props.currentBranch}
				{/*this.props.branchList && this.props.branchList.map(
					(branch) => {
						<ol> {branch} </ol>
					}
					)
				*/}
				{this.props.successData }
				{this.props.errorData }
				<form onSubmit={this.handleBranchCheckout} >
					<input type="text" id="branchInput" onChange={this.props.handleBranchChangeQuery}></input>
					<button onClick={this.handleBranchCheckout}>Checkout Branch</button>
				</form>
				
				<button onClick={this.handleGitAdd}>Add Files</button>
				<form onSubmit={this.handleGitCommit}>
					Commit
					<input type="text" onChange={this.handleCommitMessage}></input>
				</form>
				<button onClick={this.handleGitStatus}>Status</button>
				<button onClick={this.handleGitPush}>Push</button>
				<button onClick={this.handleGitPull}>Pull</button>
				<button onClick={this.props.toggleDisplayBranches}>ShowBranchList</button>
				{this.state.displayBranchList && this.state.branchList.map(el => {
						if (el === currentBranch){
							return <ul>{chalk.green(el)}</ul>
						} else {
							return <ul>el</ul>
						}
					}
					)
				}
			</div>
			)
	}

}