# React Forms 1

Create a simple "signup" form using React.

### Instructions

1. Create a JSX `form`. Inside your form, create at least 5 JSX elements to contain the user's data, including at least one `input`, one `textarea` and one `select`.
2. Label each of your elements correctly. Example labels include "Name", "Age", "Email", "Gender", "Comments".
3. Next, add a "submit" button at the bottom of your form. 
4. When you click the button to submit the form, you should use the **"onSubmit"** event handler in your `<form>` opening tag to call a function.
5. When called, this function should log the user's data to the browser console, and then reset all of the form elements to default values. The user's data should remain in your console after the form data is reset.
6. Is there a small problem in your console when you click the button? If not, well done! If so, see if you can work out how to fix it, based on work we have already done together about submitting forms!

**Remember:** You should create your form as a controlled component. State should be the only source of truth!

---

**Extra - only if you have time at the end!**

7. If you have any extra time you can add some light styling to your form.

8. You could also practice using "fetch" from earlier in the module by rewriting your app to POST the user's data to https://jsonplaceholder.typicode.com/users when you click the "Submit" button.