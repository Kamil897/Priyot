import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { getAuth, signInWithPopup, GoogleAuthProvider } from 'firebase/auth';
import { initializeApp } from 'firebase/app';
import s from './Registration.module.scss';

const firebaseConfig = {
    apiKey: "YOUR_API_KEY",
    authDomain: "YOUR_AUTH_DOMAIN",
    projectId: "YOUR_PROJECT_ID",
    storageBucket: "YOUR_STORAGE_BUCKET",
    messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
    appId: "YOUR_APP_ID"
};

initializeApp(firebaseConfig);

const Registration = () => {
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        hobby: '',
        education: '',
        username: '',
        password: '',
        avatar: '',
        birth: '',
    });

    const navigate = useNavigate();
    const auth = getAuth();
    const provider = new GoogleAuthProvider();

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleRegister = (e) => {
        e.preventDefault();
        const existingUser = localStorage.getItem(formData.username);
        if (existingUser) {
            alert('Пользователь с таким именем уже существует');
            return;
        }

        let calculatedAge = null;
        if (formData.birth) {
            const birthDateObj = new Date(formData.birth);
            const today = new Date();
            calculatedAge = today.getFullYear() - birthDateObj.getFullYear();
            const monthDiff = today.getMonth() - birthDateObj.getMonth();
            if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDateObj.getDate())) {
                calculatedAge--;
            }
        }

        const userData = { ...formData, age: calculatedAge };
        localStorage.setItem(formData.username, JSON.stringify(userData));

        alert('Регистрация прошла успешно!');
        navigate('/login');
    };

    const handleGoogleSignIn = async () => {
        try {
            const result = await signInWithPopup(auth, provider);
            const user = result.user;
            localStorage.setItem(user.uid, JSON.stringify({
                username: user.displayName,
                email: user.email,
                avatar: user.photoURL,
            }));
            alert('Регистрация через Google успешна!');
            navigate('/login');
        } catch (error) {
            console.error('Ошибка входа через Google:', error);
        }
    };

    return (
        <div className="container__main">
            <div className={s.exit}>
                <Link to="/">
                    <button className={s.exit_button}>Назад</button>
                </Link>
            </div>
            <div className={s.div}>
                <h2 className={s.h2}>Регистрация</h2>
                <form onSubmit={handleRegister}>
                    <div className={s.form}>
                        <label>
                            <p>Имя пользователя</p>
                            <input className={s.input} type="text" name="username" value={formData.username} onChange={handleChange} required />
                        </label>
                        <label>
                            <p>Пароль</p>
                            <input className={s.input} type="password" name="password" value={formData.password} onChange={handleChange} required />
                        </label>
                    </div>
                    <button className={s.btn} type="submit">Зарегистрироваться</button>
                </form>
                <button className={s.googleBtn} onClick={handleGoogleSignIn}>Зарегистрироваться через Google</button>
                <Link className={s.link} to={'/login'}>Уже есть аккаунт? Войти</Link>
            </div>
        </div>
    );
};

export default Registration;
