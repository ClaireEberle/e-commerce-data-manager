const router = require('express').Router();
const { Tag, Product, ProductTag } = require('../../models');

// The `/api/tags` endpoint

router.get('/', (req, res) => {
  // find all tags
  Tag.findAll().then(tagData=>{
    res.json(tagData);
  }).catch((err)=>{
    console.log(err);
    res.status(500).json({
      msg:"an error occured",
      err:err,
    });
  });
  // be sure to include its associated Product data
});

router.get('/:id', (req, res) => {
  // find a single tag by its `id`
  Tag.findByPk(req.params.id,{
    include:[{
      model:Product,
      include:[Tag]
    }]
    // be sure to include its associated Product data
  }).then(data=>{
      if(data){
        return res.json(data);
      }else{
        res.status(404).json({
          msg:"not found"
        })
      }
    }).catch(err=>{
      console.log(err);
      res.status(500).json({
        msg:"an error occurred",
        err:err
      })
    })
});

router.post('/', (req, res) => {
  // create a new tag
  Tag.create({
    // id:req.body.id,
    tag_name:req.body.tag_name
  }).then(tagData=>{
    res.status(201).json(tagData)
  }).catch(err=>{
    console.log(err);
    res.status(500).json({
      msg:"an error occurred",
      err:err
    })
  })
});

router.put('/:id', (req, res) => {
  // update a tag's name by its `id` value
  Tag.update({
    // id:req.body.id,
    tag_name:req.body.tag_name
  },{
    where:{
      id:req.params.id
    }
  }).then(tagData=>{
    if (tagData[0]){
      return res.json(tagData)
    }else{
      return res.status(404).json({msg:"no such record"})
    }
  })
});

router.delete('/:id', (req, res) => {
  // delete on tag by its `id` value
  Tag.destroy({
    where:{
      id:req.params.id
    }
  }).then(tagData=>{
    if(tagData){
      return res.json(tagData)
    } else{
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
