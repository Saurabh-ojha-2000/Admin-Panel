const express = require('express');
const cors = require('cors');
const mysql = require('mysql');
const cookieParser = require('cookie-parser');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const salt = 10;

//Middlewares
const app = express();
app.use(express.json());
app.use(cors({
    origin: ["http://localhost:3000"],
    methods: ["POST", "GET"],
    credentials: true
}));
app.use(cookieParser());

//connection setup
const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "registration"
})
db.connect((err) => {
    if (err) {
        console.error('Error connecting to MySQL database: ' + err.stack);
        return;
    }
});

//registration route
app.post('/register', (req, res) => {

    const sql = "INSERT INTO user(`name`,`email`,`password`) VALUES (?)";

    try {
        bcrypt.hash(req.body.password.toString(), salt, (err, hash) => {
            if (err) {
                return res.json({ Error: "Error occured in hashing password" });
            }
            const values = [req.body.name, req.body.email, hash];
            db.query(sql, [values], (err, result) => {
                if (err) {
                    return res.json({ Error: "Inserting data error in server" })
                }
                else {
                    return res.json({ Status: "Success" })
                }
            });
        });
    } catch (error) {
        console.log("Registration Error ")
    }

});

//login route
app.post('/login', (req, res) => {

    const sql = 'select * from user where email=?';

    db.query(sql, [req.body.email], (err, data) => {
        console.log(data);
        if (err) {
            return res.json({ Error: "Error hashing fetching password" });
        }
        if (data.length > 0) {
            bcrypt.compare(req.body.password.toString(), data[0].password, (err, response) => {
                if (err) {
                    return res.json({ Error: "password compare error" });
                }
                if (response) {
                    const name = data[0].name;
                    const token = jwt.sign({ name }, "jwt-secret-key", { expiresIn: '1d' });
                    res.cookie('token', token);
                    return res.json({ Status: "Success" });
                } else {
                    return res.json({ Error: "Password not matched" });
                }
            });
        }
        else {
            return res.json({ Error: "No Email Exissssted" });
        }
    });
});

// route for verify user token
const verifyUser = (req, res, next) => {
    const token = req.cookies.token;
    if (!token) {
        return res.json({ Error: "You are not Authenticated" });
    }
    else {
        jwt.verify(token, "jwt-secret-key", (err, decoded) => {
            if (err) {
                return res.json({ Error: "Token is missing" });
            }
            else {
                req.name = jwt.decoded.name;
                next();
            }
        })
    }
}
app.get('/', verifyUser, (req, res) => {
    return res.json({ Status: "Success", name: req.name });
})

// route for logout user and delete its token in cookies
app.get("/logout", (req, res) => {
    res.clearCookie('token');
    return res.json({ Status: "Success" });
})


//Index file fetching route
app.get('/Index', (req, res) => {
    db.query("select * from tbl_payment_orders", (err, result) => {
        if (err) {
            console.error('Error querying Index: ' + err.stack);
            res.status(500).send("Error fetching Index from database");
        } else {
            res.send(result);
        }
    });
});

//reminder file and pending-reminder fetching route

app.get('/reminder', (req, res) => {
    db.query("select * from tbl_history", (err, result) => {
        if (err) {
            console.log('error occured in fetching reminder table:' + err.stack);
        }
        else {
            res.send(result);
        }
    });
});


//customer-feedback file fetching route

app.get('/customer-feedback', (req, res) => {
    db.query('select * from tbl_feedback_user', (err, result) => {
        if (err) {
            console.log("error occured in fetching customer-feedback data" + err.stack);
        }
        else {
            res.send(result);
        }
    });
});

//history file fetching route

app.get('/history', (req, res) => {
    db.query('select * from tbl_history', (err, result) => {
        if (err) {
            console.log("error occured in fetching Interaction-History-Manage data" + err.stack);
        }
        else {
            res.send(result);
        }
    })
})


//Admin-users file fetching route

app.get('/admin-users', (req, res) => {
    db.query("select * from admin_users where status='active' ", (err, result) => {
        if (err) {
            res.send("error in sending data in admin-users" + err.stack)
        }
        else {
            res.send(result);
        }
    });
});

//fetch data of particaluar employeeReminder Call Pending.

app.get('/pending-reminder-calls', (req, res) => {
    const currentDate = new Date().toISOString().slice(0, 10); // Get current date in 'YYYY-MM-DD' format
    const query = `
    SELECT au.email, au.phone, au.username, au.name, COUNT(th.id) AS idsdata1
    FROM admin_users AS au
    LEFT JOIN tbl_history AS th ON th.add_by = au.username
    WHERE au.department = 2 AND au.status = 'active' AND DATE(th.reminder_date) = '${currentDate}'
    GROUP BY au.username
    ORDER BY au.id ASC
  `;
    db.query(query, (err, result) => {
        if (err) {
            res.send("error to fetch total calling data query from database" + err.stack);
        }
        else {
            res.send(result);
        }
    });
});

