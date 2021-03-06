import * as clipboardCommandHandlers from '../command/handlers/clipboard';
import * as cursorCommandHandlers from '../command/handlers/cursor';
import * as historyCommandHandlers from '../command/handlers/history';
import * as stateCommandHandlers from '../command/handlers/state';
import * as viewCommandHandlers from '../command/handlers/view';
import { DocComponent } from '../component/components/doc';
import { ParagraphComponent } from '../component/components/paragraph';
import { TextComponent } from '../component/components/text';
import { IConfig } from './config';

export function buildBaseConfig(): IConfig {
    return {
        commands: {
            'tw.clipboard.copy': clipboardCommandHandlers.copy,
            'tw.clipboard.paste': clipboardCommandHandlers.paste,
            'tw.cursor.move': cursorCommandHandlers.move,
            'tw.cursor.moveBackwardByLine': cursorCommandHandlers.moveBackwardByLine,
            'tw.cursor.moveForwardByLine': cursorCommandHandlers.moveForwardByLine,
            'tw.cursor.moveBackward': cursorCommandHandlers.moveBackward,
            'tw.cursor.moveForward': cursorCommandHandlers.moveForward,
            'tw.cursor.moveBackwardByWord': cursorCommandHandlers.moveBackwardByWord,
            'tw.cursor.moveForwardByWord': cursorCommandHandlers.moveForwardByWord,
            'tw.cursor.moveToLineStart': cursorCommandHandlers.moveToLineStart,
            'tw.cursor.moveToLineEnd': cursorCommandHandlers.moveToLineEnd,
            'tw.cursor.moveToDocStart': cursorCommandHandlers.moveToDocStart,
            'tw.cursor.moveToDocEnd': cursorCommandHandlers.moveToDocEnd,
            'tw.cursor.moveHead': cursorCommandHandlers.moveHead,
            'tw.cursor.moveHeadBackwardByLine': cursorCommandHandlers.moveHeadBackwardByLine,
            'tw.cursor.moveHeadForwardByLine': cursorCommandHandlers.moveHeadForwardByLine,
            'tw.cursor.moveHeadBackward': cursorCommandHandlers.moveHeadBackward,
            'tw.cursor.moveHeadForward': cursorCommandHandlers.moveHeadForward,
            'tw.cursor.moveHeadBackwardByWord': cursorCommandHandlers.moveHeadBackwardByWord,
            'tw.cursor.moveHeadForwardByWord': cursorCommandHandlers.moveHeadForwardByWord,
            'tw.cursor.moveHeadToLineStart': cursorCommandHandlers.moveHeadToLineStart,
            'tw.cursor.moveHeadToLineEnd': cursorCommandHandlers.moveHeadToLineEnd,
            'tw.cursor.moveHeadToDocStart': cursorCommandHandlers.moveHeadToDocStart,
            'tw.cursor.moveHeadToDocEnd': cursorCommandHandlers.moveHeadToDocEnd,
            'tw.cursor.selectAll': cursorCommandHandlers.selectAll,
            'tw.cursor.selectWord': cursorCommandHandlers.selectWord,
            'tw.cursor.selectBlock': cursorCommandHandlers.selectBlock,
            'tw.history.undo': historyCommandHandlers.undo,
            'tw.history.redo': historyCommandHandlers.redo,
            'tw.state.insert': stateCommandHandlers.insert,
            'tw.state.deleteBackward': stateCommandHandlers.deleteBackward,
            'tw.state.deleteForward': stateCommandHandlers.deleteForward,
            'tw.state.breakLine': stateCommandHandlers.breakLine,
            'tw.state.applyAttribute': stateCommandHandlers.applyAttribute,
            'tw.state.applyAttributeAround': stateCommandHandlers.applyAttributeAround,
            'tw.view.focus': viewCommandHandlers.focus,
            'tw.view.blur': viewCommandHandlers.blur,
        },
        components: {
            doc: DocComponent,
            paragraph: ParagraphComponent,
            text: TextComponent,
        },
        cursor: {
            disable: false,
            caretColor: `hsla(213, 100%, 50%, 1)`,
            caretInactiveColor: 'hsla(0, 0%, 0%, 0.5)',
            selectionColor: `hsla(213, 100%, 50%, 0.2)`,
            selectionInactiveColor: 'hsla(0, 0%, 0%, 0.08)',
        },
        history: {
            collapseThreshold: 500,
            maxCollapseDuration: 2000,
        },
        keyBindings: {
            common: {
                left: { command: 'tw.cursor.moveBackward', preventDefault: true },
                right: { command: 'tw.cursor.moveForward', preventDefault: true },
                up: { command: 'tw.cursor.moveBackwardByLine', preventDefault: true },
                down: { command: 'tw.cursor.moveForwardByLine', preventDefault: true },
                'shift+left': { command: 'tw.cursor.moveHeadBackward', preventDefault: true },
                'shift+right': { command: 'tw.cursor.moveHeadForward', preventDefault: true },
                'shift+up': { command: 'tw.cursor.moveHeadBackwardByLine', preventDefault: true },
                'shift+down': { command: 'tw.cursor.moveHeadForwardByLine', preventDefault: true },
                backspace: { command: 'tw.state.deleteBackward', preventDefault: true },
                delete: { command: 'tw.state.deleteForward', preventDefault: true },
                enter: { command: 'tw.state.breakLine', preventDefault: true },
            },
            macos: {
                'alt+left': { command: 'tw.cursor.moveBackwardByWord' },
                'alt+right': { command: 'tw.cursor.moveForwardByWord' },
                'shift+alt+left': { command: 'tw.cursor.moveHeadBackwardByWord' },
                'shift+alt+right': { command: 'tw.cursor.moveHeadForwardByWord' },
                'cmd+left': { command: 'tw.cursor.moveToLineStart' },
                'cmd+right': { command: 'tw.cursor.moveToLineEnd' },
                'cmd+up': { command: 'tw.cursor.moveToDocStart' },
                'cmd+down': { command: 'tw.cursor.moveToDocEnd' },
                'shift+cmd+left': { command: 'tw.cursor.moveHeadToLineStart' },
                'shift+cmd+right': { command: 'tw.cursor.moveHeadToLineEnd' },
                'shift+cmd+up': { command: 'tw.cursor.moveHeadToDocStart' },
                'shift+cmd+down': { command: 'tw.cursor.moveHeadToDocEnd' },
                'cmd+a': { command: 'tw.cursor.selectAll' },
                'cmd+z': { command: 'tw.history.undo', preventDefault: true },
                'shift+cmd+z': { command: 'tw.history.redo', preventDefault: true },
            },
            windows: {
                'ctrl+left': { command: 'tw.cursor.moveBackwardByWord' },
                'ctrl+right': { command: 'tw.cursor.moveForwardByWord' },
                'ctrl+shift+left': { command: 'tw.cursor.moveHeadBackwardByWord' },
                'ctrl+shift+right': { command: 'tw.cursor.moveHeadForwardByWord' },
                home: { command: 'tw.cursor.moveToLineStart' },
                end: { command: 'tw.cursor.moveToLineEnd' },
                'ctrl+home': { command: 'tw.cursor.moveToDocStart' },
                'ctrl+end': { command: 'tw.cursor.moveToDocEnd' },
                'shift+home': { command: 'tw.cursor.moveHeadToLineStart' },
                'shift+end': { command: 'tw.cursor.moveHeadToLineEnd' },
                'ctrl+shift+home': { command: 'tw.cursor.moveHeadToDocStart' },
                'ctrl+shift+end': { command: 'tw.cursor.moveHeadToDocEnd' },
                'ctrl+a': { command: 'tw.cursor.selectAll' },
                'ctrl+z': { command: 'tw.history.undo', preventDefault: true },
                'ctrl+shift+z': { command: 'tw.history.redo', preventDefault: true },
            },
            linux: {
                'ctrl+left': { command: 'tw.cursor.moveBackwardByWord' },
                'ctrl+right': { command: 'tw.cursor.moveForwardByWord' },
                'ctrl+shift+left': { command: 'tw.cursor.moveHeadBackwardByWord' },
                'ctrl+shift+right': { command: 'tw.cursor.moveHeadForwardByWord' },
                home: { command: 'tw.cursor.moveToLineStart' },
                end: { command: 'tw.cursor.moveToLineEnd' },
                'ctrl+home': { command: 'tw.cursor.moveToDocStart' },
                'ctrl+end': { command: 'tw.cursor.moveToDocEnd' },
                'shift+home': { command: 'tw.cursor.moveHeadToLineStart' },
                'shift+end': { command: 'tw.cursor.moveHeadToLineEnd' },
                'ctrl+shift+home': { command: 'tw.cursor.moveHeadToDocStart' },
                'ctrl+shift+end': { command: 'tw.cursor.moveHeadToDocEnd' },
                'ctrl+a': { command: 'tw.cursor.selectAll' },
                'ctrl+z': { command: 'tw.history.undo', preventDefault: true },
                'ctrl+shift+z': { command: 'tw.history.redo', preventDefault: true },
            },
        },
        page: {
            width: 816,
            height: 1056,
            paddingTop: 40,
            paddingBottom: 40,
            paddingLeft: 40,
            paddingRight: 40,
        },
    };
}
