const router = require('express').Router();//return an object

const Task = require('../models/tasks');//Impotar modelo de base de datos

router.get('/',async (req,res) =>{
    const tasks = await Task.find({active:true});
    res.render('index',{
        tasks//tasks:tasks
    });//La ruta como la extension del archivo no es necesario especificar ya que se hizo en settings del archivo app.js
});

router.post('/add',async (req,res)=>{

    let task = new Task({
        title:req.body.title,
        description:req.body.description,
    });

    await task.save();
    res.redirect('/');

});

router.get('/delete/:id',(req,res)=>{

    let idTask = req.params.id;

    Task.findByIdAndUpdate(idTask,{active:false},{new:true},(err,doc)=>{
        if(!err){
            console.log('Task deleted');

            
        }
        else{
            console.log('error deleting tasks');
        }
    });
    res.redirect('/');
});

router.get('/turn/:id', async (req,res)=>{

    let {id} = req.params;
    const task = await Task.findById(id);
    task.status = !task.status;
    await task.save();
    res.redirect('/');
});

router.get('/edit/:id', async (req,res)=>{

    let {id} = req.params;
    const task = await Task.findById(id);
  
    res.render('edit',{
        task
    });
});

router.post('/edit/:id', async (req,res)=>{//edit an existing task

    let {id} = req.params;
    const task = await Task.findById(id);

    await Task.findByIdAndUpdate(id,req.body,{new:true},(err,doc)=>{
        if(!err){
            res.redirect('/');
        }else{
            console.log('error deleting tasks'); 
        }
    });
});

module.exports = router;