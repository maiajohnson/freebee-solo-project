import {useState} from "react";
import {useDispatch} from "react-redux";
import { Link, useHistory } from "react-router-dom";
import './NewTrialPage.css';

function NewTrialPage() {
  const dispatch = useDispatch();
  const history = useHistory();
  const [newTrial, setNewTrial] = useState({
    name: "",
    cost: 0,
    expiration_date: new Date(),
    username: "",
    one_week_before: false,
    three_days_before: false,
    one_day_before: false,
    link: ""
  })

  function changeWeek(evt) {
    setNewTrial({
      ...newTrial,
      one_week_before: !newTrial.one_week_before
    });

  }

  function changeThreeDays(evt) {
    setNewTrial({
      ...newTrial,
      three_days_before: !newTrial.three_days_before
    });

  }

  function changeDayBefore(evt) {
    setNewTrial({
      ...newTrial,
      one_day_before: !newTrial.one_day_before
    });

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

  function addLink(evt) {
    evt.preventDefault();
    setNewTrial({
      ...newTrial,
      link: evt.target.value,
    })
  }

  function handleSubmit(evt) {
    evt.preventDefault();

    dispatch({
      type: "ADD_TRIAL",
      payload: newTrial
    })
    history.push('/trials');
  }

  function autofill() {
    setNewTrial({
      name: 'Youtube TV',
      cost: 12,
      expiration_date: "12/01/22",
      username: 'maiajohn',
      link: "https://www.youtube.com",
      one_week_before: false,
      three_days_before: true,
      one_day_before: true,
    })
  }

  return (
    <div>
    <h1 className="add-trial-text" onClick={autofill}>Add Trial</h1>

    <form className="container-addtrial" onSubmit={handleSubmit}>

    <div>
    <label>
      Trial Name:
    </label>
    <input
      onChange={addName}
      placeholder="Trial Name"
      type="text" />
    </div>

    <div>
    <label>
      Cost:
    </label>
    <input
      onChange={addCost}
      placeholder="Cost"
      type="number"
      min="0"
      step="any"
    />
    </div>
    
    <div>
    <label>
      End Date:
    </label>
    <input
      onChange={addEndDate}
      placeholder="End Date"
      type="date" />
    </div>

    <div>
    <label>
      Username:
    </label>
    <input
      onChange={addUsername}
      placeholder="Username"
      type="text" />
    </div>

    <div>
      <label>
        Link:
      </label>
      <input
        onChange={addLink}
        placeholder="URL"
        type="url" />
    </div>

    <div className="alert-label">
    <label>
      Alerts:
    </label>

    <div className="alerts-check">
      <input type="checkbox" label="1 Week Before" checked={newTrial.one_week_before} onChange={changeWeek} />
      <label htmlFor="1weekbefore"><b>1 Week Before</b></label>
    </div>
    <div className="alerts-check">
      <input type="checkbox" label="3 Days Before" checked={newTrial.three_days_before} onChange={changeThreeDays} />
      <label htmlFor="3daysbefore"><b>3 Days Before</b></label>
    </div>
    <div className="alerts-check">
      <input type="checkbox" label="1 Day Before" checked={newTrial.one_day_before} onChange={changeDayBefore} />
      <label htmlFor="1daybefore"><b>1 Day Before</b></label>
    </div>
    </div>
    
    <div>
    <button className="new-submit" type="submit">Submit</button>
    </div>
    </form>

    <Link to="/user">
      <button className="back-btn-newtrial">Back To Main Menu</button>
    </Link>
    </div>
  )
}

export default NewTrialPage;