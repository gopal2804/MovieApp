const express=require('express');
const app=express();
const path=require('path');
const request=require('request');

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname,'views'));
app.use(express.static('public'));

app.get('/', (req,res)=>{
    res.render('search');
});

app.get("/results",(req,res)=>{

    let query=req.query.search;
    request('https://api.themoviedb.org/3/search/movie?api_key=d139e8df84838442f52ad55706176199&query='+query, (error,response,body)=>{
        if(error){
            console.log(error);
        }
        let data=JSON.parse(body);
        res.render('movies',{data:data, searchQuery:query.toUpperCase()});
    });
});

app.listen(3000,()=>{
    console.log("server started");
});