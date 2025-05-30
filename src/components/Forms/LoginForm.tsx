import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import toast from "react-hot-toast";
import { useLoginUser } from "../../hooks/useAuthHook";
import { LoginFormSchema } from "../../validators/auth.validator";
import type { LoginUserProps } from "../../types/auth.type";
import { Link } from "react-router";

const LoginForm = () => {
    const loginMutation = useLoginUser();

    const form = useForm<LoginUserProps>({
        resolver: zodResolver(LoginFormSchema),
        defaultValues: { email: '', password: '' }
    });

    const onSubmit = async (userDetails: LoginUserProps) => {
        try {
            await loginMutation.mutateAsync(userDetails);
        } catch (error: any) {
            const message = error?.response?.data?.message || error?.message || 'Login failed';
            toast.error(message);
        }
    };

    return (
        <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="min-h-screen flex items-center justify-center px-4"
        >
            <div className="w-full max-w-md bg-base-200 rounded-2xl shadow-lg p-8 space-y-6">
                <div className="text-center">
                    <h2 className="text-2xl font-bold text-base-content">Login to Your Account</h2>
                    <p className="text-sm text-base-content/70">Enter your credentials below</p>
                </div>

                {/* Email Field */}
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

                {/* Password Field */}
                <div className="form-control w-full">
                    <label htmlFor="password" className="label">
                        <span className="label-text text-sm font-medium">Password</span>
                    </label>
                    <input
                        id="password"
                        type="password"
                        placeholder="********"
                        {...form.register('password')}
                        className="input input-bordered w-full"
                    />
                    {form.formState.errors.password && (
                        <p className="text-sm text-error mt-1">{form.formState.errors.password.message}</p>
                    )}
                </div>

                {/* Submit Button */}
                <div className="pt-4">
                    <button type="submit" className="btn btn-primary w-full">
                        Login
                    </button>
                </div>

                <div className="text-sm text-base-content/80 text-center">
                    Don&apos;t have an account?{' '}
                    <Link
                        to="/signup"
                        className="text-primary font-medium hover:underline hover:text-primary-focus transition-colors"
                    >
                        Signup
                    </Link>
                </div>
            </div>
        </form>
    );
};

export default LoginForm;