//fetch data of todays call 

app.get('/today-call', (req, res) => {
    const currentDate = new Date().toISOString().slice(0, 10);
    const query = `SELECT COUNT(id) as totalcall, MAX(updated_at) as lastcall FROM tbl_history WHERE ct_date >= '${currentDate}'`;
    db.query(query, (err, result) => {
        if (err) {
            res.send("error fetching in today-call query" + err.stack);
        }
        else {
            res.send(result);
        }
    });
});

//fetch data of dashbaord-total-sales

app.get('/dashbaord-total-sales', (req, res) => {
    const today = new Date();
    const year = today.getFullYear();
    const month = (today.getMonth() + 1).toString().padStart(2, '0'); // Months are zero indexed, so we add 1
    const day = today.getDate().toString().padStart(2, '0');
    const currentDate = `${year}-${month}-${day}`;
    // const currentDate= new Date().toISOString().slice(0,10);    
    const query = `select count(admin_id) as totalsale,MAX(updated_at) as lastcall from tbl_payment_orders where order_date ='${currentDate}' and admin_id is not null`; //and admin_id!=1 
    db.query(query, (err, result) => {
        if (err) {
            res.send("error occured in fetching query dashbaord-total-sales from database" + err.stack);
        }
        else {
            res.send(result);
        }
    });
});

//fetch data of todays-pending-reminder

app.get('/todays-pending-reminder', (req, res) => {
    const currentDate = new Date().toISOString().slice(0, 10);
    const query = `SELECT COUNT(id) as total_pending_reminder_calls FROM tbl_history WHERE reminder_date ='${currentDate}'`;
    db.query(query, (err, result) => {
        if (err) {
            res.send("Error in fetching query todays-pending-reminder from databse" + err.stack);
        } else {
            res.send(result);
        }
    });
});


//fetch data of todays-appointment

app.get('/todays-appointment', (req, res) => {
    const currentDate = new Date().toISOString().slice(0, 10);
    const query = `select count(id) as bookid from tbl_feedback_user where appointmentdate='${currentDate}' and bookappointment='appointment'`;
    db.query(query, (err, result) => {
        if (err) {
            res.send("error occured in fetching query todays appointment from database" + err.stack);
        }
        else {
            res.send(result);
        }
    });
});

//fetch data of pending-appointment
app.get('/pending-appointment', (req, res) => {
    const currentDate = new Date().toISOString().slice(0, 10); // Get current date in 'YYYY-MM-DD' format
    const query = `
    SELECT count(tbl_feedback_user.id) as bookId
    FROM tbl_feedback_user, tbl_payment_orders
    WHERE tbl_payment_orders.shopping_order_id = tbl_feedback_user.order_id
      AND tbl_payment_orders.shipping_status = 'Delivered'
      AND appointmentdate >= '2023-05-01'
      AND appointmentdate <= '${currentDate}'
      AND bookappointment = 'appointment'
      and appointment is NULL`;

    db.query(query, (err, result) => {
        if (err) {
            res.send("error occured in fetching query pending-appointment from database" + err.stack);
        }
        else {
            res.send(result);
        }
    });
});

// fetch data of call details of call-summary of customer care employee at dashboard
app.get('/combined-data', (req, res) => {
    const currentDate = new Date().toISOString().slice(0, 10); // Get current date in 'YYYY-MM-DD' format

    const getUsersQuery = `
        SELECT id, email, phone, username, name 
        FROM admin_users 
        WHERE department = 2 AND status = 'active' 
        ORDER BY id ASC`;

    db.query(getUsersQuery, (err, usersResult) => {
        if (err) {
            res.status(500).send("An error occurred while fetching users data: " + err.stack);
            return;
        }

        const names = usersResult.map(user => `'${user.name}'`).join(',');
        const usernames = usersResult.map(user => `'${user.username}'`).join(',');

        const fetchCallSummaryQuery = `
            SELECT 
                service,
                COUNT(id) AS totalCalls,
                SUM(CASE WHEN status = 'ANSWER' THEN 1 ELSE 0 END) AS answeredCalls,
                SUM(CASE WHEN status != 'ANSWER' THEN 1 ELSE 0 END) AS notAnsweredCalls
            FROM 
                tbl_servertel_lead 
            WHERE 
                service IN (${names}) AND date = '${currentDate}'
            GROUP BY 
                service`;

        const fetchCallFormQuery = `
            SELECT 
                add_by, 
                COUNT(id) AS callform 
            FROM 
                tbl_history 
            WHERE 
                add_by IN (${usernames}) AND 
                date = '${currentDate}'
            GROUP BY 
                add_by`;

        db.query(fetchCallSummaryQuery, (err, callSummaryResult) => {
            if (err) {
                res.status(500).send("An error occurred while fetching call summary data: " + err.stack);
                return;
            }

            db.query(fetchCallFormQuery, (err, callFormResult) => {
                if (err) {
                    res.status(500).send("An error occurred while fetching call form data: " + err.stack);
                    return;
                }
                // Sort callFormResult based on the order of ids in usersResult
                const sortedCallFormResult = [];
                for (const user of usersResult) {
                    const found = callFormResult.find(callForm => callForm.add_by === user.username);
                    if (found) {
                        sortedCallFormResult.push(found);
                    } else {
                        sortedCallFormResult.push({ add_by: user.username, callform: 0 });
                    }
                }
                // Sort callSummaryResult based on the order of ids in usersResult
                const sortedCallSummaryResult = callSummaryResult.slice().sort((a, b) => {
                    const indexA = usersResult.findIndex(user => user.name === a.service);
                    const indexB = usersResult.findIndex(user => user.name === b.service);
                    return indexA - indexB;
                });

                res.send({
                    callSummary: sortedCallSummaryResult,
                    callForm: sortedCallFormResult
                });
            });
        });
    });
});

