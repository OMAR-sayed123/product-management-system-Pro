// This file manages authentication and user data in localStorage.
// localStorage is a browser storage system used to remember users between refreshes.

// Get all registered users from browser storage.
export const getUsers = () => {
    const users = JSON.parse(localStorage.getItem("users"));
    return users || [];
};

// Create and save a new user in the users list.
export const createUsers = (newuser) => {
    const users = getUsers();
    users.push(newuser);
    localStorage.setItem("users", JSON.stringify(users));
};

// Check if the entered email and password match a user.
export const loginUser = (EmailLogin, PasswordLogin) => {
    const users = getUsers();
    const user = users.find((user) => user.email === EmailLogin);

    if (!user) {
        return {
            success: false,
            error: "Email"
        };
    }

    if (user.password !== PasswordLogin) {
        return {
            success: false,
            error: "Password"
        };
    }

    return {
        success: true,
        userSuccess: user
    };
};

// Save the current logged-in user in browser storage.
export const setCurrentUser = (user) => {
    localStorage.setItem("currentUser", JSON.stringify(user));
};

// Update the matching user in the registered users list and current session.
export const updateUser = (updatedUser, previousEmail = updatedUser.email) => {
    const users = getUsers();
    const updatedUsers = users.map((user) => (
        user.email === previousEmail ? updatedUser : user
    ));

    localStorage.setItem("users", JSON.stringify(updatedUsers));
    setCurrentUser(updatedUser);
};

// Read the currently logged-in user from storage.
export const getCurrentUser = () => {
    return JSON.parse(localStorage.getItem("currentUser"));
};