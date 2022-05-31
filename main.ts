import { Editor, MarkdownView, Plugin } from 'obsidian';

// Remember to rename these classes and interfaces!

interface MyPluginSettings {
	mySetting: string;
}

const DEFAULT_SETTINGS: MyPluginSettings = {
	mySetting: 'default'
}

export default class MyPlugin extends Plugin {
	settings: MyPluginSettings;

	async onload() {
		await this.loadSettings();
		// This adds an editor command that can perform some operation on the current editor instance
		this.addCommand({
			id: 'replace lists to index',
			name: 'replace lists to index',
			editorCallback: (editor: Editor, view: MarkdownView) => {
				console.log(editor.getSelection());

				const stringLines: string[] = editor.getSelection().split("\n");
				let s = "";
				for (let index = 0; index < stringLines.length; index++) {
					const element = stringLines[index];
					s += (this.replaceTabToSharp(element) + "\n");
				}
				editor.replaceSelection(s);
			}
		});
	}

	onunload() {

	}

	async loadSettings() {
		this.settings = Object.assign({}, DEFAULT_SETTINGS, await this.loadData());
	}

	async saveSettings() {
		await this.saveData(this.settings);
	}

	replaceTabToSharp(target:string):string
	{
		if(target.length == 0) return "";
		const regexpTab5 = /^\t\t\t\t\t-/;
		const regexpTab4 = /^\t\t\t\t-/;		
		const regexpTab3 = /^\t\t\t-/;
		const regexpTab2 = /\t\t-/;
		const regexpTab1 = /\t-/;
		const regexpTab0 = /-/;
		const value = target.replace(regexpTab5, "######").replace(regexpTab4, "#####").replace(regexpTab3, "####").replace(regexpTab2, "###").replace(regexpTab1, "##").replace(regexpTab0, "#");
		return value;
	}
}