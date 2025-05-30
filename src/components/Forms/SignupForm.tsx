import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import toast from "react-hot-toast";
import { useSignupUser } from "../../hooks/useAuthHook";
import type { SignupUserProps } from "../../types/auth.type";
import { SignupFormSchema } from "../../validators/auth.validator";
import { Link } from "react-router";
import { useState } from "react";
import { Eye, EyeClosed } from "lucide-react";

const SignupForm = () => {
    const signupMutation = useSignupUser();

    const [showPassword, setShowPassword] = useState(false)

    const form = useForm<SignupUserProps>({
        mode: 'onChange',
        resolver: zodResolver(SignupFormSchema as any),
        defaultValues: { username: '', email: '', password: '' }
    });

    const onSubmit = async (userDetails: SignupUserProps) => {
        try {
            await signupMutation.mutateAsync(userDetails);
        } catch (error: any) {
            const message = error?.response?.data?.message || error?.message || 'Signup failed';
            toast.error(message);
        }
    };

    const handlePassword = () => {
        setShowPassword(showPassword => !showPassword)
    }

    return (
        <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="min-h-screen flex items-center justify-center bg-base-100 px-4"
        >
            <div className="w-full max-w-md bg-base-200 rounded-2xl shadow-lg p-8 space-y-6">
                <div className="text-center">
                    <h2 className="text-2xl font-bold text-base-content">Create an Account</h2>
                    <p className="text-sm text-base-content/70">Join us and get started in seconds</p>
                </div>

                {/* Username */}
                <div className="form-control w-full">
                    <label htmlFor="username" className="label">
                        <span className="label-text text-sm font-medium">Username</span>
                    </label>
                    <input
                        id="username"
                        type="text"
                        placeholder="John Doe"
                        {...form.register('username')}
                        className="input input-bordered w-full"
                    />
                    {form.formState.errors.username && (
                        <p className="text-sm text-error mt-1">{form.formState.errors.username.message}</p>
                    )}
                </div>

                {/* Email */}
                <div className="form-control w-full">
                    <label htmlFor="email" className="label">
                        <span className="label-text text-sm font-medium">Email</span>
                    </label>
                    <input
                        id="email"
                        type="email"
                        placeholder="mail@site.com"
                        {...form.register('email')}
                        className="input input-bordered w-full"
                    />
                    {form.formState.errors.email && (
                        <p className="text-sm text-error mt-1">{form.formState.errors.email.message}</p>
                    )}
                </div>

                {/* Password */}
                <div className="form-control w-full relative">
                    <label htmlFor="password" className="label">
                        <span className="label-text text-sm font-medium">Password</span>
                    </label>
                    <input
                        id="password"
                        type={`${showPassword ? 'text' : 'password'}`}
                        placeholder="********"
                        {...form.register('password')}
                        className="input input-bordered w-full"
                    />
                    <span
                        onClick={handlePassword}
                        className="z-50 absolute right-3 top-8 cursor-pointer text-base-content/70 hover:text-base-content transition-colors"
                        role="button"
                        aria-label="Toggle password visibility"
                    >
                        {!showPassword ? <Eye /> : <EyeClosed />}
                    </span>
                    {form.formState.errors.password && (
                        <p className="text-sm text-error mt-1">{form.formState.errors.password.message}</p>
                    )}
                </div>

                {/* Submit Button */}
                <div className="pt-4">
                    <button type="submit" className="btn btn-primary w-full">
                        Signup
                    </button>
                </div>

                <div className="text-sm text-base-content/80 text-center">
                    Already have an account?{' '}
                    <Link
                        to="/login"
                        className="text-primary font-medium hover:underline hover:text-primary-focus transition-colors"
                    >
                        Login
                    </Link>
                </div>
            </div>
        </form>

    );
};

export default SignupForm;
