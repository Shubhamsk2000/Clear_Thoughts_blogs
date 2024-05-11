import { useContext, useState } from 'react';
import { getUserAw, loginAw } from '../appwrite/appwriteFun';
import '../css/index.css'; // Importing CSS file for styling
import { GlobalContext } from '../context/Context';

const LoginPage = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const { isLogin, setIsLogin, userData, setUserData } = useContext(GlobalContext);

    function loginBtn() {
        loginAw(email, password)
            .then(() => {
                setIsLogin(true);
                getUserAw().then(data => {
                    setUserData(data);
                });
            })
            .catch((e) => console.log(e.message));
            console.log("loggin successfull !!!")
    }
    return (
        <div className="login-container">
            <div className="login-form">
                <h2>Login</h2>
                <form onSubmit={(e) => e.preventDefault()}>
                    <div className="form-group">
                        <label htmlFor="username">Email Id</label>
                        <input type="text" id="email-id" name="email-id" placeholder="Enter your email" value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="password">Password</label>
                        <input type="password" id="password" name="password" placeholder="Enter your password" value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>
                    <button type="submit" onClick={loginBtn}>Login</button>
                </form>
                <div className="register-option">
                    <p>Don&apos;t have an account ? <a href="/register">Register here</a></p>
                </div>
            </div>
        </div>
    );
}

export default LoginPage;
