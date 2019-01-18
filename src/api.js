import axios from 'axios';
import DDP from 'ddp.js';
import { getDialogsNmsgs } from '../src/lsApi';
import { eventChannel } from 'redux-saga';
import _ from 'underscore';

const getUrl = (processId, companyId, path) => {
  return `https://api.mixapp.io/webhooks/mixapp/${processId}/${companyId}/${path}`
}

const getToken = () => {
  let { token } = JSON.parse(localStorage.getItem('user'));
  return token;
}

const getRocketChatHeaders = (json) => {
  let Xuser = JSON.parse(localStorage.getItem('XUSER'));
  return {
    'Content-Type': json ? 'application/json' : '',
    'X-Auth-Token': Xuser.data.authToken,
    'X-User-Id': Xuser.data.userId
  }
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

export const getXauthToken = async () => {
  try {
    const uri = getUrl(config.backApiProcessId, config.companyId, 'get-token');
    let result = await axios.get(uri, {
      headers: getHeadera()
    });
    return result.data;
  } catch (err) {
    throw err;
  }
};

export const fetchSettings = async () => {
  try {
    const uri = getUrl(config.backApiProcessId, config.companyId, 'widget-oidc');
    let result = await axios.get(uri, {
      headers: getHeadera()
    });
    return {
      companyName: result.data.companyName,
      ...result.data.widget,
      ...result.data.settings
    }
  } catch (err) {
    throw err;
  }
};

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
        "vk_confirmation_code": settings.vk_confirmation_code,
        "fbm_api_key": settings.fbm_api_key,
        "fbm_secret": settings.fbm_secret,
        "fbm_page": settings.fbm_page
      }
    }, {
        headers: getHeadera()
      });
    return result;

  } catch (err) {
    throw err;
  }
}

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

export const addManager = async (data) => {
  try {
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

export const removeManager = async (data) => {
  try {
    const uri = getUrl(config.backApiProcessId, config.companyId, 'removemanagers');
    let result = await axios.post(uri, {
      id: data._id,
      username: data.nickname
    }, {
        headers: getHeadera(),
      });
    return result;
  } catch (err) {
    throw err;
  }
}

export const fetchDialogs = async () => {
  try {

    let result = await axios.get('https://chat.mixapp.io/api/v1/groups.list', {
      headers: getRocketChatHeaders()
    });
    return getDialogsNmsgs(result.data.groups);

  } catch (err) {
    throw err;
  }
}

/* Получение диалога */
export const fetchDialog = async (data) => {
  try {

    let result = await axios.get('https://chat.mixapp.io/api/v1/groups.history', {
      params: data,
      headers: getRocketChatHeaders()
    });
    return result.data.messages;

  } catch (err) {
    throw err;
  }
}

export const fetchDialogInfo = async (data) => {
  try {

    let groupList = await axios.get('https://chat.mixapp.io/api/v1/groups.list', {
      headers: getRocketChatHeaders()
    });
    if (_.findIndex(groupList.data.groups, { _id: data.roomId }) > -1) {
      let result = await axios.get('https://chat.mixapp.io/api/v1/groups.info', {
        params: data,
        headers: getRocketChatHeaders()
      });
      return result;
    }

  } catch (err) {
    return err;
  }
}

export const fetchRole = async () => {
  try {

    const uri = getUrl(config.backApiProcessId, config.companyId, 'fetch-role');
    let result = await axios.get(uri, {
      headers: getHeadera()
    });

    console.log(result);

  } catch (err) {
    throw err;
  }
}

export const sendMessageSaga = async (data) => {
  try {
    let result = await axios({
      method: 'POST',
      url: 'https://chat.mixapp.io/api/v1/chat.postMessage',
      data: {
        roomId: data.roomId,
        text: data.text
      },
      headers: getRocketChatHeaders(true)
    });
    return result;
  } catch (err) {
    throw err;
  }
}

export const formatDate = (date, lang) => {
  const monthNames = {
    en: [
      "January", "February", "March",
      "April", "May", "June", "July",
      "August", "September", "October",
      "November", "December"
    ],
    ru: [
      "Январь", "Февраль", "Март",
      "Апрель", "Май", "Июнь", "Июль",
      "Август", "Сентябрь", "Октябрь",
      "Ноябрь", "Декабрь"
    ]
  }

  let day = date.getDate();
  let monthIndex = date.getMonth();
  let year = date.getFullYear();
  let hours = date.getHours();
  let minutes = date.getMinutes();

  return day + ' ' + monthNames[lang][monthIndex] + ' ' + year + ', ' + hours + ':' + minutes;
}

export const websocketInitRoomsChanged = () => {
  var Xuser = getRocketChatHeaders();
  return eventChannel(emitter => {
    // init the connection here
    const options = {
      endpoint: 'wss://chat.mixapp.io/websocket',
      SocketConstructor: WebSocket
    };
    var ddp = new DDP(options);
    ddp.on('connected', () => {
      ddp.method('login', [{ resume: Xuser['X-Auth-Token'] }]);
      ddp.sub('stream-notify-user', [Xuser['X-User-Id'] + '/rooms-changed', false]);
    });

    ddp.on('changed', (data) => {
      return emitter({ type: 'SOCKET_ROOMS_CHANGED_EVENT', data });
    });

    // unsubscribe function
    return () => {
      // do whatever to interrupt the socket communication here
    }
  })
}