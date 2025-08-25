<template>
    <div class="max-w-md mx-auto">
        <div class="card">
            <div class="card-header">
                <h1 class="text-xl font-semibold text-balance">
                    Create your account
                </h1>
                <p class="mt-1 text-sm text-gray-500 dark:text-gray-400">
                    Fill in the fields to sign up.
                </p>
            </div>

            <form @submit="submit" novalidate>
                <div class="card-body">
                    <!-- Nome + Cognome -->
                    <div class="form-row">
                        <div class="form-group">
                            <label class="label" for="firstName"
                                >First name</label
                            >
                            <Field name="firstName" v-slot="{ field, meta }">
                                <input
                                    v-bind="field"
                                    id="firstName"
                                    type="text"
                                    autocomplete="given-name"
                                    :class="[
                                        'input',
                                        meta.touched && !meta.valid
                                            ? 'input-invalid'
                                            : '',
                                    ]"
                                    :aria-invalid="!meta.valid"
                                    :aria-describedby="
                                        !meta.valid
                                            ? 'firstName-error'
                                            : 'firstName-hint'
                                    "
                                />
                            </Field>
                            <ErrorMessage name="firstName" v-slot="{ message }">
                                <p id="firstName-error" class="error-text">
                                    {{ message }}
                                </p>
                            </ErrorMessage>
                            <p
                                v-if="!errors.firstName"
                                id="firstName-hint"
                                class="hint"
                            >
                                Your first name.
                            </p>
                        </div>

                        <div class="form-group">
                            <label class="label" for="lastName"
                                >Last name</label
                            >
                            <Field name="lastName" v-slot="{ field, meta }">
                                <input
                                    v-bind="field"
                                    id="lastName"
                                    type="text"
                                    autocomplete="family-name"
                                    :class="[
                                        'input',
                                        meta.touched && !meta.valid
                                            ? 'input-invalid'
                                            : '',
                                    ]"
                                    :aria-invalid="!meta.valid"
                                    :aria-describedby="
                                        !meta.valid
                                            ? 'lastName-error'
                                            : 'lastName-hint'
                                    "
                                />
                            </Field>
                            <ErrorMessage name="lastName" v-slot="{ message }">
                                <p id="lastName-error" class="error-text">
                                    {{ message }}
                                </p>
                            </ErrorMessage>
                            <p
                                v-if="!errors.lastName"
                                id="lastName-hint"
                                class="hint"
                            >
                                Your last name.
                            </p>
                        </div>
                    </div>

                    <div class="form-group">
                        <label class="label" for="username">Username</label>
                        <Field name="username" v-slot="{ field, meta }">
                            <input
                                v-bind="field"
                                id="username"
                                type="text"
                                autocomplete="username"
                                :class="[
                                    'input',
                                    meta.touched && !meta.valid
                                        ? 'input-invalid'
                                        : '',
                                ]"
                                :aria-invalid="!meta.valid"
                                :aria-describedby="
                                    !meta.valid
                                        ? 'username-error'
                                        : 'username-hint'
                                "
                            />
                        </Field>
                        <ErrorMessage name="username" v-slot="{ message }">
                            <p id="username-error" class="error-text">
                                {{ message }}
                            </p>
                        </ErrorMessage>
                        <p v-if="!errors.email" id="username-hint" class="hint">
                            Your username.
                        </p>
                    </div>

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
                                :aria-invalid="!meta.valid"
                                :aria-describedby="
                                    !meta.valid ? 'email-error' : 'email-hint'
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
                        <div class="input-wrap">
                            <Field name="password" v-slot="{ field, meta }">
                                <input
                                    v-bind="field"
                                    :type="showPassword ? 'text' : 'password'"
                                    id="password"
                                    autocomplete="new-password"
                                    :class="[
                                        'input pr-10',
                                        meta.touched && !meta.valid
                                            ? 'input-invalid'
                                            : '',
                                    ]"
                                    :aria-invalid="!meta.valid"
                                    :aria-describedby="
                                        !meta.valid
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
                                        ? 'Nascondi password'
                                        : 'Mostra password'
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
                            Min 8 characters, with uppercase, lowercase, and a
                            number.
                        </p>
                    </div>

                    <!-- Conferma Password -->
                    <div class="form-group">
                        <label class="label" for="confirmPassword"
                            >Repeat password</label
                        >
                        <div class="input-wrap">
                            <Field
                                name="confirmPassword"
                                v-slot="{ field, meta }"
                            >
                                <input
                                    v-bind="field"
                                    :type="showConfirm ? 'text' : 'password'"
                                    id="confirmPassword"
                                    autocomplete="new-password"
                                    :class="[
                                        'input pr-10',
                                        meta.touched && !meta.valid
                                            ? 'input-invalid'
                                            : '',
                                    ]"
                                    :aria-invalid="!meta.valid"
                                    :aria-describedby="
                                        !meta.valid
                                            ? 'confirmPassword-error'
                                            : 'confirmPassword-hint'
                                    "
                                />
                            </Field>
                            <button
                                type="button"
                                class="absolute inset-y-0 right-0 px-3 flex items-center text-sm text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
                                @click="showConfirm = !showConfirm"
                                :aria-label="
                                    showConfirm
                                        ? 'Hide password'
                                        : 'Show password'
                                "
                            >
                                {{ showConfirm ? "🙈" : "👁️" }}
                            </button>
                        </div>
                        <ErrorMessage
                            name="confirmPassword"
                            v-slot="{ message }"
                        >
                            <p id="confirmPassword-error" class="error-text">
                                {{ message }}
                            </p>
                        </ErrorMessage>
                        <p
                            v-if="!errors.confirmPassword"
                            id="confirmPassword-hint"
                            class="hint"
                        >
                            Repeat the password for confirmation.
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
                        {{ isSubmitting ? "wait..." : "Sign up" }}
                    </button>

                    <p
                        v-if="isSubmitSuccessful"
                        class="mt-3 text-center text-sm text-green-600 dark:text-green-400"
                    >
                        ✅ Registration submitted successfully!
                    </p>
                    <p
                        class="mt-4 text-center text-sm text-gray-500 dark:text-gray-400"
                    >
                        Already have an account?
                        <router-link
                            :to="{ name: Navlinks.signIn.name }"
                            class="text-primary-600 hover:underline dark:text-primary-400"
                        >
                            Log in
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
import { useRouter } from "vue-router";
import { SignUpTypedSchema, type SignUpFormType } from "./SignUp.schema";
import { Navlinks } from "@/data/navigation";
import { useUserStore } from "@/stores/userStore/userStore";

const isSubmitSuccessful = ref(false);
const showPassword = ref(false);
const showConfirm = ref(false);
const router = useRouter();
const store = useUserStore();

const { handleSubmit, isSubmitting, errors, setFieldError } =
    useForm<SignUpFormType>({
        validationSchema: SignUpTypedSchema,
    });

const submit = handleSubmit(async (values) => {
    isSubmitSuccessful.value = false;
    try {
        const result = await store.userSignUp(values);
        if (result?.token) {
            localStorage.setItem("authtoken", result.token);
            isSubmitSuccessful.value = true;
            router.push(Navlinks.dashboard.route);
        }
    } catch (error: any) {
        console.error(error);
        const data = error?.response?.data;
        data?.username && setFieldError("username", data?.username[0]);
        data?.email && setFieldError("email", data?.email[0]);
        data?.password && setFieldError("password", data?.password[0]);
    }
});
</script>
