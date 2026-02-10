export const validateEmail = (email: string): string | undefined => {
    if (!email) return undefined;

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        return 'Введите корректный email';
    }

    return undefined;
};

export const validatePhone = (phone: string): string | undefined => {
    if (!phone) return undefined;

    const phoneRegex = /^[\d\s\+\-\(\)]{10,}$/;
    if (!phoneRegex.test(phone)) {
        return 'Введите корректный номер телефона';
    }

    return undefined;
};

export const validateName = (name: string): string | undefined => {
    if (!name.trim()) return undefined;

    return undefined;
};

export const validateRequired = (value: string): string | undefined => {
    if (!value.trim()) {
        return `Заполните поле`;
    }
    return undefined;
};

export interface FormValidationErrors {
    name?: string;
    phone?: string;
    email?: string;
    [key: string]: string | undefined;
}

export const validateFormData = (data: {
    name: string;
    phone: string;
    email?: string;
}): FormValidationErrors => {
    const errors: FormValidationErrors = {};

    const nameRequiredError = validateRequired(data.name);
    if (nameRequiredError) {
        errors.name = nameRequiredError;
    } else {
        const nameValidationError = validateName(data.name);
        if (nameValidationError) {
            errors.name = nameValidationError;
        }
    }

    const phoneRequiredError = validateRequired(data.phone);
    if (phoneRequiredError) {
        errors.phone = phoneRequiredError;
    } else {
        const phoneValidationError = validatePhone(data.phone);
        if (phoneValidationError) {
            errors.phone = phoneValidationError;
        }
    }

    if (data.email) {
        const emailValidationError = validateEmail(data.email);
        if (emailValidationError) {
            errors.email = emailValidationError;
        }
    }

    return errors;
};