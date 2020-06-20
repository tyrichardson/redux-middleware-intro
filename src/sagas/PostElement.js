import axios from 'axios';
import { call, put } from 'redux-saga/effects';

function* postElement(action)
{
    try {
        yield call(axios.post, '/element', action.payload);
        yield put({ type: 'FETCH_ELEMENTS' });
    } catch (error) {
        console.log('error posting an element ', error);
    }
}

export default postElement;
