/**
 * ! Inmutabilidad con copia
 * Aunque la inmutabilidad es una buena práctica, no siempre es posible.
 * En estos casos, se puede hacer una copia del objeto y modificar la copia.
 *
 *  * Es útil para mantener un historial de estados en aplicaciones interactivas.
 *
 */

import { COLORS } from "../helpers/colors.ts";

class CodeEditorState {
  readonly content: string;
  readonly cursorPostition: number;
  readonly unsavedChanges: boolean;

  constructor(content: string, cursorPosition: number, unsavedChanges: boolean) {
    this.content = content;
    this.cursorPostition = cursorPosition;
    this.unsavedChanges = unsavedChanges;
  }

  displayState() {
    console.log('\n%cEstado del editor: ', COLORS.green);
    console.log(`
      Contenido: ${ this.content }
      Cursor Pos: ${ this.cursorPostition }
      Unsaved changes: ${ this.unsavedChanges }
    `);
  }

  copyWith({
    content,
    cursorPostition,
    unsavedChanges,
  }: Partial<CodeEditorState>): CodeEditorState {
    return new CodeEditorState(
      content ?? this.content,
      cursorPostition ?? this.cursorPostition,
      unsavedChanges ?? this.unsavedChanges,
    );
  }
}

class CodeEditorHistory {
  private history: CodeEditorState[] = [];
  private currentIndex: number = -1;

  save(state: CodeEditorState): void {
    if (this.currentIndex < this.history.length - 1) {
      this.history = this.history.splice(0, this.currentIndex + 1);
    }
    
    this.history.push(state);
    this.currentIndex++;
  }

  undo(): CodeEditorState | null {
    if (this.currentIndex > 0) {
      this.currentIndex --;
      return this.history[this.currentIndex];
    }

    return  null;
  }

  redo(): CodeEditorState | null {
    if (this.currentIndex < this.history.length - 1) {
      this.currentIndex++;
      return this.history[this.currentIndex];
    }

    return null;
  }
}

function main() {
  const history = new CodeEditorHistory();
  let editorState = new CodeEditorState("console.log('Hola Mundo')", 2, false);

  history.save(editorState);
  
  console.log('%cEstado inicial', COLORS.orange);
  editorState.displayState();

  editorState = editorState.copyWith({
    content: "console.log('Hola Mundo'); \nconsole.log('Nueva linea')",
    cursorPostition: 3,
    unsavedChanges: true,
  });
  history.save(editorState);
  
  console.log('%cDepues del primer cambio', COLORS.blue);
  editorState.displayState();

  console.log('%cDespues de mover cursor', COLORS.orange);
  editorState = editorState.copyWith({ cursorPostition: 5 });
  history.save(editorState);
  editorState.displayState();

  console.log('%cDespues de UNDO', COLORS.orange);
  editorState = history.undo()!;
  editorState.displayState();
  
  console.log('%cDespues de REDO', COLORS.orange);
  editorState = history.redo()!;
  editorState.displayState();
}

main();