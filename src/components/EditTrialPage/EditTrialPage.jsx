import { useParams, useHistory } from "react-router-dom";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import dateFormat from "dateformat";


function EditTrialPage() {
    const dispatch = useDispatch();
    const params = useParams();
    console.log(params.id);
    const history = useHistory();

    const trial = useSelector(store => store.editTrials);
    console.log(trial);

    useEffect(() => {
        dispatch({
            type: "FETCH_EDIT_TRIAL",
            payload: params.id
        });
    }, [params.id]);

    const onSubmit = (evt) => {
        evt.preventDefault();
        dispatch({
            type: "SAVE_TRIAL",
            payload: trial
        });
        history.push('/trials')
    }

    return (
        <form onSubmit={onSubmit}>
            <input
                value={trial.name}
                onChange={(evt) => dispatch({
                    type: 'UPDATE_EDIT_TRIAL',
                    payload: { name: evt.target.value }
                })}
            />
            <input
                value={trial.cost}
                onChange={(evt) => dispatch({
                    type: 'UPDATE_EDIT_TRIAL',
                    payload: { cost: evt.target.value }
                })}
            />
            <input
                type="date"
                value={dateFormat(trial.expiration_date, 'UTC:yyyy-mm-dd')}
                onChange={(evt) => dispatch({
                    type: 'UPDATE_EDIT_TRIAL',
                    payload: { expiration_date: evt.target.value }
                })}
            />
            <input
                value={trial.username}
                onChange={(evt) => dispatch({
                    type: 'UPDATE_EDIT_TRIAL',
                    payload: { username: evt.target.value }
                })}
            />
            <input
                type="checkbox"
                checked={trial.one_week_before}
                onChange={(evt) => dispatch({
                    type: 'UPDATE_EDIT_TRIAL',
                    payload: { one_week_before: evt.target.value }
                })}
            />
              <input
                type="checkbox"
                value={trial.three_days_before}
                onChange={(evt) => dispatch({
                    type: 'UPDATE_EDIT_TRIAL',
                    payload: { three_days_before: evt.target.value }
                })}
            />
              <input
                type="checkbox"
                value={trial.one_day_before}
                onChange={(evt) => dispatch({
                    type: 'UPDATE_EDIT_TRIAL',
                    payload: { one_day_before: evt.target.value }
                })}
            />

            <button type="submit">Submit</button>
        </form>
    )
}

export default EditTrialPage;