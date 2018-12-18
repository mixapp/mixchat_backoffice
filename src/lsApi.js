import * as _ from 'underscore';

function isJson(str) {
    try {
        JSON.parse(str);
    } catch (e) {
        return false;
    }
    return true;
}

function getDialogs() {
    let lsDialogs = localStorage.getItem('dialogs');
    lsDialogs = isJson(lsDialogs) ? JSON.parse(lsDialogs) : false;
    if (lsDialogs) {
        return lsDialogs;
    }
    return false;
}

function setDialogs(dialogs) {
    let lsDialogs = getDialogs();
    if (dialogs && !lsDialogs) {
        localStorage.setItem('dialogs', JSON.stringify(dialogs));
        return true;
    }
    return false;
}

function updateDialogs(dialogs) {
    localStorage.setItem('dialogs', JSON.stringify(dialogs));
}

function getDialogsNmsgs(dialogs) {
    /* Переписать без цикла. использую underscore TODO*/
    let lsDialogs = getDialogs();
    if (lsDialogs) {
        lsDialogs.forEach((lsDialog) => {
            let dialog = _.findIndex(dialogs, { _id: lsDialog._id });
            if (dialogs[dialog].msgs > lsDialog.msgs) {
                dialogs[dialog].nmsgs = dialogs[dialog].msgs - lsDialog.msgs;
            } else {
                dialogs[dialog].nmsgs = 0;
            }
        })
    }
    return dialogs;
}

function readDialog(dialog) {
    let lsDialogs = getDialogs();
    if (lsDialogs) {
        let lsDialog = _.findIndex(lsDialogs, { _id: dialog._id });
        lsDialogs[lsDialog] = dialog;
        return lsDialogs;
    }
    return false;
}

export {
    isJson,
    getDialogs,
    setDialogs,
    getDialogsNmsgs,
    readDialog,
    updateDialogs
}