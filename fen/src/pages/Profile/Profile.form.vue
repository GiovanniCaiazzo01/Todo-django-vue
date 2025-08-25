<template>
    <section class="max-w-3xl mx-auto">
        <header class="mb-6">
            <h1 class="text-2xl font-semibold tracking-tight">Profile</h1>
            <p class="text-sm text-gray-500 dark:text-gray-400">
                Aggiorna le tue informazioni personali.
            </p>
        </header>

        <form @submit="submitGeneralUserData" novalidate class="space-y-6">
            <div class="card">
                <div class="card-header">
                    <h2 class="text-lg font-medium">General information</h2>
                    <p class="hint">
                        I campi con errore sono evidenziati in rosso.
                    </p>
                </div>

                <div class="card-body">
                    <div class="form-row">
                        <!-- Username -->
                        <div class="form-group">
                            <label class="label" for="username">Username</label>
                            <Field
                                name="username"
                                v-slot="{ field, meta, errorMessage }"
                            >
                                <div class="input-wrap">
                                    <input
                                        v-bind="field"
                                        id="username"
                                        type="text"
                                        autocomplete="username"
                                        :class="[
                                            'input',
                                            meta.touched && errorMessage
                                                ? 'input-invalid'
                                                : '',
                                        ]"
                                        :aria-invalid="
                                            meta.touched && !!errorMessage
                                        "
                                        :aria-describedby="
                                            meta.touched && errorMessage
                                                ? 'username-error'
                                                : 'username-hint'
                                        "
                                    />
                                </div>
                                <p
                                    v-if="meta.touched && errorMessage"
                                    id="username-error"
                                    class="error-text"
                                    role="alert"
                                >
                                    {{ errorMessage }}
                                </p>
                                <p v-else id="username-hint" class="hint">
                                    Minimo 2 caratteri.
                                </p>
                            </Field>
                        </div>

                        <!-- Email -->
                        <div class="form-group">
                            <label class="label" for="email">Email</label>
                            <Field
                                name="email"
                                v-slot="{ field, meta, errorMessage }"
                            >
                                <div class="input-wrap">
                                    <input
                                        v-bind="field"
                                        id="email"
                                        type="email"
                                        autocomplete="email"
                                        :class="[
                                            'input',
                                            meta.touched && errorMessage
                                                ? 'input-invalid'
                                                : '',
                                        ]"
                                        :aria-invalid="
                                            meta.touched && !!errorMessage
                                        "
                                        :aria-describedby="
                                            meta.touched && errorMessage
                                                ? 'email-error'
                                                : 'email-hint'
                                        "
                                    />
                                </div>
                                <p
                                    v-if="meta.touched && errorMessage"
                                    id="email-error"
                                    class="error-text"
                                    role="alert"
                                >
                                    {{ errorMessage }}
                                </p>
                                <p v-else id="email-hint" class="hint">
                                    Usa un indirizzo valido.
                                </p>
                            </Field>
                        </div>
                    </div>

                    <div class="form-row">
                        <!-- First Name -->
                        <div class="form-group">
                            <label class="label" for="firstName"
                                >First Name</label
                            >
                            <Field
                                name="firstName"
                                v-slot="{ field, meta, errorMessage }"
                            >
                                <div class="input-wrap">
                                    <input
                                        v-bind="field"
                                        id="firstName"
                                        type="text"
                                        autocomplete="given-name"
                                        :class="[
                                            'input',
                                            meta.touched && errorMessage
                                                ? 'input-invalid'
                                                : '',
                                        ]"
                                        :aria-invalid="
                                            meta.touched && !!errorMessage
                                        "
                                        :aria-describedby="
                                            meta.touched && errorMessage
                                                ? 'firstName-error'
                                                : 'firstName-hint'
                                        "
                                    />
                                </div>
                                <p
                                    v-if="meta.touched && errorMessage"
                                    id="firstName-error"
                                    class="error-text"
                                    role="alert"
                                >
                                    {{ errorMessage }}
                                </p>
                                <p v-else id="firstName-hint" class="hint">
                                    Minimo 2 caratteri.
                                </p>
                            </Field>
                        </div>

                        <!-- Last Name -->
                        <div class="form-group">
                            <label class="label" for="lastName"
                                >Last Name</label
                            >
                            <Field
                                name="lastName"
                                v-slot="{ field, meta, errorMessage }"
                            >
                                <div class="input-wrap">
                                    <input
                                        v-bind="field"
                                        id="lastName"
                                        type="text"
                                        autocomplete="family-name"
                                        :class="[
                                            'input',
                                            meta.touched && errorMessage
                                                ? 'input-invalid'
                                                : '',
                                        ]"
                                        :aria-invalid="
                                            meta.touched && !!errorMessage
                                        "
                                        :aria-describedby="
                                            meta.touched && errorMessage
                                                ? 'lastName-error'
                                                : 'lastName-hint'
                                        "
                                    />
                                </div>
                                <p
                                    v-if="meta.touched && errorMessage"
                                    id="lastName-error"
                                    class="error-text"
                                    role="alert"
                                >
                                    {{ errorMessage }}
                                </p>
                                <p v-else id="lastName-hint" class="hint">
                                    Minimo 2 caratteri.
                                </p>
                            </Field>
                        </div>
                    </div>
                </div>

                <div class="card-footer">
                    <div class="flex items-center justify-end gap-3">
                        <button type="button" class="btn btn-secondary">
                            Cancel
                        </button>
                        <button type="submit" class="btn btn-primary">
                            Submit
                        </button>
                    </div>
                </div>
            </div>
        </form>
    </section>
</template>

<script setup lang="ts">
import { useForm, Field } from "vee-validate";
import {
    type ProfileGeneralsValues,
    ProfileGeneralsTypedSchema,
} from "./Profile.schema";
import { useUserStore } from "@/stores/userStore/userStore";
import { useToast } from "vue-toastification";
const toast = useToast();

const { handleSubmit, setFieldError } = useForm<ProfileGeneralsValues>({
    validationSchema: ProfileGeneralsTypedSchema,
});
const userStore = useUserStore();

const submitGeneralUserData = handleSubmit(async (values) => {
    if (
        !values.email &&
        !values.firstName &&
        !values.lastName &&
        !values.username
    )
        return;
    const userDataToSend = { ...values, id: userStore.user.id };

    try {
        const result = await userStore.userPatchGeneral(userDataToSend);
        if (!result) return;

        toast.success("User profile info updated correctly!");
    } catch (error: any) {
        console.error(error);
        const data = error?.response?.data;
        data?.username && setFieldError("username", data?.username[0]);
        data?.email && setFieldError("email", data?.email[0]);
    }
});
</script>
