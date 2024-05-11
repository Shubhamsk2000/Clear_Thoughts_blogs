import { useState } from 'react';
import registerAw from '../appwrite/appwriteFun';
import '../css/index.css'; // Importing CSS file for styling

const Registration = () => {
    const [userName, setUserName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    function registerBtn() {

        registerAw(email, password, userName);
        console.log("registered successfuly !!");
        // Navigate('/login');
    }
    return (
        <div>
            <div className="registration-container">
                <div className="registration-form">
                    <h2>Register</h2>
                    <form onSubmit={(e) => e.preventDefault()}>
                        <div className="form-group">
                            <label htmlFor="username">Username</label>
                            <input type="text" id="username" name="username" placeholder="Enter your username"
                                value={userName}
                                onChange={(e) => setUserName(e.target.value)}
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="email">Email</label>
                            <input type="email" id="email" name="email" placeholder="Enter your email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="password">Password</label>
                            <input type="password" id="password" name="password" placeholder="Enter your password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                        </div>
                        <button type="submit" onClick={registerBtn}>Register</button>
                    </form>
                    <div className="register-option">
                        <p>Already have an account ? <a href="/login">Login here</a></p>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Registration;
