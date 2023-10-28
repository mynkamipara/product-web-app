import Link from 'next/link'
import Button from '@mui/material/Button';

export default function HomePage() {
    const username = undefined;
    return (
        <>
            {username ?
                <>
                    <h2>Hi {username}</h2>
                    <Link href="/profile">Profile</Link><br />
                    <Link href="/api/logout">Logout</Link>
                    <Button variant="contained">Hello world</Button>
                </> :
                <>
                    <h2>Log in</h2>
                    <Link href="/login">Login</Link><br />
                    <Link href="/signup">Signup</Link>
                    <Link href="/chat">Chat</Link>
                </>
            }
        </>
    );
}