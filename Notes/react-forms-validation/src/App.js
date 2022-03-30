import React, { useState } from "react";
import "./App.css";

const App = () => {

    const [ name, setName ] = useState("");
    const [ age, setAge ] = useState("")
    const [ comment, setComment ] = useState("");
    const [ gender, setGender ] = useState("female");
    const [ consent, setConsent ] = useState("");

    // ! Old functions - we don't need to make 5 different functions to update each state variable...

    // const updateName = event => {
    //     setName(event.target.value);
    // }

    // const updateAge = event => {
    //     setAge(event.target.value);
    // }

    // const updateComment = event => {
    //     setComment(event.target.value);
    // }

    // const updateGender = event => {
    //     setGender(event.target.value);
    // }

    // const updateConsent = event => {
    //     setConsent(event.target.value)
    // }

    // * New function!
    // * When the user updates one of the form elements, check its "name"
    // * And then update the correct state variable with the new value
    // * Now we can update all the state variables correctly using just one function!

    const updateData = event => {
        switch(event.target.name) {
            case "users_name":
                setName(event.target.value);
                break;
            case "age":
                setAge(event.target.value);
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

    // Handle the form being submitted
    const submitForm = event => {
        event.preventDefault();

        // * Option 1: log all the user data from the form to the console

        // console.log("Name", name);
        // console.log("Age", age);
        // console.log("Comment", comment);
        // console.log("Gender", gender);
        // console.log("Consent", consent);

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
    
        setName("");    // Reset the value of the "name" state variable / input element
        setAge("");     // Same as above, for the "age" state variable
        setComment(""); // Etc
        setGender("female"); // Etc
        setConsent(""); // Etc
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
                    <label htmlFor="users_name">Name</label>
                    <input id="users_name" name="users_name" onChange={updateData} value={name}/>

                    <label htmlFor="age">Age</label>
                    <input id="age" name="age" type="number" onChange={updateData} value={age} />

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