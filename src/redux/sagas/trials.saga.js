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

function* trialsSaga() {
    yield takeLatest('FETCH_TRIALS', fetchTrials);
}

export default trialsSaga;