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
      <ul>
        {trialList.map(trial => (
          <>
            <li key={trial.id}>{trial.name}</li>
          </>
        ))}
      </ul>
     </div>
    )
}

export default TrialList;