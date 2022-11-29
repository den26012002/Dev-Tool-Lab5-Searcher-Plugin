import * as vscode from 'vscode';

export function activate(context: vscode.ExtensionContext) {
	vscode.window.showInformationMessage('Congratulations, your extension "searcher" is now active!');

	let disposable = vscode.commands.registerCommand("searcher.searchProblemSolution", () => {
		const uri = vscode.window.activeTextEditor?.document.uri;
		let diagnostics = vscode.languages.getDiagnostics(uri!);
		vscode.window.showInputBox({
			placeHolder: "Enter the number of the problem"
		}).then(value => {
			let valueNumber = Number(value);
			if (Number.isNaN(valueNumber)) {
				vscode.window.showErrorMessage("Error: input is not a number");
			} else if (valueNumber >= diagnostics.length) {
				vscode.window.showErrorMessage("Error: entered number is greater than the number of problems");
			} else if (valueNumber < 0) {
				vscode.window.showErrorMessage("Error: input number is less than 0");
			} else {
				vscode.window.showInformationMessage(diagnostics[valueNumber].message);
				vscode.env.openExternal(vscode.Uri.parse("https://yandex.ru/search/?text=" + diagnostics[valueNumber].message));
			}
		});
	});
	
	context.subscriptions.push(disposable);
}

export function deactivate() {}
