<template>
    <div class="max-w-md mx-auto">
        <div class="card">
            <div class="card-header">
                <h1 class="text-xl font-semibold text-balance">
                    Sign in to your account
                </h1>
                <p class="mt-1 text-sm text-gray-500 dark:text-gray-400">
                    Fill in the fields to sign in.
                </p>
            </div>
            <form @submit="submit" novalidate>
                <div class="card-body">
                    <!-- Email -->
                    <div class="form-group">
                        <label class="label" for="email">Email</label>
                        <Field name="email" v-slot="{ field, meta }">
                            <input
                                v-bind="field"
                                id="email"
                                type="email"
                                autocomplete="email"
                                :class="[
                                    'input',
                                    meta.touched && !meta.valid
                                        ? 'input-invalid'
                                        : '',
                                ]"
                                :aria-invalid="meta.touched && !meta.valid"
                                :aria-describedby="
                                    meta.touched && !meta.valid
                                        ? 'email-error'
                                        : 'email-hint'
                                "
                            />
                        </Field>
                        <ErrorMessage name="email" v-slot="{ message }">
                            <p id="email-error" class="error-text">
                                {{ message }}
                            </p>
                        </ErrorMessage>
                        <p v-if="!errors.email" id="email-hint" class="hint">
                            We will use this email for login.
                        </p>
                    </div>

                    <!-- Password -->
                    <div class="form-group">
                        <label class="label" for="password">Password</label>
                        <div class="input-wrap relative">
                            <Field name="password" v-slot="{ field, meta }">
                                <input
                                    v-bind="field"
                                    :type="showPassword ? 'text' : 'password'"
                                    id="password"
                                    autocomplete="current-password"
                                    :class="[
                                        'input pr-10',
                                        meta.touched && !meta.valid
                                            ? 'input-invalid'
                                            : '',
                                    ]"
                                    :aria-invalid="meta.touched && !meta.valid"
                                    :aria-describedby="
                                        meta.touched && !meta.valid
                                            ? 'password-error'
                                            : 'password-hint'
                                    "
                                />
                            </Field>
                            <button
                                type="button"
                                class="absolute inset-y-0 right-0 px-3 flex items-center text-sm text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
                                @click="showPassword = !showPassword"
                                :aria-label="
                                    showPassword
                                        ? 'Hide password'
                                        : 'Show password'
                                "
                            >
                                {{ showPassword ? "🙈" : "👁️" }}
                            </button>
                        </div>
                        <ErrorMessage name="password" v-slot="{ message }">
                            <p id="password-error" class="error-text">
                                {{ message }}
                            </p>
                        </ErrorMessage>
                        <p
                            v-if="!errors.password"
                            id="password-hint"
                            class="hint"
                        >
                            Enter your account password.
                        </p>
                    </div>
                </div>

                <div class="card-footer">
                    <button
                        type="submit"
                        class="btn btn-primary w-full flex items-center justify-center gap-2"
                        :disabled="isSubmitting"
                    >
                        <span
                            v-if="isSubmitting"
                            class="loading h-5 w-5 border-t-4"
                            aria-hidden="true"
                        />
                        {{ isSubmitting ? "Please wait..." : "Sign in" }}
                    </button>

                    <p
                        v-if="submitCount > 0 && submitSuccess"
                        class="mt-3 text-center text-sm text-green-600 dark:text-green-400"
                    >
                        ✅ authenticated!
                    </p>
                    <p
                        class="mt-4 text-center text-sm text-gray-500 dark:text-gray-400"
                    >
                        Don’t have an account?
                        <router-link
                            :to="{ name: Navlinks.signUp.name }"
                            class="text-primary-600 hover:underline dark:text-primary-400"
                        >
                            Sign up
                        </router-link>
                    </p>
                </div>
            </form>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { Field, ErrorMessage, useForm } from "vee-validate";
import { SignInFormType } from "./SignIn.schema";
import { AuthService } from "@/services/auth/authApi";
import type { SignInForm } from "./types";
import { useRouter } from "vue-router";
import { Navlinks } from "@/data/navigation";

const showPassword = ref(false);
const submitSuccess = ref(false);
const router = useRouter();

const { handleSubmit, isSubmitting, submitCount, errors, setFieldError } =
    useForm<SignInForm>({
        validationSchema: SignInFormType,
    });

const submit = handleSubmit(async (values) => {
    submitSuccess.value = false;
    try {
        const result = await AuthService.signIn(values);
        if (result?.token) {
            localStorage.setItem("authtoken", result.token);
            submitSuccess.value = true;
            router.push(Navlinks.dashboard.route);
        }
    } catch (error: any) {
        console.error(error);
        const data = error?.response?.data;
        const nonFieldError = data.non_field_errors[0];
        if (nonFieldError) {
            setFieldError("email", nonFieldError);
            setFieldError("password", nonFieldError);
        }
    }
});
</script>
