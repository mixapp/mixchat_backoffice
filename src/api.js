import axios from 'axios';
import DDP from 'ddp.js';
import { eventChannel } from 'redux-saga';
import memoizee from 'memoizee';

export const getCurrentURL = () => {
  let { protocol, hostname, port } = window.location;
  let port_ = '';
  if (port !== '80' && port !== '443' && port !== '') {
    port_ = ':' + port;
  }
  return protocol + '//' + hostname + port_;

}

export const getAuthUrl = () => {
  let uri = 'https://api.mixapp.io/oidc/mixapp/authorize?response_type=id_token+token&client_id=5a82de9435b3820437d23cfd&redirect_uri=' + getCurrentURL() + '/authorize&scope=openid+email+profile&state=uUpgnZBBCBMnI_GLGIzCP3AZXzavFzEVC5hM6UKB_ew&nonce=UXwkyVyGj-Lw_-zEUMbySDW2A4C5G1tYA1_HKrH0-r4&display=popup';
  window.location.href = uri;
}

const getUrl = (processId, companyId, path) => {
  return `https://api.mixapp.io/webhooks/mixapp/${processId}/${companyId}/${path}`
}

const getRocketCahtUrl = () => {
  return 'chat.mixapp.io';
}

const getToken = () => {
  let token = localStorage.getItem('user');
  try {
    token = JSON.parse(token);
    if (!token) {
      //getAuthUrl();
    } else {
      return token.token;
    }
  } catch (err) {
    throw err;
  }
}

const getRocketChatHeaders = (json) => {
  let { authToken, userId } = JSON.parse(localStorage.getItem('XUSER')).data;
  return {
    'Content-Type': json ? 'application/json' : '',
    'X-Auth-Token': authToken,
    'X-User-Id': userId
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
  backApiProcessId: '5bc49dd0574e7403e22ec1a0',
  frontApiProcessId: '5bc49dd735b38203254872a5',
  commentsPerPage: 15
};

export const fetchConfig = () => {
  return config;
}

export const getCompany = async () => {
  try {
    let result = await axios.get('https://api.mixapp.io/webhooks/mixapp/' + config.backApiProcessId + '/get-company', {
      headers: getHeadera()
    });
    return result;
  } catch (err) {
    throw err;
  }
}

export const getXauthToken = async (companyId) => {
  try {
    const uri = getUrl(config.backApiProcessId, companyId, 'get-token');
    let result = await axios.get(uri, {
      headers: getHeadera()
    });
    return result.data;
  } catch (err) {
    throw err;
  }
};

export const fetchSettings = async (companyId) => {
  try {
    const uri = getUrl(config.backApiProcessId, companyId, 'widget-oidc');
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

export const saveSettings = async (settings, companyId) => {
  try {

    const uri = getUrl(config.backApiProcessId, companyId, 'settings');
    let result = await axios.post(uri, {
      "companyName": settings.companyName,
      "widget": {
        "isActive": settings.isActive,
        "color": settings.color,
        "openChat": settings.openChat,
        "eventWebhook": settings.eventWebhook
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

export const fetchManagers = async (companyId) => {
  try {
    const uri = getUrl(config.backApiProcessId, companyId, 'listmanagers');
    let result = await axios.get(uri, {
      headers: getHeadera()
    });

    return result.data;
  } catch (err) {
    throw err;
  }
};

export const addManager = async (data, companyId) => {
  try {
    const uri = getUrl(config.backApiProcessId, companyId, 'addmanagers');
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

export const removeManager = async (data, companyId) => {
  try {
    const uri = getUrl(config.backApiProcessId, companyId, 'removemanagers');
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

export const takeRequest = async (data, companyId) => {
  try {
    const uri = getUrl(config.backApiProcessId, companyId, 'take-request');
    let result = await axios.post(uri, data, {
      headers: getHeadera()
    });
    return result;
  } catch (err) {
    throw err;
  }
}

export const fetchDialogs = async () => {
  try {

    let result = await axios.get('https://' + getRocketCahtUrl() + '/api/v1/groups.list', {
      headers: getRocketChatHeaders()
    });
    return result.data.groups;

  } catch (err) {
    throw err;
  }
}

export const fetchDialog = async (roomId, unreads, count) => {
  try {

    let result = await axios.get('https://' + getRocketCahtUrl() + '/api/v1/groups.history', {
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
    return await axios.get('https://' + getRocketCahtUrl() + '/api/v1/groups.list', {
      headers: getRocketChatHeaders()
    });
  } catch (err) {
    throw err;
  }
}

export const fetchGroupInfo = async (roomId) => {
  try {
    return await axios.get('https://' + getRocketCahtUrl() + '/api/v1/groups.info', {
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
    return await axios.get('https://' + getRocketCahtUrl() + '/api/v1/groups.members', {
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

    const uri = getUrl(config.backApiProcessId, companyId, 'get-user-info?userId=' + userId);
    return await axios.get(uri, {
      headers: getHeadera()
    });

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

    const uri = getUrl(config.backApiProcessId, companyId, 'fetch-role');
    let result = await axios.get(uri, {
      headers: getHeadera()
    });
    return result.data;

  } catch (err) {
    throw err;
  }
}

export const sendMessageSaga = async (room, text) => {
  try {
    let result = await axios({
      method: 'POST',
      url: 'https://' + getRocketCahtUrl() + '/api/v1/chat.postMessage',
      data: {
        roomId: room._id,
        text: text
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
  let month = lang ? monthNames[lang][date.getMonth()] : date.getMonth();
  let year = date.getFullYear();
  let hours = date.getHours();
  let minutes = date.getMinutes();

  return ('0' + (day + 1)).slice(-2) + '.' + ('0' + (month + 1)).slice(-2) + '.' + year + ', ' + ("0" + hours).slice(-2) + ':' + minutes;
}

export const fetchWebsocket = () => {
  // init the connection here
  const options = {
    endpoint: 'wss://' + getRocketCahtUrl() + '/websocket',
    SocketConstructor: WebSocket
  };
  return new DDP(options);
}

export const websocketInitRoomsChanged = (ddp) => {
  var Xuser = getRocketChatHeaders();
  return eventChannel(emitter => {
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

export const setStatus = (trigger, ddp) => {
  let status = trigger ? 'online' : 'offline';
  ddp.method('UserPresence:setDefaultStatus', [status]);
}