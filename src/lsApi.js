export const saveDialogs = (dialogs) => {
    if (dialogs) {
        localStorage.setItem('dialogs', dialogs);
        return true;
    }
}

export const getDialogs = () => {
    return localStorage.getItem('dialogs');
}

export const addNewMsgCount = (dialogs) => {
    let lastDialogsSnapshot = this.getDialogs();
    if (lastDialogsSnapshot) {
        lastDialogsSnapshot.forEach((dialog) => {
            console.log(dialog);
        })
    }
}