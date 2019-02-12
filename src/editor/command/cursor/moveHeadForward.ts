import TaleWeaver from '../../TaleWeaver';
import CursorCommand from '../CursorCommand';
import CursorTransformation from '../../state/CursorTransformation';
import TranslateCursorHead from '../../state/cursortransformationsteps/TranslateCursorHead';

export default function moveHeadForward(): CursorCommand {
  return (taleWeaver: TaleWeaver): CursorTransformation => {
    const transformation = new CursorTransformation();
    const editorCursor = taleWeaver.getState().getEditorCursor();
    if (!editorCursor) {
      return transformation;
    }
    if (editorCursor.getHead() > taleWeaver.getState().getDocumentElement().getSize() - 1) {
      return transformation;
    }
    transformation.addStep(new TranslateCursorHead(1));
    return transformation;
  };
}