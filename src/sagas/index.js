import appSagas from './appSagas';
export default function* rootSaga() {
    yield [
        appSagas()
    ];
  }