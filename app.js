const express=require('express');
const morgan=require('morgan');
const app=new express()
app.use(morgan('dev'));

require('dotenv').config();
const PORT=process.env.PORT;
require('./db/connection')

app.set('view engine','ejs');
app.set('views',__dirname+"/views");
app.use(express.static('public'));

app.use(express.json());
app.use(express.urlencoded({extended:true}));

const nav=[

    {
        link:'/employee',name:'Home'
    },
    {
        link:'/employee/index',name:'ADD Employee'
    }
        ]

        const employRoutes=require('./routes/employeeroutes')(nav);
        app.use('/app',employRoutes);




app.listen(PORT,()=>{
    console.log(`server is running on PORT ${PORT}`);
})