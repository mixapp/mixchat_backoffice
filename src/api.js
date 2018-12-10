import axios from 'axios';
import DDP from 'ddp.js';
import { eventChannel } from 'redux-saga'
import { FECTH_NEW_MESSAGE_SUCCESS } from './constants';
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
  frontApiProcessId: '5bc49dd735b38203254872a5',
  rocketChat: {
    XuserId: 'Yi8mxJGcXZHx2Dn5P',//'knpMD3iwLvxM5j8MT',
    XauthToken: 'W7u0ntx3ZrGQClllUsw5TCN_eVDLgpeTsrWlzGpD_Ep',//'Ot_wqhtJjy-iDAl3itZB80Ju2k3H9DTrmfDzf6AgHLp'
  }
};

// Fetch widget settings
export const fetchSettings = async () => {
  try {
    const uri = getUrl(config.backApiProcessId, config.companyId, 'full-widget-settings');
    let result = await axios.get(uri, {
      headers: getHeadera()
    });
    await setTimeout(() => { }, 2000);
    return {
      companyName: result.data.companyName,
      ...result.data.widget,
      ...result.data.settings
    }
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

/* добавить manager */
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

/* получение списка диалогов */
export const fetchDialogs = async () => {
  try {
    const uri = getUrl(config.backApiProcessId, config.companyId, 'get-dialogs');
    let result = await axios.get(uri, {
      headers: getHeadera(),
    });
    let data = [];
    result.data.groups.forEach((value, key) => {
      let name = value.name.split('_');
      name = value.name.replace(name[name.length - 1], '');
      data.push({
        _id: value._id,
        name: name,
        msgs: value.msgs,
        _updatedAt: value._updatedAt,
        u: value.u,
        usersCount: value.usersCount
      })
    });
    return data;
  } catch (err) {
    throw err;
  }
}

/* Получение диалога */
export const fetchDialog = async (data) => {
  try {

    let result = await axios.get('https://chat.mixapp.io/api/v1/groups.history', {
      params: data,
      headers: {
        'X-Auth-Token': config.rocketChat.XauthToken,
        'X-User-Id': config.rocketChat.XuserId
      }
    });
    return result.data.messages;

  } catch (err) {
    throw err;
  }
}

export const fetchDialogInfo = async (data) => {
  try {

    let result = await axios.get('https://chat.mixapp.io/api/v1/groups.info', {
      params: data,
      headers: {
        'X-Auth-Token': config.rocketChat.XauthToken,
        'X-User-Id': config.rocketChat.XuserId
      }
    });
    return result;

  } catch (err) {
    throw err;
  }
}

/* Отправка сообщения */
export const sendMessageSaga = async (data) => {
  try {
    let result = await axios({
      method: 'POST',
      url: 'https://chat.mixapp.io/api/v1/chat.postMessage',
      data: {
        roomId: data.roomId,
        text: data.text
      },
      headers: {
        'Content-Type': 'application/json',
        'X-Auth-Token': config.rocketChat.XauthToken,
        'X-User-Id': config.rocketChat.XuserId
      }
    });
    return result;
  } catch (err) {
    throw err;
  }
}

const isManager = async (nickname) => {
  try {

    return nickname.indexOf('client') === -1;

  } catch (err) {
    throw err;
  }
}


/* Открываем веб сокет и подписываемся на событие */
export const webSocket = async (roomId, cb) => {
  try {

    // socket connection
    const options = {
      endpoint: 'wss://chat.mixapp.io/websocket',
      SocketConstructor: WebSocket
    };
    var ddp = new DDP(options);

    ddp.on('connected', () => {
      ddp.method('login', [{ resume: config.rocketChat.XauthToken }]);
      ddp.sub('stream-room-messages', [roomId, false]);
    });

    ddp.on('changed', async (msg) => {
      try {
        cb(msg);
      } catch (err) {
        throw err;
      }
    });

  } catch (err) {
    throw err;
  }
}

export const websocketInitChannel = (roomId) => {
  return eventChannel(emitter => {
    // init the connection here
    const options = {
      endpoint: 'wss://chat.mixapp.io/websocket',
      SocketConstructor: WebSocket
    };
    var ddp = new DDP(options);

    ddp.on('connected', () => {
      ddp.method('login', [{ resume: config.rocketChat.XauthToken }]);
      ddp.sub('stream-room-messages', [roomId, false]);
    });

    ddp.on('changed', (msg) => {
      console.log(msg);
      return emitter({ type: 'FECTH_NEW_MESSAGE_SUCCESS', msg });
    });

    // unsubscribe function
    return () => {
      // do whatever to interrupt the socket communication here
    }
  })
}