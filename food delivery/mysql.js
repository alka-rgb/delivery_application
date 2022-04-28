const bodyParser = require('body-parser');
const mysql = require('mysql');
const express = require('express');
var oop = express();
const { json } = require('express/lib/response');
oop.use(bodyParser.json());

// connection configurations
var conn = mysql.createConnection({
host: 'localhost',
user: 'root',
password: 'alka@123',
database: 'april21'
});

// connect to database
conn.connect((err)=>{
   
    if(!err)
    console.log("connected")
    else
    console.log('not connected :'+json.stringify(err,undefined,2));
    
}); 

//  Add restaurant with details
    
oop.post('/Restaurant', function (req, res) {
    let data ={ Restaurant_ID:req.body.Restaurant_ID,Restaurant_Name:req.body.Restaurant_Name,Restaurant_Contact_No:req.body.Restaurant_Contact_No,Restaurant_Adress:req.body.Restaurant_Adress};
      let sqlQuery = "INSERT INTO Restaurant SET ?";

       let query = conn.query(sqlQuery, data,(err, results) => {

          if(!err)
          console.log('inserted successfully');
          else
        console.log(err);
      });
            
     });


// Add delivery person details

oop.post('/delivary', function (req, res) {
    let data ={ Delivery_ID:req.body.Delivery_ID,Delivery_Name:req.body.Delivery_Name,Delivery_cont:req.body.Delivery_Cont};
    let sqlQuery = "INSERT INTO delivary SET ?";

       let query = conn.query(sqlQuery, data,(err, results) => {

          if(!err)
          console.log('inserted successfully');
          else
        console.log(err);
   
});

});

// Add customers

oop.post('/Customer', function (req, res) {
    let data ={ Cus_ID:req.body.Cus_ID,Cust_Name:req.body.Cust_Name,Cust_cont:req.body.Cust_cont};
    let sqlQuery = "INSERT INTO Customer SET ?";
      
    let query = conn.query(sqlQuery, data,(err, results) => {
     
                 if(!err)
                 console.log('inserted successfully');
                 else
               console.log(err);
             });
                   
            });

//Update menu items for a restaurant

oop.put('/Menu_Item/:Item_ID', function (req, res) {

        conn.query('update Menu_Item set Item_Name =? where Item_ID=?',[req.body.Item_Name,req.params.Item_ID],(err,rows,fields)=>{
                
                    if(!err)
                    console.log('updated successfully');
                    else
                  console.log(err);
                });
                
                });

  //  Delete a delivery person

oop.delete('/Delivary/:Delivery_ID', function (req, res) {

    conn.query('delete from Delivary where Delivery_ID=?',[req.params.Delivery_ID],(err,rows,fields)=>{
    
        if(!err)
        console.log('deleted successfully');
        else
      console.log(err);
    });
    
    });


 // Add order by a customer (this can contain multiple items from a restaurant's menu) and Assign order to a delivery person
 

oop.post('/orders', function (req, res) {
  let data ={Order_ID:req.body. Order_ID,Total_Order:req.body.Total_Order,Customer_ID:req.body.Customer_ID,Delivery_ID:req.body.Delivery_ID};
  let sqlQuery = "INSERT INTO orders SET ?";
    
  let query = conn.query(sqlQuery, data,(err, results) => {
   
               if(!err)
               console.log('inserted successfully');
               else
             console.log(err);
    });
    
    });
       
// Get a particular order details (including total price)

oop.get('/orders/:Order_ID', function (req, res) {

      conn.query('select * from orders where  Order_ID=?',[req.params.Order_ID],(err,rows,fields)=>{
      
          if(!err)
          console.log(rows);
          else
        console.log(err);
      });
      
      });
      
// 

oop.get('/customer', function (req, res) {

conn.query('select * from customer order by Cust_Name asc',(err,rows,fields)=>{
    
        if(!err)
        console.log(rows);
        else
      console.log(err);
    });
    
    });
                      


            
// set port
oop.listen(3001, function () {
console.log(' Node Application is running on port 3001');
});
module.exports = oop;