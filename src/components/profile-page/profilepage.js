import React, {useState} from 'react';
import styles from '.profilepage.module.css';
import { useEffect } from 'react';

const ProfilePage = () => {
    const [user, setUser] = useState(null);
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    useEffect(() => {
        fetch('/api/user')
        .then ((response) => {
            if (response.status === 401) {
                setIsLoggedIn(false);
                throw new Error('User not authenticated');
            }
            setIsLoggedIn(true);
            return response.json();
        })
        .then((data) => setUser(data))
        .catch((error) => console.error(error));
    }, []);

    if (!isLoggedIn) {
        return <div>Please log in to continue to your user page</div>;
    }

    if (!user) {
        return <div>Loading...</div>;
    }

    return (
        <div className={styles.container}>
            <h1>{user.firstName} {user.lastName}'s Profile</h1>
            <div className={styles.info}>
                <p><strong>Email:</strong> {user.email}</p>
                <p><strong>Role:</strong> {user.role}</p>
            </div>
        </div>
    );
}

export default ProfilePage;