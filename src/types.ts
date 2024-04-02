export interface ParseDataEmailInterface{
    appName: string,
    link: string,
    user: Parse.User,
}


export interface MailOptionsInterface{
    from: string,
    to: string,
    subject: string,
    html?: string,
    text?: string,
    attachments?: any[]
}


export interface NodeMailerOptionsInterface{
    host: string,
    port: number,
    secure: boolean,
    auth: {
        user: string,
        pass: string
    },
    tls?: {
        ciphers?: string,
        maxVersion?: string,
        minVersion?: string
    },
    [key: string]: any
}


export interface AdapterOptionsInterface{

    nodeMailerOptions: NodeMailerOptionsInterface,
    defaultFrom: string,

    generatePasswordResetEmail?: ({ link, appName, user }: ParseDataEmailInterface) => Promise<{ text: string; html: string, subject: string }>,
    generateVerificationEmail?: ({ link, appName, user }: ParseDataEmailInterface) => Promise<{ text: string; html: string, subject: string }>,

}