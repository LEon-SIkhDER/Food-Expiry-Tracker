import React from 'react';

const Register = () => {
    return (
        <div>
            <div>
                <div className="hero bg-base-200 min-h-screen">

                    <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl">
                        <div className="card-body">
                            <h1 className="text-4xl font-bold">Register now!</h1>
                            <fieldset className="fieldset">
                                <label className="label text-black font-semibold">Email</label>
                                <input type="email" className="input" placeholder="Email" />
                                <label className="label text-black font-semibold">Password</label>
                                <input type="password" className="input" placeholder="Password" />
                                <div><a className="link link-hover">Forgot password?</a></div>
                                <button className="btn btn-neutral mt-4">Register</button>
                            </fieldset>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Register;