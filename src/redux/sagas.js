import { all } from 'redux-saga/effects';
import authSagas from './wallets/saga';

export default function* rootSaga(getState) {
  yield all([
    authSagas()
  ]);
}
