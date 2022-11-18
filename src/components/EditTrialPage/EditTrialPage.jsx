import { useParams } from "react-router-dom";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

function EditTrialPage() {
    const dispatch = useDispatch();
    const params = useParams();

    const trial = useSelector(store => store.editTrial);

    useEffect(() => {
        dispatch({
            type: "FETCH_EDIT_TRIAL",
            payload: params.id
        });
    }, [params.id]);



    return (
        <h1>{trial.name}</h1>
    )
}

export default EditTrialPage;