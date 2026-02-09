import { NextRequest, NextResponse } from 'next/server';
import { google } from 'googleapis';
import { Readable } from 'stream';

interface FormData {
    name: string;
    phone: string;
    email?: string;
    comment?: string;
    file?: {
        name: string;
        type: string;
        size: number;
        data: string;
    };
    timestamp: string;
}

function validateEmail(email: string): boolean {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

function validatePhone(phone: string): boolean {
    const phoneRegex = /^[\d\s\+\-\(\)]{10,}$/;
    return phoneRegex.test(phone);
}

async function getGoogleSheetsClient() {
    const auth = new google.auth.GoogleAuth({
        credentials: {
            client_email: process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL,
            private_key: process.env.GOOGLE_PRIVATE_KEY?.replace(/\\n/g, '\n'),
        },
        scopes: ['https://www.googleapis.com/auth/spreadsheets'],
    });

    const sheets = google.sheets({ version: 'v4', auth });

    return sheets;
}

async function uploadFileToDrive(fileData: {
    name: string;
    type: string;
    data: string;
}) {
    try {
        const auth = new google.auth.GoogleAuth({
            credentials: {
                client_email: process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL,
                private_key: process.env.GOOGLE_PRIVATE_KEY?.replace(/\\n/g, '\n'),
            },
            scopes: ['https://www.googleapis.com/auth/drive.file'],
        });

        const drive = google.drive({ version: 'v3', auth });

        const base64Data = fileData.data.split(',')[1];
        const buffer = Buffer.from(base64Data, 'base64');

        const response = await drive.files.create({
            requestBody: {
                name: fileData.name,
                mimeType: fileData.type,
            },
            media: {
                mimeType: fileData.type,
                body: Readable.from(buffer),
            },
            fields: 'id, webViewLink',
        });

        return response.data.webViewLink || '';
    } catch (error) {
        console.error('Error uploading file to Drive:', error);
        return '';
    }
}

export async function POST(request: NextRequest) {
    try {
        const data: FormData = await request.json();

        if (!data.name || !data.name.trim()) {
            return NextResponse.json(
                { error: 'Имя обязательно для заполнения' },
                { status: 400 }
            );
        }

        if (!data.phone || !data.phone.trim()) {
            return NextResponse.json(
                { error: 'Телефон обязателен для заполнения' },
                { status: 400 }
            );
        }

        if (!validatePhone(data.phone)) {
            return NextResponse.json(
                { error: 'Некорректный формат телефона' },
                { status: 400 }
            );
        }

        if (data.email && !validateEmail(data.email)) {
            return NextResponse.json(
                { error: 'Некорректный формат email' },
                { status: 400 }
            );
        }

        const sheets = await getGoogleSheetsClient();
        const spreadsheetId = process.env.GOOGLE_SHEETS_SPREADSHEET_ID;
        const sheetName = process.env.GOOGLE_SHEET_NAME || 'Sheet1';

        if (!spreadsheetId) {
            throw new Error('GOOGLE_SHEETS_SPREADSHEET_ID не настроен');
        }

        let fileLink = '';
        let fileName = '';

        if (data.file) {
            fileName = data.file.name;
            fileLink = await uploadFileToDrive(data.file);
        }

        const values = [
            [
                new Date(data.timestamp).toLocaleString('ru-RU', {
                    timeZone: 'Europe/Moscow',
                    year: 'numeric',
                    month: '2-digit',
                    day: '2-digit',
                    hour: '2-digit',
                    minute: '2-digit',
                    second: '2-digit'
                }),
                data.name,
                data.phone,
                data.email || '',
                data.comment || '',
                fileName,
                fileLink || (fileName ? 'Файл прикреплен к форме' : 'Нет файла'),
            ],
        ];

        await sheets.spreadsheets.values.append({
            spreadsheetId,
            range: `${sheetName}!A:G`,
            valueInputOption: 'USER_ENTERED',
            requestBody: {
                values,
            },
        });

        return NextResponse.json(
            { success: true, message: 'Заявка успешно отправлена!' },
            { status: 200 }
        );
    } catch (error) {
        console.error('Error submitting form:', error);

        return NextResponse.json(
            { error: 'Ошибка при отправке формы. Попробуйте позже.' },
            { status: 500 }
        );
    }
}

export async function GET() {
    return NextResponse.json(
        { message: 'API роут работает. Используйте POST для отправки данных.' },
        { status: 200 }
    );
}