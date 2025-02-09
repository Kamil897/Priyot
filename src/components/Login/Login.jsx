    import { Link, useNavigate } from 'react-router-dom';
    import s from './Login.module.scss'
    import { useState } from 'react';

    const Login = () => {
        const [username, setUsername] = useState('');
        const [password, setPassword] = useState('');
        const navigate = useNavigate();

        const handleUsernameChange = (e) => {
            setUsername(e.target.value);
        };

        const handlePasswordChange = (e) => {
            setPassword(e.target.value);
        };

        const handleLogin = (e) => {
            e.preventDefault();

            const userData = JSON.parse(localStorage.getItem(username));

            if (!userData) {
                alert('Пользователь не найден');
                return;
            }

            if (userData.password !== password) {
                alert('Неверный пароль');
                return;
            }
            
            alert('Вход успешен!');
            localStorage.setItem('loggedInUsername', username);

            navigate('/MainPage'); 
        };

        return (
            <div className="container__main">
                <div className={s.exit}>
                    <Link to={"/"}>
                    <button className={s.exit_button}> Назад</button>
                    </Link>
                </div>

                <div className={s.ring}>
                    <i style={{color: '#00ff0a'}}></i>
                    <i style={{color: '#ff0057'}}></i>
                    <i style={{color: '#fffd44'}}></i>
                        <div className={s.div}>
                            <h2 className={s.h2}>Вход</h2>
                            <form  onSubmit={handleLogin}>
                                <div className={s.form}>

                                <div>
                                    <label htmlFor="username">Имя пользователя:</label>
                                    <input className={s.input}
                                        type="text"
                                        id="username"
                                        value={username}
                                        onChange={handleUsernameChange}
                                        required
                                    />
                                </div>
                                <div>
                                    <label htmlFor="password">Пароль:</label>
                                    <input className={s.input}
                                        type="password"
                                        id="password"
                                        value={password}
                                        onChange={handlePasswordChange}
                                        required
                                    />
                                </div>
                                </div>
                                <Link className={s.link} to={'/register'}>Еще нету аккаунта? Регистрация</Link>
                                <button className={s.btn} type="submit">Войти</button>
                            </form>
                        </div>
                </div>
            </div>
        );
    };

    export default Login;
