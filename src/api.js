import axios from 'axios';
//import querystring from 'querystring';

const getUrl = (processId, companyId, path) => {
    return `https://api.mixapp.io/webhooks/mixapp/${processId}/${companyId}/${path}`
}

const getToken = () => {
    let { token } = JSON.parse(localStorage.getItem('user'));
    return token;
}

const getHeadera = () => {
    return {
        'Authorization': 'Bearer ' + getToken(),
        'Content-Type': 'application/json;charset=UTF-8',
        'accept': '*/*'
    }
}

export const config = {
    companyId: '5bed9d260dec1f9f4f358399',
    backApiProcessId: '5bc49dd0574e7403e22ec1a0',
    frontApiProcessId: '5bc49dd735b38203254872a5'
};

// Fetch widget settings
export const fetchSettings = async () => {
    try {
        const uri = getUrl(config.backApiProcessId, config.companyId, 'full-widget-settings');
        let result = await axios.get(uri, {
            headers: getHeadera()
        });
        return result.data;
    } catch (err) {
        throw err;
    }
};

/* save widget settings */
export const saveSettings = async (settings) => {
    try {

        const uri = getUrl(config.backApiProcessId, config.companyId, 'settings');
        let result = await axios.post(uri, {
            "companyName": settings.companyName,
            "widget": {
                "isActive": settings.isActive,
                "color": settings.color,
                "openChat": settings.openChat
            },
            "settings": {
                "telegram_token": settings.telegram_token,
                "telegram_bot_name": settings.telegram_bot_name,
                "viber_token": settings.viber_token,
                "viber_bot_name": settings.viber_bot_name,
                "sms_token": settings.sms_token,
                "sms_phone": settings.sms_phone,
                "vk_token": settings.vk_token,
                "vk_group_name": settings.vk_group_name,
                "vk_confirmation_code": settings.vk_confirmation_code
            }
        }, {
                headers: getHeadera(),
            });
        return result;

    } catch (err) {
        throw err;
    }
}

// Fetch managers
export const fetchManagers = async () => {
    try {
        const uri = getUrl(config.backApiProcessId, config.companyId, 'listmanagers');
        let result = await axios.get(uri, {
            headers: getHeadera()
        });
        return result.data.managers;
    } catch (err) {
        throw err;
    }
};

/* add manager */
export const addManager = async (data) => {
    try {

        console.log(data);
        const uri = getUrl(config.backApiProcessId, config.companyId, 'addmanagers');
        let result = await axios.post(uri, {
            "email": data.email,
            "nickname": data.nickname,
            "password": data.password
        }, {
                headers: getHeadera(),
            });
        return result;

    } catch (err) {
        throw err;
    }
}