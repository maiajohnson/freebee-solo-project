import { useDispatch, useSelector } from "react-redux";
import React, { useEffect } from "react";
import dateFormat from "dateformat";

function TrialList() {
  const dispatch = useDispatch();
  const trialList = useSelector(store => store.trials);
  console.log('trials are', trialList);

  useEffect(() => {
    dispatch({
      type: "FETCH_TRIALS",
    })
  }, []);


    return (
     <div className="container">
      <table className="trial-table">
        {trialList.map(trial => (
          <tbody  key={trial.name}>
            <tr>
              <th>{trial.name}</th>
            </tr>
            <tr>
              <td>{trial.cost}</td>
              <td>{dateFormat(trial.expiration_date, "mm/dd/yy")}</td>
              <td>{trial.username}</td>
            </tr>
          </tbody>
        ))}
      </table>
     </div>
    )
}

export default TrialList;