const axios = require('axios');

/*
*   @description Root Route
*   @method GET/
*/
exports.homeRoutes = (req,res)=>{
    // Make a get request to api/users
    axios.get('http://localhost:3000/api/users')
        .then(function(response){
            res.render('index',{users : response.data});
        })
        .catch(err=>{
            res.send(err);
        })
}

/*
*   @description add user
*   @method GET /add_user
*/
exports.add_user= (req,res)=>{
    res.render('add_user');
}


/*
*   @description update user
*   @method GET /update_user
*/
exports.update_user= (req,res)=>{
    axios.get('http://localhost:3000/api/users',{params : {id :req.query.id}})
    .then(function(userdata){
        res.render('update_user',{user : userdata.data})
    })
    .catch(err=>{
        res.send(err);
    })
}