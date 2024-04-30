const axios = require('axios');

module.exports = {
    whatsappBulk: async function sendWhatsAppBulkMessages(parameters = {}){
        if(!parameters.userPhoneNumber || !parameters.phoneNumberId || !parameters.WAToken){
            console.error('Please provide valid config!');
            return;
        }

        // looping over all the recipient numbers 
        for (const recipient of parameters.userPhoneNumber) {
            //create payload to be posted
            const whatsappMessageURL = `https://graph.facebook.com/v18.0/${parameters.phoneNumberId}/messages`;
            const responsePayload = {
                messaging_product: 'whatsapp',
                recipientType: 'individual',
                to: recipient,
                type: 'template',
                template: {name: 'hello_world', language: {code: 'en_US'}}
            }

            const header = {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${parameters.WAToken}`
            }
        
            console.info('Sending message to', recipient);

            //make call to whatsapp cloud api -> asynchronously
            await axios.post(whatsappMessageURL,  responsePayload, {
                headers: header
            }).then(function (response) {
                console.info("SUCCESS:", response.status);
            })
            .catch(function (error) {
                console.error("ERROR:", error.response.status);
            });
        }
    }
}