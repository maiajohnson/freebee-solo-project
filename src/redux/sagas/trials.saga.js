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

function* trialsSaga() {
    yield takeLatest('FETCH_TRIALS', fetchTrials);
    yield takeLatest("ADD_TRIAL", addTrial);
}

export default trialsSaga;