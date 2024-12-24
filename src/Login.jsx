import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from './AutProvider';
import Swal from 'sweetalert2';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();
    const { handelLogin, handelGoogleLogin, setLoading } = useAuth();

    
    const handleLogin = async (e) => {
        e.preventDefault();
        
        try {
            setLoading(true);
            await handelLogin(email, password);
            Swal.fire("Login successful!");
            navigate('/'); 
        } catch (error) {
            Swal.fire("Invalid email or password");
        } finally {
            setLoading(false);
        }
    };

    // Handle Google login
    const handleGoogleLogin = async () => {
        try {
            setLoading(true);
            await handelGoogleLogin();
            Swal.fire("Google login successful!");
            navigate('/');  // Redirect after Google login
        } catch (error) {
            Swal.fire("Google login failed!");
        } finally {
            setLoading(false);
        }
    };
    return (
        <div className="min-h-screen bg-base-200 flex items-center justify-center">
            <div className="card bg-white shadow-xl p-8 w-full max-w-lg">
                <h1 className="text-2xl text-center font-bold mb-4">Login</h1>
                <form onSubmit={handleLogin}>
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
                    <button type="submit" className="btn btn-primary mt-4 w-full">
                        Login
                    </button>
                </form>
                <div className="flex items-center justify-center mt-4">
                    <button 
                        onClick={handleGoogleLogin} 
                        className="btn btn-outline btn-secondary w-full mt-4"
                    >
                        Login with Google
                    </button>
                </div>
                <p className="text-center mt-4">
                    Don't have an account?{' '}
                    <Link to="/register" className="text-primary">
                        Register here
                    </Link>
                </p>
            </div>
        </div>
    );
};

export default Login;