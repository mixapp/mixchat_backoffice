import axios from 'axios';
import DDP from 'ddp.js';
import { eventChannel } from 'redux-saga';
import memoizee from 'memoizee';
import config from './config.json';

axios.interceptors.response.use(null, (error) => {
  //TODO
  anyErrors();
  /*
  return updateToken().then((token) => {
    //error.config.headers.xxxx <= set the token
    return axios.request(config);
  });
  */
  return Promise.reject(error);
});

export const anyErrors = () => {
  cleanLocalStorage();
  window.location.href = `${getCurrentURL()}/${getAppPath()}/`;
}

export const getCurrentURL = () => {
  let { protocol, hostname, port } = window.location;
  let port_ = '';
  if (port !== '80' && port !== '443' && port !== '') {
    port_ = ':' + port;
  }
  return protocol + '//' + hostname + port_;

}

export const cleanLocalStorage = () => {
  const itemsArray = [
    'rocketChatHost',
    'user',
    'XUSER',
    'currentCompany',
    'companies',
    'redirect'
  ];
  for (let i = 0; i < itemsArray.length; i++) {
    localStorage.removeItem(itemsArray[i]);
  }
}

export const getAuthUrl = () => {
  let url_part = `${getCurrentURL()}/${config.APP_PATH}`;
  return `https://api.mixapp.io/oidc/mixapp/authorize?response_type=id_token+token&client_id=5a82de9435b3820437d23cfd&redirect_uri=${url_part}/authorize&scope=openid+email+profile&state=uUpgnZBBCBMnI_GLGIzCP3AZXzavFzEVC5hM6UKB_ew&nonce=UXwkyVyGj-Lw_-zEUMbySDW2A4C5G1tYA1_HKrH0-r4&display=popup`;
}

export const getApiURL = () => {
  return config.API_URL;
}

export const getAppPath = () => {
  return config.APP_PATH;
}

export const getRocketCahtUrl = () => {
  return localStorage.getItem('rocketChatHost');
}

const getUrl = (companyId, path) => {
  return `https://${getApiURL()}/${companyId}/${path}`
}

const getToken = () => {
  let token = localStorage.getItem('user');
  try {

    token = JSON.parse(token);
    if (token) {
      return token.token;
    }

  } catch (err) {
    throw err;
  }
}

const getRocketChatHeaders = (json) => {
  let { authToken, userId } = JSON.parse(localStorage.getItem('XUSER'));
  return {
    'Content-Type': json ? 'application/json' : '',
    'X-Auth-Token': authToken,
    'X-User-Id': userId
  }
}

const getHeadera = () => {
  return {
    headers: {
      'Authorization': 'Bearer ' + getToken(),
      'Content-Type': 'application/json;charset=UTF-8',
      'accept': '*/*'
    }
  };
}

export const getCompany = async () => {
  try {
    return axios.get(`https://${getApiURL()}/get-company`, getHeadera());

  } catch (err) {
    throw err;
  }
}

export const getXauthToken = async () => {
  try {

    return axios.get(`https://${getApiURL()}/get-token`, getHeadera());

  } catch (err) {
    throw err;
  }
};

export const fetchSettings = async (companyId) => {
  try {

    return axios.get(getUrl(companyId, 'widget-oidc'), getHeadera());

  } catch (err) {
    throw err;
  }
};

export const fetchWidget = async (companyId) => {
  try {

    return axios.get(getUrl(companyId, 'widget'), getHeadera());

  } catch (err) {
    throw err;
  }
}

