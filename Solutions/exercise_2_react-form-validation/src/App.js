import React, { useState } from "react";
import "./App.css";

const App = () => {

    const [ name, setName ] = useState("");
    const [ nameChanged, setNameChanged ] = useState(false);
    const [ age, setAge ] = useState("");
    const [ ageChanged, setAgeChanged ] = useState(false);
    const [ email, setEmail ] = useState("");
    const [ emailChanged, setEmailChanged ] = useState(false);
    const [ comment, setComment ] = useState("");
    const [ commentChanged, setCommentChanged ] = useState(false);
    const [ gender, setGender ] = useState("default");

    // Ref 1 - Error div if the user has written an email in the wrong format
    // This will be used in the checkEmailFormat function
    const emailFormatError = React.createRef();
    // Ref 2 - Error div if the user has written less than 50 characters in the "comment" textarea
    // This will be used in the checkCommentLength function
    const commentLengthError = React.createRef();

    // When the user updates one of the form elements, check its "name"
    // And then update the correct state variable with the new value
    // Now we can update all the state variables correctly using just one function!
    const updateData = event => {
        switch(event.target.name) {
            case "users_name":
                setName(event.target.value);
                setNameChanged(true);
                break;
            case "age":
                setAge(event.target.value);
                setAgeChanged(true);
                break;
            case "email":
                setEmail(event.target.value);
                setEmailChanged(true);
                break;
            case "comment":
                setComment(event.target.value);
                setCommentChanged(true);
                break;
            case "gender":
                setGender(event.target.value);
                break;
            default:
                break;
        }
    }

    // Check the user has written their email in the correct format when the "email" input loses focus
    const checkEmailFormat = () => {
        if (/^[a-zA-Z0-9]+@[a-zA-Z0-9]+\.[A-Za-z]+$/.test(email)) {
            emailFormatError.current.className = "errorInvisible"
        } else {
            emailFormatError.current.className = "errorVisible"
        }
    }

    // Check the user has written a comment over 50 characters when the "comment" input loses focus
    const checkCommentLength = () => {
        if (comment.length > 50) {
            commentLengthError.current.className = "errorInvisible"
        } else {
            commentLengthError.current.className = "errorVisible"
        }
    }

    // Handle the user attempting to submit the form
    const submitForm = event => {
        event.preventDefault();

        // IF all the checks pass, submit the form...
        if (name.length > 0 
            && age.length > 0 && age > 0
            && /^[a-zA-Z0-9]+@[a-zA-Z0-9]+\.[A-Za-z]+$/.test(email)
            && comment.length > 50 
            && gender !== "default"
        ) {
            // * Option 1: log all the user data from the form to the console

            // console.log("Name", name);
            // console.log("Age", age);
            // console.log("Email", email);
            // console.log("Comment", comment);
            // console.log("Gender", gender);

            // * Option 2: use fetch to POST the user's data to a server, and log the server's response

            const userData = {
                name: name,
                age: age,
                email: email,
                comment: comment,
                gender: gender
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
            setNameChanged(false);
            setAge("");     // Same as above, for the "age" state variable
            setAgeChanged(false);
            setEmail(""); // Etc
            setEmailChanged(false);
            setComment(""); // Etc
            setCommentChanged(false);
            setGender("female"); // Etc
        // ELSE, do not submit the form if one or more checks fail
        // Instead, give the user an alert for each failed check
        } else {
            if (name.length === 0) {
                alert("Please enter your name");
            }
            if (age.length === 0) {
                alert("Please enter your age");
            }
            if (age < 0) {
                alert("Age should be positive");
            }
            if (/^[a-zA-Z0-9]+@[a-zA-Z0-9]+\.[A-Za-z]+$/.test(email) === false) {
                alert("Please enter your email in a correct format");
            }
            if (comment.length < 51) {
                alert("Comment should be over 50 characters");
            }
            if (gender === "default") {
                alert("Please select your gender");
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
                    <label htmlFor="users_name">Name</label>
                    <input id="users_name" name="users_name" onChange={updateData} value={name}/>
                    <div className={nameChanged && name.length === 0 ? "errorVisible" : "errorInvisible"}>Please enter your name</div>

                    <label htmlFor="age">Age</label>
                    <input id="age" name="age" type="number" onChange={updateData} value={age} />
                    <div className={ageChanged && age.length === 0 ? "errorVisible" : "errorInvisible"}>Please enter your age</div>
                    <div className={ageChanged && age < 0 ? "errorVisible" : "errorInvisible"}>Age should be positive</div>

                    <label htmlFor="email">Email</label>
                    <input id="email" name="email" onChange={updateData} onBlur={checkEmailFormat} value={email} />
                    <div className={emailChanged && email.length === 0 ? "errorVisible" : "errorInvisible"}>Please enter your email</div>
                    <div className="errorInvisible" ref={emailFormatError}>Incorrect email format</div>

                    <label htmlFor="comment">Comment</label>
                    <textarea id="comment" name="comment" onChange={updateData} onBlur={checkCommentLength} value={comment}></textarea>
                    <div className={commentChanged && comment.length === 0 ? "errorVisible" : "errorInvisible"}>Please enter a comment</div>
                    <div className="errorInvisible" ref={commentLengthError}>{51 - comment.length > 0 ? `${51 - comment.length} characters needed` : ""}</div>

                    <label htmlFor="gender">Gender</label>
                    <select id="gender" name="gender" onChange={updateData} value={gender}>
                        <option value="default">Please select your gender</option>
                        <option value="female">Female</option>
                        <option value="male">Male</option>
                        <option value="other">Other</option>
                    </select>
                    
                    <div className="button_container">
                        <button type="submit">Submit Data</button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default App;