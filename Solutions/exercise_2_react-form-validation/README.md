# React - Form Validation

Now let's add some form validation to a React form. :-)

You should aim to do as much as you can, but don't worry if you don't finish all the tasks. :-)

---

## Instructions

1. Create validation for your **name** input when the user **changes** the input's value. 
    - If the name is empty **after** the user has changed the input, an "error" div should be shown.
    - Remember: the error should not be shown on page load - only after the input has been changed!

---

2. Create validation for your **age** input when the user **changes** the input's value. You should think of at least **two** different checks for this input. 
    - If the value the user gave fails one of the rules, a **relevant** error div should be displayed under the element.
    - You will therefore need to create at least two error divs - one for each of the rules you are checking
    - What kind of rules could we set for the "age" input? When is the user giving incorrect data?

---

3. Create validation for your **email** input. You should create functionality for **two** different checks, and show an error div for each one when you think it is appropriate. 
    - The error divs should be shown:
        - If there is no text (or only blank space) inside the input.
        - If the email address is in the wrong format (see below for some helpful regex for this!).
    - What kind of **event handler** gives the user the best user experience of entering their email into your form?
    - See below for some example regex, for checking if an email address is in the correct format:

```js
if (/^[a-zA-Z0-9]+@[a-zA-Z0-9]+\.[A-Za-z]+$/.test(email)) {
    console.log("Valid email format!");
} else {
    console.log("Invalid email format");
}
```

---

4. Create validation for your **comments** textarea. You should create functionality for **two** different checks, and show an error div for each one when you think it is appropriate.
    - The error messages should be shown:
        - If there is no text (or only blank space) inside the textarea.
        - If the value the user typed is under 50 characters long.
    - You should try using a **different** event handler for each of these two error messages. Which event handler makes sense from the user's perspective of writing in the textarea? When does it make sense for them to see each error message?

----

5. Add a default option to your `select` dropdown menu, e.g. "Please select your gender".

---

6. When the user **submits** the form, create functionality to check whether they have correctly completed the form. This should include an **extra** check - for the "gender" dropdown menu:
    - The user should have selected a valid "gender" option, not the new "default" option you created in Task 4.

If any of the checks fail, the form should not be submitted, and instead a relevant "error" alert should be shown to the user for each check that did not succeed.

---

**BONUS - for anyone who finishes early!**

7. If you look at your `App` component, you will see that you have created several "error" divs, which look and behave in a similar way.

Now you should try to refactor (rewrite) your app to make a new `ErrorMessage` **child component**. You can create an `<ErrorMessage />` in place of each of your "error" divs, and use props to pass them anything they need. :-)