export const saveSettings = async (settings, companyId) => {
  try {

    return axios.post(getUrl(companyId, 'settings'), {
      "companyName": settings.companyName,
      "widget": {
        "greeting": settings.greeting,
        "isActive": settings.isActive,
        "color": settings.color,
        "openChat": settings.openChat,
        "eventWebhook": settings.eventWebhook,
        "rocketChatHost": settings.rocketChatHost
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
    }, getHeadera());

  } catch (err) {
    throw err;
  }
}

export const fetchManagers = async (companyId) => {
  try {

    let result = await axios.get(getUrl(companyId, 'listmanagers'), getHeadera());
    return result.data;

  } catch (err) {
    throw err;
  }
};

export const addManager = async (data, companyId) => {
  try {

    const uri = getUrl(companyId, 'addmanagers');
    return axios.post(uri, {
      "email": data.email,
      "nickname": data.nickname,
      "password": data.password
    }, getHeadera());

  } catch (err) {
    throw err;
  }
}

export const registration = async (data) => {
  try {

    return axios.post(`https://${getApiURL()}/registration`, data, getHeadera());

  } catch (err) {
    throw err;
  }
}

export const recovery = async (data) => {
  try {

    return axios.post(`https://${getApiURL()}/recovery`, data, getHeadera());

  } catch (err) {
    throw err;
  }
}

export const recoveryToken = async (data) => {
  try {

    return axios.post(`https://${getApiURL()}/recovery/${data.token}`, data, getHeadera());

  } catch (err) {
    throw err;
  }
}

export const removeManager = async (data, companyId) => {
  try {

    return axios.post(getUrl(companyId, 'removemanagers'), {
      id: data._id,
      username: data.nickname
    }, getHeadera());

  } catch (err) {
    throw err;
  }
}

export const takeRequest = async (data, companyId) => {
  try {

    let result = await axios.post(getUrl(companyId, 'take-request'), data, getHeadera());
    return result;
  } catch (err) {
    throw err;
  }
}

export const fetchDialogs = async () => {
  try {

    let result = await axios.get(`https://${getRocketCahtUrl()}/api/v1/groups.list`, { headers: getRocketChatHeaders() });
    return result.data.groups;

  } catch (err) {
    throw err;
  }
}

export const fetchDialog = async (roomId, unreads, count) => {
  try {

    let result = await axios.get(`https://${getRocketCahtUrl()}/api/v1/groups.history`, {
      params: {
        roomId: roomId,
        unreads: unreads,
        count: count
      },
      headers: getRocketChatHeaders()
    });
    return result.data.messages;

  } catch (err) {
    throw err;
  }
}

export const memoizedFetchDialog = memoizee(fetchDialog, { promise: true });

export const deleteMemoizedFetchDialog = async (roomId, unreads, count) => {
  try {

    memoizedFetchDialog.delete(roomId, unreads, count);

  } catch (err) {
    throw err;
  }
}

export const fetchGroupList = async () => {
  try {

    return axios.get(`https://${getRocketCahtUrl()}/api/v1/groups.list`, getRocketChatHeaders());

  } catch (err) {
    throw err;
  }
}

export const fetchGroupInfo = async (roomId) => {
  try {

    return axios.get(`https://${getRocketCahtUrl()}/api/v1/groups.info`, {
      params: { roomId: roomId },
      headers: getRocketChatHeaders()
    });

  } catch (err) {
    throw err;
  }
}

export const memoizedFetchGroupInfo = memoizee(fetchGroupInfo, { promise: true });

export const deleteMemoizedFetchGroupInfo = async (roomId) => {
  try {

    memoizedFetchGroupInfo.delete(roomId);

  } catch (err) {
    throw err;
  }
}

export const fetchGroupMembers = async (roomId) => {
  try {

    return axios.get(`https://${getRocketCahtUrl()}/api/v1/groups.members`, {
      params: { roomId: roomId },
      headers: getRocketChatHeaders()
    });

  } catch (err) {
    throw err;
  }
}

export const memoizedFetchGroupMembers = memoizee(fetchGroupMembers, { promise: true });

export const deleteMemoizedFetchGroupMembers = async (roomId) => {
  try {

    memoizedFetchGroupMembers.delete(roomId);

  } catch (err) {
    throw err;
  }
}

export const fetchUserInfo = async (companyId, userId) => {
  try {

    return await axios.get(getUrl(companyId, `get-user-info?userId=${userId}`), getHeadera());

  } catch (err) {
    throw err;
  }
}

export const memoizedFetchUserInfo = memoizee(fetchUserInfo, { promise: true });

export const deleteMemoizedFetchUserInfo = async (userId) => {
  try {

    memoizedFetchUserInfo.delete(userId);

  } catch (err) {
    throw err;
  }
}

export const fetchRole = async (companyId) => {
  try {

    let result = await axios.get(getUrl(companyId, 'fetch-role'), getHeadera());
    return result.data;

  } catch (err) {
    throw err;
  }
}

export const sendMessage = async (room, text) => {
  try {

    return axios({
      method: 'POST',
      url: `https://${getRocketCahtUrl()}/api/v1/chat.postMessage`,
      data: {
        roomId: room._id,
        text: text
      },
      headers: getRocketChatHeaders(true)
    });

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
  let month = lang ? monthNames[lang][date.getMonth()] : date.getMonth();
  let year = date.getFullYear();
  let hours = date.getHours();
  let minutes = date.getMinutes();

  return ('0' + (day + 1)).slice(-2) + '.' + ('0' + (month + 1)).slice(-2) + '.' + year + ', ' + ("0" + hours).slice(-2) + ':' + ('0' + (minutes + 1)).slice(-2);
}

export const fetchWebsocket = () => {
  var Xuser = getRocketChatHeaders();
  // init the connection here
  const options = {
    endpoint: `wss://${getRocketCahtUrl()}/websocket`,
    SocketConstructor: WebSocket
  };
  let ddp = new DDP(options);
  ddp.on('connected', () => {
    ddp.method('login', [{ resume: Xuser['X-Auth-Token'] }]);
    ddp.sub('stream-notify-user', [Xuser['X-User-Id'] + '/rooms-changed', false]);
  });
  return ddp;
}

export const websocketInitRoomsChanged = (ddp) => {
  return eventChannel(emitter => {
    ddp.on('changed', (data) => {
      return emitter({ type: 'SOCKET_ROOMS_CHANGED_EVENT', data });
    });

    // unsubscribe function
    return () => {
      // do whatever to interrupt the socket communication here
    }
  })
}

export const setStatus = (trigger, ddp) => {
  let status = trigger ? 'online' : 'away';
  return ddp.method(`UserPresence:${status}`, []);
}

export const sendMessageSocket = async (room, text, ddp) => {
  try {

    return ddp.method('sendMessage', [{
      rid: room._id,
      msg: text
    }]);

  } catch (err) {
    throw err;
  }
}

export const callWebhook = (event_type, url, params) => {

  return axios({
    method: 'POST',
    url: url,
    data: {
      event_type: event_type,
      ...params
    },
    headers: {
      'Content-Type': 'application/json'
    }
  });

}