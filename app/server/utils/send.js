import sendmail from '../auth/util/sendmail'
import workflowMiddleware from '../auth/util/workflow'

'use strict';

export function send(req, res, next) {


    if (!/^[a-zA-Z0-9\-\_\.\+]+@[a-zA-Z0-9\-\_\.]+\.[a-zA-Z0-9\-\_]+$/.test(req.body.email) || !req.body.name || !req.body.message) {
		res.send({
			success: false,
			message: 'Couldn\'t send your message. Make sure you fill out all fields correctly.',
		})
    	return false
    }

	sendmail(req, res, {
		from: 'IATI Studio <enquiry@iatistudio.com>',
		to: 'enquiry@iatistudio.com',
		subject: 'IATI Studio support message',
		textPath: 'email/support-text',
		htmlPath: 'email/support-html',
		locals: {
			name: req.body.name,
			email: req.body.email,
			message: req.body.message,
		},
		success: function(message) {
			res.send({
				success: true,
				message: 'Thanks for your message. We\'ll get back to you shortly.',
			})
		},
		error: function(err) {
			console.error('Error sending email: '+ err);
			res.send({
				success: false,
				message: 'Something went wrong sending your message. We got this error: '+ err,
			})
		}
    });
};

export default send