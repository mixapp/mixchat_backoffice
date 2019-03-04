import * as _ from 'underscore';

function isJson(str) {
    try {
        JSON.parse(str);
    } catch (e) {
        return false;
    }
    return true;
}

function addDialog(dialogId) {
    let dialogs = [];
    let lsDialogs = localStorage.getItem('dialogs');
    if (lsDialogs && isJson(lsDialogs)) {
        dialogs = JSON.parse(lsDialogs);
        if (dialogs.indexOf(dialogId) === -1) {
            dialogs.push(dialogId);
            localStorage.setItem('dialogs', JSON.stringify(dialogs));
        }
    } else {
        dialogs.push(dialogId);
        localStorage.setItem('dialogs', JSON.stringify(dialogs));
    }
}

function removeDialog(dialogId) {
    let lsDialogs = localStorage.getItem('dialogs');
    if (lsDialogs && isJson(lsDialogs)) {
        let dialogs = JSON.parse(lsDialogs);
        localStorage.setItem('dialogs', JSON.stringify(_.without(dialogs, dialogId)));
    }
}

export {
    isJson,
    removeDialog,
    addDialog
}