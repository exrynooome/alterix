import { NextRequest, NextResponse } from 'next/server';
import { google } from 'googleapis';
import { writeFile, mkdir } from 'fs/promises';
import { join } from 'path';
import { existsSync } from 'fs';
import { validateFormData } from '@/utils/validate';
import type { FormSubmitData } from '@/types/form';

const MAX_FILE_SIZE = 10 * 1024 * 1024;

async function getGoogleSheetsClient() {
    const auth = new google.auth.GoogleAuth({
        credentials: {
            client_email: process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL,
            private_key: process.env.GOOGLE_PRIVATE_KEY?.replace(/\\n/g, '\n'),
        },
        scopes: ['https://www.googleapis.com/auth/spreadsheets'],
    });

    return google.sheets({ version: 'v4', auth });
}

async function saveFileLocally(fileData: {
    name: string;
    type: string;
    data: string;
}): Promise<string> {
    const base64Data = fileData.data.split(',')[1];
    if (!base64Data) {
        throw new Error('Некорректный формат файла');
    }

    const buffer = Buffer.from(base64Data, 'base64');

    const sanitizedName = fileData.name.replace(/[^a-zA-Z0-9._-]/g, '_');
    const fileName = `${Date.now()}_${sanitizedName}`;

    const uploadsDir = join(process.cwd(), 'public', 'uploads');

    if (!existsSync(uploadsDir)) {
        await mkdir(uploadsDir, { recursive: true });
    }

    const filePath = join(uploadsDir, fileName);
    await writeFile(filePath, buffer);

    return `/uploads/${fileName}`;
}

export async function POST(request: NextRequest) {
    try {
        const data: FormSubmitData = await request.json();

        if (data.file && data.file.size > MAX_FILE_SIZE) {
            return NextResponse.json(
                { error: 'Файл слишком большой. Максимум 10 МБ.' },
                { status: 400 }
            );
        }

        const validationErrors = validateFormData({
            name: data.name,
            phone: data.phone,
            email: data.email,
            agreedToPolicy: data.agreedToPolicy,
        });

        if (Object.keys(validationErrors).length > 0) {
            return NextResponse.json(
                {
                    error: 'Ошибка валидации данных',
                    fieldErrors: validationErrors
                },
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
            try {
                fileLink = await saveFileLocally(data.file);
            } catch {
                fileLink = 'Ошибка сохранения файла';
            }
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
                fileLink || 'Нет файла',
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
    } catch {
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