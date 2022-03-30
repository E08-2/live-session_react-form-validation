import React, { useState, useEffect } from "react";
import "./App.css";

const App = () => {

    const [name, setName] = useState("");
    const [age, setAge] = useState("");
    const [ageWasChanged, setAgeWasChanged] = useState(false);
    const [comment, setComment] = useState("");
    const [gender, setGender] = useState("female");
    const [consent, setConsent] = useState("");

    // Make a ref to the "name" error div
    // Like document.querySelector in vanilla JS
    const nameErrorDiv = React.createRef();
    const jamieNameErrorDiv = React.createRef();

    useEffect(() => {
        if (age.length === 0) {
            console.log("Age is empty!");
        } else {
            console.log("Age has some value!");
        }
    }, [age])

    // When the user updates one of the form elements, check its "name" attribute
    // And then update the correct state variable with the new value
    // Now we can update all the state variables correctly using just one function!
    const updateData = event => {
        switch (event.target.name) {
            case "users_name":
                setName(event.target.value);
                break;
            case "age":
                // Every time you update state, the component re-renders
                // So the user can see the latest data/version of the component
                setAge(event.target.value);
                setAgeWasChanged(true);

                // ! This uses the old value of "age" - let's use a useEffect hook instead!
                // if (age.length === 0) {
                //     console.log("Age is empty!");
                // } else {
                //     console.log("Age has some value!");
                // }
                break;
            case "comment":
                setComment(event.target.value);
                break;
            case "gender":
                setGender(event.target.value);
                break;
            case "consent":
                setConsent(event.target.value);
                break;
            default:
                break;
        }
    }

    // A function to check if the "name" input is empty or not on "blur"
    // A "blur" event happens when an element loses focus (e.g. you click away from it)
    const checkNameOnBlur = () => {
        if (name.trim().length === 0) {
            // * nameErrorDiv.current = The <div> which the "ref" is pointing to / selecting
            nameErrorDiv.current.style.display = "block";
        } else {
            nameErrorDiv.current.style.display = "none";
        }
    }

    // Handle the form being submitted
    const submitForm = event => {
        event.preventDefault();

        // * Option 1: log all the user data from the form to the console

        // console.log("Name", name);
        // console.log("Age", age);
        // console.log("Comment", comment);
        // console.log("Gender", gender);
        // console.log("Consent", consent);

        // * Only allow the form to be submitted if the user has correctly filled it in!
        if (name.length !== 0 && name.toLowerCase() === "jamie" && age.length !== 0) {
            // Make sure the "Jamie name" error div is not visible (in case it already was!)
            jamieNameErrorDiv.current.style.display = "none";
            
            // * Option 2: use fetch to POST the user's data to a server, and log the server's response

            const userData = {
                name: name,
                age: age,
                comment: comment,
                gender: gender,
                consent: consent
            }

            const settings = {
                method: "POST",
                body: JSON.stringify(userData),
                headers: {
                    "Content-Type": "application/JSON"
                }
            }

            fetch("https://jsonplaceholder.typicode.com/users", settings)
                .then(response => response.json())
                .then(data => {
                    console.log("Response from server", data);
                })

            setName("");    // Reset the value of the "name" state variable
            setAge("");     // Reset "age"
            setAgeWasChanged(false);
            setComment(""); // Reset "comment"
            setGender("female"); // Reset "gender"
            setConsent(""); // Reset "consent"
        } else {
            alert("Please fill in the name and age fields correctly before submitting the form!");

            if (name.toLowerCase() !== "jamie") {
                jamieNameErrorDiv.current.style.display = "block";
            }
        }
    }

    return (
        <div className="container">
            <div className="form_container">
                <div className="heading_container">
                    <h2>My React Form</h2>
                </div>
                <form onSubmit={submitForm}>
                    {/* 
                    Making the input a controlled component:

                    1. Give the input a "value" linked to the "name" state variable
                    2. However, now to change what the user can see in the input...
                    ... first we must update the STATE VARIABLE!
                    3. To do this, we must add an "onChange" event handler to the input
                    4. This calls a function which updates the STATE variable "name"
                    */}
                    <label htmlFor="users_name">Last Name</label>
                    <input id="users_name" name="users_name" onChange={updateData} onBlur={checkNameOnBlur} value={name} />
                    <div className="errorVisible" ref={nameErrorDiv}>Please enter your name</div>
                    <div className="errorInvisible" ref={jamieNameErrorDiv}>Only Jamie can fill in this form!</div>

                    <label htmlFor="age">Age</label>
                    <input id="age" name="age" onChange={updateData} value={age} />
                    <div className={age.length === 0 && ageWasChanged ? "errorVisible" : "errorInvisible"}>Please enter your age</div>
                    <div className={age > 120 && ageWasChanged ? "errorVisible" : "errorInvisible"}>Age must not be over 120!</div>

                    <label htmlFor="comment">Comment</label>
                    <textarea id="comment" name="comment" onChange={updateData} value={comment}></textarea>

                    <label htmlFor="gender">Gender</label>
                    <select id="gender" name="gender" onChange={updateData} value={gender}>
                        <option value="female">Female</option>
                        <option value="male">Male</option>
                        <option value="other">Other</option>
                    </select>

                    <label>Do you consent to the data policy?</label>

                    {/* 
                        When you click one of the radio buttons...
                        1. Change the value of the "consent" state variable (to "yes" or "no")
                        
                        Click the "yes" radio button --> state variable "consent" is updated to string "yes"

                        2. Then use the new value of the state variable to decide which of the 2 radio buttons should be "checked" (the user can see it is selected)
                    */}
                    <input className="radio_input" type="radio" name="consent" onChange={updateData} value="yes" checked={consent === "yes"} />
                    <label className="radio_label">Yes</label>
                    <input className="radio_input radio_input_right" type="radio" name="consent" onChange={updateData} value="no" checked={consent === "no"} />
                    <label className="radio_label">No</label>

                    <div className="button_container">
                        <button type="submit">Submit Data</button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default App;