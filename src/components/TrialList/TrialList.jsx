import { useDispatch, useSelector } from "react-redux";
import React, { useEffect } from "react";
import dateFormat from "dateformat";
import { Link } from 'react-router-dom';

function TrialList() {
  const dispatch = useDispatch();
  const trialList = useSelector(store => store.trials);
  console.log('trials are', trialList);

  useEffect(() => {
    dispatch({
      type: "FETCH_TRIALS",
    })
  }, []);

  const deleteTrial = (id) => {
    console.log('in delete item function onclick')
    dispatch({
      type: "DELETE_TRIAL",
      payload: id,
    })
  }

    return (
     <div className="container">
      <h1 className="trial-title">Trial List</h1>
      <table className="trial-table">
        {trialList.map(trial => (
          <tbody  key={trial.name}>
            <tr>
              <th>Trial: {trial.name}</th>
            </tr>
            <tr>
              <td>Cost: {trial.cost}</td>
            </tr>
            <tr>
              <td>End Date: {dateFormat(trial.expiration_date, "mm/dd/yy")}</td>
            </tr>
            <tr>
              <td>Username: {trial.username}</td>
              </tr>
              <tr>
              <td>
                <Link to={`/trials/${trial.id}/edit`}>
                  <button className="edit-btn">EDIT</button>
                </Link>
              </td>
              <td>
                <button className="del-btn" onClick={() => deleteTrial(trial.id)}>DELETE</button>
              </td>
            </tr>
          </tbody>
        ))}
      </table>
      <footer>
        <Link to="/user">
          <button className="back-btn">Back To Main Menu</button>
        </Link>
      </footer>
     </div>
    )
}

export default TrialList;