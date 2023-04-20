import React, {useState} from 'react';
import styles from '.profilepage.module.css';
import { useEffect } from 'react';

const profilePage = () => {
    const [user, setUser] = useState(null);

    useEffect(() => {
        fetch('/api/user')
        .then(response => response.json())
        .then(data => setUser(data))
        .catch(error => console.error(error));
    }, []);

    if (!user) {
        return <div>Loading...</div>;
    }

    return (
        <div className={styles.profile}>
            <h1>{user.firstName} {user.lastName}'s Profile</h1>
            <div className={styles.info}>
                <p><strong>Email:</strong> {user.email}</p>
                <p><strong>Role:</strong> {user.role}</p>
            </div>
        </div>
    );
}

export default profilePage;