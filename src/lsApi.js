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
    if (dialogs) {
        if (!lsDialogs) {
            localStorage.setItem('dialogs', JSON.stringify(dialogs));
            return true;
        } else {
            lsDialogs.forEach(dialog => {
                let _dialog = _.findIndex(dialogs, { _id: dialog._id });
                if (_dialog === -1) {
                    removeDialog(dialog);
                }
            })
            dialogs.forEach(dialog => {
                let _dialog = _.findIndex(lsDialogs, { _id: dialog._id });
                if (_dialog === -1) {
                    dialog.new = true;
                    addDialog(dialog);
                }
            })
        }
    }
    return false;
}

function addDialog(dialog) {
    let lsDialogs = getDialogs();
    if (lsDialogs && dialog) {
        lsDialogs.push(dialog);
        updateDialogs(lsDialogs);
    }
}

function removeDialog(dialog) {
    let lsDialogs = getDialogs();
    if (lsDialogs && dialog) {
        updateDialogs(_.filter(lsDialogs, (_dialog) => {
            return _dialog._id !== dialog._id;
        }));
    }
}

function updateDialogs(dialogs) {
    let lsDialogs = getDialogs();
    if (dialogs && lsDialogs) {
        localStorage.setItem('dialogs', JSON.stringify(dialogs));
    }
}

function updateDialog(dialog) {
    let lsDialogs = getDialogs();
    if (dialog && lsDialogs) {
        let _dialog = _.findIndex(lsDialogs, { _id: dialog._id });
        if (_dialog !== -1) {
            lsDialogs[_dialog] = dialog;
            localStorage.setItem('dialogs', JSON.stringify(lsDialogs));
        }
    }
}

function getDialogsNmsgs(dialogs) {
    /* Переписать без цикла. использую underscore TODO*/
    let lsDialogs = getDialogs();
    if (lsDialogs) {
        lsDialogs.forEach((lsDialog) => {
            let dialog = _.findIndex(dialogs, { _id: lsDialog._id });
            if (dialogs[dialog]) {
                dialogs[dialog].new = lsDialog.new;
                if (dialogs[dialog].msgs > lsDialog.msgs) {
                    dialogs[dialog].nmsgs = dialogs[dialog].msgs - lsDialog.msgs;
                } else {
                    dialogs[dialog].nmsgs = 0;
                }
            }
        })
    }
    return dialogs;
}

function readDialog(dialog) {
    let lsDialogs = getDialogs();
    if (lsDialogs) {
        let lsDialog = _.findIndex(lsDialogs, { _id: dialog._id });
        dialog.new = false;
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
    updateDialogs,
    removeDialog,
    addDialog,
    updateDialog
}