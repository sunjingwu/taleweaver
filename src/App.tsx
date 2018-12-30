import React, { Component, Children } from 'react';
import './App.css';
import JSONParser from './editor/model/util/JSONParser';
import EditorState from './editor/state/State';
import Document from './editor/view/Document';
import Cursor from './editor/cursor/Cursor';

const jsonParser = new JSONParser();
const documentJson = {
  children: [
    { type: 'Paragraph', children: [ { type: 'Text', content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean ex magna, consequat efficitur augue a, auctor sodales dolor. Aenean mauris risus, dignissim eu lacus vel, pharetra imperdiet dolor. Cras egestas nulla ac mattis rhoncus. Mauris nec vulputate dui, ac condimentum velit. Aenean ex nibh, blandit at congue ac, gravida sed nisi. Duis lacinia a ipsum id tincidunt. Vestibulum tristique dolor nec ante imperdiet, sed laoreet elit cursus. Maecenas accumsan magna a neque blandit, in efficitur lectus porttitor. Nam tristique augue nec ornare vestibulum. Interdum et malesuada fames ac ante ipsum primis in faucibus. Mauris tristique ante vel quam sollicitudin, sodales congue nulla semper.' } ] },
    { type: 'Paragraph', children: [ { type: 'Text', content: 'Proin fermentum, odio non accumsan luctus, leo dui vulputate justo, sollicitudin auctor ligula magna eu felis. Pellentesque velit massa, interdum vel pretium at, mollis ut est. Cras vitae est convallis, egestas mauris sit amet, hendrerit dolor. Donec eget rhoncus mi. Nullam accumsan vehicula porttitor. Pellentesque vitae nisi feugiat, molestie est ac, suscipit nisi. Donec sagittis elit mi, in aliquam tellus suscipit quis. Nulla facilisi. Integer viverra molestie turpis, et blandit dui faucibus tristique. Cras vitae tortor quis elit posuere lacinia ut blandit felis. Suspendisse potenti. Praesent posuere ipsum vel diam sagittis pretium. Donec viverra lacus justo, nec aliquam ex lacinia a. Phasellus blandit neque leo, ut facilisis urna viverra ut. Ut sodales diam vitae nulla iaculis, vitae varius purus suscipit.' } ] },
    { type: 'Paragraph', children: [ { type: 'Text', content: 'Nunc id faucibus risus. Nulla semper dui vel vulputate porttitor. Integer ante nisl, laoreet ac massa laoreet, finibus pretium lectus. Maecenas aliquet nulla sit amet turpis hendrerit consequat. Fusce gravida at sem id lobortis. Vestibulum placerat nunc vehicula libero molestie convallis. Suspendisse eu ornare turpis.' } ] },
    { type: 'Paragraph', children: [ { type: 'Text', content: 'Mauris sem leo, consectetur vel tempor vel, volutpat eu enim. Sed semper, libero blandit vulputate sollicitudin, odio mauris congue massa, ac ultrices leo enim sodales dolor. Aliquam in diam quis erat dictum pellentesque et ut sapien. Donec nec semper quam. Proin aliquet orci at odio accumsan maximus. Morbi rutrum sit amet quam maximus luctus. Vivamus sit amet lacinia lorem. Nunc eget suscipit lectus, ullamcorper eleifend dolor. Aliquam aliquam maximus lectus at malesuada. In fermentum ante non metus lobortis, vel ultrices purus tempus. In vestibulum mauris non elit faucibus, quis tempus ipsum tincidunt.' } ] },
    { type: 'Paragraph', children: [ { type: 'Text', content: 'In cursus et arcu eget blandit. Vestibulum volutpat mauris eu est tempus, a ultrices justo vulputate. Suspendisse potenti. Maecenas at molestie tellus. Nulla facilisi. Etiam ac justo quis lectus blandit lacinia. Pellentesque nisl sapien, malesuada eu risus nec, malesuada posuere nisl.' } ] },
  ],
};
const document = jsonParser.parse(documentJson);
const cursor = new Cursor(0, 0);
const initialEditorState = new EditorState(document, [cursor]);

class App extends Component {
  state = {
    editorState: initialEditorState,
  }

  render() {
    const {editorState} = this.state;
    return (
      <div className="App">
        <Document
          state={editorState}
        />
      </div>
    );
  }
}

export default App;