//fetch data of total orders(monthwise) by customer care employee
app.get('/order-chart', (req, res) => {
    const query = `SELECT MONTH(date) AS month, COUNT(id) AS order_count FROM tbl_history WHERE date IS NOT NULL GROUP BY MONTH(date)`;
    db.query(query, (err, result) => {
        if (err) {
            res.send("error occured in fetching order-chart query" + err);
        }
        else {
            res.send(result);
        }
    });
});

//fetch data of leadstfn by customer care employee
app.get('/leadstfn', (req, res) => {
    const query = `select * from tbl_servertel_lead`;
    db.query(query, (err, result) => {
        if (err) {
            res.send("error occured in fetching query leadstfn");
        }
        else {
            res.send(result);
        }
    });
});

//fetch data of leadstfn-remark by customer care employee
app.get('/leadstfn-remark', (req, res) => {
    const query = `select * from tbl_servertel_lead_remark`;
    db.query(query, (err, result) => {
        if (err) {
            res.send("error occured in fetching query leadstfn-remark");
        }
        else {
            res.send(result);
        }
    });
});

//fetch data of lead-fb-web by customer care employee

app.get('/lead-fb-web', (req, res) => {
    const query = `select * from tbl_lead_fb_webwhatsapp`;
    db.query(query, (err, result) => {
        if (err) {
            res.send("error occured in fetching query lead_fb/webwhatsapp");
        }
        else {
            res.send(result);
        }
    });
});


//fetch data of feedback-form-modal to edit data in all manage-orders

app.post('/feedback-form-modal', (req, res) => {
    const formData = req.body;
    const sqlQuery = `UPDATE tbl_history SET calltype = ?, subject = ?,date=?, enquiry = ?, concern_department = ?, message = ?, mail_message = ?, status = ?, feedback_status = ?, reminder_date = ?, reminder_time = ?, reminder = ?, doctor_comments = ? WHERE ordernumber = ?`; // Adjust feedback_table and ordernumber column name as per your database schema

    // Extract form data values
    const { calltype, subject, date, enquiry, concern_department, message, mail_message, status, feedback_status, reminder_date, reminder_time, reminder, doctor_comments } = formData;

    // Assuming ordernumber is also part of your form data
    const ordernumber = formData.ordernumber;

    db.query(sqlQuery, [calltype, subject, date, enquiry, concern_department, message, mail_message, status, feedback_status, reminder_date, reminder_time, reminder, doctor_comments, ordernumber], (err, result) => {
        if (err) {
            console.error('Error updating data in MySQL:', err);
            res.status(500).json({ Status: 'Error', message: 'Failed to update data in database' });
            return;
        }
        console.log('Data updated in MySQL successfully');
        res.json({ Status: 'Success', message: 'Data updated successfully' });
    });
});

app.get('/feedbackFormModalTable', (req, res) => {
    const ordernumber = req.query.phone;

    db.query(`select * from tbl_history where number ='${ordernumber}' order by id desc`, (err, result1) => {
        if (err) {
            console.error("Error occurred in fetching feedbackFormModalTable table data:", err);
            res.status(500).send("An error occurred in fetching feedbackFormModalTable table");
        }
        res.send(result1);
    })

});

app.get('/purchaseTime', (req, res) => {
    const ordernumber = req.query.ordernumber;

    console.log(ordernumber);
    const query = `select * from tbl_payment_orders  where shopping_order_id='${ordernumber}'`;
    db.query(query, (err, result) => {
        if (err) {
            console.log("error occured in fetching no. of purchase time in query");
        }
        else {
            res.send(result);
            console.log("success");
        }
    })
})

app.listen(5000, () => {
    console.log("running to port no. 5000")
});
