import {useState} from "react";
import {useDispatch} from "react-redux";

function NewTrialPage() {
  const dispatch = useDispatch();
  const [newTrial, setNewTrial] = useState({
    name: "",
    cost: 0,
    expiration_date: new Date(),
    username: "",
  })

  function addName(evt) {
    evt.preventDefault();
    setNewTrial({
      ...newTrial,
      name: evt.target.value,
    });
  }

  function addCost(evt) {
    evt.preventDefault();
    setNewTrial({
      ...newTrial,
      cost: evt.target.value,
    });
  }

  function addEndDate(evt) {
    evt.preventDefault();
    setNewTrial({
      ...newTrial,
      expiration_date: evt.target.value,
    });
  }

  function addUsername(evt) {
    evt.preventDefault();
    setNewTrial({
      ...newTrial,
      username: evt.target.value,
    });
  }

  function handleSubmit(evt) {
    evt.preventDefault();

    dispatch({
      type: "ADD_TRIAL",
      payload: newTrial,
    })
  }

  return (
    <div>
    <h1>Add Trial</h1>

    <form className="new-trial" onSubmit={handleSubmit}>

    <input
      onChange={addName}
      placeholder="Trial Name"
      type="text" />

    <input
      onChange={addCost}
      placeholder="Cost"
      type="text" />

    <input
      onChange={addEndDate}
      placeholder="End Date"
      type="date" />

    <input
      onChange={addUsername}
      placeholder="Username"
      type="text" />

    <label>
      Alerts:
    </label>

    <div className="alerts-radio">
      <input type="radio" name="alert" id="week"  />
      <label htmlFor="week"><b>1 Week Before</b></label>
    </div>
    <div className="alerts-radio">
      <input type="radio" name="alert" id="3days"  />
      <label htmlFor="3days"><b>3 Days Before</b></label>
    </div>
    <div className="alerts-radio">
      <input type="radio" name="alert" id="day"  />
      <label htmlFor="day"><b>1 Day Before</b></label>
    </div>

    <button type="submit">Submit</button>
    </form>
    </div>
  )
}

export default NewTrialPage;