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
        const response = yield axios.get(`/trials/${action.payload}`);

        yield put({
            type: "SET_EDIT_TRIAL",
            payload: response.data
        });
    } catch (err) {
        console.error(err);
    }
}

function* trialsSaga() {
    yield takeLatest('FETCH_TRIALS', fetchTrials);
    yield takeLatest("ADD_TRIAL", addTrial);
    yield takeLatest("DELETE_TRIAL", deleteTrial);
    yield takeLatest("FETCH_EDIT_TRIAL", fetchEditTrial);
}

export default trialsSaga;