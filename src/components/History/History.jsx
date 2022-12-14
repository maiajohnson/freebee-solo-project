import { useDispatch, useSelector } from "react-redux";
import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import './History.css';

function History() {
  const dispatch = useDispatch();
  const trialHistory = useSelector(store => store.pastTrials)
  console.log('the trial history is:', trialHistory);

  useEffect(() => {
    dispatch({
      type: "FETCH_PAST_TRIALS",
    })
  }, [])

    return (
      <>
      <div>
        <h1 className="history-title">History</h1>
        <h3 className="history-text">Detailed below is a list of past usernames used when signing up for trial services</h3>
      </div>
      <div className="history-container">
        <table className="past-table">
          {trialHistory.map(trial => (
            <tbody key={trial.id}>
              <tr>
                <th>Trial: {trial.name}</th>
              </tr>
              <tr>
                <th>Usernames:</th>
              </tr>
              <tr>
                <td>{trial.username}</td>
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
      </>
    )
}

export default History;