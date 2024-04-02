import * as nodemailer from "nodemailer";
import {AdapterOptionsInterface, MailOptionsInterface, ParseDataEmailInterface} from "./types";
import {_sendMail} from "./functions/_sendMail";

let MailAdapter = (adapterOptions: AdapterOptionsInterface) => {

    // --- Init Transporter ---
    //console.log(adapterOptions);
    const transporter = nodemailer.createTransport(adapterOptions.nodeMailerOptions as any);

    // --- Email Functions ---

    // Email
    const sendEmail = ( options: MailOptionsInterface ) => {

        let mail = {
            from: options.from,
            to: options.to,
            subject: options.subject,
            text: options.text || "",
            html: options?.html || "",
            attachments: options?.attachments || []
        };

        return _sendMail(mail, transporter);

    };

    // Password
    const sendPasswordResetEmail = ( data: ParseDataEmailInterface ) => {

        if(!!adapterOptions?.generatePasswordResetEmail){

            return adapterOptions.generatePasswordResetEmail(data).then(
                (result) => {
                    return _sendMail({
                        from: adapterOptions.defaultFrom,
                        subject: result?.subject || 'Reset Password',
                        to: data.user.get('email') || data.user.get('username'),
                        html: result?.html || "",
                        text: result?.text || ""
                    }, transporter);
                }
            ).catch(e => {
                return new Promise((resolve, reject) => {
                    console.log(e)
                    reject(e);
                });
            });


        }else {

            return _sendMail({
                from: adapterOptions.defaultFrom,
                subject: 'Reset Password',
                to: data.user.get('email') || data.user.get('username'),
                text: data.link,
            }, transporter);

        }

    }

    // Email Verification
    const sendVerificationEmail = ( data: ParseDataEmailInterface ) => {

        if(!!adapterOptions?.generateVerificationEmail){

            return adapterOptions.generateVerificationEmail(data).then(
                (result) => {
                    return _sendMail({
                        from: adapterOptions.defaultFrom,
                        subject: result?.subject || 'Verify Email',
                        to: data.user.get('email') || data.user.get('username'),
                        html: result?.html || "",
                        text: result?.text || ""
                    }, transporter);
                }
            ).catch(e => {
                return new Promise((resolve, reject) => {
                    console.log(e)
                    reject(e);
                });
            });


        }else {

            return _sendMail({
                from: adapterOptions.defaultFrom,
                subject: 'Verify Email',
                to: data.user.get('email') || data.user.get('username'),
                text: data.link,
            }, transporter);

        }

    }


    // --- Return Adapter ---
    return Object.freeze({
        sendMail: sendEmail,
        sendPasswordResetEmail: sendPasswordResetEmail,
        sendVerificationEmail: sendVerificationEmail
    })
}

// --- Export Adapter ---
export default MailAdapter;