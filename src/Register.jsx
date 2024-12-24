import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useAuth } from './AutProvider';
import Swal from 'sweetalert2';


const Register = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [photoURL, setPhotoURL] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const navigate = useNavigate();
    const { handelRegister, setLoading } = useAuth();

    const handleRegister = async (e) => {
        e.preventDefault();
        const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{6,}$/;
        if (!passwordRegex.test(password)) {
             Swal.fire("Password must contain at least one uppercase letter, one lowercase letter, and be at least 6 characters long.");
            return;
        }
        if (password !== confirmPassword) {
            Swal.fire('Passwords do not match!');
            return;
        }

        try {
            setLoading(true);
            await handelRegister(email, password);
            Swal.fire('Registration successful!');
            navigate('/login');
        } catch (error) {
            Swal.fire('Error during registration, please try again.');
        } finally {
            setLoading(false);
        }
    };
    return (
        <div className="min-h-screen bg-base-200 flex items-center justify-center">
            <div className="card bg-white shadow-xl p-8 w-full max-w-lg">
                <h1 className="text-2xl text-center font-bold mb-4">Register</h1>
                <form onSubmit={handleRegister}>
                    <div className="form-control mb-4">
                        <label className="label font-bold">Name</label>
                        <input
                            type="text"
                            name="name"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            className="input input-bordered"
                            required
                        />
                    </div>
                    <div className="form-control mb-4">
                        <label className="label font-bold">Email</label>
                        <input
                            type="email"
                            name="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="input input-bordered"
                            required
                        />
                    </div>
                    <div className="form-control mb-4">
                        <label className="label font-bold">Photo URL</label>
                        <input
                            type="text"
                            name="photoURL"
                            value={photoURL}
                            onChange={(e) => setPhotoURL(e.target.value)}
                            className="input input-bordered"
                        />
                    </div>
                    <div className="form-control mb-4">
                        <label className="label font-bold">Password</label>
                        <input
                            type="password"
                            name="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="input input-bordered"
                            required
                        />
                    </div>
                    {/* <div className="form-control mb-4">
                        <label className="label font-bold">Confirm Password</label>
                        <input
                            type="password"
                            name="confirmPassword"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            className="input input-bordered"
                            required
                        /> */}
                    </div>
                    <button type="submit" className="btn btn-primary mt-4 w-full">
                        Register
                    </button>
                </form>
                <p className="text-center mt-4">
                    Already have an account?{' '}
                    <Link to="/login" className="text-primary">
                        Login here
                    </Link>
                </p>
            </div>
        </div>
    );
};

export default Register;