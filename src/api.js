import axios from 'axios';
import querystring from 'querystring';

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
        return result.data.settings;
    } catch (err) {
        throw err;
    }
};

/* save widget settings */
export const saveSettings = async (settings) => {
    try {

        const uri = getUrl(config.backApiProcessId, config.companyId, 'settings');
        let result = await axios.post(uri, {
            "companyName": "MixappDev",
            "widget": {
                "isActive": true,
                "color": "#4a90e2",
                "openChat": false
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