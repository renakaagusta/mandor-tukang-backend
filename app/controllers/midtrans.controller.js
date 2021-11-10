
const { response } = require("express");
const axios = require('axios');
const midtransClient = require('midtrans-client');
const uuidv4 = require('uuid').v4;

const core = new midtransClient.CoreApi({
    isProduction: false,
    serverKey: 'SB-Mid-server-vzI4UQ2sMprJ7QBbvIcYSCSc',
    clientKey: 'SB-Mid-client-2IBXB0waX2pMumh2'
  })

  const snap = new midtransClient.Snap({
    isProduction: false,
    serverKey: 'SB-Mid-server-vzI4UQ2sMprJ7QBbvIcYSCSc',
    clientKey: 'SB-Mid-client-2IBXB0waX2pMumh2'
  })

exports.charge = async function(req, res) {
    console.log(req.body);
    var items = [];
    var grossAmount = 0;
    req.body.items.forEach(item => {
      items.push({
        id: uuidv4(),
        name: item.name,
        quantity: item.quantity,
        price: item.price,
       });  
       grossAmount += item.price*item.quantity;     
    });
    core.charge({
    	payment_type: req.body.paymentType,
      bank_transfer: { bank: req.body.bankTransfer },
      transaction_details: {
        order_id: uuidv4(),
        gross_amount: grossAmount,
      },
      item_details: items,
      customer_details: {
      	first_name: req.body.customer.firstName,
        last_name: req.body.customer.lastName,
        email: req.body.customer.email,
        phone: req.body.customer.phone,
        billing_address:  {
        	address: req.body.customer.billAddress.address,
          city: req.body.customer.billAddress.city,
          postal_code: '591112'
        }
      }
   })
   .then((response)=>{
     return res.send({
       status: response.status_code,
       message: response.status_message,
       data: response,
     });
   })
  .catch(console.error)
};

exports.status = async function (req, res){
  axios.get('https://api.sandbox.midtrans.com/v2/'+req.params.id+'/status',  {
    auth: {
      username: "SB-Mid-server-vzI4UQ2sMprJ7QBbvIcYSCSc",
      password: ""
    }
  })
  .then(function (response) {
    console.log(response);
    return res.send({
      status: response.data.status_code,
      message: response.data.status_message,
      data: response.data});
  })
  .catch(function (error) {
    // handle error
    console.log(error);
  })
  .then(function () {
    // always executed
  });

}

exports.notification = async function (req, res) {
  console.log(req.body);
  return res.send({});
}

exports.approve = async function (req, res) {
  snap.transaction.notification(JSON.stringify(getResponse))
   .then(console.log)
   .catch(console.error)
}

