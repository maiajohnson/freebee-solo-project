import axios from "axios";
import { put, takeLatest } from "redux-saga/effects";

function* fetchTrials() {
    console.log("in trials.saga");

    try {
        const response = yield axios.get('/api/trials');

        yield put({
            type: "SET_TRIAL",
            payload: response.data,
        })
    } catch (error) {
        console.log('get trials request failed', error);
    }
}

function* addTrial(action) {
    try {
        yield axios.post('/api/trials', {data: action.payload})
        yield put({ type: 'FETCH_TRIALS' })
    } catch (err){
        console.log('post failed', err);
    }
}

function* deleteTrial(action) {
    console.log('the action payload of delete item is', action.payload)
    try {
        yield axios.delete(`/api/trials/${action.payload}`);
        yield put({ type: 'FETCH_TRIALS' })
    } catch (err) {
        console.log("error deleting item", err);
    }
}

function* fetchEditTrial(action) {
   
    try {
        const response = yield axios.get(`/api/trials/${action.payload}`);

        yield put({
            type: "SET_EDIT_TRIAL",
            payload: response.data
        });
    } catch (err) {
        console.error('get editing trial error', err);
    }
}

function* saveTrial(action) {
    if (action.payload.id) {
        yield axios.put(`/api/trials/${action.payload.id}`, action.payload);
    }
}

function* addTexts(action) {
console.log('this is the action payload', action.payload)
    try {
        yield axios.post('/api/trials/sms', {data: action.payload})

        yield put({
            type: "FETCH_TEXTS",
        })
    } catch (err) {
        console.log('error getting texts', err);
    }
}

function* trialsSaga() {
    yield takeLatest('FETCH_TRIALS', fetchTrials);
    yield takeLatest("ADD_TRIAL", addTrial);
    yield takeLatest("DELETE_TRIAL", deleteTrial);
    yield takeLatest("FETCH_EDIT_TRIAL", fetchEditTrial);
    yield takeLatest("SAVE_TRIAL", saveTrial);
    yield takeLatest("ADD_TEXTS", addTexts);
}

export default trialsSaga;