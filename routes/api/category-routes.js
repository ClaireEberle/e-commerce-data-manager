const router = require("express").Router();
const { Category, Product } = require("../../models");

// The `/api/categories` endpoint

router.get("/", (req, res) => {
  Category.findAll({      // find all categories
    include:[{
      model:Product,
      include:[Category]  // be sure to include its associated Products
    }]
  })
    .then((catData) => {
      res.json(catData);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({
        msg: "an error occurred",
        err: err,
      });
    });
  });

 

router.get("/:id", (req, res) => {
  // find one category by its `id` value
  Category.findByPk(req.params.id, {
    include: [
      {
        model: Product,
        include: [Category],   // be sure to include its associated Products
      },
    ],
  })
    .then((data) => {
      if (data) {
        return res.json(data);
      } else {
        res.status(404).json({
          msg: "no such record",
        });
      }
    })
    .catch((err) => {
      console.log(err);
      res.status(404).json({
        msg: "no such record",
      });
    });
  
});

router.post("/", (req, res) => {
  // create a new category
  Category.create({
    category_name:req.body.category_name,

  })
});

router.put("/:id", (req, res) => {
  // update a category by its `id` value
  Category.update({
    catergory_name:req.body.category_name
  },{
    where:{
      id:req.params.id
    }
  }).then(data=>{
    if(data[0]){
      return res.json(data)
    } else{
      return res.status(404).json({msg:"no such record"})
    }
  }).catch(err=>{
    console.log(err);
    res.status(500).json({
      msg:"an error occured",
      err:err
    })
  })
});

router.delete("/:id", (req, res) => {
  // delete a category by its `id` value
  Category.destroy({
    where:{
      id:req.params.id
    }
  }).then(data=>{
    if(data){
      return res.json(data)
    }else{
      return res.status(404).json({msg:"no such record"})
    }
  }).catch(err=>{
    console.log(err);
    res.status(500).json({
      msg:"an error occurred",
      err:err
    })
  })

});

module.exports = router;
