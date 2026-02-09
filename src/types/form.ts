export interface FileData {
    name: string;
    type: string;
    size: number;
    data: string;
}

export interface FormSubmitData {
    name: string;
    phone: string;
    email: string;
    comment: string;
    timestamp: string;
    file?: FileData;
}

export interface FormErrors {
    name: string;
    phone: string;
    email: string;
    checkbox: string;
}

export interface ApiResponse {
    success?: boolean;
    message?: string;
    error?: string;
}