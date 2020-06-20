import { call, put } from 'redux-saga/effects';
import axios from 'axios';

function* fetchElements()
{
    try {
        const elementsResponse = yield call(axios.get, '/element');
        yield put({ type: 'SET_ELEMENTS', payload: elementsResponse.data });
    } catch (error) {
        console.log('error fetching elements ', error);
    }
}

export default fetchElements;
