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

            <Form
                :validation-schema="SignUpFormType"
                @submit="onSubmit"
                v-slot="{ errors }"
                novalidate
            >
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
                                        meta.valid
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
                </div>
            </Form>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { Form, Field, ErrorMessage } from "vee-validate";
import { useRouter } from "vue-router";
import { SignUpFormType } from "./SignUp.schema";
import { AuthService } from "@/services/auth/authApi";

const isSubmitting = ref(false);
const isSubmitSuccessful = ref(false);
const showPassword = ref(false);
const showConfirm = ref(false);
const router = useRouter();

const onSubmit = async (values: Record<string, any>) => {
    isSubmitSuccessful.value = false;
    isSubmitting.value = true;
    try {
        // simulazione chiamata API
        const result = await AuthService.signUp(values);
        console.log("Registrazione:", values, { result });
        if (result) {
            const { token } = result;
            localStorage.setItem("authtoken", token);
            isSubmitSuccessful.value = true;
            // redirect to dashboard
            router.push("/dashboard");
        }
    } finally {
        isSubmitting.value = false;
    }
};
</script>
