'use babel';

import SnippetView from './snippet-view';
import { CompositeDisposable } from 'atom';

export default {

  snippetView: null,
  modalPanel: null,
  subscriptions: null,

  activate(state) {
    this.snippetView = new SnippetView(state.snippetViewState);
    this.modalPanel = atom.workspace.addModalPanel({
      item: this.snippetView.getElement(),
      visible: false
    });

    // Events subscribed to in atom's system can be easily cleaned up with a CompositeDisposable
    this.subscriptions = new CompositeDisposable();

    // Register command that toggles this view
    this.subscriptions.add(atom.commands.add('atom-workspace', {
      'snippet:toggle': () => this.toggle()
    }));
  },

  deactivate() {
    this.modalPanel.destroy();
    this.subscriptions.dispose();
    this.snippetView.destroy();
  },

  serialize() {
    return {
      snippetViewState: this.snippetView.serialize()
    };
  },

  toggle() {
    console.log('Snippet was toggled!');
    return (
      this.modalPanel.isVisible() ?
      this.modalPanel.hide() :
      this.modalPanel.show()
    );
  }

};
