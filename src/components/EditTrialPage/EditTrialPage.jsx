import { useParams, useHistory, Link } from "react-router-dom";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import dateFormat from "dateformat";
import './EditTrialPage.css'

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
        <div>
            <div className="edit-nav">
                <h1 className="edit-header">Edit Trial</h1>   
            </div>
            <form className="container" onSubmit={onSubmit}>
                <div>
                <label>
                    Trial Name:
                </label>
                <input
                    value={trial.name}
                    onChange={(evt) => dispatch({
                        type: 'UPDATE_EDIT_TRIAL',
                        payload: { name: evt.target.value }
                    })}
                />
                </div>
                <div>
                <label>
                    Cost:
                </label>
                <input
                    value={trial.cost}
                    onChange={(evt) => dispatch({
                        type: 'UPDATE_EDIT_TRIAL',
                        payload: { cost: evt.target.value }
                    })}
                />
                </div>
                <div>
                <label>
                    End Date:
                </label>
                <input
                    type="date"
                    value={dateFormat(trial.expiration_date, 'UTC:yyyy-mm-dd')}
                    onChange={(evt) => dispatch({
                        type: 'UPDATE_EDIT_TRIAL',
                        payload: { expiration_date: evt.target.value }
                    })}
                />
                </div>
                <div>
                <label>
                    Username:
                </label>
                <input
                    value={trial.username}
                    onChange={(evt) => dispatch({
                        type: 'UPDATE_EDIT_TRIAL',
                        payload: { username: evt.target.value }
                    })}
                />
                </div>
                <div>
                <label>
                    Alerts:
                </label>
                <div>
                <input
                    type="checkbox"
                    checked={trial.one_week_before}
                    onChange={(evt) => dispatch({
                        type: 'UPDATE_EDIT_TRIAL',
                        payload: { one_week_before: evt.target.checked }
                    })}
                />
                <label><b>1 Week Before</b></label>
                </div>

                <div>
                <input
                    type="checkbox"
                    checked={trial.three_days_before}
                    onChange={(evt) => dispatch({
                        type: 'UPDATE_EDIT_TRIAL',
                        payload: { three_days_before: evt.target.checked }
                    })}
                />
                <label><b>3 Days Before</b></label>
                </div>

                <div>
                <input
                    type="checkbox"
                    checked={trial.one_day_before}
                    onChange={(evt) => dispatch({
                        type: 'UPDATE_EDIT_TRIAL',
                        payload: { one_day_before: evt.target.checked }
                    })}
                />
                <label><b>1 Day Before</b></label>
                </div>

                </div>
                <button className="edit-submit" type="submit">Submit</button>
            </form>

            <Link to="/trials">
                <button className="back-btn-edittrial">Back To Trials</button>
            </Link>
        </div>
    )
}

export default EditTrialPage;