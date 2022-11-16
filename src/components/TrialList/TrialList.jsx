import { useDispatch, useSelector } from "react-redux";
import React, { useEffect } from "react";

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
     <div>
      <table className="container">
        {trialList.map(trial => (
          <tbody  key={trial.name}>
            <tr>
              <td >{trial.name}</td>
              <td>{trial.cost}</td>
            </tr>
          </tbody>
        ))}
      </table>
     </div>
    )
}

export default TrialList;