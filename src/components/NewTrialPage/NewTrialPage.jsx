import {useState} from "react";
import {useDispatch} from "react-redux";
import { Link } from "react-router-dom";

function NewTrialPage() {
  const dispatch = useDispatch();
  const [newTrial, setNewTrial] = useState({
    name: "",
    cost: 0,
    expiration_date: new Date(),
    username: "",
    one_week_before: false,
    three_days_before: false,
    one_day_before: false
  })

  const [alertWeek, setAlertWeek] = useState(false);

  function changeWeek(evt) {
    evt.preventDefault();

    setNewTrial({
      ...newTrial,
      one_week_before: !alertWeek
    });

    setAlertWeek(!alertWeek);
    console.log(!alertWeek);
  }

  const [alertThreeDays, setAlertThreeDays] = useState(false)

  function changeThreeDays(evt) {
    evt.preventDefault();
 
    setNewTrial({
      ...newTrial,
      three_days_before: !alertThreeDays
    });

    setAlertThreeDays(!alertThreeDays);
  }

  const [alertDayBefore, setAlertDayBefore] = useState(false)

  function changeDayBefore(evt) {
    evt.preventDefault();
   
    setNewTrial({
      ...newTrial,
      one_day_before: !alertDayBefore
    });

    setAlertDayBefore(!alertDayBefore);
  }

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
      payload: newTrial
    })
  }

  return (
    <div>
    <h1>Add Trial</h1>

    <form className="container" onSubmit={handleSubmit}>

    <input
      onChange={addName}
      placeholder="Trial Name"
      type="text" />

    <input
      onChange={addCost}
      placeholder="Cost"
      type="text" />
    
    <div>
    <label>
      End Date:
    </label>
    <input
      onChange={addEndDate}
      placeholder="End Date"
      type="date" />
    </div>

    <input
      onChange={addUsername}
      placeholder="Username"
      type="text" />

    <label>
      Alerts:
    </label>

    <div className="alerts-check">
      <input type="checkbox" label="1 Week Before" checked={alertWeek} onChange={changeWeek} />
      <label htmlFor="1weekbefore"><b>1 Week Before</b></label>
    </div>
    <div className="alerts-check">
      <input type="checkbox" label="3 Days Before" checked={alertThreeDays} onChange={changeThreeDays} />
      <label htmlFor="3daysbefore"><b>3 Days Before</b></label>
    </div>
    <div className="alerts-check">
      <input type="checkbox" label="1 Day Before" checked={alertDayBefore} onChange={changeDayBefore} />
      <label htmlFor="1daybefore"><b>1 Day Before</b></label>
    </div>

    <button type="submit">Submit</button>
    </form>

    <Link to="/user" >
      <button className="back-btn-newtrial">Back To Main Menu</button>
    </Link>
    </div>
  )
}

export default NewTrialPage;