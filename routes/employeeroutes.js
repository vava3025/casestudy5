const express=require('express');
const router=express.Router();
const dataEmployee=require('../model/employeeData');
router.use(express.json());
router.use(express.urlencoded({extended:true}));//mandatory for upload image
router.use(express.static('public'));
    function emp(nav){
    router.get('/', async (req, res) => {
        const emp = await dataEmployee.find();
        res.render('index', { emp ,nav});
    });

    router.get('/add', (req, res) => {
        res.render('add');
    });

    router.post('/add', async (req, res) => {
        const emp=req.body
        const newemp=dataEmployee(emp)
        await newemp.save();
        res.redirect('/');
    });

    router.get('/edit/:id', async (req, res) => {
        const emp = await dataEmployee.findById(req.params.id);
        res.render('edit', { emp });
    });
    router.post('/edit/:id', async (req, res) => {
        const empUpdate=req.body
        console.log( empUpdate)
        const data= await dataEmployee.findByIdAndUpdate(req.params.id, {
                    empName: req.body.empName,
                    empDesgn: req.body.empDesgn,
                    empLocation: req.body.empLocation,
                    empSalary: req.body.empSalary

        });
        console.log(data)
        res.redirect('/');
    });

    router.post('/delete/:id', async (req, res) => {
        await empModel.findByIdAndDelete(req.params.id);
        res.redirect('/');
    });
    return dataEmployee
    }

module.exports=emp;
